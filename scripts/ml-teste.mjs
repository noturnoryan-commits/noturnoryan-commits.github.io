// Teste da API do Mercado Livre: pega token de app (client_credentials) e testa 3 consultas.
// Não imprime o token nem as chaves.
const { ML_APP_ID: id, ML_SECRET: secret } = process.env;
if (!id || !secret) { console.log('Faltam ML_APP_ID/ML_SECRET'); process.exit(1); }
const t = await fetch('https://api.mercadolibre.com/oauth/token', { method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
  body: new URLSearchParams({ grant_type: 'client_credentials', client_id: id, client_secret: secret }) });
const tok = await t.json();
console.log('token:', t.status, tok.access_token ? 'ok' : JSON.stringify(tok).slice(0, 200));
const H = tok.access_token ? { Authorization: 'Bearer ' + tok.access_token } : {};
for (const u of ['https://api.mercadolibre.com/products/search?status=active&site_id=MLB&q=Logitech%20G203%20Lightsync',
                 'https://api.mercadolibre.com/sites/MLB/search?q=Logitech%20G203%20Lightsync&limit=3']) {
  const r = await fetch(u, { headers: H }); const j = await r.json().catch(() => ({}));
  console.log('\n', r.status, u.split('?')[0]);
  const res = j.results || [];
  console.log('resultados:', res.length, JSON.stringify(res.slice(0, 3).map(x => ({ id: x.id, nome: x.name || x.title, status: x.status, loja: x.official_store_id, catalogo: x.catalog_product_id }))).slice(0, 600));
  if (!res.length) console.log(JSON.stringify(j).slice(0, 300));
  if (u.includes('products/search') && res[0]) {
    const r2 = await fetch(`https://api.mercadolibre.com/products/${res[0].id}/items`, { headers: H }); const j2 = await r2.json().catch(() => ({}));
    console.log('\n', r2.status, 'products/{id}/items', JSON.stringify((j2.results || []).slice(0, 3).map(x => ({ item: x.item_id, seller: x.seller_id, loja: x.official_store_id, cond: x.condition, preco: x.price }))).slice(0, 500), !j2.results ? JSON.stringify(j2).slice(0, 300) : '');
  }
}
