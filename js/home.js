// TechAprovado: ofertas selecionadas manualmente.
// Revise os produtos quando atualizar a seleção.
const AFFILIATE_TAG = "techaprovad0b-20";
const DEALS = [
  { asin:"B0B9PSBNYL", title:"Robô Aspirador WAP W90 3em1", img:"https://m.media-amazon.com/images/I/716GA5MQQkL._AC_UL480_.jpg", expires:"2026-08-19" },
  { asin:"B0CRTYZG5C", title:"Fone soundcore P30i (Anker)", img:"https://m.media-amazon.com/images/I/21KKr6VQU7L._AC_SR400,400_.jpg", expires:"2026-08-19" },
  { asin:"B0849PHXW1", title:"Robô Aspirador WAP W100 3em1", img:"https://m.media-amazon.com/images/I/81w-AyhZt-L._AC_UL480_.jpg", expires:"2026-08-19" },
  { asin:"B0BRLBBYLT", title:"Airfryer Philips Walita XL 6,2L", img:"https://m.media-amazon.com/images/I/41GECCa8AAL._AC_SR400,400_.jpg", expires:"2026-08-19" },
  { asin:"B0F9Z2DV83", title:"Robô Aspirador WAP W310", img:"https://m.media-amazon.com/images/I/61QHYk962EL._AC_UL480_.jpg", expires:"2026-08-19" },
  { asin:"B0FRHSY74T", title:"Soundbar Samsung HW-B450F", img:"https://m.media-amazon.com/images/I/11SVBAepAjL._AC_SR400,400_.jpg", expires:"2026-08-19" },
  { asin:"B09SVT5X8N", title:"Robô Aspirador Electrolux ERB30", img:"https://m.media-amazon.com/images/I/51d+bwNHcaL._AC_UL480_.jpg", expires:"2026-08-19" },
  { asin:"B0F8KQ2QXV", title:"Smart TV LG 55\" UHD AI", img:"https://m.media-amazon.com/images/I/61RZPtim4kL._AC_UL480_.jpg", expires:"2026-08-19" },
  { asin:"B0F4K1H6X5", title:"Robô Aspirador Xiaomi S40C", img:"https://m.media-amazon.com/images/I/61K3M5gPZPL._AC_UL480_.jpg", expires:"2026-08-19" },
  { asin:"B0F5X6Y8R6", title:"Samsung TV 55\" QLED 4K", img:"https://m.media-amazon.com/images/I/61tjjPyts8L._AC_UL480_.jpg", expires:"2026-08-19" }
];
function brDate(iso){ const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; }
function renderDeals(){
  const rail=document.getElementById('dealsRail'), section=document.getElementById('ofertas');
  if(!rail||!section)return;
  const today=new Date().toISOString().slice(0,10);
  const active=DEALS.filter(d=>d.expires>=today);
  if(!active.length){section.hidden=true;return;}
  rail.innerHTML=active.map(d=>`<a class="deal-card" href="https://www.amazon.com.br/dp/${d.asin}?tag=${AFFILIATE_TAG}" target="_blank" rel="noopener sponsored" aria-label="${d.title}: conferir preço atual na Amazon">
    <img class="deal-img" src="${d.img}" alt="${d.title}" width="480" height="480" loading="lazy" decoding="async">
    <div class="deal-info"><span class="deal-title">${d.title}</span><span class="deal-cta">Conferir agora ↗</span></div>
  </a>`).join('');
}
renderDeals();
