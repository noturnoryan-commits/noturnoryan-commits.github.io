/* TechAprovado — menus do topo, Escolhas, WhatsApp flutuante e voltar ao topo (25/10/2026).
   Roda em todas as páginas (fica no começo do site.js, antes do menu do celular). Para editar:
   - Guias de cada categoria: lista TA_CATEGORIES abaixo (adicione o guia novo na categoria certa).
   - Os 6 produtos do botão Escolhas: lista TA_PICKS (asin = código do produto na Amazon).
   - Link da Comunidade do WhatsApp: TA_WHATSAPP. */
(() => {
  const TAG = 'techaprovad0f-20';
  const TA_WHATSAPP = 'https://chat.whatsapp.com/LphALpUxOLQLezwD0XHHjJ';

  const TA_CATEGORIES = [
    { id: 'casa', icon: '🏠', name: 'Casa', desc: 'Cozinha, limpeza, climatização e TV', page: 'categoria-casa.html', guides: [
      ['airfryer-2026.html', 'Air Fryer'], ['aspiradorvertical-2026.html', 'Aspirador de Pó Vertical'], ['cafeteira-2026.html', 'Cafeteira Elétrica'],
      ['chuveiroeletrico-2026.html', 'Chuveiro Elétrico'], ['fire-tv-stick-2026.html', 'Fire TV Stick'], ['geladeiras-2026.html', 'Geladeiras'],
      ['maquinadelavar-2026.html', 'Máquina de Lavar'], ['microondas-2026.html', 'Micro-ondas'], ['projetor-portatil-2026.html', 'Projetor Portátil'],
      ['roboaspirador-2026.html', 'Robô Aspirador'], ['smarttv-2026.html', 'Smart TVs'], ['umidificador-2026.html', 'Umidificador de Ar'],
      ['ventilador-2026.html', 'Ventilador de Mesa/Coluna/Torre'], ['ventiladordeteto-2026.html', 'Ventilador de Teto'] ] },
    { id: 'escritorio', icon: '💻', name: 'Escritório & PC', desc: 'Notebooks, monitores, mouses e teclados', page: 'categoria-escritorio-pc.html', guides: [
      ['monitor-2026.html', 'Monitor'], ['mouse-2026.html', 'Mouse'], ['notebook-2026.html', 'Notebooks'], ['teclado-2026.html', 'Teclado'] ] },
    { id: 'vestivel', icon: '⌚', name: 'Vestível', desc: 'Relógios, fones e roupa tech', page: 'categoria-vestivel.html', guides: [
      ['camisetatech-2026.html', 'Camiseta Tech'], ['fonebluetooth-2026.html', 'Fone Bluetooth TWS'], ['foneoverear-2026.html', 'Fone Over-Ear Bluetooth'],
      ['smartwatch-2026.html', 'Smartwatch'] ] },
    { id: 'casa-inteligente', icon: '💡', name: 'Casa Inteligente', desc: 'Lâmpadas, tomadas, câmeras e fechaduras', page: 'categoria-casa-inteligente.html', guides: [
      ['cameraseguranca-2026.html', 'Câmera de Segurança Wi-Fi'], ['echo-alexa-2026.html', 'Echo (Alexa)'], ['fechaduradigital-2026.html', 'Fechadura Digital'],
      ['casainteligente-2026.html', 'Iluminação Inteligente'], ['tomadainteligente-2026.html', 'Tomada Inteligente'] ] },
    { id: 'mobilidade', icon: '📱', name: 'Mobilidade', desc: 'Celulares, caixas de som e acessórios', page: 'categoria-mobilidade.html', guides: [
      ['caixadesom-2026.html', 'Caixa de Som Bluetooth'], ['smartphone-2026.html', 'Celular'], ['kindle-2026.html', 'Kindle'],
      ['powerbank-2026.html', 'Power Bank'], ['rastreadorbluetooth-2026.html', 'Rastreador Bluetooth'] ] }
  ];

  // Os 6 produtos do botão "Escolhas" (link direto para a Amazon com a tag de afiliado).
  const TA_PICKS = [
    { asin: 'B0GXFFSVYM', name: 'Dreame D15 Plus', badge: 'Automação em destaque', img: 'https://m.media-amazon.com/images/I/61N-ZmR2MxL._AC_UL480_.jpg', guide: 'roboaspirador-2026.html#produto-10' },
    { asin: 'B085W72XZK', name: 'EKAZA Tomada Inteligente T005', badge: 'Casa inteligente acessível', img: 'https://m.media-amazon.com/images/I/61uj62cx-bL._AC_UL480_.jpg', guide: 'tomadainteligente-2026.html#produto-1' },
    { asin: 'B0DF2WSGF6', name: 'Monitor LG 24MS500 IPS 100Hz', badge: 'Custo-benefício no escritório', img: 'https://m.media-amazon.com/images/I/61EXtxtW1gL._AC_UL480_.jpg', guide: 'monitor-2026.html#produto-4' },
    { asin: 'B0F4884LN3', name: 'soundcore Q20i da Anker', badge: 'Upgrade que vale a pena', img: 'https://m.media-amazon.com/images/I/61UAFRru23L._AC_UL480_.jpg', guide: 'foneoverear-2026.html#produto-5' },
    { asin: 'B0CVCLGV1W', name: 'Samsung Galaxy Fit3', badge: 'Melhor custo-benefício vestível', img: 'https://m.media-amazon.com/images/I/61o3-pf41tL._AC_UL480_.jpg', guide: 'smartwatch-2026.html#produto-4' },
    { asin: 'B0F7T2Y46Y', name: 'Caixa de Som JBL Flip 7', badge: 'Melhor custo-benefício em som', img: 'https://m.media-amazon.com/images/I/61S6CABfB7L._AC_UL480_.jpg', guide: 'caixadesom-2026.html#produto-8' }
  ];

  const nav = document.getElementById('main-nav');
  const isHome = !!document.getElementById('ofertas');
  const offersHref = isHome ? '#ofertas' : 'index.html#ofertas';
  const here = location.pathname.split('/').pop() || 'index.html';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const desktop = () => matchMedia('(min-width: 761px)').matches;
  const canHover = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (nav) {
    const catLink = nav.querySelector('a[href$="categorias.html"]');
    const pickLink = nav.querySelector('a[href$="#aprovados"]');
    const items = [];

    const makeItem = (link, key, label, panelHtml) => {
      const wrap = document.createElement('div');
      wrap.className = 'nav-item nav-item-' + key;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-trigger';
      btn.id = 'nav-trigger-' + key;
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'nav-panel-' + key);
      btn.innerHTML = label + '<svg aria-hidden="true" viewBox="0 0 12 12"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>';
      if (link.getAttribute('aria-current')) btn.classList.add('is-current');
      const panel = document.createElement('div');
      panel.className = 'nav-panel nav-panel-' + key;
      panel.id = 'nav-panel-' + key;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', btn.id);
      panel.innerHTML = panelHtml;
      wrap.append(btn, panel);
      link.replaceWith(wrap);
      items.push({ wrap, btn, panel });
      return { wrap, btn, panel };
    };

    const closeAll = except => items.forEach(it => {
      if (it === except) return;
      it.wrap.classList.remove('is-open');
      it.btn.setAttribute('aria-expanded', 'false');
    });
    const setOpen = (it, open) => {
      closeAll(open ? it : null);
      it.wrap.classList.toggle('is-open', open);
      it.btn.setAttribute('aria-expanded', String(open));
    };

    /* ---------- Categorias ---------- */
    if (catLink) {
      const total = TA_CATEGORIES.reduce((n, c) => n + c.guides.length, 0);
      const side = TA_CATEGORIES.map((c, i) => `
        <li><button type="button" class="mega-cat${i === 0 ? ' is-active' : ''}" data-cat="${c.id}" aria-expanded="${i === 0}">
          <span class="mega-cat-icon" aria-hidden="true">${c.icon}</span>
          <span class="mega-cat-text"><strong>${esc(c.name)}</strong><small>${c.guides.length} ${c.guides.length === 1 ? 'guia' : 'guias'}</small></span>
          <svg class="mega-cat-arrow" aria-hidden="true" viewBox="0 0 12 12"><path d="M4.5 2.5 8 6l-3.5 3.5"/></svg>
        </button>
        <div class="mega-guides-mobile" data-cat-mobile="${c.id}"></div></li>`).join('');
      const guidesHtml = c => `
        <div class="mega-guides-head">
          <span class="mega-guides-icon" aria-hidden="true">${c.icon}</span>
          <div><p class="mega-guides-title">${esc(c.name)}</p><p class="mega-guides-desc">${esc(c.desc)}</p></div>
        </div>
        <ul class="mega-guides-list">${c.guides.map(([href, name]) =>
          `<li><a href="${href}"${href === here ? ' aria-current="page"' : ''}>${esc(name)}</a></li>`).join('')}</ul>
        <a class="mega-guides-all" href="${c.page}">Ver a categoria ${esc(c.name)} <span aria-hidden="true">→</span></a>`;
      const panelHtml = `
        <div class="mega">
          <div class="mega-side">
            <a class="mega-offers" href="${offersHref}">
              <span class="mega-offers-fire" aria-hidden="true">🔥</span>
              <span class="mega-offers-text"><strong>Ofertas do Dia</strong><small>Descontos conferidos na Amazon</small></span>
              <span class="mega-offers-go" aria-hidden="true">→</span>
            </a>
            <p class="mega-label">Categorias</p>
            <ul class="mega-cats">${side}</ul>
            <a class="mega-all" href="categorias.html">Ver as 5 categorias e os ${total} guias <span aria-hidden="true">→</span></a>
          </div>
          <div class="mega-guides" aria-live="polite">${guidesHtml(TA_CATEGORIES[0])}</div>
        </div>`;
      const it = makeItem(catLink, 'cat', 'Categorias', panelHtml);
      const pane = it.panel.querySelector('.mega-guides');
      const activate = (id, fromHover) => {
        const c = TA_CATEGORIES.find(x => x.id === id);
        if (!c) return;
        it.panel.querySelectorAll('.mega-cat').forEach(b => {
          const on = b.dataset.cat === id;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-expanded', String(on && (desktop() || b.closest('li').classList.contains('is-expanded'))));
        });
        if (desktop()) { pane.innerHTML = guidesHtml(c); return; }
        if (fromHover) return;
        // Celular: acordeão — cada categoria abre seus guias logo abaixo.
        const li = it.panel.querySelector(`[data-cat="${id}"]`).closest('li');
        const wasOpen = li.classList.contains('is-expanded');
        it.panel.querySelectorAll('.mega-cats > li').forEach(l => { l.classList.remove('is-expanded'); l.querySelector('.mega-guides-mobile').innerHTML = ''; });
        if (!wasOpen) { li.classList.add('is-expanded'); li.querySelector('.mega-guides-mobile').innerHTML = guidesHtml(c); }
        li.querySelector('.mega-cat').setAttribute('aria-expanded', String(!wasOpen));
      };
      it.panel.querySelectorAll('.mega-cat').forEach(b => {
        b.addEventListener('click', () => activate(b.dataset.cat));
        b.addEventListener('mouseenter', () => { if (desktop() && canHover()) activate(b.dataset.cat, true); });
        b.addEventListener('focus', () => { if (desktop()) activate(b.dataset.cat, true); });
      });
      // Abre já na categoria da página atual, quando houver.
      const currentCat = TA_CATEGORIES.find(c => c.page === here || c.guides.some(g => g[0] === here));
      if (currentCat) activate(currentCat.id, true);
    }

    /* ---------- Escolhas ---------- */
    if (pickLink) {
      const cards = TA_PICKS.map(p => `
        <li class="pick">
          <a class="pick-buy" href="https://www.amazon.com.br/dp/${p.asin}?tag=${TAG}" target="_blank" rel="noopener sponsored" aria-label="${esc(p.name)}: ver na Amazon">
            <span class="pick-img"><img src="${p.img}" alt="" width="96" height="96" loading="lazy" decoding="async"></span>
            <span class="pick-text"><small>${esc(p.badge)}</small><strong>${esc(p.name)}</strong><span class="pick-cta">Ver na Amazon <span aria-hidden="true">↗</span></span></span>
          </a>
          <a class="pick-guide" href="${p.guide}">Ler a análise</a>
        </li>`).join('');
      const panelHtml = `
        <div class="picks">
          <div class="picks-head">
            <p class="picks-title">Escolhas TechAprovado</p>
            <a class="picks-more" href="${isHome ? '#aprovados' : 'index.html#aprovados'}">Por que escolhemos <span aria-hidden="true">→</span></a>
          </div>
          <ul class="picks-grid">${cards}</ul>
          <p class="picks-note">Links de afiliado da Amazon: o preço é o mesmo pra você. Confira o valor atual na loja.</p>
        </div>`;
      makeItem(pickLink, 'picks', 'Escolhas', panelHtml);
    }

    /* ---------- Comportamento comum ---------- */
    items.forEach(it => {
      let timer;
      it.btn.addEventListener('click', e => { e.stopPropagation(); setOpen(it, !it.wrap.classList.contains('is-open')); });
      it.wrap.addEventListener('mouseenter', () => { if (!desktop() || !canHover()) return; clearTimeout(timer); timer = setTimeout(() => setOpen(it, true), 90); });
      it.wrap.addEventListener('mouseleave', () => { if (!desktop() || !canHover()) return; clearTimeout(timer); timer = setTimeout(() => setOpen(it, false), 220); });
      it.panel.addEventListener('click', e => { if (e.target.closest('a')) setOpen(it, false); });
    });
    document.addEventListener('click', e => { if (!e.target.closest('.nav-item')) closeAll(); });
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const open = items.find(it => it.wrap.classList.contains('is-open'));
      if (open) { setOpen(open, false); open.btn.focus(); }
    });
    addEventListener('resize', () => closeAll());
  }

  /* ---------- WhatsApp flutuante + voltar ao topo ---------- */
  const dock = document.createElement('div');
  dock.className = 'float-dock';
  dock.innerHTML = `
    <button type="button" class="to-top" aria-label="Voltar ao topo" tabindex="-1">
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 14l6-6 6 6"/></svg>
    </button>
    <div class="wa-bubble" role="status" hidden>
      <button type="button" class="wa-bubble-close" aria-label="Fechar aviso">×</button>
      <strong>🔥 Ofertas no WhatsApp</strong>
      <span>Promoções com preço conferido, por categoria. Grátis.</span>
    </div>
    <a class="wa-float" href="${TA_WHATSAPP}" target="_blank" rel="noopener" aria-label="Entrar na Comunidade de ofertas do TechAprovado no WhatsApp">
      <span class="wa-float-label">Comunidade de ofertas</span>
      <span class="wa-float-icon"><svg aria-hidden="true" viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 3C9.08 3 3.43 8.64 3.43 15.6c0 2.22.58 4.39 1.69 6.3L3.33 28.5l6.78-1.78a12.6 12.6 0 0 0 5.93 1.5h.01c6.95 0 12.61-5.65 12.61-12.6C28.66 8.64 23 3 16.04 3Zm0 23.08h-.01a10.45 10.45 0 0 1-5.33-1.46l-.38-.23-4.02 1.06 1.07-3.92-.25-.4a10.43 10.43 0 0 1-1.6-5.53c0-5.78 4.7-10.48 10.53-10.48 2.8 0 5.44 1.09 7.42 3.08a10.4 10.4 0 0 1 3.07 7.41c0 5.78-4.71 10.47-10.5 10.47Zm5.75-7.84c-.32-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.21-.37.24-.68.08-.32-.16-1.33-.49-2.53-1.56a9.5 9.5 0 0 1-1.75-2.18c-.18-.32-.02-.49.14-.64.14-.14.32-.37.47-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.33 1.34.52 1.8.66.75.24 1.44.21 1.98.13.6-.09 1.86-.76 2.12-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.6-.37Z"/></svg></span>
    </a>`;
  document.body.appendChild(dock);

  const toTop = dock.querySelector('.to-top');
  const syncTop = () => {
    const show = scrollY > innerHeight * 0.9;
    toTop.classList.toggle('is-visible', show);
    toTop.tabIndex = show ? 0 : -1;
  };
  syncTop(); addEventListener('scroll', syncTop, { passive: true });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Balão de convite: aparece uma vez por sessão, depois de 8 s ou de rolar metade da página.
  const bubble = dock.querySelector('.wa-bubble');
  const seen = () => { try { return sessionStorage.getItem('techa-wa-bubble') === '1'; } catch (e) { return false; } };
  const markSeen = () => { try { sessionStorage.setItem('techa-wa-bubble', '1'); } catch (e) {} };
  let bubbleTimer;
  const showBubble = () => {
    if (seen() || document.querySelector('.cookie-banner')) return;
    bubble.hidden = false; markSeen();
    bubbleTimer = setTimeout(() => { bubble.hidden = true; }, 9000);
  };
  if (!seen()) {
    const t = setTimeout(showBubble, 8000);
    const onScroll = () => {
      if (scrollY > (document.documentElement.scrollHeight - innerHeight) * 0.5) {
        clearTimeout(t); removeEventListener('scroll', onScroll); showBubble();
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
  }
  dock.querySelector('.wa-bubble-close').addEventListener('click', () => { clearTimeout(bubbleTimer); bubble.hidden = true; });

  // Sobe o botão quando o aviso de cookies está aberto, para não cobrir os botões dele.
  const syncCookie = () => {
    const cb = document.querySelector('.cookie-banner');
    document.documentElement.style.setProperty('--dock-lift', cb ? (cb.offsetHeight + 16) + 'px' : '0px');
  };
  new MutationObserver(syncCookie).observe(document.body, { childList: true });
  addEventListener('resize', syncCookie);
  requestAnimationFrame(syncCookie);

  /* ---------- Barra de leitura nos guias ---------- */
  if (document.querySelector('.rank-section')) {
    const bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const syncBar = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    syncBar(); addEventListener('scroll', syncBar, { passive: true }); addEventListener('resize', syncBar);
  }
})();
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('main-nav');
  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('menu-open');
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }
  const syncHeader = () => header?.classList.toggle('is-scrolled', scrollY > 8);
  syncHeader(); addEventListener('scroll', syncHeader, {passive:true});
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

/* Aviso de cookies (LGPD) — o Google Analytics só grava cookies depois do "Aceitar".
   O consentimento padrão "negado" é definido no <head> de cada página. */
(() => {
  const KEY = 'techa-consent';
  const read = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const save = v => { try { localStorage.setItem(KEY, v); } catch (e) {} };
  const apply = v => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: v === 'granted' ? 'granted' : 'denied' });
    }
  };
  let banner = null;
  const close = () => { if (banner) { banner.remove(); banner = null; } };
  const open = () => {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<p>Usamos cookies do Google Analytics só para entender quais guias são úteis — nada de anúncios. ' +
      'Você escolhe. <a href="privacidade.html">Política de Privacidade</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn cookie-btn-ghost" data-consent="denied">Recusar</button>' +
      '<button type="button" class="cookie-btn" data-consent="granted">Aceitar</button>' +
      '</div>';
    banner.addEventListener('click', e => {
      const btn = e.target.closest('[data-consent]');
      if (!btn) return;
      const v = btn.getAttribute('data-consent');
      save(v); apply(v); close();
    });
    document.body.appendChild(banner);
  };
  document.addEventListener('click', e => {
    if (e.target.closest('[data-cookie-prefs]')) { e.preventDefault(); open(); }
  });
  if (!read()) open();
})();
