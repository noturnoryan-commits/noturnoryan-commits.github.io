// TechAprovado — procura os produtos dos guias no CATÁLOGO do Mercado Livre pela API oficial (products/search).
// Não raspa o site. Grava data/candidatos-ml.json (página de catálogo /p/MLB... de cada produto) para revisão.
// Depois, os links de afiliado (meli.la, etiqueta "site") são gerados no Gerador de links da Central de Afiliados.
// Limite da API para apps novos (testado em 26/11/2026): products/search e products/{id} funcionam;
// vendedores do produto, busca geral de anúncios e buy box ficam bloqueados (403).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tokenUsuario } from './ml-auth.mjs';

const pausa = ms => new Promise(r => setTimeout(r, ms));
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const toks = s => norm(s).split(/[^a-z0-9]+/).filter(Boolean);
const GEN = new Set(['com', 'sem', 'de', 'da', 'do', 'e', 'para', 'fio', 'nova', 'novo', 'geracao', 'gb', 'w', 'mais', 'recente', 'modelo', 'o', 'a']);
const CORES = /\b(preto|preta|branco|branca|cinza|grafite|azul|rosa|verde|vermelho|vermelha|roxo|lilas|dourado|prata|bege|amarelo|laranja|titanio)\b/;
const RUIM = /\b(capa|case|pelicula|suporte|cabo para|compativel|refil|adesivo|kit de|pecas?|reposicao|caixa aberta|usado|recondicionado|bolsa|estojo para)\b/;

const indice = JSON.parse(readFileSync('data/produtos/indice.json', 'utf8'));
const lojas = JSON.parse(readFileSync('js/lojas.json', 'utf8')).produtos;
const filtro = (process.env.GUIAS || '').split(',').map(s => s.trim()).filter(Boolean);
const ARQ = 'data/candidatos-ml.json';
const saida = existsSync(ARQ) ? JSON.parse(readFileSync(ARQ, 'utf8')) : { produtos: {} };
saida.gerado = new Date().toISOString();

const H = { Authorization: 'Bearer ' + await tokenUsuario() };
let n = 0, achados = 0;
for (const [id, [nome, guia]] of Object.entries(indice.produtos)) {
  if (filtro.length && !filtro.includes(guia)) continue;
  if ((lojas[id]?.lojas || []).some(l => l.loja === 'mercadolivre')) continue;
  const limpo = nome.replace(/\(.*?\)/g, ' ');
  const t = toks(limpo).filter(w => !GEN.has(w));
  const modelos = t.filter(w => /\d/.test(w));
  const corGuia = (norm(nome).match(CORES) || [])[0];
  let r, j = {};
  try { r = await fetch('https://api.mercadolibre.com/products/search?status=active&site_id=MLB&q=' + encodeURIComponent(limpo.trim()), { headers: H }); j = await r.json(); } catch (e) { j = { erro: String(e) }; }
  const cands = (j.results || []).map(p => {
    const tn = norm(p.name), tt = new Set(toks(p.name));
    let pts = 0; for (const w of t) if (tt.has(w) || tn.replace(/\s/g, '').includes(w)) pts++;
    const cob = t.length ? pts / t.length : 0;
    const okModelo = modelos.every(m => tn.replace(/[\s-]/g, '').includes(m));
    const cor = (tn.match(CORES) || [])[0];
    const corOk = !corGuia || cor === corGuia || (corGuia.startsWith('pret') && cor?.startsWith('pret')) || (corGuia.startsWith('branc') && cor?.startsWith('branc'));
    return { id: p.id, nome: p.name, cob: +cob.toFixed(2), okModelo, corOk, ruim: RUIM.test(tn), url: 'https://www.mercadolivre.com.br/p/' + p.id };
  }).filter(c => c.cob >= 0.75 && c.okModelo && c.corOk && !c.ruim).sort((a, b) => b.cob - a.cob);
  saida.produtos[id] = { nome, guia, status: r?.status, candidatos: cands.slice(0, 3) };
  n++; if (cands.length) achados++;
  await pausa(500);
}
writeFileSync(ARQ, JSON.stringify(saida, null, 1));
console.log(`${n} produtos consultados; ${achados} com candidato no catálogo do ML.`);
