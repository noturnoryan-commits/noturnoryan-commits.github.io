/* TechAprovado — LISTA ÚNICA DE OFERTAS (12/11/2026)
   Usada pela home (seção "Últimas ofertas") e pela página ultimas-ofertas.html.
   Edite SÓ AQUI: as duas páginas se atualizam juntas.

   Lojas (campo store):
   - "amazon": asin (código na Amazon). Link com a tag de afiliado da Amazon.
   - "kabum": kabumId (número do produto na KaBuM!). Link de afiliado pela Awin.
     Use também "ends" (data e hora em que a oferta acaba na KaBuM!, horário de Brasília):
     a oferta some do site nessa hora, mesmo antes do fim do dia.
   Demais campos: title (nome curto, sem aspas "), img (foto), guide (guia da
   categoria), guideName (nome do guia), expires ("AAAA-MM-DD": último dia em que aparece).
   - Ofertas NOVAS vão NO TOPO: a página mostra na ordem da lista.
   - Ofertas vencidas somem sozinhas.
   - Ao trocar a lista, atualize DEALS_CHECKED (data da conferência).

   Critério (desde 12/11/2026): produtos dos NICHOS dos nossos guias, em estoque,
   com desconto de pelo menos 20% e boa nota dos compradores (filtro interno, não mostrado).
   Amazon: vendido e entregue pela Amazon.com.br. KaBuM!: vendido e entregue pela
   própria KaBuM! (nada de marketplace nem open box).
   Meta: 50 a 80 ofertas. Não mostramos preço: ele muda o tempo todo. */
const AFFILIATE_TAG = "techaprovad0b-20";
const AWIN_AFFILIATE_ID = "3148451";
const AWIN_KABUM_ID = "17729";
const DEALS_CHECKED = "12/11/2026";
const DEALS = [
  { store: "amazon", asin: "B0B726S9S3", title: "Fritadeira Oven Fryer Oster 12L 3 em 1 (127V)", img: "https://m.media-amazon.com/images/I/71wvacsxJ2L._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-19" },
  { store: "amazon", asin: "B0BT23S5MF", title: "Aspirador Vertical WAP High Speed Plus 3 em 1 (220V)", img: "https://m.media-amazon.com/images/I/61wBRlZjDQL._AC_UL480_.jpg", guide: "aspiradorvertical-2026.html", guideName: "Aspirador Vertical", expires: "2026-11-19" },
  { store: "kabum", kabumId: 97092, title: "Mouse Gamer Sem Fio Logitech G305 Lightspeed", img: "https://images.kabum.com.br/produtos/fotos/97092/mouse-gamer-sem-fio-logitech-g305-lightspeed-12000-dpi-6-botoes-preto-910-005281_1781726494_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "amazon", asin: "B0C7FBYDFP", title: "Cafeteira Oster PrimaLatte Touch (127V)", img: "https://m.media-amazon.com/images/I/61Nwem6YkSL._AC_UL480_.jpg", guide: "cafeteira-2026.html", guideName: "Cafeteira", expires: "2026-11-19" },
  { store: "amazon", asin: "B0D2LPLTJ8", title: "Caixa de Som JBL Xtreme 4", img: "https://m.media-amazon.com/images/I/71jzFcaXnzL._AC_UL480_.jpg", guide: "caixadesom-2026.html", guideName: "Caixa de Som", expires: "2026-11-19" },
  { store: "kabum", kabumId: 112948, title: "Mouse Gamer Logitech G203 Lightsync RGB", img: "https://images.kabum.com.br/produtos/fotos/112948/mouse-gamer-logitech-g203-lightsync-rgb-efeito-de-ondas-de-cores-6-botoes-programaveis-e-ate-8-000-dpi-preto-910-005793_1781792020_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-24", ends: "2026-11-24T10:00:00-03:00" },
  { store: "amazon", asin: "B098TVZ6TS", title: "Câmera TP-Link Tapo C320WS Externa 2K", img: "https://m.media-amazon.com/images/I/51LTtEdludL._AC_UL480_.jpg", guide: "cameraseguranca-2026.html", guideName: "Câmera de Segurança", expires: "2026-11-19" },
  { store: "amazon", asin: "B088C4QZV2", title: "Lâmpada Inteligente Elgin Smart Color 10W", img: "https://m.media-amazon.com/images/I/61i1yPAlVLL._AC_UL480_.jpg", guide: "casainteligente-2026.html", guideName: "Iluminação Inteligente", expires: "2026-11-19" },
  { store: "kabum", kabumId: 610298, title: "Mouse Gamer Sem Fio Redragon Invader Pro", img: "https://images.kabum.com.br/produtos/fotos/610298/mouse-gamer-sem-fio-redragon-invader-pro-rgb-10000-dpi-9-botoes-wireless-e-bluetooth-preto-m719rgb-pro_1723134442_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "amazon", asin: "B07C45YRBT", title: "Ducha Lorenzetti Bella Ducha Ultra 4T (220V)", img: "https://m.media-amazon.com/images/I/41DveYf9jpL._AC_UL480_.jpg", guide: "chuveiroeletrico-2026.html", guideName: "Chuveiro Elétrico", expires: "2026-11-19" },
  { store: "amazon", asin: "B0C2RS4ZG6", title: "Echo Spot com Alexa", img: "https://m.media-amazon.com/images/I/718KFI+hBOL._AC_UL480_.jpg", guide: "echo-alexa-2026.html", guideName: "Echo (Alexa)", expires: "2026-11-19" },
  { store: "kabum", kabumId: 94555, title: "Mouse Gamer Redragon Cobra M711", img: "https://images.kabum.com.br/produtos/fotos/94555/mouse-gamer-redragon-cobra-chroma-rgb-10000dpi-7-botoes-preto-m711-v2_1742821619_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0CDDFHLGD", title: "Fechadura Digital Elsys com Biometria ESF-DE2000B", img: "https://m.media-amazon.com/images/I/319CQkX1+9L._AC_UL480_.jpg", guide: "fechaduradigital-2026.html", guideName: "Fechadura Digital", expires: "2026-11-19" },
  { store: "amazon", asin: "B0FH7LY3R4", title: "Roku Streaming Stick HD 2025", img: "https://m.media-amazon.com/images/I/71NIAAVDxML._AC_UL480_.jpg", guide: "fire-tv-stick-2026.html", guideName: "Streaming na TV", expires: "2026-11-19" },
  { store: "kabum", kabumId: 495544, title: "Mouse Gamer Sem Fio Logitech G Pro X Superlight 2", img: "https://images.kabum.com.br/produtos/fotos/495544/mouse-gamer-sem-fio-logitech-g-pro-x-superlight-2-com-lightspeed-32000-dpi-sensor-hero-2-com-bateria-recarregavel-preto-910-006629_1779395436_g.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0DHL63KWK", title: "Fone JBL Wave Buds 2", img: "https://m.media-amazon.com/images/I/414+kOLlS5L._AC_UL480_.jpg", guide: "fonebluetooth-2026.html", guideName: "Fone TWS", expires: "2026-11-19" },
  { store: "amazon", asin: "B00ENMK1DW", title: "Headphone Philips SHP9500", img: "https://m.media-amazon.com/images/I/71h7X9MueZL._AC_UL480_.jpg", guide: "foneoverear-2026.html", guideName: "Fone Over-Ear", expires: "2026-11-19" },
  { store: "kabum", kabumId: 495497, title: "Teclado Sem Fio Logitech Pebble Keys 2 K380s", img: "https://images.kabum.com.br/produtos/fotos/495497/teclado-sem-fio-logitech-bluetooth-e-usb-pebble-keys-2-k380s-easy-switch-e-pilha-inclusa-grafite-920-011789_1697455370_g.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "amazon", asin: "B0CX8MT2M2", title: "Kindle Colorsoft 16 GB", img: "https://m.media-amazon.com/images/I/71lORNHYWLL._AC_UL480_.jpg", guide: "kindle-2026.html", guideName: "Kindle", expires: "2026-11-19" },
  { store: "amazon", asin: "B0DPXZ6H24", title: "Combo Teclado e Mouse Logitech POP Icon", img: "https://m.media-amazon.com/images/I/71bpua-bVsL._AC_UL480_.jpg", guide: "kit-teclado-mouse-2026.html", guideName: "Kit Teclado e Mouse", expires: "2026-11-19" },
  { store: "kabum", kabumId: 538689, title: "Teclado Mecânico Husky Anchorage Full Size RGB", img: "https://images.kabum.com.br/produtos/fotos/538689/teclado-mecanico-gamer-husky-anchorage-full-size-preto-abnt2-rgb-switch-gateron-ef-red-htg200ptvr_1744722012_g.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-24", ends: "2026-11-24T09:00:00-03:00" },
  { store: "amazon", asin: "B0BYP6G4VC", title: "Micro-ondas Panasonic 30L com Air Fryer e Grill (127V)", img: "https://m.media-amazon.com/images/I/41dEe9eGVLL._AC_UL480_.jpg", guide: "microondas-2026.html", guideName: "Micro-ondas", expires: "2026-11-19" },
  { store: "amazon", asin: "B0D3J76C63", title: "Monitor Samsung Odyssey G5 34 pol. Curvo 165Hz", img: "https://m.media-amazon.com/images/I/81wfdDTIjHS._AC_UL480_.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-19" },
  { store: "kabum", kabumId: 93160, title: "Teclado Mecânico Redragon Kumara", img: "https://images.kabum.com.br/produtos/fotos/93160/93160_1523969683_index_g.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0C6K2DH73", title: "Mouse Logitech MX Anywhere 3S", img: "https://m.media-amazon.com/images/I/61dYSaNVRaL._AC_UL480_.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-19" },
  { store: "amazon", asin: "B0D4NRBBMR", title: "Notebook Samsung Galaxy Book4 Core i5 8GB", img: "https://m.media-amazon.com/images/I/71qOQOgOZUL._AC_UL480_.jpg", guide: "notebook-2026.html", guideName: "Notebook", expires: "2026-11-19" },
  { store: "kabum", kabumId: 20868, title: "Combo Teclado e Mouse Logitech MK120", img: "https://images.kabum.com.br/produtos/fotos/20868/teclado-e-mouse-logitech-mk120-resistente-a-agua-1000dpi-preto-abnt2-920-004429_1614630286_g.jpg", guide: "kit-teclado-mouse-2026.html", guideName: "Kit Teclado e Mouse", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0D3NDBHQ7", title: "Power Bank Geonav 10.000 mAh MagSafe", img: "https://m.media-amazon.com/images/I/61Q8VtyeTuL._AC_UL480_.jpg", guide: "powerbank-2026.html", guideName: "Power Bank", expires: "2026-11-19" },
  { store: "amazon", asin: "B0CZPP1D49", title: "Robô Aspirador Kärcher RCV 3 com Mapeamento", img: "https://m.media-amazon.com/images/I/51xF7tQx2jL._AC_UL480_.jpg", guide: "roboaspirador-2026.html", guideName: "Robô Aspirador", expires: "2026-11-19" },
  { store: "kabum", kabumId: 415702, title: "Combo Teclado e Mouse Sem Fio Dell KM3322W", img: "https://images.kabum.com.br/produtos/fotos/415702/teclado-e-mouse-sem-fio-dell-km3322w-usb-abnt2-preto-580-bbbb_1672416930_g.jpg", guide: "kit-teclado-mouse-2026.html", guideName: "Kit Teclado e Mouse", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0BZT41V5Z", title: "Roteador Mercusys MR30G Wi-Fi 5 AC1200", img: "https://m.media-amazon.com/images/I/41M4Q9ZwkqS._AC_UL480_.jpg", guide: "roteador-2026.html", guideName: "Roteador Wi-Fi", expires: "2026-11-19" },
  { store: "amazon", asin: "B0DXR6MKR8", title: "iPhone 16e 128 GB", img: "https://m.media-amazon.com/images/I/41Zguc9CziL._AC_UL480_.jpg", guide: "smartphone-2026.html", guideName: "Celular", expires: "2026-11-19" },
  { store: "kabum", kabumId: 620992, title: "Monitor Gamer LG UltraGear 27 pol. 180Hz", img: "https://images.kabum.com.br/produtos/fotos/620992/monitor-gamer-lg-ultragear-27-ips-full-hd-180hz-1ms-displayport-e-hdmi-g-sync-freesync-hdr10-srgb-99-preto-27gs60f-b_1725043961_g.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0F7K7B2PD", title: "Smart TV TCL 65 pol. QD-Mini LED C6K", img: "https://m.media-amazon.com/images/I/71yrEWLtSJL._AC_UL480_.jpg", guide: "smarttv-2026.html", guideName: "Smart TV", expires: "2026-11-19" },
  { store: "amazon", asin: "B0CVCLGV1W", title: "Pulseira Samsung Galaxy Fit3", img: "https://m.media-amazon.com/images/I/61o3-pf41tL._AC_UL480_.jpg", guide: "smartwatch-2026.html", guideName: "Smartwatch", expires: "2026-11-19" },
  { store: "kabum", kabumId: 626864, title: "Monitor Gamer ASUS ROG Strix 27 pol. QHD 180Hz", img: "https://images.kabum.com.br/produtos/fotos/626864/monitor-gamer-asus-rog-strix-xg27acs-27-ips-qhd-180hz-1ms-displayport-hdmi-e-usb-c-g-sync-freesync-hdr-preto-90lm09q0-b011x1_1741381526_g.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0DZK3VZVH", title: "iPad Air 13 pol. M3 128 GB", img: "https://m.media-amazon.com/images/I/51q7uCdqy2L._AC_UL480_.jpg", guide: "tablet-2026.html", guideName: "Tablet", expires: "2026-11-19" },
  { store: "amazon", asin: "B08B3MHYPC", title: "Teclado Gamer Razer Huntsman Mini", img: "https://m.media-amazon.com/images/I/61NPK6KGnAL._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-19" },
  { store: "kabum", kabumId: 699153, title: "Monitor Gamer Gigabyte 25 pol. 200Hz", img: "https://images.kabum.com.br/produtos/fotos/699153/monitor-gamer-gigabyte-25-fhd-200hz-1ms-ips-vrr-freesync-premium-hdr-10-alto-falante-embutido-gs25f2-sa_1790009604_g.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0CPFT8QQK", title: "Tomada Inteligente TP-Link Tapo P110", img: "https://m.media-amazon.com/images/I/31ARV778-nL._AC_UL480_.jpg", guide: "tomadainteligente-2026.html", guideName: "Tomada Inteligente", expires: "2026-11-19" },
  { store: "amazon", asin: "B08D4XB18Y", title: "Umidificador Britânia BUD04B 4,8L", img: "https://m.media-amazon.com/images/I/51piSZSrLrL._AC_UL480_.jpg", guide: "umidificador-2026.html", guideName: "Umidificador", expires: "2026-11-19" },
  { store: "kabum", kabumId: 1003399, title: "Notebook Gamer Lenovo LOQ i5 RTX 4050 16GB (Linux)", img: "https://images.kabum.com.br/produtos/fotos/1003399/notebook-gamer-lenovo-loq-15irx9-15-6-full-hd-144hz-intel-core-i5-13450hx-16gb-512gb-ssd-nvidia-rtx-4050-linux-83khs00300_1793398034_g.jpg", guide: "notebook-2026.html", guideName: "Notebook", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0F8Y8N2ST", title: "Ventilador de Mesa Arno X-Treme 7 40 cm", img: "https://m.media-amazon.com/images/I/71hIRn8rmOL._AC_UL480_.jpg", guide: "ventilador-2026.html", guideName: "Ventiladores", expires: "2026-11-19" },
  { store: "amazon", asin: "B0BLT2MQY2", title: "Ventilador de Teto Ventisol Wind Inverter", img: "https://m.media-amazon.com/images/I/31F3IAFetGL._AC_UL480_.jpg", guide: "ventiladordeteto-2026.html", guideName: "Ventilador de Teto", expires: "2026-11-19" },
  { store: "kabum", kabumId: 952233, title: "Notebook Acer Aspire 5 Ryzen 5 16GB (Linux)", img: "https://images.kabum.com.br/produtos/fotos/952233/notebook-acer-aspire-5-a515-45-r478-amd-ryzen-5-5500u-16gb-ram-512gb-ssd-15-6-fhd-led-ips-60hz-linux-gutta-nx-aydal-00r_1763390917_g.jpg", guide: "notebook-2026.html", guideName: "Notebook", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0BYK2VCP7", title: "Air Fryer Forno Electrolux 12L Digital", img: "https://m.media-amazon.com/images/I/5183mlQX54L._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-19" },
  { store: "amazon", asin: "B094X2N4HV", title: "Aspirador Vertical Electrolux STK15 HEPA (127V)", img: "https://m.media-amazon.com/images/I/31RDw6Caq9L._AC_UL480_.jpg", guide: "aspiradorvertical-2026.html", guideName: "Aspirador Vertical", expires: "2026-11-19" },
  { store: "kabum", kabumId: 94582, title: "Headphone AKG K92", img: "https://images.kabum.com.br/produtos/fotos/94582/94582_1516796661_index_g.jpg", guide: "foneoverear-2026.html", guideName: "Fone Over-Ear", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B08J89FSXX", title: "Cafeteira Dolce Gusto Genio S Plus Arno", img: "https://m.media-amazon.com/images/I/61eSgeAi-jL._AC_UL480_.jpg", guide: "cafeteira-2026.html", guideName: "Cafeteira", expires: "2026-11-19" },
  { store: "amazon", asin: "B0FL2QF7YJ", title: "Caixa de Som JBL PartyBox Encore Essential 2", img: "https://m.media-amazon.com/images/I/71Ar78y955L._AC_UL480_.jpg", guide: "caixadesom-2026.html", guideName: "Caixa de Som", expires: "2026-11-19" },
  { store: "kabum", kabumId: 460473, title: "Echo Dot 5ª geração Azul", img: "https://images.kabum.com.br/produtos/fotos/460473/echo-dot-5-geracao-amazon-com-alexa-smart-speaker-azul-b09b8qfyz2_1684329718_g.jpg", guide: "echo-alexa-2026.html", guideName: "Echo (Alexa)", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B083V41T6M", title: "Câmera TP-Link Tapo C100 Wi-Fi Full HD", img: "https://m.media-amazon.com/images/I/519Hw6bn8UL._AC_UL480_.jpg", guide: "cameraseguranca-2026.html", guideName: "Câmera de Segurança", expires: "2026-11-19" },
  { store: "amazon", asin: "B08TQ7TDT3", title: "Painel de Embutir Smart Elgin 18W", img: "https://m.media-amazon.com/images/I/41AWiAYJlgL._AC_UL480_.jpg", guide: "casainteligente-2026.html", guideName: "Iluminação Inteligente", expires: "2026-11-19" },
  { store: "kabum", kabumId: 191899, title: "Robô Aspirador KaBuM! Smart 100", img: "https://images.kabum.com.br/produtos/fotos/191899/robo-aspirador-e-passa-pano-kabum-smart-100-5-modos-de-limpeza-sensor-anti-queda-carregamento-automatico-aplicativo-bivolt-preto-kbsf007_1780684562_g.jpg", guide: "roboaspirador-2026.html", guideName: "Robô Aspirador", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B0FP8KDP36", title: "Fone Samsung Galaxy Buds Core", img: "https://m.media-amazon.com/images/I/31GMcveipGL._AC_UL480_.jpg", guide: "fonebluetooth-2026.html", guideName: "Fone TWS", expires: "2026-11-19" },
  { store: "amazon", asin: "B0DVCHL7PG", title: "Kit Logitech Pebble Keys 2 K380s + Pebble 2 M350s", img: "https://m.media-amazon.com/images/I/41qft2aDpLL._AC_UL480_.jpg", guide: "kit-teclado-mouse-2026.html", guideName: "Kit Teclado e Mouse", expires: "2026-11-19" },
  { store: "kabum", kabumId: 103657, title: "Power Bank Geonav 10.000 mAh", img: "https://images.kabum.com.br/produtos/fotos/103657/carregador-portatil-universal-geonav-10000-mah-preto-pb10kbk_1587066693_g.jpg", guide: "powerbank-2026.html", guideName: "Power Bank", expires: "2026-11-13", ends: "2026-11-13T10:00:00-03:00" },
  { store: "amazon", asin: "B09NL92H57", title: "Micro-ondas Mondial 21L MO-01-21-W (110V)", img: "https://m.media-amazon.com/images/I/61WJEyvwQtL._AC_UL480_.jpg", guide: "microondas-2026.html", guideName: "Micro-ondas", expires: "2026-11-19" },
  { store: "amazon", asin: "B0BQ7KJ9NV", title: "Monitor Samsung 32 pol. 4K UJ59", img: "https://m.media-amazon.com/images/I/91XfEXGz9UL._AC_UL480_.jpg", guide: "monitor-2026.html", guideName: "Monitor", expires: "2026-11-19" },
  { store: "amazon", asin: "B0DN4RM6X7", title: "Mouse Logitech M196 Bluetooth", img: "https://m.media-amazon.com/images/I/61Y0zPErIxL._AC_UL480_.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-19" },
  { store: "amazon", asin: "B094YV31R9", title: "Power Bank I2GO 10.000 mAh 20W", img: "https://m.media-amazon.com/images/I/51x6d0ZwylS._AC_UL480_.jpg", guide: "powerbank-2026.html", guideName: "Power Bank", expires: "2026-11-19" },
  { store: "amazon", asin: "B0FTC96JJ5", title: "Celular Samsung Galaxy S25 FE 128 GB", img: "https://m.media-amazon.com/images/I/51ydsfiGvOL._AC_UL480_.jpg", guide: "smartphone-2026.html", guideName: "Celular", expires: "2026-11-19" },
  { store: "amazon", asin: "B0GVP7Q8TX", title: "Smart TV Hisense 43 pol. 4K Hi-QLED", img: "https://m.media-amazon.com/images/I/81j7QkksKEL._AC_UL480_.jpg", guide: "smarttv-2026.html", guideName: "Smart TV", expires: "2026-11-19" },
  { store: "amazon", asin: "B0FDX5NC1G", title: "Samsung Galaxy Watch8 40 mm", img: "https://m.media-amazon.com/images/I/61zc3QnQvcL._AC_UL480_.jpg", guide: "smartwatch-2026.html", guideName: "Smartwatch", expires: "2026-11-19" },
  { store: "amazon", asin: "B0FMFRFNWG", title: "Tablet Samsung Galaxy Tab S10 Lite 128 GB", img: "https://m.media-amazon.com/images/I/51UFm7dGUuL._AC_UL480_.jpg", guide: "tablet-2026.html", guideName: "Tablet", expires: "2026-11-19" },
  { store: "amazon", asin: "B089B7Z8ZD", title: "Teclado Mecânico Redragon Dark Avenger K568R", img: "https://m.media-amazon.com/images/I/61O+xK4F6aL._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-19" },
  { store: "amazon", asin: "B08FXYKYLW", title: "Umidificador WAP Air Flow 4L com Difusor", img: "https://m.media-amazon.com/images/I/71a+5LPb9EL._AC_UL480_.jpg", guide: "umidificador-2026.html", guideName: "Umidificador", expires: "2026-11-19" },
  { store: "amazon", asin: "B0BTQY3GMZ", title: "Ventilador de Coluna Mallory Chronos com Controle", img: "https://m.media-amazon.com/images/I/71VRFzPsVIL._AC_UL480_.jpg", guide: "ventilador-2026.html", guideName: "Ventiladores", expires: "2026-11-19" },
  { store: "amazon", asin: "B0C6FT4QYV", title: "Air Fryer Mondial Dual AFD-01 8L Cesto Duplo (110V)", img: "https://m.media-amazon.com/images/I/81+27Tn2b+L._AC_UL480_.jpg", guide: "airfryer-2026.html", guideName: "Air Fryer", expires: "2026-11-19" },
  { store: "amazon", asin: "B09BJZ1PLS", title: "Cafeteira Nespresso CitiZ Preta (110V)", img: "https://m.media-amazon.com/images/I/51PfPllBUML._AC_UL480_.jpg", guide: "cafeteira-2026.html", guideName: "Cafeteira", expires: "2026-11-19" },
  { store: "amazon", asin: "B08HSRTHLR", title: "Lâmpada Inteligente Geonav 9W RGBW", img: "https://m.media-amazon.com/images/I/61-g0s43q1L._AC_UL480_.jpg", guide: "casainteligente-2026.html", guideName: "Iluminação Inteligente", expires: "2026-11-19" },
  { store: "amazon", asin: "B0DJ1QD7SL", title: "Mouse Trackball Logitech ERGO M575S", img: "https://m.media-amazon.com/images/I/51ncb3XF4ML._AC_UL480_.jpg", guide: "mouse-2026.html", guideName: "Mouse", expires: "2026-11-19" },
  { store: "amazon", asin: "B0D1DN9GR2", title: "Teclado Gamer Sem Fio Logitech G515 TKL", img: "https://m.media-amazon.com/images/I/61kFc75+7OL._AC_UL480_.jpg", guide: "teclado-2026.html", guideName: "Teclado", expires: "2026-11-19" }
];

// Lojas: link de afiliado e nome mostrado no botão.
const DEAL_STORES = {
  amazon: { name: "Amazon", url: d => `https://www.amazon.com.br/dp/${d.asin}?tag=${AFFILIATE_TAG}` },
  kabum: { name: "KaBuM!", url: d => `https://www.awin1.com/cread.php?awinmid=${AWIN_KABUM_ID}&awinaffid=${AWIN_AFFILIATE_ID}&ued=${encodeURIComponent('https://www.kabum.com.br/produto/' + d.kabumId)}` }
};

// Ofertas válidas agora (horário de Brasília), na ordem da lista.
function activeDeals() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const now = Date.now();
  return DEALS.filter(d => d.expires >= today && (!d.ends || Date.parse(d.ends) > now) && DEAL_STORES[d.store || 'amazon']);
}

// Quadro de produto: o mesmo na home e na página Últimas ofertas.
// Foto e nome levam à loja; embaixo, dois botões lado a lado:
// "Ver na <loja>" (cor da loja) e "Ver guia" (azul).
function dealCardHtml(d) {
  const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const key = d.store || 'amazon';
  const store = DEAL_STORES[key];
  const link = store.url(d).replace(/&/g, '&amp;');
  return `
      <article class="deal-card">
        <a class="deal-buy" href="${link}" target="_blank" rel="noopener sponsored" tabindex="-1" aria-hidden="true">
          <img class="deal-img" src="${d.img}" alt="" width="480" height="480" loading="lazy" decoding="async">
          <span class="deal-info"><span class="deal-cat">${e(d.guideName)}</span><span class="deal-title">${e(d.title)}</span></span>
        </a>
        <div class="deal-actions">
          <a class="deal-btn deal-btn-buy deal-btn-${key}" href="${link}" target="_blank" rel="noopener sponsored" aria-label="${e(d.title)}: ver preço na ${store.name}"><span class="deal-btn-long">Ver na </span>${store.name} <span aria-hidden="true">↗</span></a>
          <a class="deal-btn deal-btn-guide" href="${d.guide}" aria-label="Ver o guia de ${e(d.guideName)}"><span class="deal-btn-long">Ver </span>Guia</a>
        </div>
      </article>`;
}
