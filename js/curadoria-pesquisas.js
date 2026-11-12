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

// Lojas parceiras (12/11/2026): produto vendido em mais de uma loja ganha o botão "Ver preços",
// que abre um quadro com as lojas. O link da Amazon continua no HTML (funciona sem JavaScript).
// No HTML: <a class="shop-link" href="(Amazon)" data-kabum="(número do produto na KaBuM!)" data-name="(nome)">
(() => {
  const guide = document.querySelector('.ta-curadoria');
  const links = guide ? [...guide.querySelectorAll('a.shop-link[data-kabum]')] : [];
  if (!links.length) return;
  const kabum = id => 'https://www.awin1.com/cread.php?awinmid=17729&awinaffid=3148451&ued=' + encodeURIComponent('https://www.kabum.com.br/produto/' + id);
  const dialog = document.createElement('dialog');
  dialog.className = 'store-dialog';
  dialog.setAttribute('aria-labelledby', 'storeDialogTitle');
  dialog.innerHTML = `
    <div class="store-dialog-box">
      <button type="button" class="store-dialog-close" aria-label="Fechar">×</button>
      <p class="store-dialog-eyebrow">LOJAS PARCEIRAS</p>
      <h2 id="storeDialogTitle"></h2>
      <ul class="store-list">
        <li><span class="store-name">Amazon</span><a class="store-btn store-btn-amazon" target="_blank" rel="noopener sponsored" data-store="amazon" aria-label="Ver preço na Amazon">Ver preço <span aria-hidden="true">↗</span></a></li>
        <li><span class="store-name">KaBuM!</span><a class="store-btn store-btn-kabum" target="_blank" rel="noopener sponsored" data-store="kabum" aria-label="Ver preço na KaBuM!">Ver preço <span aria-hidden="true">↗</span></a></li>
      </ul>
      <p class="store-dialog-note">O preço e o estoque mudam o tempo todo e podem ser diferentes entre as lojas: compare antes de comprar. Links de afiliado: o TechAprovado pode ganhar comissão, sem custo extra para você.</p>
    </div>`;
  guide.appendChild(dialog);
  const title = dialog.querySelector('h2');
  const amazonBtn = dialog.querySelector('[data-store="amazon"]');
  const kabumBtn = dialog.querySelector('[data-store="kabum"]');
  let opener = null;
  const close = () => { dialog.close(); };
  dialog.querySelector('.store-dialog-close').addEventListener('click', close);
  dialog.addEventListener('click', e => { if (e.target === dialog) close(); });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  [amazonBtn, kabumBtn].forEach(btn => btn.addEventListener('click', () => {
    if (typeof window.gtag === 'function') window.gtag('event', 'clique_loja', { loja: btn.dataset.store, produto: title.textContent });
    setTimeout(close, 300);
  }));
  links.forEach(a => {
    const name = a.dataset.name || a.closest('article')?.querySelector('h3')?.textContent.trim() || '';
    a.dataset.amazon = a.href;
    a.setAttribute('aria-haspopup', 'dialog');
    a.setAttribute('aria-label', `Ver preços${name ? ' do ' + name : ''} nas lojas parceiras`);
    a.innerHTML = 'Ver preços <span aria-hidden="true">›</span>';
    a.addEventListener('click', e => {
      if (typeof dialog.showModal !== 'function') return; // navegador antigo: segue para a Amazon
      e.preventDefault();
      opener = a;
      title.textContent = name;
      amazonBtn.href = a.dataset.amazon;
      kabumBtn.href = kabum(a.dataset.kabum);
      dialog.showModal();
      if (typeof window.gtag === 'function') window.gtag('event', 'ver_precos', { produto: name });
    });
  });
})();
