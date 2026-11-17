// TechAprovado — procura no feed oficial da KaBuM (Awin Create-a-Feed) os produtos dos guias que ainda não têm KaBuM.
// Não altera o site: grava data/candidatos-kabum.json para revisão antes de ir para js/lojas.json.
// Segredo: AWIN_KABUM_FEED_URL (link gerado em Awin → Toolbox → Create-a-Feed, CSV com vírgula, gzip).

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

const url = process.env.AWIN_KABUM_FEED_URL;
if (!url) { console.error('Falta o segredo AWIN_KABUM_FEED_URL.'); process.exit(1); }

// ---------- 1. Produtos dos guias sem KaBuM ----------
const lojas = JSON.parse(readFileSync('js/lojas.json', 'utf8')).produtos;
const temKabum = a => (lojas[a]?.lojas || []).some(l => l.loja === 'kabum');
const decode = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const produtos = new Map();
for (const f of readdirSync('.').filter(f => f.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  for (const card of html.match(/<article class="analysis-card[\s\S]*?<\/article>/g) || []) {
    const asin = (card.match(/data-produto="([A-Z0-9]+)"/) || [])[1];
    const nome = decode((card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '');
    if (asin && nome && !temKabum(asin) && !produtos.has(asin)) produtos.set(asin, { nome, guia: f });
  }
}
console.log(`${produtos.size} produtos sem KaBuM`);

// ---------- 2. Baixar e ler o feed ----------
const r = await fetch(url);
if (!r.ok) { console.error('Feed respondeu', r.status); process.exit(1); }
let buf = Buffer.from(await r.arrayBuffer());
if (buf[0] === 0x1f && buf[1] === 0x8b) buf = gunzipSync(buf);
const texto = buf.toString('utf8').replace(/^﻿/, '');

function parseCSV(t) {
  const linhas = []; let campo = '', linha = [], aspas = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (aspas) {
      if (c === '"') { if (t[i + 1] === '"') { campo += '"'; i++; } else aspas = false; }
      else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === ',') { linha.push(campo); campo = ''; }
    else if (c === '\n') { linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else if (c !== '\r') campo += c;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  return linhas;
}
const [cab, ...dados] = parseCSV(texto);
const col = n => cab.indexOf(n);
console.log(`${dados.length} itens no feed; colunas: ${cab.join(', ')}`);
const C = { nome: col('product_name'), id: col('merchant_product_id'), link: col('aw_deep_link'), url: col('merchant_deep_link'),
  estoque: col('in_stock'), marca: col('brand_name'), modelo: col('model_number'), ean: col('ean'), cat: col('merchant_category'), cond: col('condition') };

// ---------- 3. Casar por modelo ----------
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
// palavras separadas por espaço, sem pontuação interna: "AF-30" → "af30", "TP-Link" → "tplink"
const fichas = s => norm(s).split(/[\s,;/()]+/).map(w => w.replace(/[^a-z0-9]+/g, '')).filter(Boolean);
const juntar = s => norm(s).replace(/[^a-z0-9]+/g, '');
const genericas = new Set(['com', 'sem', 'para', 'de', 'da', 'do', 'e', 'fio', 'preto', 'branco', 'cinza', 'grafite', 'cor', 'kit', 'novo', 'nova']);
const feed = dados.filter(l => l.length > 3).map(l => ({ l, nome: l[C.nome], flat: juntar(l[C.nome] + ' ' + (l[C.modelo] || '')), toks: new Set(fichas(l[C.nome])) }));

const saida = { gerado: new Date().toISOString(), colunas: cab, produtos: {} };
for (const [asin, p] of produtos) {
  const t = fichas(p.nome).filter(w => !genericas.has(w));
  const modelos = t.filter(w => /\d/.test(w) && /[a-z]/.test(w));      // ex.: af30, c200, eaf31
  const marca = t[0];
  const cands = feed.map(f => {
    let pts = 0;
    for (const m of modelos) if (f.flat.includes(m)) pts += 3;
    for (const w of t) if (f.toks.has(w)) pts += 1;
    if (marca && !f.toks.has(marca) && !f.flat.includes(marca)) pts -= 5;
    if (modelos.length && !modelos.every(m => f.flat.includes(m))) pts -= 4;
    return { f, pts };
  }).filter(x => x.pts >= (modelos.length ? 4 : 3)).sort((a, b) => b.pts - a.pts).slice(0, 4);
  saida.produtos[asin] = { nome: p.nome, guia: p.guia, candidatos: cands.map(({ f, pts }) => ({
    pts, titulo: f.nome, id: f.l[C.id], estoque: f.l[C.estoque], cond: C.cond >= 0 ? f.l[C.cond] : undefined,
    url: f.l[C.url], categoria: f.l[C.cat] })) };
}
mkdirSync('data', { recursive: true });
writeFileSync('data/candidatos-kabum.json', JSON.stringify(saida, null, 1));
const achados = Object.values(saida.produtos).filter(x => x.candidatos.length).length;
console.log(`Gravado data/candidatos-kabum.json: ${achados} de ${produtos.size} com candidato`);
