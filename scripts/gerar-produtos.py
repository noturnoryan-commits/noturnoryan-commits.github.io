#!/usr/bin/env python3
"""TechAprovado — gera data/produtos/<código>.json e data/produtos/indice.json a partir dos cards dos guias.

Uma entrada por produto (código da Amazon), com nome, imagem, guia, perfil,
textos da curadoria e ficha técnica. A página produto.html e o comparador
(comparar.html) leem este arquivo. Rode sempre que publicar ou alterar um guia:

    python3 scripts/gerar-produtos.py

Também reescreve js/busca.json para que a busca leve à página do produto.
"""
import html, json, re, sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
LIMPA = lambda s: re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s or ''))).strip()


def um(rx, texto, grupo=1):
    m = re.search(rx, texto, re.S)
    return m.group(grupo) if m else ''


def nome_guia(pagina):
    titulo = LIMPA(um(r'<title>(.*?)</title>', pagina))
    for rx in (r'Melhor(?:es)?\s+(.+?)\s+2026', r'^Qual\s+(.+?)\s+Comprar', r'^(.+?)\s+Vale a Pena', r'^(.+?)\s+2026'):
        m = re.match(rx, titulo)
        if m:
            return m.group(1).strip()
    return titulo.split(':')[0].split('|')[0].strip()


def perfis(pagina):
    """id do perfil -> nome curto do perfil, a partir dos botões de filtro."""
    out = {}
    for pid, rotulo in re.findall(r'data-filter="([a-z0-9-]+)"[^>]*>(.*?)<span', pagina):
        if pid != 'todos':
            out[pid] = LIMPA(rotulo)
    return out


def main():
    produtos, ordem_guias = {}, []
    for arq in sorted(RAIZ.glob('*-2026.html')):
        pagina = arq.read_text(encoding='utf-8')
        cards = re.findall(r'<article class="analysis-card[\s\S]*?</article>', pagina)
        if not cards:
            continue
        gnome, gperfis = nome_guia(pagina), perfis(pagina)
        ordem_guias.append({'guia': arq.name, 'nome': gnome, 'perfis': gperfis})
        for card in cards:
            asin = um(r'data-produto="([A-Z0-9]{10})"', card)
            if not asin:
                continue
            ancora = um(r'id="(produto-\d+)"', card)
            grupos = um(r'data-groups="([^"]*)"', card).split()
            ficha = [(LIMPA(k), LIMPA(v)) for k, v in re.findall(r'<tr><th scope="row">(.*?)</th><td>(.*?)</td></tr>', card)]
            razoes = {LIMPA(dt): LIMPA(dd) for dt, dd in re.findall(r'<dt>(.*?)</dt><dd>(.*?)</dd>', card)}
            entrada = {
                'id': asin,
                'nome': LIMPA(um(r'<h3[^>]*>(.*?)</h3>', card)),
                'resumo': LIMPA(um(r'<p class="summary">(.*?)</p>', card)),
                'img': um(r'<img class="product-image" src="([^"]+)"', card),
                'posicao': LIMPA(re.sub(r'<span>.*?</span>', '', um(r'<p class="eyebrow tier-line">(.*?)</p>', card))),
                'guia': arq.name,
                'guiaNome': gnome,
                'ancora': ancora,
                'perfis': [gperfis.get(g, g) for g in grupos],
                'porDentro': LIMPA(um(r'POR DENTRO DA ESCOLHA</p>(.*?)</section>', card)),
                'fazSentido': razoes.get('Faz sentido', ''),
                'pondere': razoes.get('Pondere', ''),
                'analise': LIMPA(um(r'<div class="full-analysis"><p>(.*?)</p>', card)),
                'ficha': ficha,
                'fonte': LIMPA(um(r'<p class="spec-source">(.*?)</p>', card)),
            }
            if asin in produtos:  # mesmo produto em mais de um guia: guarda os outros guias
                produtos[asin].setdefault('outrosGuias', []).append({'guia': arq.name, 'guiaNome': gnome, 'ancora': ancora})
                continue
            produtos[asin] = entrada

    # Um arquivo por produto (leve para a página do produto) e um índice para o comparador.
    hoje = __import__('datetime').date.today().isoformat()
    pasta = RAIZ / 'data' / 'produtos'
    pasta.mkdir(parents=True, exist_ok=True)
    for velho in pasta.glob('*.json'):
        velho.unlink()
    compacto = dict(ensure_ascii=False, separators=(',', ':'))
    for pid, p in produtos.items():
        (pasta / f'{pid}.json').write_text(json.dumps(p, **compacto), encoding='utf-8')
    for g in ordem_guias:
        g['produtos'] = [pid for pid, p in produtos.items() if p['guia'] == g['guia'] or any(o['guia'] == g['guia'] for o in p.get('outrosGuias', []))]
        g['ficha'] = list(dict.fromkeys(k for pid in g['produtos'] for k, _ in produtos[pid]['ficha']))
    indice = {'gerado': hoje, 'guias': ordem_guias,
              'produtos': {pid: [p['nome'], p['guia'], p['img']] for pid, p in produtos.items()}}
    (pasta / 'indice.json').write_text(json.dumps(indice, **compacto), encoding='utf-8')

    # Busca: os resultados de produto passam a abrir a página do produto.
    busca_arq = RAIZ / 'js' / 'busca.json'
    busca = json.loads(busca_arq.read_text(encoding='utf-8'))
    por_ancora = {(p['guia'], p['ancora']): p['id'] for p in produtos.values()}
    for p in produtos.values():
        for o in p.get('outrosGuias', []):
            por_ancora[(o['guia'], o['ancora'])] = p['id']
    trocados = 0
    itens = busca if isinstance(busca, list) else busca.get('itens', [])
    for item in itens:
        url = item.get('u', '')
        m = re.match(r'([a-z0-9-]+-2026\.html)#(produto-\d+)$', url)
        if m and (m.group(1), m.group(2)) in por_ancora:
            item['u'] = 'produto.html?id=' + por_ancora[(m.group(1), m.group(2))]
            trocados += 1
    busca_arq.write_text(json.dumps(busca, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'{len(produtos)} produtos em {len(ordem_guias)} guias; {trocados} resultados da busca apontam para produto.html')


if __name__ == '__main__':
    sys.exit(main())
