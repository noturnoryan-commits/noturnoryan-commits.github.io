// Troca o código de autorização pelo token e testa as consultas que precisam da conta.
import { tokenUsuario } from './ml-auth.mjs';
const tok = await tokenUsuario();
const H = { Authorization: 'Bearer ' + tok };
console.log('Autorização: ok (refresh token guardado criptografado)');
const ps = await fetch('https://api.mercadolibre.com/products/search?status=active&site_id=MLB&q=Logitech%20G203%20Lightsync%20Preto', { headers: H }).then(r => r.json());
const p = (ps.results || [])[0];
console.log('catálogo:', p ? p.id + ' ' + p.name : 'nada');
if (p) {
  const r = await fetch(`https://api.mercadolibre.com/products/${p.id}/items`, { headers: H }); const j = await r.json();
  console.log('vendedores:', r.status, JSON.stringify((j.results || []).slice(0, 3).map(x => ({ item: x.item_id, seller: x.seller_id, loja: x.official_store_id, cond: x.condition }))), j.results ? '' : JSON.stringify(j).slice(0, 200));
  const s = (j.results || [])[0];
  if (s) { const u = await fetch(`https://api.mercadolibre.com/users/${s.seller_id}`, { headers: H }).then(r => r.json()); console.log('reputação:', u.seller_reputation?.level_id, u.seller_reputation?.power_seller_status); }
}
const busca = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=Logitech%20G203&limit=2', { headers: H });
console.log('busca geral:', busca.status);
