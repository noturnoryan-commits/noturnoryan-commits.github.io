/* Ofertas da home e de Últimas ofertas.
   Uma entrada por loja. Use o mesmo productKey somente para variante idêntica.
   expires = último dia em Brasília; ends = hora exata opcional.
   Ofertas sem prazo público recebem uma data editorial curta de reconferência.
   Só cadastrar lojas com afiliação aprovada e link validado.
   O site não publica valores numéricos. */
const AFFILIATE_TAG = "techaprovad0b-20";
const AWIN_AFFILIATE_ID = "3148451";
const AWIN_KABUM_ID = "17729";
const DEALS_CHECKED = "26/11/2026";
const DEALS = [
  // Mercado Livre — Central de Afiliados, conferidas em 26/11/2026 (20% a 49% OFF, nota 4,8+ ; link meli.la).
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2JXG9wX", "productKey": "ml-MLB79759975", "title": "JBL PartyBox Encore Essential 2", "img": "https://http2.mlstatic.com/D_NQ_NP_732031-MLA116606769276_092026-F.jpg", "guide": "caixadesom-2026.html#produto-11", "guideName": "Caixa de som", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2UR7xKP", "productKey": "amazon-B09B8VGCR8", "title": "Echo Dot (5ª geração)", "img": "https://http2.mlstatic.com/D_NQ_NP_814549-MLA118334012041_092026-F.jpg", "guide": "echo-alexa-2026.html#produto-1", "guideName": "Echo (Alexa)", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2BaeXnS", "productKey": "ml-MLB61655019", "title": "Galaxy S25 FE 128 GB", "img": "https://http2.mlstatic.com/D_NQ_NP_993303-MLA96666133268_112025-F.jpg", "guide": "galaxy-s-2026.html#produto-1", "guideName": "Celular", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2gMAY3D", "productKey": "ml-MLB52878677", "title": "Air Fryer Philips Walita Série 1000 XL 6,2 L", "img": "https://http2.mlstatic.com/D_NQ_NP_662109-MLA88321463845_072025-F.jpg", "guide": "airfryer-2026.html#produto-7", "guideName": "Air Fryer", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/1aTELdE", "productKey": "ml-MLB43419989", "title": "Air Fryer Oven Philco PAF16A 16 L", "img": "https://http2.mlstatic.com/D_NQ_NP_682420-MLA99957851351_112025-F.jpg", "guide": "airfryer-2026.html", "guideName": "Air Fryer", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2x6PdJg", "productKey": "ml-MLB55237000", "title": "JBL Boombox 4", "img": "https://http2.mlstatic.com/D_NQ_NP_966884-MLA118535139627_092026-F.jpg", "guide": "caixadesom-2026.html", "guideName": "Caixa de som", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2sqHJHo", "productKey": "ml-MLB65833150", "title": "Fone JBL Tune 530BT", "img": "https://http2.mlstatic.com/D_NQ_NP_673702-MLA106785726136_022026-F.jpg", "guide": "foneoverear-2026.html", "guideName": "Fone Over-Ear", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/1j4sJjZ", "productKey": "ml-MLB66104173", "title": "Smart TV TCL 65\" QLED 4K T6C", "img": "https://http2.mlstatic.com/D_NQ_NP_810221-MLA115949427379_082026-F.jpg", "guide": "smarttv-2026.html", "guideName": "Smart TV", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/31hyEMt", "productKey": "ml-MLB43554996", "title": "Smart TV AOC 40\" Full HD Roku", "img": "https://http2.mlstatic.com/D_NQ_NP_620135-MLA116583936713_082026-F.jpg", "guide": "smarttv-2026.html", "guideName": "Smart TV", "expires": "2026-11-28"},
  {"store": "mercadolivre", "affiliate": true, "url": "https://meli.la/1PexBUv", "productKey": "ml-MLB48954912", "title": "Smart TV Samsung 32\" H5000F", "img": "https://http2.mlstatic.com/D_NQ_NP_971532-MLA122380966479_112026-F.jpg", "guide": "smarttv-2026.html", "guideName": "Smart TV", "expires": "2026-11-28"},
  // Black Friday 2026 — conferidas uma a uma em 25/11/2026 (vendido e entregue pela Amazon, desconto de 21% a 59%).
  {"store": "amazon", "asin": "B0HJB6V8LM", "productKey": "amazon-B0HJB6V8LM", "title": "Galaxy S26 FE 128 GB", "img": "https://m.media-amazon.com/images/I/51VAnrm9LXL._AC_UL480_.jpg", "guide": "galaxy-s26-fe-vale-a-pena-black-friday-2026.html", "guideName": "Celular", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0C2RS4ZG6", "productKey": "amazon-B0C2RS4ZG6", "title": "Echo Spot", "img": "https://m.media-amazon.com/images/I/718KFI+hBOL._AC_UL480_.jpg", "guide": "echo-alexa-2026.html#produto-2", "guideName": "Echo (Alexa)", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B09B8VGCR8", "productKey": "amazon-B09B8VGCR8", "title": "Echo Dot (5ª geração)", "img": "https://m.media-amazon.com/images/I/61evEYmxBZL._AC_UL480_.jpg", "guide": "echo-alexa-2026.html#produto-1", "guideName": "Echo (Alexa)", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0DVK166SV", "productKey": "amazon-B0DVK166SV", "title": "Fire TV Stick HD (modelo mais recente)", "img": "https://m.media-amazon.com/images/I/61EwP1HwXlL._AC_UL480_.jpg", "guide": "fire-tv-stick-2026.html#produto-3", "guideName": "Fire TV Stick", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0DKLPWQKS", "productKey": "amazon-B0DKLPWQKS", "title": "Echo Dot Max", "img": "https://m.media-amazon.com/images/I/71vf2e-+XtL._AC_UL480_.jpg", "guide": "echo-alexa-2026.html#produto-3", "guideName": "Echo (Alexa)", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0F7T2Y46Y", "productKey": "amazon-B0F7T2Y46Y", "title": "JBL Flip 7", "img": "https://m.media-amazon.com/images/I/61S6CABfB7L._AC_UL480_.jpg", "guide": "caixadesom-2026.html#produto-4", "guideName": "Caixa de som", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0CX8MT2M2", "productKey": "amazon-B0CX8MT2M2", "title": "Kindle Colorsoft 16 GB", "img": "https://m.media-amazon.com/images/I/71lORNHYWLL._AC_UL480_.jpg", "guide": "kindle-2026.html#produto-5", "guideName": "Kindle", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0DYC2GV1Z", "productKey": "amazon-B0DYC2GV1Z", "title": "Echo Show 8 (geração mais recente)", "img": "https://m.media-amazon.com/images/I/71iIMpnRXEL._AC_UL480_.jpg", "guide": "echo-alexa-2026.html#produto-5", "guideName": "Echo (Alexa)", "expires": "2026-11-28"},
  {"store": "amazon", "asin": "B0G4SMGD8C", "productKey": "amazon-B0G4SMGD8C", "title": "Kindle 16 GB (modelo mais recente)", "img": "https://m.media-amazon.com/images/I/71WrUCe6G1L._AC_UL480_.jpg", "guide": "kindle-2026.html#produto-2", "guideName": "Kindle", "expires": "2026-11-28"},
  // Shopee — lojas oficiais das marcas, desconto de 21% a 79% informado pela API oficial de afiliados em 26/11/2026.
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/4VeeeqCqI2", "productKey": "shopee-B095YZPJTR", "title": "Oster 2Day com copo térmico", "img": "https://cf.shopee.com.br/file/sg-11134201-8258n-muupujvfxqmhb9", "guide": "cafeteira-2026.html#produto-3", "guideName": "Cafeteira", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/4fy4nDRB2t", "productKey": "shopee-B09ZHD2YXP", "title": "Philips Walita Superautomática Série 1200", "img": "https://cf.shopee.com.br/file/sg-11134201-7rd6d-lx01cp8p7v4wb1", "guide": "cafeteira-2026.html#produto-15", "guideName": "Cafeteira", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/7fbgMlabTH", "productKey": "shopee-B0DB1753RZ", "title": "Soundcore Select 4 Go", "img": "https://cf.shopee.com.br/file/br-11134207-820le-mvequua94zya1a", "guide": "caixadesom-2026.html#produto-1", "guideName": "Caixa de Som Bluetooth", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/3qOxnvopGz", "productKey": "shopee-B07XLML2YS", "title": "TP-Link Tapo C200", "img": "https://cf.shopee.com.br/file/br-11134207-820l8-mq5aj150mgap6d", "guide": "cameraseguranca-2026.html#produto-2", "guideName": "Câmera de Segurança Wi-Fi", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/1qdtQIzYgU", "productKey": "shopee-B098TVZ6TS", "title": "TP-Link Tapo C320WS", "img": "https://cf.shopee.com.br/file/br-11134207-820ly-mlf7ofj6ton83e", "guide": "cameraseguranca-2026.html#produto-8", "guideName": "Câmera de Segurança Wi-Fi", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/8AXwxtCGHl", "productKey": "shopee-B083V41T6M", "title": "TP-Link Tapo C100", "img": "https://cf.shopee.com.br/file/br-11134207-820ls-mq5aj15aq9dt49", "guide": "cameraseguranca-2026.html#produto-1", "guideName": "Câmera de Segurança Wi-Fi", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/60TSNvORAE", "productKey": "shopee-B095CLQ1PT", "title": "TP-Link Tapo C210", "img": "https://cf.shopee.com.br/file/br-11134207-820m4-msbe9fthq2h106", "guide": "cameraseguranca-2026.html#produto-4", "guideName": "Câmera de Segurança Wi-Fi", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/7pv6XNQ4FM", "productKey": "shopee-B0CM6FSPY3", "title": "UGREEN Vertical Sem Fio", "img": "https://cf.shopee.com.br/file/cn-11134207-7ras8-m627gkzv16oh69", "guide": "mouse-2026.html#produto-20", "guideName": "Mouse", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/9zzbC3aBI2", "productKey": "shopee-B0CCC27GWY", "title": "Positivo Vision C14", "img": "https://cf.shopee.com.br/file/br-11134207-81ztc-mjsrp8muzjlt58", "guide": "notebook-2026.html#produto-1", "guideName": "Notebook", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/6VPizqNt4V", "productKey": "shopee-B0DKQQ6Z7Q", "title": "TP-Link Tapo DL110", "img": "https://cf.shopee.com.br/file/br-11134207-820lw-mnxa6tcmtr0i3a", "guide": "fechaduradigital-2026.html#produto-12", "guideName": "Fechadura Digital", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/8VAnNeZ6oB", "productKey": "shopee-B0CRTN7C8C", "title": "Soundcore P30i", "img": "https://cf.shopee.com.br/file/br-11134207-820lx-mvesdnj13jsy42", "guide": "fonebluetooth-2026.html#produto-5", "guideName": "Fone Bluetooth", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/3g5XcmmdZZ", "productKey": "shopee-B0CQXHC5FQ", "title": "Soundcore P40i", "img": "https://cf.shopee.com.br/file/br-11134207-820ma-mverpdkgpddvb8", "guide": "fonebluetooth-2026.html#produto-7", "guideName": "Fone Bluetooth", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/BVfSNm5ji", "productKey": "shopee-B0D2XRXNGY", "title": "Soundcore V20i", "img": "https://cf.shopee.com.br/file/br-11134207-820lv-mvequua97t36d6", "guide": "fonebluetooth-2026.html#produto-11", "guideName": "Fone Bluetooth", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/9zzbASWWAg", "productKey": "shopee-B0CRT6HQ82", "title": "Soundcore Sport X20", "img": "https://cf.shopee.com.br/file/br-11134207-820m4-mverpdkhohky5e", "guide": "fonebluetooth-2026.html#produto-12", "guideName": "Fone Bluetooth", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/2LaA2QXpNh", "productKey": "shopee-B0CFZST5DV", "title": "QCY H3 ANC", "img": "https://cf.shopee.com.br/file/br-11134207-820lm-mn5hbfurpgqs6f", "guide": "foneoverear-2026.html#produto-5", "guideName": "Fone Over-Ear", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/6fj9COYvhO", "productKey": "shopee-B0CQXMXJC5", "title": "Soundcore Q20i", "img": "https://cf.shopee.com.br/file/br-11134207-820ly-mvesdnj0xxj690", "guide": "foneoverear-2026.html#produto-6", "guideName": "Fone Over-Ear", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/Lp5fhi0Uk", "productKey": "shopee-B0999PPKHM", "title": "Oster New Osterizer Clássico", "img": "https://cf.shopee.com.br/file/sg-11134201-8258n-mvq085mp42rmc5", "guide": "liquidificador-2026.html#produto-4", "guideName": "Liquidificador", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/2gD0S1tpj9", "productKey": "shopee-B09J1L99K9", "title": "Cadence Zoop Contrast (2 jarras)", "img": "https://cf.shopee.com.br/file/sg-11134201-825ae-mv2jkezncz5tc5", "guide": "liquidificador-2026.html#produto-11", "guideName": "Liquidificador", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/gRw4MfO8l", "productKey": "shopee-B0DPNHNFPY", "title": "Oster Blender Power To Go", "img": "https://cf.shopee.com.br/file/sg-11134201-8257u-msv7n8iv9fyh69", "guide": "liquidificador-2026.html#produto-12", "guideName": "Liquidificador", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/9073xDrrxw", "productKey": "shopee-B01MTB55WH", "title": "Anker soundcore 2", "img": "https://cf.shopee.com.br/file/br-11134207-820lu-mvesdnj0zc3m70", "guide": "caixadesom-2026.html#produto-2", "guideName": "Caixa de Som Bluetooth", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/6L6Ima4Ulx", "productKey": "shopee-B0BQJVKVQR", "title": "TP-Link Tapo C500", "img": "https://cf.shopee.com.br/file/br-11134207-820l6-mqhniupozv2814", "guide": "cameraseguranca-2026.html#produto-9", "guideName": "Câmera de Segurança Wi-Fi", "expires": "2026-11-28"},
  {"store": "shopee", "affiliate": true, "url": "https://s.shopee.com.br/9KjuM71OuK", "productKey": "shopee-B0F4RNSJL3", "title": "TP-Link Tapo C530WS", "img": "https://cf.shopee.com.br/file/br-11134207-820m8-mnxa6tcxk16qaf", "guide": "cameraseguranca-2026.html#produto-12", "guideName": "Câmera de Segurança Wi-Fi", "expires": "2026-11-28"}
];

const DEAL_STORES = Object.freeze({
  amazon: { name: "Amazon", affiliate: true, url: d => /^[A-Z0-9]{10}$/.test(d.asin) ? 'https://www.amazon.com.br/dp/' + d.asin + '?tag=' + AFFILIATE_TAG : null },
  kabum: { name: "KaBuM!", affiliate: true, url: d => /^\d+$/.test(d.kabumId) ? 'https://www.awin1.com/cread.php?awinmid=' + AWIN_KABUM_ID + '&awinaffid=' + AWIN_AFFILIATE_ID + '&ued=' + encodeURIComponent('https://www.kabum.com.br/produto/' + d.kabumId) : null },
  shopee: { name: "Shopee", url: d => dealStoreUrl(d.url, ['shopee.com.br','www.shopee.com.br','s.shopee.com.br']) },
  mercadolivre: { name: "Mercado Livre", short: "M. Livre", url: d => dealStoreUrl(d.url, ['meli.la']) },
  aliexpress: { name: "AliExpress", short: "AliExpress", url: d => dealStoreUrl(d.url, ['s.click.aliexpress.com']) }
});
function dealStoreUrl(value, hosts) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password && !url.port && hosts.includes(url.hostname) ? url.href : null; } catch { return null; }
}
function activeDeals(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const date = Object.fromEntries(parts.map(({type,value}) => [type,value]));
  const today = [date.year,date.month,date.day].join('-');
  const cards = new Map();
  for (const d of DEALS) {
    const key = d.store || 'amazon';
    if (!Object.hasOwn(DEAL_STORES,key) || d.expires < today || (d.ends && !(Date.parse(d.ends) > +now))) continue;
    const store = DEAL_STORES[key], url = store.url(d);
    if (!url || !(store.affiliate || d.affiliate === true)) continue;
    const product = d.productKey || key + ':' + (d.asin || d.kabumId || url);
    if (!cards.has(product)) cards.set(product, {...d, offers: []});
    const {offers} = cards.get(product);
    if (!offers.some(o => o.key === key)) offers.push({key, name:store.name, short:store.short, url, affiliate:store.affiliate || d.affiliate === true});
  }
  return [...cards.values()];
}
function dealCardHtml(d) {
  const e = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const relation = o => o.affiliate ? 'noopener sponsored' : 'noopener';
  // Dev 19/11: lojas em 2 colunas; com número ímpar, o último botão de loja ocupa a linha toda;
  // "Ver guia" sempre embaixo, na linha toda. Texto do botão sempre em uma linha.
  const odd = d.offers.length % 2 === 1;
  const buttons = d.offers.map((o, i) => { const full = odd && i === d.offers.length - 1; return `<a class="deal-btn deal-btn-buy deal-btn-${o.key}${full ? ' deal-btn-full' : ''}" href="${e(o.url)}" target="_blank" rel="${relation(o)}" aria-label="${e(d.title)}: ver preço ${/^(Mercado Livre|AliExpress)$/.test(o.name) ? "no" : "na"} ${e(o.name)}"><span class="deal-btn-long">Ver ${/^(Mercado Livre|AliExpress)$/.test(o.name) ? "no" : "na"} </span><span class="deal-name-long">${e(o.name)}</span><span class="deal-name-short">${e(o.short || o.name)}</span> <span aria-hidden="true">↗</span></a>`; }).join("");
  const first = d.offers[0];
  return `<article class="deal-card">
    <a class="deal-buy" href="${e(first.url)}" target="_blank" rel="${relation(first)}" tabindex="-1" aria-hidden="true">
      <img class="deal-img" src="${e(d.img)}" alt="" width="480" height="480" loading="lazy" decoding="async">
      <span class="deal-info"><span class="deal-cat">${e(d.guideName)}</span><span class="deal-title">${e(d.title)}</span></span>
    </a>
    <div class="deal-actions">
      ${buttons}<a class="deal-btn deal-btn-guide deal-btn-full" href="${e(d.guide)}" aria-label="Ver o guia de ${e(d.guideName)}">Ver guia</a>
    </div></article>`;
}
