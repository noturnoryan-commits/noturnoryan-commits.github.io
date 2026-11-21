// TechAprovado — integração com a Amazon pela Creators API (substituta oficial da PA-API 5).
// PRONTA, MAS DESLIGADA: só roda quando os segredos abaixo existirem no GitHub.
// Não lê páginas da Amazon (proibido pelo Programa de Associados): usa somente a API oficial.
//
// Documentação conferida em 20/11/2026:
//   https://affiliate-program.amazon.com/creatorsapi/docs/en-us/migrating-to-creatorsapi-from-paapi
//   https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation
//   Token (região NA, que inclui o Brasil): POST https://api.amazon.com/auth/o2/token
//     { grant_type: "client_credentials", client_id, client_secret, scope: "creatorsapi::default" }
//     O token vale 3600 s.
//   Itens: POST https://creatorsapi.amazon/catalog/v1/getItems
//     Cabeçalhos: Authorization: Bearer <token>, Content-Type: application/json, x-marketplace: <marketplace>
//     Corpo: { itemIds, itemIdType: "ASIN", marketplace, partnerTag, resources }
//   A credencial é criada na Central de Associados (Ferramentas → Creators API).
//   A Amazon pode exigir vendas qualificadas recentes para liberar o acesso.
//
// Segredos (GitHub → Settings → Secrets and variables → Actions):
//   AMAZON_CREATORS_CLIENT_ID, AMAZON_CREATORS_CLIENT_SECRET
// Variáveis opcionais: AMAZON_MARKETPLACE (padrão www.amazon.com.br — conferir na página
//   "Common Request Headers and Parameters" ao ativar), AMAZON_PARTNER_TAG (padrão techaprovad0b-20).
//
// O que faz: lê os ASINs de data/produtos/*.json e grava data/amazon/itens.json com título,
// imagem, características e disponibilidade/preço (OffersV2), mais a data da consulta.
// Não mexe nos guias nem nas fichas: os dados ficam para revisão e para as páginas usarem depois.
// O site não mostra preço hoje; se um dia mostrar, só com data e hora da consulta ao lado.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';

const env = process.env;
const CLIENT_ID = env.AMAZON_CREATORS_CLIENT_ID;
const CLIENT_SECRET = env.AMAZON_CREATORS_CLIENT_SECRET;
const MARKETPLACE = env.AMAZON_MARKETPLACE || 'www.amazon.com.br';
const PARTNER_TAG = env.AMAZON_PARTNER_TAG || 'techaprovad0b-20';
const TOKEN_URL = 'https://api.amazon.com/auth/o2/token';
const API = 'https://creatorsapi.amazon/catalog/v1';
const LOTE = 10; // a API aceita até 10 itens por chamada de getItems
const RECURSOS = [
  'itemInfo.title',
  'itemInfo.features',
  'itemInfo.byLineInfo',
  'images.primary.large',
  'offersV2.listings.price',
  'offersV2.listings.availability',
  'offersV2.listings.merchantInfo'
];
const pausa = ms => new Promise(r => setTimeout(r, ms));

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.log('Integração Amazon desligada: faltam AMAZON_CREATORS_CLIENT_ID e AMAZON_CREATORS_CLIENT_SECRET. Nada foi feito.');
  process.exit(0);
}

async function token() {
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'client_credentials', client_id: CLIENT_ID, client_secret: CLIENT_SECRET, scope: 'creatorsapi::default' })
  });
  if (!r.ok) throw new Error(`Token recusado (${r.status}): ${await r.text()}`);
  return (await r.json()).access_token;
}

async function getItems(tk, asins) {
  const r = await fetch(`${API}/getItems`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tk}`, 'Content-Type': 'application/json', 'x-marketplace': MARKETPLACE },
    body: JSON.stringify({ itemIds: asins, itemIdType: 'ASIN', marketplace: MARKETPLACE, partnerTag: PARTNER_TAG, resources: RECURSOS })
  });
  if (r.status === 429) { await pausa(5000); return getItems(tk, asins); }
  if (!r.ok) throw new Error(`getItems falhou (${r.status}): ${await r.text()}`);
  return r.json();
}

// 1. ASINs das fichas padronizadas
const pasta = 'data/produtos';
const asins = new Map();
for (const f of existsSync(pasta) ? readdirSync(pasta) : []) {
  if (!f.endsWith('.json') || f === 'index.json') continue;
  const dados = JSON.parse(readFileSync(`${pasta}/${f}`, 'utf8'));
  for (const p of dados.produtos || []) if (/^[A-Z0-9]{10}$/.test(p.asin || '')) asins.set(p.asin, { categoria: dados.categoria, id: p.id });
}
console.log(`${asins.size} ASINs nas fichas`);

// 2. Consulta em lotes
const tk = await token();
const itens = {};
const lista = [...asins.keys()];
for (let i = 0; i < lista.length; i += LOTE) {
  const lote = lista.slice(i, i + LOTE);
  const resp = await getItems(tk, lote);
  const resultado = resp.itemsResult || resp.ItemsResult || {};
  for (const it of resultado.items || resultado.Items || []) {
    const asin = it.asin || it.ASIN;
    const oferta = (it.offersV2 && it.offersV2.listings && it.offersV2.listings[0]) || null;
    itens[asin] = {
      ...asins.get(asin),
      titulo: it.itemInfo?.title?.displayValue || null,
      marca: it.itemInfo?.byLineInfo?.brand?.displayValue || null,
      caracteristicas: it.itemInfo?.features?.displayValues || [],
      imagem: it.images?.primary?.large?.url || null,
      disponibilidade: oferta?.availability?.type || oferta?.availability?.message || null,
      preco: oferta?.price?.money?.displayAmount || oferta?.price?.displayAmount || null,
      vendedor: oferta?.merchantInfo?.name || null,
      link: it.detailPageURL || it.detailPageUrl || null
    };
  }
  for (const e of resp.errors || resp.Errors || []) console.log('Aviso da API:', e.code || e.Code, e.message || e.Message);
  await pausa(1100); // respeita o limite de chamadas por segundo
}

mkdirSync('data/amazon', { recursive: true });
writeFileSync('data/amazon/itens.json', JSON.stringify({ consultado: new Date().toISOString(), marketplace: MARKETPLACE, itens }, null, 1));
console.log(`${Object.keys(itens).length} itens gravados em data/amazon/itens.json`);
