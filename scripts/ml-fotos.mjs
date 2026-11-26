// Imprime nome e foto principal de produtos do catálogo do ML (API oficial), para montar os cards de oferta.
import { tokenUsuario } from './ml-auth.mjs';
const H = { Authorization: 'Bearer ' + await tokenUsuario() };
for (const id of (process.env.IDS || '').split(',').filter(Boolean)) {
  const r = await fetch('https://api.mercadolibre.com/products/' + id, { headers: H }); const p = await r.json().catch(() => ({}));
  console.log('FOTO', id, (p.pictures || [])[0]?.url || '-', '|', p.name || r.status);
}
