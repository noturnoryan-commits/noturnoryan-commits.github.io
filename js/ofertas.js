/* TechAprovado — LISTA ÚNICA DE OFERTAS (08/11/2026)
   Usada pela home (seção "Últimas ofertas") e pela página ultimas-ofertas.html.
   Edite SÓ AQUI: as duas páginas se atualizam juntas.

   Campos: asin (código na Amazon), title (nome curto, sem aspas "),
   img (foto), guide (link do produto no guia), guideName (nome do guia),
   expires ("AAAA-MM-DD": último dia em que a oferta aparece).
   - Ofertas NOVAS vão NO TOPO: a página mostra na ordem da lista.
   - Ofertas com "expires" no passado somem sozinhas.
   - Ao trocar a lista, atualize DEALS_CHECKED (data da conferência).

   Critério (desde 01/11/2026): produtos dos NICHOS dos nossos guias (não só os
   que estão no ranking), vendidos e entregues pela Amazon.com.br, em estoque,
   com desconto de pelo menos 20% sobre o preço "De" da página e nota 4,4 ou mais.
   Meta: 30 a 50 ofertas. Não mostramos preço: ele muda o tempo todo.
   O botão "Ver guia" leva ao guia da categoria do produto. */
const AFFILIATE_TAG = "techaprovad0b-20";
const DEALS_CHECKED = "08/11/2026";
const DEALS = [
  { asin: "B088C4QZV2", title: "Lâmpada Inteligente Elgin Smart Color 10W", img: "https://m.media-amazon.com/images/I/61i1yPAlVLL._AC_UL480_.jpg", guide: "casainteligente-2026.html", guideName: "Iluminação Inteligente", expires: "2026-11-15" },
  { asin: "B08B3MHYPC", title: "Teclado Gamer Razer Huntsman Mini", img: "https://m.media-amazon.com/images/I/61NPK6KGnAL._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-15" },
  { asin: "B0C7FBYDFP", title: "Cafeteira Oster PrimaLatte Touch", img: "https://m.media-amazon.com/images/I/61Nwem6YkSL._AC_UL480_.jpg", guide: "cafeteira-2026.html", guideName: "Cafeteira", expires: "2026-11-15" },
  { asin: "B0C6FT4QYV", title: "Air Fryer Mondial Dual AFD-01 8L Cesto Duplo", img: "https://m.media-amazon.com/images/I/81+27Tn2b+L._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-15" },
  { asin: "B0D2LPLTJ8", title: "Caixa de Som JBL Xtreme 4", img: "https://m.media-amazon.com/images/I/71jzFcaXnzL._AC_UL480_.jpg", guide: "caixadesom-2026.html", guideName: "Caixa de Som", expires: "2026-11-15" },
  { asin: "B09Q3K4YLS", title: "Câmera Intelbras iM3 C Wi-Fi", img: "https://m.media-amazon.com/images/I/41SSHIdYMTL._AC_UL480_.jpg", guide: "cameraseguranca-2026.html", guideName: "Câmera de Segurança", expires: "2026-11-15" },
  { asin: "B0DZ33XY3Q", title: "Camiseta Insider Performance T-Shirt 2.0", img: "https://m.media-amazon.com/images/I/61wFi5+coRL._AC_UL480_.jpg", guide: "camisetatech-2026.html", guideName: "Camiseta tech", expires: "2026-11-15" },
  { asin: "B08D4XB18Y", title: "Umidificador Britânia BUD04B 4,8L", img: "https://m.media-amazon.com/images/I/51piSZSrLrL._AC_UL480_.jpg", guide: "umidificador-2026.html", guideName: "Umidificador", expires: "2026-11-15" },
  { asin: "B0F8Y8N2ST", title: "Ventilador Arno X-TREME 7 40cm", img: "https://m.media-amazon.com/images/I/71hIRn8rmOL._AC_UL480_.jpg", guide: "ventilador-2026.html", guideName: "Ventiladores", expires: "2026-11-15" },
  { asin: "B08J89FSXX", title: "Cafeteira Dolce Gusto Genio S Plus", img: "https://m.media-amazon.com/images/I/51qqanOydXL._AC_UL480_.jpg", guide: "cafeteira-2026.html", guideName: "Cafeteira", expires: "2026-11-15" },
  { asin: "B0C9QSV82F", title: "Power Bank Geonav PB10MAG 10.000mAh", img: "https://m.media-amazon.com/images/I/615U7klnYVL._AC_UL480_.jpg", guide: "powerbank-2026.html", guideName: "Power Bank", expires: "2026-11-15" },
  { asin: "B0B9NRQDD8", title: "Ventilador de Teto Ventisol Aires Inverter", img: "https://m.media-amazon.com/images/I/51MQWljWxCL._AC_UL480_.jpg", guide: "ventiladordeteto-2026.html", guideName: "Ventilador de Teto", expires: "2026-11-15" },
  { asin: "B0CH3WBKN6", title: "Extratora WAP Spot Cleaner W3", img: "https://m.media-amazon.com/images/I/71YOp9GJX2L._AC_UL480_.jpg", guide: "aspiradorvertical-2026.html", guideName: "Aspirador Vertical", expires: "2026-11-15" },
  { asin: "B0FDX5NC1G", title: "Smartwatch Samsung Galaxy Watch8 40mm", img: "https://m.media-amazon.com/images/I/61zc3QnQvcL._AC_UL480_.jpg", guide: "smartwatch-2026.html", guideName: "Smartwatch", expires: "2026-11-15" },
  { asin: "B089B7Z8ZD", title: "Teclado Mecânico Redragon Dark Avenger", img: "https://m.media-amazon.com/images/I/61O+xK4F6aL._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-15" },
  { asin: "B098TVZ6TS", title: "Câmera TP-Link Tapo C320WS Externa 2K", img: "https://m.media-amazon.com/images/I/51LTtEdludL._AC_UL480_.jpg", guide: "cameraseguranca-2026.html", guideName: "Câmera de Segurança", expires: "2026-11-15" },
  { asin: "B0BLT2MQY2", title: "Ventilador de Teto Ventisol Wind Inverter Bivolt", img: "https://m.media-amazon.com/images/I/31F3IAFetGL._AC_UL480_.jpg", guide: "ventiladordeteto-2026.html", guideName: "Ventilador de Teto", expires: "2026-11-15" },
  { asin: "B0CZPP1D49", title: "Robô Aspirador Kärcher RCV 3 com LiDAR", img: "https://m.media-amazon.com/images/I/51xF7tQx2jL._AC_UL480_.jpg", guide: "roboaspirador-2026.html", guideName: "Robô Aspirador", expires: "2026-11-15" },
  { asin: "B0D3NDBHQ7", title: "Power Bank Geonav 10.000mAh", img: "https://m.media-amazon.com/images/I/61Q8VtyeTuL._AC_UL480_.jpg", guide: "powerbank-2026.html", guideName: "Power Bank", expires: "2026-11-15" },
  { asin: "B0BT23S5MF", title: "WAP High Speed Plus Aspirador Vertical 3 em 1 (220V)", img: "https://m.media-amazon.com/images/I/61wBRlZjDQL._AC_UL480_.jpg", guide: "aspiradorvertical-2026.html", guideName: "Aspirador Vertical", expires: "2026-11-15" },
  { asin: "B0DHL63KWK", title: "Fone JBL Wave Buds 2 Bluetooth", img: "https://m.media-amazon.com/images/I/414+kOLlS5L._AC_UL480_.jpg", guide: "fonebluetooth-2026.html", guideName: "Fone TWS", expires: "2026-11-15" },
  { asin: "B08HSRTHLR", title: "Lâmpada Inteligente Geonav Hi 9W RGBW Wi-Fi", img: "https://m.media-amazon.com/images/I/61-g0s43q1L._AC_UL480_.jpg", guide: "casainteligente-2026.html", guideName: "Iluminação Inteligente", expires: "2026-11-15" },
  { asin: "B0BQ7KJ9NV", title: "Monitor Samsung UJ59 32 pol. 4K", img: "https://m.media-amazon.com/images/I/91XfEXGz9UL._AC_UL480_.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-15" },
  { asin: "B0DBR1N89F", title: "Caixa de Som Aiwa PartyBox PB-07", img: "https://m.media-amazon.com/images/I/919ZDa78WjL._AC_UL480_.jpg", guide: "caixadesom-2026.html", guideName: "Caixa de Som", expires: "2026-11-15" },
  { asin: "B0DXR7GNWJ", title: "Apple iPhone 16e 128GB", img: "https://m.media-amazon.com/images/I/412RWxKFt8L._AC_UL480_.jpg", guide: "smartphone-2026.html", guideName: "Celular", expires: "2026-11-15" },
  { asin: "B0BRL93TYM", title: "Philips Walita Airfryer Essential XL Digital 6,2L (110V)", img: "https://m.media-amazon.com/images/I/51i3nkPbZ-L._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-15" },
  { asin: "B09SVPDX3G", title: "Cafeteira Electrolux Inox ECM25 1,2L com Timer (127V)", img: "https://m.media-amazon.com/images/I/51OyvPACDML._AC_UL480_.jpg", guide: "cafeteira-2026.html", guideName: "Cafeteira", expires: "2026-11-15" },
  { asin: "B0953X73TP", title: "Garmin Forerunner 55 com GPS", img: "https://m.media-amazon.com/images/I/51-D8JBR8+L._AC_UL480_.jpg", guide: "smartwatch-2026.html", guideName: "Smartwatch", expires: "2026-11-15" },
  { asin: "B08FXYKYLW", title: "Umidificador WAP Air Flow 4L com Difusor", img: "https://m.media-amazon.com/images/I/71a+5LPb9EL._AC_UL480_.jpg", guide: "umidificador-2026.html", guideName: "Umidificador", expires: "2026-11-15" },
  { asin: "B0D4NRBBMR", title: "Notebook Samsung Galaxy Book4 Core i5 8GB", img: "https://m.media-amazon.com/images/I/71qOQOgOZUL._AC_UL480_.jpg", guide: "notebook-2026.html", guideName: "Notebook", expires: "2026-11-15" },
  { asin: "B09NL92H57", title: "Micro-ondas Mondial 21L Branco (110V)", img: "https://m.media-amazon.com/images/I/61WJEyvwQtL._AC_UL480_.jpg", guide: "microondas-2026.html", guideName: "Micro-ondas", expires: "2026-11-15" },
  { asin: "B0DKLQT9XR", title: "Amazon Echo Dot Max com Alexa", img: "https://m.media-amazon.com/images/I/71J0hF-lw+L._AC_UL480_.jpg", guide: "echo-alexa-2026.html", guideName: "Echo (Alexa)", expires: "2026-11-15" },
  { asin: "B0CJ3P5RX9", title: "Teclado Logitech Pebble Keys 2 K380s Bluetooth", img: "https://m.media-amazon.com/images/I/61vnuYiLrXL._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-15" },
  { asin: "B09SPGZHMP", title: "Câmera Intelbras iM5 SC Wi-Fi Full HD", img: "https://m.media-amazon.com/images/I/41s1-YTvwbL._AC_UL480_.jpg", guide: "cameraseguranca-2026.html", guideName: "Câmera de Segurança", expires: "2026-11-15" },
  { asin: "B0CDDFHLGD", title: "Fechadura Digital Elsys com Biometria ESF-DE2000B", img: "https://m.media-amazon.com/images/I/319CQkX1+9L._AC_UL480_.jpg", guide: "fechaduradigital-2026.html", guideName: "Fechadura Digital", expires: "2026-11-15" },
  { asin: "B094YV31R9", title: "Power Bank I2GO Pro 10.000mAh 20W", img: "https://m.media-amazon.com/images/I/51x6d0ZwylS._AC_UL480_.jpg", guide: "powerbank-2026.html", guideName: "Power Bank", expires: "2026-11-15" },
  { asin: "B094X2N4HV", title: "Electrolux STK15 Aspirador Vertical 2 em 1 (127V)", img: "https://m.media-amazon.com/images/I/31RDw6Caq9L._AC_UL480_.jpg", guide: "aspiradorvertical-2026.html", guideName: "Aspirador Vertical", expires: "2026-11-15" },
  { asin: "B0DHL93XCN", title: "Fone JBL Wave Beam 2 Bluetooth", img: "https://m.media-amazon.com/images/I/61DFgTmj9xL._AC_UL480_.jpg", guide: "fonebluetooth-2026.html", guideName: "Fone TWS", expires: "2026-11-15" },
  { asin: "B09B15RDJ6", title: "Ventilador de Mesa Mondial Super Power 40cm (110V)", img: "https://m.media-amazon.com/images/I/81r2JL+Ru5L._AC_UL480_.jpg", guide: "ventilador-2026.html", guideName: "Ventiladores", expires: "2026-11-15" },
  { asin: "B0DWQK1Q8S", title: "Monitor Samsung Odyssey G5 27 pol. QHD 165Hz", img: "https://m.media-amazon.com/images/I/61Jv+Gj6aBL._AC_UL480_.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-15" },
  { asin: "B09NQNWT76", title: "Mouse Logitech Signature M650 Sem Fio", img: "https://m.media-amazon.com/images/I/71qC2tQiocL._AC_UL480_.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-15" },
  { asin: "B0DJFSKVZ5", title: "Apple iPhone 16 256GB", img: "https://m.media-amazon.com/images/I/41uUYcqfLxL._AC_UL480_.jpg", guide: "smartphone-2026.html", guideName: "Celular", expires: "2026-11-15" },
  { asin: "B0D98VK8PP", title: "Philips Walita Airfryer Série 1000 XL 6,2L (110V)", img: "https://m.media-amazon.com/images/I/510Uj5C7LdL._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-15" },
  { asin: "B0D4NSS9XV", title: "Notebook Samsung Galaxy Book4 Core i3 8GB 256GB", img: "https://m.media-amazon.com/images/I/71qOQOgOZUL._AC_UL480_.jpg", guide: "notebook-2026.html", guideName: "Notebook", expires: "2026-11-15" },
  { asin: "B08JNM2R8T", title: "Micro-ondas Panasonic 21L NN-ST27 (220V)", img: "https://m.media-amazon.com/images/I/412oVgjWUxL._AC_UL480_.jpg", guide: "microondas-2026.html", guideName: "Micro-ondas", expires: "2026-11-15" },
  { asin: "B07643MPGS", title: "Combo Teclado e Mouse Logitech MK235 Sem Fio", img: "https://m.media-amazon.com/images/I/61vdNn+737L._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-15" },
  { asin: "B0FLKGNYJ8", title: "Monitor AOC AGON G50 24 pol. IPS 144Hz", img: "https://m.media-amazon.com/images/I/71RpoYhSWJL._AC_UL480_.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-15" },
  { asin: "B0BXNR9DB6", title: "Mouse Logitech M240 Bluetooth", img: "https://m.media-amazon.com/images/I/51+zmcWK3cL._AC_UL480_.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-15" },
  { asin: "B07XLML2YS", title: "Câmera TP-Link Tapo C200 360º Full HD", img: "https://m.media-amazon.com/images/I/41WQe9NiU6L._AC_UL480_.jpg", guide: "cameraseguranca-2026.html", guideName: "Câmera de Segurança", expires: "2026-11-15" },
  { asin: "B0DY2FPRJD", title: "Philco Air Fryer 4L Redstone PAF40A (127V)", img: "https://m.media-amazon.com/images/I/51TMCXmRIdL._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-15" }
];

// Ofertas válidas hoje (horário de Brasília), na ordem da lista.
function activeDeals() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return DEALS.filter(d => d.expires >= today);
}

// Quadro de produto: o mesmo na home e na página Últimas ofertas.
// Foto e nome levam à Amazon; embaixo, dois botões lado a lado:
// "Ver na Amazon" (amarelo) e "Ver guia" (azul).
function dealCardHtml(d) {
  const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const amazon = `https://www.amazon.com.br/dp/${d.asin}?tag=${AFFILIATE_TAG}`;
  return `
      <article class="deal-card">
        <a class="deal-buy" href="${amazon}" target="_blank" rel="noopener sponsored" tabindex="-1" aria-hidden="true">
          <img class="deal-img" src="${d.img}" alt="" width="480" height="480" loading="lazy" decoding="async">
          <span class="deal-info"><span class="deal-cat">${e(d.guideName)}</span><span class="deal-title">${e(d.title)}</span></span>
        </a>
        <div class="deal-actions">
          <a class="deal-btn deal-btn-amazon" href="${amazon}" target="_blank" rel="noopener sponsored" aria-label="${e(d.title)}: ver preço na Amazon"><span class="deal-btn-long">Ver na </span>Amazon <span aria-hidden="true">↗</span></a>
          <a class="deal-btn deal-btn-guide" href="${d.guide}" aria-label="Ver o guia de ${e(d.guideName)}"><span class="deal-btn-long">Ver </span>Guia</a>
        </div>
      </article>`;
}
