/* Ofertas da home e de Últimas ofertas.
   Uma entrada por loja. Use o mesmo productKey somente para variante idêntica.
   expires = último dia em Brasília; ends = hora exata opcional.
   Ofertas sem prazo público recebem uma data editorial curta de reconferência.
   Só cadastrar lojas com afiliação aprovada e link validado.
   O site não publica valores numéricos. */
const AFFILIATE_TAG = "techaprovad0b-20";
const AWIN_AFFILIATE_ID = "3148451";
const AWIN_KABUM_ID = "17729";
const DEALS_CHECKED = "18/11/2026";
const DEALS = [
  { store: "kabum", kabumId: 112948, productKey: "logitech-910-005793", title: "Mouse Gamer Logitech G203 Lightsync RGB", img: "https://images.kabum.com.br/produtos/fotos/112948/mouse-gamer-logitech-g203-lightsync-rgb-efeito-de-ondas-de-cores-6-botoes-programaveis-e-ate-8-000-dpi-preto-910-005793_1781792020_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-24", ends: "2026-11-24T10:00:00-03:00" },
  { store: "kabum", kabumId: 20868, title: "Combo Teclado e Mouse Logitech MK120", img: "https://images.kabum.com.br/produtos/fotos/20868/teclado-e-mouse-logitech-mk120-resistente-a-agua-1000dpi-preto-abnt2-920-004429_1614630286_g.jpg", guide: "kit-teclado-mouse-2026.html", guideName: "Kit Teclado e Mouse", expires: "2026-11-19" },
  {"store": "amazon","title": "Apple AirPods 4","guide": "fonebluetooth-2026.html#produto-4","guideName": "Fone Bluetooth","expires": "2026-11-19","asin": "B0DGM4T4H8","img": "https://m.media-amazon.com/images/I/415J3RCvdKL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Apple iPhone 16e 128 GB","guide": "smartphone-2026.html#produto-6","guideName": "Celular","expires": "2026-11-19","asin": "B0DXR6MKR8","img": "https://m.media-amazon.com/images/I/41Zguc9CziL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Baseus Super Si 20 W","guide": "carregador-celular-2026.html#produto-2","guideName": "Carregador de celular","expires": "2026-11-19","asin": "B00MFDJSUI","img": "https://m.media-amazon.com/images/I/41hiI3HMIrL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Canon Mega Tank G3110","guide": "impressora-2026.html#produto-2","guideName": "Impressora","expires": "2026-11-19","asin": "B07G5TZSYJ","img": "https://m.media-amazon.com/images/I/515m44f3CWL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Dolce Gusto Genio S Plus","guide": "cafeteira-2026.html#produto-9","guideName": "Cafeteira","expires": "2026-11-19","asin": "B08J89FSXX","img": "https://m.media-amazon.com/images/I/51qqanOydXL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Echo Spot","guide": "echo-alexa-2026.html#produto-2","guideName": "Echo (Alexa)","expires": "2026-11-19","asin": "B0C2RS4ZG6","img": "https://m.media-amazon.com/images/I/718KFI+hBOL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Electrolux STK15","guide": "aspiradorvertical-2026.html#produto-2","guideName": "Aspirador vertical","expires": "2026-11-19","asin": "B094X2N4HV","img": "https://m.media-amazon.com/images/I/31RDw6Caq9L._AC_UL480_.jpg"},
  {"store": "amazon","title": "G-Tech Allergy Free HM 3 L","guide": "umidificador-2026.html#produto-1","guideName": "Umidificador de ar","expires": "2026-11-19","asin": "B07L4TSL64","img": "https://m.media-amazon.com/images/I/41dRwQGYZPL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Garmin Forerunner 55","guide": "smartwatch-2026.html#produto-10","guideName": "Smartwatch","expires": "2026-11-19","asin": "B0953X73TP","img": "https://m.media-amazon.com/images/I/51-D8JBR8+L._AC_UL480_.jpg"},
  {"store": "amazon","title": "Geonav GaN Duo 65 W","guide": "carregador-celular-2026.html#produto-12","guideName": "Carregador de celular","expires": "2026-11-19","asin": "B0B57CH8XT","img": "https://m.media-amazon.com/images/I/31vK4V67lxL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Geonav PB10MAG 10.000 mAh","guide": "powerbank-2026.html#produto-5","guideName": "Power bank","expires": "2026-11-19","asin": "B0C9QSV82F","img": "https://m.media-amazon.com/images/I/615U7klnYVL._AC_UL480_.jpg"},
  {"store": "amazon","title": "HUAWEI WATCH FIT 4","guide": "smartwatch-2026.html#produto-5","guideName": "Smartwatch","expires": "2026-11-19","asin": "B0F32PTQD3","img": "https://m.media-amazon.com/images/I/71YljPppx2L._AC_UL480_.jpg"},
  {"store": "kabum","title": "HyperX Cloud Stinger 2 Core","guide": "headset-gamer-2026.html#produto-2","guideName": "Headset gamer","expires": "2026-11-19","kabumId": 461178,"img": "img/banners-guias/headset-gamer.webp"},
  {"store": "amazon","title": "Intelbras FD 2000","guide": "fechaduradigital-2026.html#produto-4","guideName": "Fechadura digital","expires": "2026-11-19","asin": "B08TCH6MKC","img": "https://m.media-amazon.com/images/I/41EjVf9cELL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Intelbras FR 201","guide": "fechaduradigital-2026.html#produto-3","guideName": "Fechadura digital","expires": "2026-11-19","asin": "B076HZ63PL","img": "https://m.media-amazon.com/images/I/41HcCEN+upL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Intelbras iM3 C","guide": "cameraseguranca-2026.html#produto-3","guideName": "Câmera de segurança","expires": "2026-11-19","asin": "B09Q3K4YLS","img": "https://m.media-amazon.com/images/I/41SSHIdYMTL._AC_UL480_.jpg"},
  {"store": "amazon","title": "JBL Flip 7","guide": "caixadesom-2026.html#produto-4","guideName": "Caixa de som","expires": "2026-11-19","asin": "B0F7T2Y46Y","img": "https://m.media-amazon.com/images/I/61S6CABfB7L._AC_UL480_.jpg"},
  {"store": "amazon","title": "JBL Tune 720BT","guide": "foneoverear-2026.html#produto-3","guideName": "Fone over-ear","expires": "2026-11-19","asin": "B0BYWL962Q","img": "https://m.media-amazon.com/images/I/51hHlj4OqZL._AC_UL480_.jpg"},
  {"store": "amazon","title": "JBL Xtreme 4","guide": "caixadesom-2026.html#produto-6","guideName": "Caixa de som","expires": "2026-11-19","asin": "B0D2LPLTJ8","img": "https://m.media-amazon.com/images/I/71jzFcaXnzL._AC_UL480_.jpg"},
  {"store": "amazon","title": "LG UltraGear 24GS60F 24\"","guide": "monitor-2026.html#produto-7","guideName": "Monitor","expires": "2026-11-19","asin": "B0D8DPT7ZY","img": "https://m.media-amazon.com/images/I/61aIuJu0M0L._AC_UL480_.jpg"},
  {"store": "amazon", "title": "Logitech G203 LIGHTSYNC", "guide": "mouse-2026.html#produto-14", "guideName": "Mouse", "expires": "2026-11-19", "asin": "B08GS763C5", "img": "https://m.media-amazon.com/images/I/61rR-PPX20L._AC_UL480_.jpg", "productKey": "logitech-910-005793"},
  {"title": "Logitech G203 LIGHTSYNC", "guide": "mouse-2026.html#produto-14", "guideName": "Mouse", "productKey": "logitech-910-005793", "store": "mercadolivre", "affiliate": true, "url": "https://meli.la/2pqA9o8", "expires": "2026-11-19", "img": "img/banners-guias/mouse.webp"},
  {"store": "amazon","title": "Logitech G733 Lightspeed","guide": "headset-gamer-2026.html#produto-9","guideName": "Headset gamer","expires": "2026-11-19","asin": "B081415GCS","img": "https://m.media-amazon.com/images/I/710MzmBFzkL._AC_UL480_.jpg"},
  {"store": "amazon", "title": "Logitech MX Anywhere 3S", "guide": "mouse-2026.html#produto-11", "guideName": "Mouse", "expires": "2026-11-19", "asin": "B0C6K2DH73", "img": "https://m.media-amazon.com/images/I/61dYSaNVRaL._AC_UL480_.jpg", "productKey": "logitech-910-006932"},
  {"title": "Logitech MX Anywhere 3S", "guide": "mouse-2026.html#produto-11", "guideName": "Mouse", "productKey": "logitech-910-006932", "store": "mercadolivre", "affiliate": true, "url": "https://meli.la/28md3Kv", "expires": "2026-11-19", "img": "img/banners-guias/mouse.webp"},
  {"store": "kabum","title": "Logitech MX Keys Mini","guide": "teclado-2026.html#produto-12","guideName": "Teclado","expires": "2026-11-19","kabumId": 275873,"img": "img/banners-guias/teclado.webp"},
  {"store": "amazon","title": "Logitech POP Icon Combo","guide": "kit-teclado-mouse-2026.html#produto-18","guideName": "Kit teclado e mouse","expires": "2026-11-19","asin": "B0DPXZ6H24","img": "https://m.media-amazon.com/images/I/71bpua-bVsL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Mallory Chronos 140 W","guide": "ventilador-2026.html#produto-5","guideName": "Ventilador","expires": "2026-11-19","asin": "B0BTQY3GMZ","img": "https://m.media-amazon.com/images/I/71VRFzPsVIL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Panasonic 30 L Air Fryer, Grill e Convecção (CD89)","guide": "microondas-2026.html#produto-8","guideName": "Micro-ondas","expires": "2026-11-19","asin": "B0BYP6G4VC","img": "https://m.media-amazon.com/images/I/41dEe9eGVLL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Philips Walita Pro Mix 4 em 1","guide": "liquidificador-2026.html#produto-10","guideName": "Liquidificador","expires": "2026-11-19","asin": "B0874G5TTM","img": "https://m.media-amazon.com/images/I/51P6uGuFS8L._AC_UL480_.jpg"},
  {"store": "amazon","title": "Philips Walita Série 1000 XL 6,2 L","guide": "airfryer-2026.html#produto-7","guideName": "Air fryer","expires": "2026-11-19","asin": "B0D98VK8PP","img": "https://m.media-amazon.com/images/I/510Uj5C7LdL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Positivo Smart Lâmpada Wi-Fi 9 W","guide": "casainteligente-2026.html#produto-4","guideName": "Iluminação inteligente","expires": "2026-11-19","asin": "B082FTRR76","img": "https://m.media-amazon.com/images/I/51sXUs-tZiL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Roku Streaming Stick HD (2025)","guide": "fire-tv-stick-2026.html#produto-2","guideName": "Fire TV Stick","expires": "2026-11-19","asin": "B0FH7LY3R4","img": "https://m.media-amazon.com/images/I/71NIAAVDxML._AC_UL480_.jpg"},
  {"store": "amazon","title": "Samsung Galaxy Buds Core","guide": "fonebluetooth-2026.html#produto-6","guideName": "Fone Bluetooth","expires": "2026-11-19","asin": "B0FP8KDP36","img": "https://m.media-amazon.com/images/I/31GMcveipGL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Samsung Galaxy S25 FE 128 GB","guide": "smartphone-2026.html#produto-4","guideName": "Celular","expires": "2026-11-19","asin": "B0FTC96JJ5","img": "https://m.media-amazon.com/images/I/51ydsfiGvOL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Samsung Galaxy Tab S10 Lite","guide": "tablet-2026.html#produto-9","guideName": "Tablet","expires": "2026-11-19","asin": "B0FMFRFNWG","img": "https://m.media-amazon.com/images/I/51UFm7dGUuL._AC_UL480_.jpg"},
  {"store": "amazon","title": "Samsung Galaxy Watch8 40 mm","guide": "smartwatch-2026.html#produto-6","guideName": "Smartwatch","expires": "2026-11-19","asin": "B0FDX5NC1G","img": "https://m.media-amazon.com/images/I/61zc3QnQvcL._AC_UL480_.jpg"},
  {"store": "amazon","title": "soundcore P20i","guide": "fonebluetooth-2026.html#produto-2","guideName": "Fone Bluetooth","expires": "2026-11-19","asin": "B0BTYCRJSS","img": "https://m.media-amazon.com/images/I/61ljZu9+GXL._AC_UL480_.jpg"},
  {"store": "amazon","title": "soundcore P30i","guide": "fonebluetooth-2026.html#produto-5","guideName": "Fone Bluetooth","expires": "2026-11-19","asin": "B0CRTN7C8C","img": "https://m.media-amazon.com/images/I/51aXXLgifFL._AC_UL480_.jpg"},
  {"store": "amazon","title": "TP-Link Tapo C200","guide": "cameraseguranca-2026.html#produto-2","guideName": "Câmera de segurança","expires": "2026-11-19","asin": "B07XLML2YS","img": "https://m.media-amazon.com/images/I/41WQe9NiU6L._AC_UL480_.jpg"},
  {"store": "amazon","title": "TP-Link Tapo C320WS","guide": "cameraseguranca-2026.html#produto-8","guideName": "Câmera de segurança","expires": "2026-11-19","asin": "B098TVZ6TS","img": "https://m.media-amazon.com/images/I/51LTtEdludL._AC_UL480_.jpg"},
  {"store": "amazon","title": "TP-Link Tapo P110","guide": "tomadainteligente-2026.html#produto-2","guideName": "Tomada inteligente","expires": "2026-11-19","asin": "B0CPFT8QQK","img": "https://m.media-amazon.com/images/I/31ARV778-nL._AC_UL480_.jpg"},
  { store: "kabum", kabumId: 97092, title: "Mouse Gamer Sem Fio Logitech G305 Lightspeed", img: "https://images.kabum.com.br/produtos/fotos/97092/mouse-gamer-sem-fio-logitech-g305-lightspeed-12000-dpi-6-botoes-preto-910-005281_1781726494_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "kabum", kabumId: 610298, title: "Mouse Gamer Sem Fio Redragon Invader Pro", img: "https://images.kabum.com.br/produtos/fotos/610298/mouse-gamer-sem-fio-redragon-invader-pro-rgb-10000-dpi-9-botoes-wireless-e-bluetooth-preto-m719rgb-pro_1723134442_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "kabum", kabumId: 495497, title: "Teclado Sem Fio Logitech Pebble Keys 2 K380s", img: "https://images.kabum.com.br/produtos/fotos/495497/teclado-sem-fio-logitech-bluetooth-e-usb-pebble-keys-2-k380s-easy-switch-e-pilha-inclusa-grafite-920-011789_1697455370_g.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "kabum", kabumId: 538689, title: "Teclado Mecânico Husky Anchorage Full Size RGB", img: "https://images.kabum.com.br/produtos/fotos/538689/teclado-mecanico-gamer-husky-anchorage-full-size-preto-abnt2-rgb-switch-gateron-ef-red-htg200ptvr_1744722012_g.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
];

const DEAL_STORES = Object.freeze({
  amazon: { name: "Amazon", affiliate: true, url: d => /^[A-Z0-9]{10}$/.test(d.asin) ? 'https://www.amazon.com.br/dp/' + d.asin + '?tag=' + AFFILIATE_TAG : null },
  kabum: { name: "KaBuM!", affiliate: true, url: d => /^\d+$/.test(d.kabumId) ? 'https://www.awin1.com/cread.php?awinmid=' + AWIN_KABUM_ID + '&awinaffid=' + AWIN_AFFILIATE_ID + '&ued=' + encodeURIComponent('https://www.kabum.com.br/produto/' + d.kabumId) : null },
  shopee: { name: "Shopee", url: d => dealStoreUrl(d.url, ['shopee.com.br','www.shopee.com.br','s.shopee.com.br']) },
  mercadolivre: { name: "Mercado Livre", url: d => dealStoreUrl(d.url, ['meli.la']) }
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
    if (!offers.some(o => o.key === key)) offers.push({key, name:store.name, url, affiliate:store.affiliate || d.affiliate === true});
  }
  return [...cards.values()];
}
function dealCardHtml(d) {
  const e = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const relation = o => o.affiliate ? 'noopener sponsored' : 'noopener';
  const buttons = d.offers.map(o => `<a class="deal-btn deal-btn-buy deal-btn-${o.key}" href="${e(o.url)}" target="_blank" rel="${relation(o)}" aria-label="${e(d.title)}: ver preço na ${e(o.name)}"><span class="deal-btn-long">Ver na </span>${e(o.name)} <span aria-hidden="true">↗</span></a>`).join("");
  const first = d.offers[0];
  return `<article class="deal-card">
    <a class="deal-buy" href="${e(first.url)}" target="_blank" rel="${relation(first)}" tabindex="-1" aria-hidden="true">
      <img class="deal-img" src="${e(d.img)}" alt="" width="480" height="480" loading="lazy" decoding="async">
      <span class="deal-info"><span class="deal-cat">${e(d.guideName)}</span><span class="deal-title">${e(d.title)}</span></span>
    </a>
    <div class="deal-actions${d.offers.length > 1 ? " deal-actions-multiloja" : ""}">
      ${buttons}<a class="deal-btn deal-btn-guide" href="${e(d.guide)}" aria-label="Ver o guia de ${e(d.guideName)}"><span class="deal-btn-long">Ver </span>Guia</a>
    </div></article>`;
}
