// TechAprovado — lista os programas da Awin em que o TechAprovado está aprovado (26/11/2026)
//
// Roda no GitHub (Actions), só na mão: Actions → "Programas Awin" → Run workflow.
// Mostra no log, para cada anunciante aprovado: nome, site, se aceita deeplink,
// logo oficial fornecido pela Awin, faixa de comissão e prazo de validação.
// Grava o resumo público em data/awin-programas.json (sem token, sem dados pessoais).
// A chave vem do segredo AWIN_API_TOKEN. Documentação:
// https://help.awin.com/apidocs/programmes  e  /programmedetails
import { writeFile, mkdir } from 'node:fs/promises';

const PUBLISHER_ID = '3148451';
const token = process.env.AWIN_API_TOKEN;
if (!token) { console.log('AWIN_API_TOKEN não configurado.'); process.exit(0); }
const api = async path => {
  const r = await fetch(`https://api.awin.com${path}${path.includes('?') ? '&' : '?'}accessToken=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) throw new Error(`Awin HTTP ${r.status} em ${path.split('?')[0]}`);
  return r.json();
};
const programas = await api(`/publishers/${PUBLISHER_ID}/programmes?relationship=joined`);
const saida = [];
for (const p of programas) {
  let d = {};
  try { d = await api(`/publishers/${PUBLISHER_ID}/programmedetails?advertiserId=${p.id}&relationship=joined`); } catch (e) { d = { erro: e.message }; }
  const item = {
    id: p.id, nome: p.name, site: p.displayUrl, regiao: p.primaryRegion?.countryCode,
    deeplink: p.deeplinkEnabled, logo: p.logoUrl, dominios: (p.validDomains || []).map(v => v.domain),
    comissao: d.commissionRange || null, kpi: d.kpi || null
  };
  saida.push(item);
  console.log('PROGRAMA', JSON.stringify(item));
}
await mkdir('data', { recursive: true });
await writeFile('data/awin-programas.json', JSON.stringify({ conferido: new Date().toISOString().slice(0, 10), programas: saida }, null, 1));
console.log(`${saida.length} programa(s) aprovado(s) na Awin.`);
