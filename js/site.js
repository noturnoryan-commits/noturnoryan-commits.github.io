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
