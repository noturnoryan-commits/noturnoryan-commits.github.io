// Teste da API do Mercado Livre com token de usuário: quais consultas a conta pode usar.
import { tokenUsuario } from './ml-auth.mjs';
const H = { Authorization: 'Bearer ' + await tokenUsuario() };
const get = async u => { const r = await fetch('https://api.mercadolibre.com' + u, { headers: H }); let j = {}; try { j = await r.json(); } catch {} return [r.status, j]; };
const [s1, p] = await get('/products/MLB16211422');
console.log('/products/{id}', s1, JSON.stringify({ nome: p.name, status: p.status, bbw: p.buy_box_winner && { item: p.buy_box_winner.item_id, seller: p.buy_box_winner.seller_id, loja: p.buy_box_winner.official_store_id, cond: p.buy_box_winner.condition, preco: p.buy_box_winner.price, original: p.buy_box_winner.original_price } , link: p.permalink }).slice(0, 500));
const item = p.buy_box_winner?.item_id;
if (item) { const [s2, it] = await get('/items/' + item); console.log('/items/{id}', s2, JSON.stringify({ titulo: it.title, cond: it.condition, loja: it.official_store_id, seller: it.seller_id, preco: it.price, original: it.original_price, link: it.permalink }).slice(0, 400)); }
const sid = p.buy_box_winner?.seller_id;
if (sid) { const [s3, u] = await get('/users/' + sid); console.log('/users/{id}', s3, u.nickname, u.seller_reputation?.level_id, u.seller_reputation?.power_seller_status); }
for (const u of ['/highlights/MLB/category/MLB1648', '/sites/MLB/search?q=g203&limit=1', '/products/MLB16211422/items']) { const [s] = await get(u); console.log(u, s); }
