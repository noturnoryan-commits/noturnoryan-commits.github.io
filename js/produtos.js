/* TechAprovado — fichas de produto e comparador (notas do dev, 20/11/2026).
   Os dados de cada categoria ficam em data/produtos/<categoria>.json (gerados a partir do guia).
   Uma página serve todos os produtos: produto.html?id=<categoria>/<produto>.
   O comparador (comparar.html?cat=<categoria>&ids=a,b,c) mostra até 3 produtos da mesma categoria.
   A seleção para comparar fica guardada neste navegador (localStorage), só por conveniência.
   Os preços não aparecem: os botões levam ao preço atual em cada loja. */
(() => {
  const VERSAO = '20261120';
  const MAX = 3;
  const CHAVE = 'ta-comparar';
  // Guias que já têm dados padronizados (piloto). Ao gerar outra categoria, acrescente aqui.
  const GUIAS = { 'airfryer-2026.html': 'airfryer' };
  const LOJAS = {
    amazon: { nome: 'Amazon', url: l => /^[A-Z0-9]{10}$/.test(l.asin || '') ? `https://www.amazon.com.br/dp/${l.asin}?tag=techaprovad0b-20` : null },
    kabum: { nome: 'KaBuM!', url: l => /^\d+$/.test(String(l.id || '')) ? 'https://www.awin1.com/cread.php?awinmid=17729&awinaffid=3148451&ued=' + encodeURIComponent('https://www.kabum.com.br/produto/' + l.id) : null },
    mercadolivre: { nome: 'Mercado Livre', url: l => l.url || null },
    aliexpress: { nome: 'AliExpress', url: l => l.url || null },
    shopee: { nome: 'Shopee', url: l => l.url || null }
  };
  const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const nomeLoja = l => (LOJAS[l.loja] && LOJAS[l.loja].nome) || l.nome || l.loja;
  const urlLoja = l => (LOJAS[l.loja] ? LOJAS[l.loja].url(l) : null);
  const cache = {};
  const carregar = cat => cache[cat] || (cache[cat] = fetch(`data/produtos/${encodeURIComponent(cat)}.json?v=${VERSAO}`).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }));
  const linkProduto = (cat, id) => `produto.html?id=${encodeURIComponent(cat)}/${encodeURIComponent(id)}`;
  const linkComparar = (cat, ids) => `comparar.html?cat=${encodeURIComponent(cat)}${ids.length ? '&ids=' + ids.map(encodeURIComponent).join(',') : ''}`;
  const evento = (nome, dados) => { if (typeof window.gtag === 'function') window.gtag('event', nome, dados); };

  // Botões de loja no padrão das ofertas: duas por linha; se sobrar uma, ela ocupa a linha toda.
  const botoesLojas = (p, extraClasse = '') => {
    const lojas = (p.lojas || []).filter(urlLoja);
    if (!lojas.length) return '';
    const impar = lojas.length % 2 === 1;
    return `<div class="pd-stores ${extraClasse}">` + lojas.map((l, i) => `<a class="pd-store pd-store-${esc(l.loja)}${impar && i === lojas.length - 1 ? ' pd-store-wide' : ''}" href="${esc(urlLoja(l))}" target="_blank" rel="noopener sponsored" data-loja="${esc(l.loja)}" aria-label="Ver preço do ${esc(p.nome)} na ${esc(nomeLoja(l))}">Ver na ${esc(nomeLoja(l))} <span aria-hidden="true">↗</span></a>`).join('') + '</div>';
  };

  // ---------- Seleção para comparar ----------
  const ler = () => { try { const s = JSON.parse(localStorage.getItem(CHAVE) || 'null'); return s && s.cat && Array.isArray(s.ids) ? s : { cat: '', ids: [] }; } catch { return { cat: '', ids: [] }; } };
  const gravar = s => { try { localStorage.setItem(CHAVE, JSON.stringify(s)); } catch {} };
  let selecao = ler();
  const ouvintes = new Set();
  const avisar = () => ouvintes.forEach(f => f(selecao));
  const alternar = (cat, id) => {
    if (selecao.cat !== cat) selecao = { cat, ids: [] };
    const i = selecao.ids.indexOf(id);
    let msg = '';
    if (i >= 0) selecao.ids.splice(i, 1);
    else if (selecao.ids.length >= MAX) msg = `O comparador mostra até ${MAX} produtos. Tire um antes de incluir outro.`;
    else { selecao.ids.push(id); evento('comparar_incluir', { categoria: cat, produto: id }); }
    gravar(selecao); avisar();
    return msg;
  };
  const marcado = (cat, id) => selecao.cat === cat && selecao.ids.includes(id);

  // Barra fixa "Comparar (N)" — aparece quando há produto escolhido.
  let barra;
  const montarBarra = () => {
    if (barra || document.body.dataset.page === 'comparar') return;
    barra = document.createElement('div');
    barra.className = 'cmp-bar';
    barra.hidden = true;
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Produtos escolhidos para comparar');
    document.body.appendChild(barra);
    const pintar = s => {
      barra.hidden = !s.ids.length;
      if (!s.ids.length) return;
      barra.innerHTML = `<p><strong>${s.ids.length} de ${MAX}</strong> para comparar</p>` +
        `<a class="cmp-bar-go" href="${esc(linkComparar(s.cat, s.ids))}">${s.ids.length > 1 ? 'Comparar agora' : 'Abrir comparador'} <span aria-hidden="true">→</span></a>` +
        `<button type="button" class="cmp-bar-clear">Limpar</button>`;
      barra.querySelector('.cmp-bar-clear').addEventListener('click', () => { selecao = { cat: s.cat, ids: [] }; gravar(selecao); avisar(); });
    };
    ouvintes.add(pintar); pintar(selecao);
  };
  const aviso = (alvo, msg) => {
    if (!msg) return;
    let p = alvo.parentElement.querySelector('.cmp-msg');
    if (!p) { p = document.createElement('p'); p.className = 'cmp-msg'; p.setAttribute('role', 'status'); alvo.insertAdjacentElement('afterend', p); }
    p.textContent = msg; setTimeout(() => p.remove(), 4000);
  };
  // Botão "Comparar" reutilizável: <button data-cmp="cat/id">
  const ligarBotao = btn => {
    const [cat, id] = btn.dataset.cmp.split('/');
    const pintar = () => {
      const on = marcado(cat, id);
      btn.setAttribute('aria-pressed', String(on));
      btn.classList.toggle('is-on', on);
      btn.querySelector('.cmp-label').textContent = on ? 'Na comparação' : 'Comparar';
    };
    btn.addEventListener('click', e => { e.preventDefault(); aviso(btn, alternar(cat, id)); });
    ouvintes.add(pintar); pintar();
  };
  const botaoComparar = (cat, id, nome, classe = '') => `<button type="button" class="cmp-toggle ${classe}" data-cmp="${esc(cat)}/${esc(id)}" aria-pressed="false" aria-label="Comparar ${esc(nome)}"><span aria-hidden="true" class="cmp-ico">⇄</span><span class="cmp-label">Comparar</span></button>`;
  const ligarTodos = raiz => raiz.querySelectorAll('[data-cmp]:not([data-cmp-on])').forEach(b => { b.dataset.cmpOn = '1'; ligarBotao(b); });
  window.addEventListener('storage', e => { if (e.key === CHAVE) { selecao = ler(); avisar(); } });

  // ---------- Guia da categoria piloto: "Ver ficha", "Comparar" e "Comparar selecionados" ----------
  const guiaAtual = location.pathname.split('/').pop();
  const catGuia = GUIAS[guiaAtual];
  if (catGuia && document.querySelector('.ta-curadoria')) {
    carregar(catGuia).then(dados => {
      const porN = new Map(dados.produtos.map(p => [p.n, p]));
      document.querySelectorAll('.ta-curadoria article.analysis-card[id^="produto-"]').forEach(card => {
        const p = porN.get(Number(card.id.replace('produto-', '')));
        if (!p) return;
        const ficha = linkProduto(catGuia, p.id);
        const img = card.querySelector('.product-image');
        if (img && !img.closest('a')) { const a = document.createElement('a'); a.href = ficha; a.className = 'pd-img-link'; a.setAttribute('aria-label', `Ver ficha do ${p.nome}`); img.replaceWith(a); a.appendChild(img); }
        const h3 = card.querySelector('h3');
        if (h3 && !h3.querySelector('a')) h3.innerHTML = `<a href="${esc(ficha)}">${h3.innerHTML}</a>`;
        const acoes = document.createElement('div');
        acoes.className = 'pd-card-actions';
        acoes.innerHTML = `<a class="pd-card-btn" href="${esc(ficha)}">Ver ficha <span aria-hidden="true">→</span></a>` + botaoComparar(catGuia, p.id, p.nome, 'pd-card-btn');
        const destino = card.querySelector('.reason-list') || card.querySelector('.technical-explanation');
        (destino || card.querySelector('.card-content')).insertAdjacentElement(destino ? 'afterend' : 'beforeend', acoes);
      });
      // "Comparar todos" na frente da busca do guia.
      const acoesSel = document.querySelector('.ta-curadoria .selection-actions');
      const todos = acoesSel && acoesSel.querySelector('[data-compare]');
      if (todos) acoesSel.insertBefore(todos, acoesSel.firstChild);
      // A tabela "Comparar todos" acompanha o perfil e a busca escolhidos.
      const tabela = document.querySelector('.ta-curadoria #comparacao tbody');
      const sincronizar = () => {
        if (!tabela) return;
        tabela.querySelectorAll('tr').forEach(tr => {
          const alvo = tr.querySelector('a[href^="#produto-"]');
          const card = alvo && document.querySelector(alvo.getAttribute('href'));
          tr.hidden = !!(card && card.hidden);
        });
      };
      document.querySelectorAll('.ta-curadoria [data-filter], .ta-curadoria [data-guide-search]').forEach(el => el.addEventListener(el.matches('input') ? 'input' : 'click', () => setTimeout(sincronizar)));
      // Abaixo da curadoria: compara só os escolhidos.
      const vazio = document.querySelector('.ta-curadoria [data-empty]');
      if (vazio) {
        const caixa = document.createElement('div');
        caixa.className = 'pd-compare-selected';
        caixa.innerHTML = `<p>Marque <strong>Comparar</strong> em até ${MAX} modelos e veja todos os dados lado a lado.</p><a class="pd-compare-go" href="${esc(linkComparar(catGuia, []))}">Comparar selecionados <span class="pd-compare-count"></span> <span aria-hidden="true">→</span></a>`;
        vazio.insertAdjacentElement('afterend', caixa);
        const go = caixa.querySelector('.pd-compare-go');
        const pintar = s => { const ids = s.cat === catGuia ? s.ids : []; go.href = linkComparar(catGuia, ids); caixa.querySelector('.pd-compare-count').textContent = ids.length ? `(${ids.length})` : ''; go.classList.toggle('is-empty', !ids.length); };
        ouvintes.add(pintar); pintar(selecao);
      }
      ligarTodos(document); montarBarra();
    }).catch(() => {});
  }

  // ---------- Ofertas e home: "Comparar" na imagem dos produtos que já têm ficha ----------
  const ligarOfertas = () => {
    const cards = document.querySelectorAll('.deal-card:not([data-pd])');
    if (!cards.length) return;
    Promise.all(Object.values(GUIAS).map(c => carregar(c).then(d => [c, d]).catch(() => null))).then(lista => {
      const porAsin = new Map();
      lista.filter(Boolean).forEach(([c, d]) => d.produtos.forEach(p => { if (p.asin) porAsin.set(p.asin, [c, p]); }));
      document.querySelectorAll('.deal-card:not([data-pd])').forEach(card => {
        card.dataset.pd = '1';
        const link = card.querySelector('a[href*="amazon.com.br/dp/"]');
        const asin = link && (link.href.match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
        const hit = asin && porAsin.get(asin);
        if (!hit) return;
        const [c, p] = hit;
        card.classList.add('has-cmp');
        card.insertAdjacentHTML('afterbegin', botaoComparar(c, p.id, p.nome, 'cmp-on-image'));
        const guia = card.querySelector('.deal-btn-guide');
        if (guia) guia.insertAdjacentHTML('beforebegin', `<a class="deal-btn deal-btn-ficha" href="${esc(linkProduto(c, p.id))}">Ver ficha</a>`);
      });
      ligarTodos(document); if (selecao.ids.length || document.querySelector('.deal-card.has-cmp')) montarBarra();
    });
  };
  const grade = document.getElementById('dealsRail');
  if (grade) { ligarOfertas(); new MutationObserver(ligarOfertas).observe(grade, { childList: true }); }

  // ---------- produto.html ----------
  const raizProduto = document.querySelector('[data-produto-page]');
  if (raizProduto) {
    const [cat, id] = (new URLSearchParams(location.search).get('id') || '').split('/');
    const erro = () => { raizProduto.innerHTML = '<div class="pd-empty"><h1>Produto não encontrado</h1><p>O link pode estar incompleto ou o produto saiu do guia.</p><a class="pd-card-btn" href="categorias.html">Ver todos os guias <span aria-hidden="true">→</span></a></div>'; };
    if (!cat || !id) erro();
    else carregar(cat).then(d => {
      const p = d.produtos.find(x => x.id === id);
      if (!p) return erro();
      document.title = `${p.nome}: ficha técnica e curadoria | TechAprovado`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', `${p.nome}: ficha técnica padronizada, para quem faz sentido e o que ponderar. ${d.nome} na curadoria do TechAprovado.`);
      const linhas = d.grupos.map(g => `<tr class="pd-group"><th colspan="2" scope="colgroup">${esc(g.nome)}</th></tr>` + g.campos.map(c => `<tr><th scope="row">${esc(c.rotulo)}</th><td>${esc(p.ficha[c.id] || 'Não informado')}</td></tr>`).join('')).join('');
      const outros = d.produtos.filter(x => x.perfil === p.perfil && x.id !== p.id);
      raizProduto.innerHTML = `
        <nav class="pd-crumbs" aria-label="Você está em"><a href="/">TechAprovado</a><span aria-hidden="true">›</span><a href="${esc(d.guia)}">${esc(d.nome)}</a><span aria-hidden="true">›</span><span>${esc(p.nome)}</span></nav>
        <section class="pd-hero">
          <div class="pd-photo"><img src="${esc(p.imagem)}" alt="${esc(p.nome)}" width="480" height="480" decoding="async"></div>
          <div class="pd-head">
            <p class="pd-eyebrow">${esc(d.nome)} · ${esc(p.perfilNome)}${p.nivel ? ' · ' + esc(p.nivel) : ''}</p>
            <h1>${esc(p.nome)}</h1>
            ${p.subtitulo ? `<p class="pd-sub">${esc(p.subtitulo)}</p>` : ''}
            ${p.destaque ? `<p class="pd-badge">${esc(p.destaque)}</p>` : ''}
            ${botoesLojas(p)}
            <div class="pd-links"><a class="pd-card-btn" href="${esc(p.guiaUrl)}">Ver curadoria <span aria-hidden="true">→</span></a>${botaoComparar(cat, p.id, p.nome, 'pd-card-btn')}</div>
            <p class="pd-disclosure">Links de afiliado: o TechAprovado pode ganhar comissão, sem custo extra para você. O preço e o estoque mudam e podem ser diferentes entre as lojas.</p>
          </div>
        </section>
        <section class="pd-why" aria-label="Por que está na curadoria">
          ${p.porDentro ? `<div class="pd-box"><p class="pd-label">Por dentro da escolha</p><p>${esc(p.porDentro)}</p></div>` : ''}
          <dl class="pd-reasons">${p.fazSentido ? `<div><dt>Faz sentido</dt><dd>${esc(p.fazSentido)}</dd></div>` : ''}${p.pondere ? `<div class="caution"><dt>Pondere</dt><dd>${esc(p.pondere)}</dd></div>` : ''}</dl>
          ${p.analise ? `<p class="pd-analysis">${esc(p.analise)}</p>` : ''}
        </section>
        <section class="pd-specs" aria-labelledby="pd-ficha"><h2 id="pd-ficha">Ficha técnica</h2>
          <div class="pd-table-wrap"><table class="pd-table"><tbody>${linhas}</tbody></table></div>
          <p class="pd-source">${esc(p.fonteFicha || 'Dados informados pelo fabricante.')} Ficha padronizada para a categoria ${esc(d.nome)}: o que o fabricante não informa aparece como "Não informado".</p>
        </section>
        ${outros.length ? `<section class="pd-more" aria-labelledby="pd-outros"><h2 id="pd-outros">Outros modelos do perfil ${esc(p.perfilNome)}</h2><div class="pd-more-grid">${outros.map(o => `<article class="pd-mini"><a href="${esc(linkProduto(cat, o.id))}"><img src="${esc(o.imagem)}" alt="" width="120" height="120" loading="lazy"><span class="pd-mini-level">${esc(o.nivel)}</span><strong>${esc(o.nome)}</strong></a>${botaoComparar(cat, o.id, o.nome, 'pd-mini-cmp')}</article>`).join('')}</div></section>` : ''}`;
      ligarTodos(raizProduto); montarBarra();
      evento('ver_ficha', { categoria: cat, produto: p.id });
    }).catch(erro);
  }

  // ---------- comparar.html ----------
  const raizComparar = document.querySelector('[data-comparar-page]');
  if (raizComparar) {
    const qs = new URLSearchParams(location.search);
    let cat = qs.get('cat') || selecao.cat || Object.values(GUIAS)[0];
    let ids = (qs.get('ids') || '').split(',').filter(Boolean);
    if (!ids.length && selecao.cat === cat) ids = selecao.ids.slice();
    carregar(cat).then(d => {
      const valido = new Set(d.produtos.map(p => p.id));
      ids = ids.filter(i => valido.has(i)).slice(0, MAX);
      let soDiferencas = false;
      const salvar = () => {
        selecao = { cat, ids: ids.slice() }; gravar(selecao);
        history.replaceState(null, '', linkComparar(cat, ids));
      };
      const opcoes = atual => '<option value="">Escolher modelo…</option>' + Object.entries(d.perfis).map(([k, nome]) => `<optgroup label="${esc(nome)}">` + d.produtos.filter(p => p.perfil === k).map(p => `<option value="${esc(p.id)}"${p.id === atual ? ' selected' : ''}${ids.includes(p.id) && p.id !== atual ? ' disabled' : ''}>${esc(p.nome)}</option>`).join('') + '</optgroup>').join('');
      const pintar = () => {
        const ps = ids.map(i => d.produtos.find(p => p.id === i));
        const cols = Array.from({ length: MAX }, (_, k) => ps[k] || null);
        const cab = cols.map((p, k) => `<th scope="col" class="cmp-col">${p ? `
            <button type="button" class="cmp-remove" data-remove="${k}" aria-label="Tirar ${esc(p.nome)} da comparação">×</button>
            <a href="${esc(linkProduto(cat, p.id))}" class="cmp-head-link"><img src="${esc(p.imagem)}" alt="" width="140" height="140" loading="lazy"><span class="cmp-name">${esc(p.nome)}</span></a>
            <span class="cmp-meta">${esc(p.perfilNome)} · ${esc(p.nivel)}</span>` : `
            <label class="cmp-pick"><span class="cmp-pick-plus" aria-hidden="true">+</span><span>Adicionar modelo</span><select data-slot="${k}" aria-label="Escolher o ${k + 1}º modelo">${opcoes('')}</select></label>`}</th>`).join('');
        const diferente = cid => { const v = ps.map(p => (p.ficha[cid] || 'Não informado')); return ps.length < 2 || new Set(v).size > 1; };
        const corpo = d.grupos.map(g => {
          const campos = g.campos.filter(c => !soDiferencas || diferente(c.id));
          if (!campos.length) return '';
          return `<tr class="cmp-group"><th scope="colgroup" colspan="${MAX + 1}">${esc(g.nome)}</th></tr>` + campos.map(c => `<tr${diferente(c.id) && ps.length > 1 ? ' class="is-diff"' : ''}><th scope="row">${esc(c.rotulo)}</th>${cols.map(p => `<td>${p ? esc(p.ficha[c.id] || 'Não informado') : ''}</td>`).join('')}</tr>`).join('');
        }).join('');
        const extras = `<tr class="cmp-group"><th scope="colgroup" colspan="${MAX + 1}">Curadoria</th></tr>
          <tr><th scope="row">Faz sentido</th>${cols.map(p => `<td>${p ? esc(p.fazSentido) : ''}</td>`).join('')}</tr>
          <tr><th scope="row">Pondere</th>${cols.map(p => `<td>${p ? esc(p.pondere) : ''}</td>`).join('')}</tr>
          <tr class="cmp-buy"><th scope="row">Onde comprar</th>${cols.map(p => `<td>${p ? botoesLojas(p, 'pd-stores-compact') + `<a class="cmp-ficha" href="${esc(linkProduto(cat, p.id))}">Ver ficha completa →</a>` : ''}</td>`).join('')}</tr>`;
        raizComparar.querySelector('[data-cmp-table]').innerHTML = `<table class="cmp-table"><caption class="sr-only">Comparação de ${esc(d.nome)}</caption><thead><tr><th scope="col" class="cmp-corner"><span>${esc(d.nome)}</span></th>${cab}</tr></thead><tbody>${corpo}${extras}</tbody></table>`;
        raizComparar.querySelector('[data-cmp-title]').textContent = ps.length ? `Comparar ${d.nome.toLowerCase()}: ${ps.map(p => p.nome).join(' x ')}` : `Comparar ${d.nome.toLowerCase()}`;
        raizComparar.querySelector('[data-cmp-guide]').href = d.guia;
        raizComparar.querySelector('[data-cmp-guide]').textContent = `Ver o guia de ${d.nome}`;
        raizComparar.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => { ids.splice(Number(b.dataset.remove), 1); salvar(); pintar(); }));
        raizComparar.querySelectorAll('select[data-slot]').forEach(s => s.addEventListener('change', () => { if (s.value) { ids.push(s.value); salvar(); pintar(); evento('comparar_incluir', { categoria: cat, produto: s.value }); } }));
      };
      const chk = raizComparar.querySelector('[data-cmp-diff]');
      chk.addEventListener('change', () => { soDiferencas = chk.checked; pintar(); });
      salvar(); pintar();
    }).catch(() => { raizComparar.querySelector('[data-cmp-table]').innerHTML = '<p class="pd-empty">Não foi possível carregar os dados desta categoria.</p>'; });
  }
})();
