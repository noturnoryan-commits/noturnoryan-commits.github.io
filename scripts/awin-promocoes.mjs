// TechAprovado — cupons e promoções da KaBuM! pela API da Awin (13/11/2026)
//
// Roda no GitHub (Actions), uma vez por dia. Busca na Awin Promotions API as
// promoções e cupons ATIVOS da KaBuM! liberados para o nosso ID de publisher e grava
// só os dados públicos em data/kabum-promocoes.json.
//
// A chave da API NUNCA fica neste arquivo: ela vem do segredo AWIN_API_TOKEN do
// repositório (GitHub → Settings → Secrets and variables → Actions).
// Sem a chave, o script avisa e termina sem erro (não apaga o arquivo existente).
//
// Regra da KaBuM! no programa: só vale cupom enviado pela Awin. Esta é a fonte oficial.
// Documentação: https://help.awin.com/apidocs/promotions.md

import { writeFile, mkdir, readFile } from 'node:fs/promises';

const PUBLISHER_ID = '3148451';   // ID de publisher do TechAprovado na Awin
const KABUM_ADVERTISER_ID = 17729; // "KaBuM BR" na Awin
const OUT = 'data/kabum-promocoes.json';

const token = process.env.AWIN_API_TOKEN;
if (!token) {
  console.log('AWIN_API_TOKEN não configurado: nada foi buscado. Adicione o segredo no GitHub.');
  process.exit(0);
}

async function page(n) {
  const res = await fetch(`https://api.awin.com/publisher/${PUBLISHER_ID}/promotions?accessToken=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      filters: {
        advertiserIds: [KABUM_ADVERTISER_ID],
        membership: 'joined',
        regionCodes: ['BR'],
        status: 'active',
        type: 'all'
      },
      pagination: { page: n, pageSize: 200 }
    })
  });
  if (!res.ok) {
    // Não mostra a resposta inteira para não vazar nada no log público.
    throw new Error(`Awin respondeu HTTP ${res.status}. Confira se o token é válido e se a KaBuM! aprovou o TechAprovado.`);
  }
  const body = await res.json();
  return Array.isArray(body) ? body : (body.data || []);
}

const all = [];
for (let n = 1; n <= 20; n++) {
  const items = await page(n);
  all.push(...items);
  if (items.length < 200) break;
}

const today = new Date().toISOString().slice(0, 10);
const promos = all
  .filter(p => !p.endDate || String(p.endDate).slice(0, 10) >= today)
  .map(p => ({
    id: p.promotionId,
    tipo: p.type === 'voucher' ? 'cupom' : 'promocao',
    titulo: p.title || '',
    descricao: p.description || '',
    regras: p.terms || '',
    inicio: p.startDate || null,
    fim: p.endDate || null,
    cupom: p.voucher && p.voucher.code ? p.voucher.code : null,
    exclusivo: Boolean(p.voucher && p.voucher.exclusive),
    link: p.urlTracking || null // link rastreado da Awin, já com o nosso ID
  }))
  .sort((a, b) => String(a.fim || '9999').localeCompare(String(b.fim || '9999')));

const out = {
  loja: 'KaBuM!',
  fonte: 'Awin Promotions API',
  atualizado: new Date().toISOString(),
  total: promos.length,
  promocoes: promos
};

// Só regrava se o conteúdo mudou (evita commit diário à toa).
let old = null;
try { old = JSON.parse(await readFile(OUT, 'utf8')); } catch {}
if (old && JSON.stringify(old.promocoes) === JSON.stringify(out.promocoes)) {
  console.log(`Sem mudanças (${promos.length} promoções/cupons).`);
  process.exit(0);
}
await mkdir('data', { recursive: true });
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`Gravado ${OUT}: ${promos.length} promoções/cupons ativos da KaBuM!.`);
