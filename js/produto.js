/* TechAprovado — página única de produto (produto.html?id=CÓDIGO) e comparador (comparar.html?ids=A,B,C).
   Os dados vêm de data/produtos/<código>.json (gerados por scripts/gerar-produtos.py a partir dos guias)
   e os links das lojas de js/lojas.json. O site é estático: preço e estoque ficam nas lojas.
   Regras: nenhum preço, nota ou estrela; links de afiliado só em botão visível (sem pop-up). */
(() => {
  const VERSAO = '20261125';
  const LOJAS = {
    amazon: { nome: 'Amazon', url: l => /^[A-Z0-9]{10}$/.test(l.asin) ? `https://www.amazon.com.br/dp/${l.asin}?tag=techaprovad0b-20` : null },
    kabum: { nome: 'KaBuM!', url: l => /^\d+$/.test(String(l.id)) ? 'https://www.awin1.com/cread.php?awinmid=17729&awinaffid=3148451&ued=' + encodeURIComponent('https://www.kabum.com.br/produto/' + l.id) : null },
    mercadolivre: { nome: 'Mercado Livre', url: l => seguro(l.url, ['meli.la']) },
    shopee: { nome: 'Shopee', url: l => seguro(l.url, ['s.shopee.com.br', 'shopee.com.br', 'www.shopee.com.br']) },
    aliexpress: { nome: 'AliExpress', url: l => seguro(l.url, ['s.click.aliexpress.com', 'pt.aliexpress.com', 'aliexpress.com', 'www.aliexpress.com']) }
  };
  // Rótulos que significam a mesma coisa em guias diferentes (padronização da ficha por categoria).
  const SINONIMOS = { 'Cabos': 'Cabo', 'Conexões': 'Conexão', 'Reservatórios': 'Reservatório', 'Extra': 'Extras', 'Funciona com': 'Compatível', 'Aparelhos': 'Compatível', 'Leitura / gravação': 'Velocidade', 'Leitura': 'Velocidade', 'Resolução nativa': 'Resolução', 'Porta': 'Portas', 'Taxa': 'Taxa de atualização', 'Recursos': 'Extras' };
  const rotulo = k => SINONIMOS[k] || k;
  function seguro(valor, hosts) {
    try { const u = new URL(valor); return u.protocol === 'https:' && hosts.includes(u.hostname) ? u.href : null; } catch { return null; }
  }
  const esc = t => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const json = url => fetch(url + (url.includes('?') ? '&' : '?') + 'v=' + VERSAO).then(r => r.ok ? r.json() : null).catch(() => null);
  const carregarLojas = () => json('js/lojas.json').then(l => (l && l.produtos) || {});
  const carregarProduto = id => /^[A-Z0-9]{10}$/.test(id) ? json(`data/produtos/${id}.json`) : Promise.resolve(null);

  function lojasDe(p, lista) {
    const cadastradas = (lista[p.id] && lista[p.id].lojas) || [{ loja: 'amazon', asin: p.id }];
    const out = [];
    for (const l of cadastradas) {
      const def = LOJAS[l.loja]; const url = def && def.url(l.loja === 'amazon' && !l.asin ? { ...l, asin: p.id } : l);
      if (url && !out.some(o => o.loja === l.loja && o.url === url)) out.push({ loja: l.loja, nome: def.nome, url, parceira: !!l.parceira });
    }
    if (!out.some(o => o.loja === 'amazon')) out.unshift({ loja: 'amazon', nome: 'Amazon', url: LOJAS.amazon.url({ asin: p.id }), parceira: false });
    return out;
  }
  const naNo = n => /^(Mercado Livre|AliExpress)$/.test(n) ? 'no' : 'na';
  const botaoLoja = (l, nome, classe = '') => `<a class="pp-store pp-store-${esc(l.loja)} ${classe}" href="${esc(l.url)}" target="_blank" rel="noopener sponsored" data-loja="${esc(l.loja)}" aria-label="Ver preço do ${esc(nome)} ${naNo(l.nome)} ${esc(l.nome)}"><span>Ver preço ${naNo(l.nome)} ${esc(l.nome)} <span aria-hidden="true">↗</span></span>${l.parceira ? '<small>Vendido por loja parceira</small>' : ''}</a>`;
  const rastrear = raiz => raiz.addEventListener('click', e => {
    const a = e.target.closest('a[data-loja]');
    if (a && typeof window.gtag === 'function') window.gtag('event', 'clique_loja', { loja: a.dataset.loja, produto: a.closest('[data-nome]')?.dataset.nome || '' });
  });

  // ---------- Página do produto ----------
  const raizProduto = document.getElementById('produto-app');
  if (raizProduto) {
    const id = (new URLSearchParams(location.search).get('id') || '').toUpperCase();
    Promise.all([carregarProduto(id), carregarLojas()]).then(([p, lista]) => {
      if (!p) {
        raizProduto.innerHTML = '<div class="pp-vazio"><h1>Produto não encontrado</h1><p>O link pode estar incompleto ou o produto saiu da curadoria.</p><p><a class="pp-btn" href="categorias.html">Ver as categorias</a></p></div>';
        return;
      }
      document.title = `${p.nome}: ficha e análise | TechAprovado`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', `${p.nome} na curadoria de ${p.guiaNome} do TechAprovado: para quem faz sentido, o que ponderar e a ficha técnica traduzida.`);
      const lojas = lojasDe(p, lista);
      const [principal, ...outras] = lojas;
      const guiaUrl = `${p.guia}#${p.ancora}`;
      raizProduto.dataset.nome = p.nome;
      raizProduto.innerHTML = `
        <nav class="breadcrumb pp-crumb" aria-label="Você está em"><a href="/">TechAprovado</a><span aria-hidden="true">›</span><a href="${esc(p.guia)}">${esc(p.guiaNome)}</a><span aria-hidden="true">›</span><span>${esc(p.nome)}</span></nav>
        <div class="pp-top">
          <div class="pp-foto"><img src="${esc(p.img)}" alt="${esc(p.nome)}" width="480" height="480" decoding="async"></div>
          <div class="pp-info">
            <p class="pp-eyebrow">${esc(p.posicao)}</p>
            <h1>${esc(p.nome)}</h1>
            <p class="pp-resumo">${esc(p.resumo)}</p>
            <div class="pp-lojas${lojas.length % 2 ? ' pp-impar' : ''}">${botaoLoja(principal, p.nome, 'pp-principal')}${outras.map(l => botaoLoja(l, p.nome)).join('')}</div>
            <p class="pp-nota">O preço e o estoque mudam e podem ser diferentes entre as lojas. Links de afiliado: podemos ganhar comissão, sem custo para você.</p>
            <div class="pp-acoes"><a class="pp-btn" href="${esc(guiaUrl)}">Ver curadoria</a><a class="pp-btn pp-btn-sec" href="comparar.html?ids=${esc(p.id)}">+ Comparar</a></div>
          </div>
        </div>
        <section class="pp-bloco"><h2>Por dentro da escolha</h2><p>${esc(p.porDentro)}</p>
          <dl class="pp-razoes"><div><dt>Faz sentido</dt><dd>${esc(p.fazSentido)}</dd></div><div class="pp-pondere"><dt>Pondere</dt><dd>${esc(p.pondere)}</dd></div></dl>
          ${p.analise ? `<p>${esc(p.analise)}</p>` : ''}</section>
        <section class="pp-bloco"><h2>Ficha técnica</h2>
          <table class="pp-ficha"><caption class="sr-only">Ficha técnica: ${esc(p.nome)}</caption><tbody>${p.ficha.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
          <p class="pp-fonte">${esc(p.fonte)}</p></section>
        <section class="pp-bloco"><h2>Onde ele aparece</h2><ul class="pp-guias"><li><a href="${esc(guiaUrl)}">Guia de ${esc(p.guiaNome)}</a> · ${esc(p.perfis.join(', '))}</li>${(p.outrosGuias || []).map(g => `<li><a href="${esc(g.guia)}#${esc(g.ancora)}">Guia de ${esc(g.guiaNome)}</a></li>`).join('')}</ul></section>`;
      rastrear(raizProduto);
    });
  }

  // ---------- Comparador (até 3 produtos da mesma categoria) ----------
  const raizComp = document.getElementById('comparar-app');
  if (raizComp) {
    const MAX = 3;
    const H1 = '<h1 class="pp-comp-h1">Comparar produtos</h1>';
    let ids = (new URLSearchParams(location.search).get('ids') || '').toUpperCase().split(',').filter(x => /^[A-Z0-9]{10}$/.test(x)).slice(0, MAX);
    Promise.all([json('data/produtos/indice.json'), carregarLojas()]).then(async ([indice, lista]) => {
      if (!indice) { raizComp.innerHTML = H1 + '<p class="pp-vazio">Não foi possível carregar o comparador agora.</p>'; return; }
      const cache = {};
      const guiaDe = id => indice.guias.find(g => g.produtos.includes(id)) || indice.guias.find(g => g.guia === (indice.produtos[id] || [])[1]);
      async function desenhar() {
        ids = ids.filter(id => indice.produtos[id]);
        const guia = ids.length ? guiaDe(ids[0]) : null;
        if (guia) ids = ids.filter(id => guia.produtos.includes(id) || indice.produtos[id][1] === guia.guia);
        history.replaceState(null, '', ids.length ? `comparar.html?ids=${ids.join(',')}` : 'comparar.html');
        await Promise.all(ids.filter(id => !cache[id]).map(async id => { cache[id] = await carregarProduto(id); }));
        const ps = ids.map(id => cache[id]).filter(Boolean);
        const seletor = guia
          ? `<label class="pp-add">Adicionar da categoria ${esc(guia.nome)}: <select data-add ${ps.length >= MAX ? 'disabled' : ''}><option value="">${ps.length >= MAX ? 'Limite de 3 produtos' : 'Escolha um produto'}</option>${guia.produtos.filter(id => !ids.includes(id)).map(id => `<option value="${id}">${esc(indice.produtos[id][0])}</option>`).join('')}</select></label>`
          : `<label class="pp-add">Escolha a categoria: <select data-guia><option value="">Categorias</option>${indice.guias.map(g => `<option value="${esc(g.guia)}">${esc(g.nome)}</option>`).join('')}</select></label>`;
        if (!ps.length) { raizComp.innerHTML = H1 + `<div class="pp-comp-topo">${seletor}</div><p class="pp-vazio">Escolha uma categoria e até 3 produtos para ver lado a lado.</p>`; return; }
        const linhas = [];
        const chaves = [];
        ps.forEach(p => p.ficha.forEach(([k]) => { const r = rotulo(k); if (!chaves.includes(r)) chaves.push(r); }));
        const valor = (p, r) => p.ficha.filter(([k]) => rotulo(k) === r).map(([, v]) => v).join(' · ') || '—';
        linhas.push(`<tr><th scope="row">Posição na curadoria</th>${ps.map(p => `<td>${esc(p.posicao)}</td>`).join('')}</tr>`);
        linhas.push(`<tr><th scope="row">Destaque</th>${ps.map(p => `<td>${esc(p.resumo)}</td>`).join('')}</tr>`);
        chaves.forEach(r => linhas.push(`<tr><th scope="row">${esc(r)}</th>${ps.map(p => `<td>${esc(valor(p, r))}</td>`).join('')}</tr>`));
        linhas.push(`<tr><th scope="row">Faz sentido</th>${ps.map(p => `<td>${esc(p.fazSentido)}</td>`).join('')}</tr>`);
        linhas.push(`<tr><th scope="row">Pondere</th>${ps.map(p => `<td>${esc(p.pondere)}</td>`).join('')}</tr>`);
        raizComp.innerHTML = H1 + `<div class="pp-comp-topo">${seletor}<a class="pp-btn pp-btn-sec" href="${esc(guia.guia)}">Voltar ao guia de ${esc(guia.nome)}</a></div>
          <div class="pp-tabela" tabindex="0" role="region" aria-label="Comparação lado a lado"><table class="pp-comp pp-cols-${ps.length}">
          <thead><tr><td></td>${ps.map(p => { const l = lojasDe(p, lista)[0]; return `<th scope="col" data-nome="${esc(p.nome)}"><img src="${esc(p.img)}" alt="" width="120" height="120" loading="lazy"><a class="pp-comp-nome" href="produto.html?id=${p.id}">${esc(p.nome)}</a>${botaoLoja(l, p.nome, 'pp-principal')}<button type="button" class="pp-remover" data-remove="${p.id}" aria-label="Tirar ${esc(p.nome)} da comparação">Remover</button></th>`; }).join('')}</tr></thead>
          <tbody>${linhas.join('')}</tbody></table></div>
          <p class="pp-nota">Dados da ficha do fabricante e do anúncio, como estão nos guias. O preço e o estoque ficam nas lojas.</p>`;
      }
      raizComp.addEventListener('change', e => {
        if (e.target.matches('[data-add]') && e.target.value) { ids.push(e.target.value); desenhar(); }
        if (e.target.matches('[data-guia]') && e.target.value) { const g = indice.guias.find(x => x.guia === e.target.value); ids = g ? g.produtos.slice(0, 2) : []; desenhar(); }
      });
      raizComp.addEventListener('click', e => { const b = e.target.closest('[data-remove]'); if (b) { ids = ids.filter(x => x !== b.dataset.remove); desenhar(); } });
      rastrear(raizComp);
      desenhar();
    });
  }
})();
