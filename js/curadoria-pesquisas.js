/* Interações limitadas ao main das pesquisas; não altera navegação ou consentimento. */
(() => {
  const guide = document.querySelector('.ta-curadoria');
  if (!guide) return;
  const cards = [...guide.querySelectorAll('[data-product]')];
  const search = guide.querySelector('[data-guide-search]');
  const filters = [...guide.querySelectorAll('[data-filter]')];
  let filter = 'todos';
  const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const terms = new Map(cards.map(card => [card, normalize(card.textContent)]));
  const update = () => {
    const query = normalize(search.value.trim());
    let count = 0;
    cards.forEach(card => {
      const matches = (filter === 'todos' || card.dataset.groups.split(' ').includes(filter)) && terms.get(card).includes(query);
      card.hidden = !matches;
      if (matches) count++;
    });
    guide.querySelector('[data-results]').textContent = `${count} ${count === 1 ? 'modelo encontrado' : 'modelos da pesquisa'}`;
    guide.querySelector('[data-empty]').hidden = count !== 0;
    // Páginas por perfil (01/11/2026): esconde o perfil que ficou sem modelos visíveis.
    guide.querySelectorAll('[data-profile-section]').forEach(section => {
      section.hidden = ![...section.querySelectorAll('[data-product]')].some(card => !card.hidden);
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  };
  filters.forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; update(); }));
  search.addEventListener('input', update);
  const compare = guide.querySelector('[data-compare]');
  compare.addEventListener('click', () => {
    const target = guide.querySelector('#comparacao');
    target.hidden = !target.hidden;
    compare.setAttribute('aria-expanded', String(!target.hidden));
    if (!target.hidden) target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
  guide.querySelectorAll('a[href^="#produto-"], a[href^="#"][class*="profile-link"], .technical-columns a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    filter = 'todos'; search.value = ''; update();
  }));
  const openFragment = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target || !guide.contains(target)) return;
    filter = 'todos'; search.value = ''; update();
    const details = target.closest('details');
    if (details) details.open = true;
  };
  window.addEventListener('hashchange', openFragment);
  openFragment();
})();

// Ficha traduzida: mostra o espaço de sempre e um "Ler mais" só quando o texto passa dele.
(() => {
  const textos = document.querySelectorAll('.ta-perfis [data-concept-text]');
  if (!textos.length) return;
  document.querySelector('.ta-perfis').classList.add('concept-clamp');
  const medir = () => textos.forEach(t => {
    const btn = t.nextElementSibling;
    if (!btn || !btn.matches('[data-concept-more]')) return;
    if (t.classList.contains('is-open')) { btn.hidden = false; return; }
    btn.hidden = t.scrollHeight <= t.clientHeight + 2;
    t.classList.toggle('is-clamped', !btn.hidden);
  });
  textos.forEach(t => {
    const btn = t.nextElementSibling;
    if (!btn) return;
    btn.addEventListener('click', () => {
      const aberto = t.classList.toggle('is-open');
      t.classList.toggle('is-clamped', !aberto);
      btn.setAttribute('aria-expanded', aberto);
      btn.firstElementChild.textContent = aberto ? 'Ler menos' : 'Ler mais';
      btn.lastElementChild.textContent = aberto ? '↑' : '↓';
      if (!aberto) t.closest('article').scrollIntoView({ block: 'nearest' });
    });
  });
  medir();
  window.addEventListener('resize', medir);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
})();

// Ficha traduzida: pontos extras atrás de "Ver mais N pontos da ficha".
(() => {
  const extra = document.querySelector('.ta-perfis [data-concept-extra]');
  const btn = document.querySelector('.ta-perfis [data-concept-extra-toggle]');
  if (!extra || !btn) return;
  document.querySelector('.ta-perfis').classList.add('concept-extra-ready');
  btn.hidden = false;
  btn.addEventListener('click', () => {
    const aberto = extra.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', aberto);
    btn.firstElementChild.textContent = aberto ? btn.dataset.labelClose : btn.dataset.labelOpen;
    btn.lastElementChild.textContent = aberto ? '↑' : '↓';
    window.dispatchEvent(new Event('resize')); // mede os "Ler mais" dos pontos que acabaram de aparecer
    if (aberto) extra.querySelector('article')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else btn.closest('section').scrollIntoView({ block: 'start' });
  });
})();

// Lojas parceiras (corrigido em 16/11/2026): o quadro pop-up foi retirado (política da Amazon sobre
// links em janelas/camadas). Agora o produto com KaBuM! ganha "Mais lojas (1)", que abre um painel
// DENTRO do próprio card. O link da Amazon continua no HTML e abre direto.
// No HTML: <a class="shop-link" href="(Amazon)" data-kabum="(número do produto na KaBuM!)">
(() => {
  const guide = document.querySelector('.ta-curadoria');
  const links = guide ? [...guide.querySelectorAll('article.analysis-card a.shop-link[data-kabum]')] : [];
  const kabum = id => 'https://www.awin1.com/cread.php?awinmid=17729&awinaffid=3148451&ued=' + encodeURIComponent('https://www.kabum.com.br/produto/' + id);
  links.forEach((a, i) => {
    const card = a.closest('article');
    const nome = card.querySelector('h3')?.textContent.trim() || '';
    const id = `lojas-${card.id}-${i}`;
    const wrap = document.createElement('div');
    wrap.className = 'store-row';
    a.replaceWith(wrap);
    wrap.appendChild(a);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'store-more';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', id);
    btn.innerHTML = 'Mais lojas (1) <span aria-hidden="true">↓</span>';
    wrap.appendChild(btn);
    const panel = document.createElement('div');
    panel.className = 'store-panel';
    panel.id = id;
    panel.hidden = true;
    panel.innerHTML = `<ul><li><span class="store-name">KaBuM!</span><a class="store-btn store-btn-kabum" href="${kabum(a.dataset.kabum).replace(/&/g, '&amp;')}" target="_blank" rel="noopener sponsored" data-loja="kabum" aria-label="Ver preço do ${nome.replace(/"/g, '&quot;')} na KaBuM!">Ver preço <span aria-hidden="true">↗</span></a></li></ul><p class="store-note">O preço e o estoque mudam e podem ser diferentes entre as lojas.</p>`;
    wrap.after(panel);
    btn.addEventListener('click', () => {
      const abrir = panel.hidden;
      panel.hidden = !abrir;
      btn.setAttribute('aria-expanded', String(abrir));
      btn.lastElementChild.textContent = abrir ? '↑' : '↓';
      if (abrir && typeof window.gtag === 'function') window.gtag('event', 'mais_lojas', { produto: nome });
    });
    panel.querySelector('a').addEventListener('click', () => {
      if (typeof window.gtag === 'function') window.gtag('event', 'clique_loja', { loja: 'kabum', produto: nome });
    });
  });
})();
