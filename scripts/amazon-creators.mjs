// TechAprovado — integração com a Amazon Creators API (sucessora da PA-API 5.0, desligada em 30/04/2026).
// PRONTA, MAS DESLIGADA: só funciona depois que a Amazon liberar o acesso (exige vendas qualificadas)
// e o João cadastrar os segredos AMAZON_CREATORS_CLIENT_ID e AMAZON_CREATORS_CLIENT_SECRET no GitHub.
// Sem os segredos, o script avisa e sai sem erro.
//
// O que faz: consulta todos os produtos dos guias (data/produtos/indice.json) em lotes de 10 e grava
// data/amazon-itens.json com título, imagem principal e disponibilidade, para conferência.
// O site NÃO mostra preço (regra do TechAprovado); o preço fica só no arquivo, para revisão de ofertas.
//
// Documentação oficial: https://affiliate-program.amazon.com/creatorsapi/docs/en-us/get-started/using-curl
//  - Token (Brasil usa o endpoint NA, credencial v3.1): POST https://api.amazon.com/auth/o2/token
//    { grant_type: "client_credentials", client_id, client_secret, scope: "creatorsapi::default" } → access_token (1 h)
//  - Itens: POST https://creatorsapi.amazon/catalog/v1/getItems, cabeçalhos Authorization: Bearer <token>
//    e x-marketplace: www.amazon.com.br; corpo { itemIds, itemIdType: "ASIN", marketplace, partnerTag, resources }
//  - Ao ligar, confira na documentação os nomes exatos de "resources" de oferta (podem mudar).
import { readFileSync, writeFileSync } from 'node:fs';

const { AMAZON_CREATORS_CLIENT_ID: id, AMAZON_CREATORS_CLIENT_SECRET: secret } = process.env;
const TAG = 'techaprovad0b-20';
const MARKET = 'www.amazon.com.br';
if (!id || !secret) { console.log('Creators API ainda não conectada (faltam os segredos). Nada foi feito.'); process.exit(0); }

const tok = await fetch('https://api.amazon.com/auth/o2/token', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ grant_type: 'client_credentials', client_id: id, client_secret: secret, scope: 'creatorsapi::default' })
}).then(r => r.json());
if (!tok.access_token) { console.error('Token recusado:', JSON.stringify(tok).slice(0, 300)); process.exit(1); }

const asins = Object.keys(JSON.parse(readFileSync('data/produtos/indice.json', 'utf8')).produtos);
const resources = ['itemInfo.title', 'images.primary.large', 'offersV2.listings.availability', 'offersV2.listings.price', 'offersV2.listings.merchantInfo'];
const saida = { gerado: new Date().toISOString(), itens: {}, erros: [] };
for (let i = 0; i < asins.length; i += 10) {
  const lote = asins.slice(i, i + 10);
  const r = await fetch('https://creatorsapi.amazon/catalog/v1/getItems', {
    method: 'POST',
    headers: { Authorization: `Bearer ${tok.access_token}`, 'Content-Type': 'application/json', 'x-marketplace': MARKET },
    body: JSON.stringify({ itemIds: lote, itemIdType: 'ASIN', marketplace: MARKET, partnerTag: TAG, resources })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { saida.erros.push({ lote, status: r.status, resposta: JSON.stringify(j).slice(0, 300) }); continue; }
  for (const it of j.itemsResult?.items || j.items || []) saida.itens[it.asin || it.ASIN] = it;
  await new Promise(ok => setTimeout(ok, 1100)); // respeita o limite de 1 requisição por segundo
}
writeFileSync('data/amazon-itens.json', JSON.stringify(saida, null, 1));
console.log(`${Object.keys(saida.itens).length} itens gravados; ${saida.erros.length} lotes com erro.`);
