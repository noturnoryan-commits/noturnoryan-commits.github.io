// TechAprovado — busca candidatos na Shopee e no AliExpress pelas APIs oficiais de afiliados.
// Não altera o site: grava data/candidatos-lojas.json para revisão antes de ir para js/lojas.json.
//
// Segredos (GitHub → Settings → Secrets and variables → Actions):
//   SHOPEE_APP_ID, SHOPEE_SECRET                  (portal de afiliados da Shopee → Open API)
//   ALI_APP_KEY, ALI_APP_SECRET, ALI_TRACKING_ID  (AliExpress Open Platform / Portals)
// Variável opcional GUIAS: lista separada por vírgula (ex.: "mouse-2026.html,teclado-2026.html").

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { createHash, createHmac } from 'node:crypto';

const env = process.env;
const pausa = ms => new Promise(r => setTimeout(r, ms));

// ---------- 1. Produtos dos guias ----------
const decode = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const filtroGuias = (env.GUIAS || '').split(',').map(s => s.trim()).filter(Boolean);
const paginas = readdirSync('.').filter(f => f.endsWith('.html') && (!filtroGuias.length || filtroGuias.includes(f)));
const produtos = new Map();
for (const f of paginas) {
  const html = readFileSync(f, 'utf8');
  for (const card of html.match(/<article class="analysis-card[\s\S]*?<\/article>/g) || []) {
    const asin = (card.match(/data-produto="([A-Z0-9]+)"/) || [])[1];
    const nome = decode((card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '');
    if (asin && nome && !produtos.has(asin)) produtos.set(asin, { asin, nome, guia: f });
  }
}
console.log(`${produtos.size} produtos em ${paginas.length} páginas`);

// ---------- 2. Shopee (Affiliate Open API, GraphQL) ----------
// Assinatura: SHA256(AppId + Timestamp + Payload + Secret)
async function shopee(keyword) {
  const query = `{ productOfferV2(keyword: ${JSON.stringify(keyword)}, sortType: 2, page: 1, limit: 8) {
    nodes { itemId productName price sales ratingStar shopName shopId shopType productLink offerLink } } }`;
  const payload = JSON.stringify({ query });
  const ts = Math.floor(Date.now() / 1000);
  const sig = createHash('sha256').update(env.SHOPEE_APP_ID + ts + payload + env.SHOPEE_SECRET).digest('hex');
  const r = await fetch('https://open-api.affiliate.shopee.com.br/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `SHA256 Credential=${env.SHOPEE_APP_ID}, Timestamp=${ts}, Signature=${sig}` },
    body: payload
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors).slice(0, 300));
  // shopType: 1 = Shopee Mall (loja oficial), 2 = Indicado, 4 = Indicado+
  return (j.data?.productOfferV2?.nodes || []).map(n => ({
    titulo: n.productName, preco: n.price, vendas: n.sales, nota: n.ratingStar,
    loja: n.shopName, tipoLoja: n.shopType, url: n.offerLink, produto: n.productLink
  }));
}

// ---------- 3. AliExpress (TOP API: aliexpress.affiliate.product.query) ----------
// Assinatura: HMAC-SHA256(secret, chaves ordenadas concatenadas chave+valor), hex maiúsculo
async function aliexpress(keyword) {
  const p = {
    app_key: env.ALI_APP_KEY, method: 'aliexpress.affiliate.product.query', sign_method: 'sha256',
    timestamp: String(Date.now()), v: '2.0', format: 'json',
    keywords: keyword, target_currency: 'BRL', target_language: 'PT', ship_to_country: 'BR',
    tracking_id: env.ALI_TRACKING_ID, page_size: '8', sort: 'LAST_VOLUME_DESC'
  };
  const base = Object.keys(p).sort().map(k => k + p[k]).join('');
  p.sign = createHmac('sha256', env.ALI_APP_SECRET).update(base).digest('hex').toUpperCase();
  const r = await fetch('https://api-sg.aliexpress.com/sync?' + new URLSearchParams(p));
  const j = await r.json();
  const res = j.aliexpress_affiliate_product_query_response?.resp_result;
  if (!res) throw new Error(JSON.stringify(j).slice(0, 300));
  return (res.result?.products?.product || []).map(n => ({
    titulo: n.product_title, preco: n.target_sale_price, vendas: n.lastest_volume, avaliacao: n.evaluate_rate,
    loja: n.shop_name, url: n.promotion_link, produto: n.product_detail_url
  }));
}

// ---------- 4. Rodar ----------
const temShopee = env.SHOPEE_APP_ID && env.SHOPEE_SECRET;
const temAli = env.ALI_APP_KEY && env.ALI_APP_SECRET && env.ALI_TRACKING_ID;
if (!temShopee && !temAli) { console.error('Nenhuma chave configurada.'); process.exit(1); }

// Junta com o arquivo anterior: rodar guia por guia não apaga o que já foi buscado.
const ARQ = 'data/candidatos-lojas.json';
const saida = existsSync(ARQ) ? JSON.parse(readFileSync(ARQ, 'utf8')) : { produtos: {} };
saida.gerado = new Date().toISOString();
// A Shopee às vezes responde "System Error 10000" quando recebe muitas chamadas: tenta de novo com espera maior.
async function comRepeticao(fn, tentativas = 4) {
  for (let i = 1; ; i++) {
    try { return await fn(); } catch (e) { if (i >= tentativas || !/10000|System Error|429|fetch failed/.test(String(e.message || e))) throw e; await pausa(4000 * i); }
  }
}
for (const p of produtos.values()) {
  const item = { nome: p.nome, guia: p.guia, buscado: new Date().toISOString().slice(0, 10) };
  if (temShopee) { try { item.shopee = await comRepeticao(() => shopee(p.nome)); } catch (e) { item.shopeeErro = String(e.message || e); } await pausa(2000); }
  if (temAli) { try { item.aliexpress = await aliexpress(p.nome); } catch (e) { item.aliexpressErro = String(e.message || e); } await pausa(1200); }
  saida.produtos[p.asin] = item;
}
mkdirSync('data', { recursive: true });
writeFileSync(ARQ, JSON.stringify(saida, null, 1));
const erros = [...produtos.keys()].map(a => saida.produtos[a]).filter(x => x.shopeeErro || x.aliexpressErro).length;
console.log(`Gravado data/candidatos-lojas.json (${erros} produtos com erro)`);
