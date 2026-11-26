// TechAprovado — gera um link de afiliado da Shopee para qualquer página da Shopee (26/11/2026)
// Uso (GitHub Actions → "Link Shopee" → Run workflow, campo "url"). Padrão: página inicial.
// Usa a mutation oficial generateShortLink da Affiliate Open API (sem alterar o link gerado,
// Termos 2.2). Chaves nos segredos SHOPEE_APP_ID e SHOPEE_SECRET.
import { createHash } from 'node:crypto';
const { SHOPEE_APP_ID: id, SHOPEE_SECRET: secret } = process.env;
if (!id || !secret) { console.log('Segredos da Shopee não configurados.'); process.exit(0); }
const origem = process.env.URL_ORIGEM || 'https://shopee.com.br/';
if (!/^https:\/\/(www\.)?shopee\.com\.br\//.test(origem)) throw new Error('Só aceita páginas de shopee.com.br');
const query = `mutation { generateShortLink(input: { originUrl: ${JSON.stringify(origem)}, subIds: ["site", "lojasparceiras"] }) { shortLink } }`;
const payload = JSON.stringify({ query });
const ts = Math.floor(Date.now() / 1000);
const sig = createHash('sha256').update(id + ts + payload + secret).digest('hex');
const r = await fetch('https://open-api.affiliate.shopee.com.br/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `SHA256 Credential=${id}, Timestamp=${ts}, Signature=${sig}` },
  body: payload
});
const j = await r.json();
if (j.errors) throw new Error(JSON.stringify(j.errors).slice(0, 300));
console.log('LINK', origem, '=>', j.data.generateShortLink.shortLink);
