// TechAprovado — token de usuário do Mercado Livre (OAuth, só leitura).
// O refresh token do ML é de uso único: a cada uso vem um novo. Ele fica guardado CRIPTOGRAFADO
// em data/ml-token.enc (AES-256-GCM, chave derivada do segredo ML_SECRET, que só o GitHub tem).
// Sem o ML_SECRET, o arquivo não serve para nada.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

const ARQ = 'data/ml-token.enc';
const REDIRECT = 'https://techaprovado.com.br/';
const { ML_APP_ID: id, ML_SECRET: secret } = process.env;
const chave = () => createHash('sha256').update(secret + '|techaprovado-ml-token').digest();

function salvar(refresh) {
  const iv = randomBytes(12); const c = createCipheriv('aes-256-gcm', chave(), iv);
  const enc = Buffer.concat([c.update(refresh, 'utf8'), c.final()]);
  mkdirSync('data', { recursive: true });
  writeFileSync(ARQ, Buffer.concat([iv, c.getAuthTag(), enc]).toString('base64') + '\n');
}
function ler() {
  const b = Buffer.from(readFileSync(ARQ, 'utf8').trim(), 'base64');
  const d = createDecipheriv('aes-256-gcm', chave(), b.subarray(0, 12)); d.setAuthTag(b.subarray(12, 28));
  return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString('utf8');
}
async function pedir(params) {
  const r = await fetch('https://api.mercadolibre.com/oauth/token', { method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({ client_id: id, client_secret: secret, ...params }) });
  const j = await r.json();
  if (!j.access_token) throw new Error('OAuth ' + r.status + ': ' + (j.message || j.error || 'sem token'));
  if (j.refresh_token) salvar(j.refresh_token);
  return j.access_token;
}
// Token de usuário: com ML_CODE (primeira vez) troca o código; depois usa o refresh guardado.
export async function tokenUsuario() {
  if (!id || !secret) throw new Error('Faltam ML_APP_ID/ML_SECRET');
  const code = (process.env.ML_CODE || '').trim();
  if (code) return pedir({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT });
  if (!existsSync(ARQ)) throw new Error('Ainda não autorizado: rode "Autorizar Mercado Livre" com o código.');
  return pedir({ grant_type: 'refresh_token', refresh_token: ler() });
}
