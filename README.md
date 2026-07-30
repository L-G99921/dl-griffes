# DL Griffes — site vitrine

Site estático (HTML + CSS + JS puro). Sem build, sem dependência. Abrir `index.html` no navegador.

## Estrutura

```
index.html                     # página única
styles/main.css                # tokens, componentes, responsivo
scripts/main.js                # config da loja, menu, animações
assets/images/loja/Hero.png    # arte do topo (desktop)
assets/images/loja/Logo.png    # arte do topo (mobile)
assets/images/produtos/        # vazio — só se reativar a Coleção
```

## Identidade visual

Paleta monocromática — preto, branco e cinzas. Sem cor de destaque: o contraste faz o
trabalho. Tokens no topo de `styles/main.css`, em `:root`. Trocar `--cor-destaque` muda
botões, traços, links e o botão flutuante de uma vez.

Tipografia: **Archivo Black** nos títulos (mesma família de grotesca pesada do letreiro
da loja) + **Inter** no corpo.

> Archivo Black só existe no peso 400. Pedir `font-weight: 600/700` nela faz o navegador
> engordar a letra artificialmente e o traço borra. Todos os títulos usam `400`.

Para trocar a fonte dos títulos, mexer em dois lugares:

1. o `<link>` do Google Fonts no `<head>` do `index.html`
2. `--fonte-titulo` no `:root`

Alternativas que combinam com a marca: **Anton** (mais condensada, pegada streetwear) ou
**Bebas Neue** (alta e estreita, cara de vitrine). Ambas também só têm um peso.

## Seções

Hero (arte) → A marca (4 diferenciais) → Localização + horário → CTA final → footer.

O hero usa `<picture>`: `Hero.png` acima de 760px, `Logo.png` abaixo. Como a arte já traz
logo e assinatura, o `<h1>` fica em `.sr-only` — só leitores de tela e buscadores leem.
Nada de texto sobreposto na imagem.

## Já preenchido

- WhatsApp: (83) 99302-3719 — `5583993023719`, com mensagem pré-escrita nos botões
- Link curto de reserva: `wa.me/message/RFQXEL6YGGZNP1` (usado se `whatsappNumero` ficar vazio)
- Endereço: Rua Deputado Plínio Salgado, 222 — Mangabeira, João Pessoa/PB
- Referência: ao lado do Mercado Público de Mangabeira
- Horário: todos os dias, 09h — 18h

## O que falta

1. **Logo limpa para o cabeçalho** — hoje o cabeçalho usa o texto "DL Griffes".
   `Logo.png` é foto de fachada com fundo, não serve ali. Precisa de PNG ou SVG com
   fundo transparente, só o letreiro.

2. **`assets/images/loja/og-cover.jpg`** — miniatura ao compartilhar o link (1200×630).
   Já referenciada no `<head>` com URL absoluta; falta só o arquivo. Sem ela o link
   colado no WhatsApp aparece sem imagem — e é assim que este site vai circular.
   Pode ser um recorte da `hero.png` no tamanho certo.

3. **Grafia da marca** — o letreiro da fachada escreve `DL GRIFES`, com um F. O site e o
   Instagram usam `Griffes`. Definir qual vale e padronizar.

## Coleção — removida

A seção de catálogo saiu do `index.html` a pedido. O Instagram faz esse papel.

O código dela ficou no lugar, marcado `INATIVO`, para reativar sem retrabalho:

- `scripts/main.js` — array `PRODUTOS` e função `renderizarProdutos()` (a função já sai
  sem fazer nada quando não encontra o grid, então não quebra nada estando lá)
- `styles/main.css` — bloco `.grid` / `.card`

Para trazer de volta: recolocar no `index.html` a seção com
`<ul class="grid" id="grid-produtos"></ul>`, o link `Coleção` no menu, e preencher `PRODUTOS`.

## Rodar localmente

Abrir direto o `index.html` funciona. Para servidor local com Node:

```
npx serve .
```

Neste Windows o `python` é só o atalho da Microsoft Store, não serve.

## Publicação

No ar em **https://l-g99921.github.io/dl-griffes/** — GitHub Pages, branch `main`, raiz do
repositório. Sem etapa de build: `git push` na `main` republica sozinho em ~1 minuto.

### Nome de arquivo importa

O Pages roda em Linux, que diferencia maiúscula de minúscula. Windows não. Então
`Hero.png` e `hero.png` são o mesmo arquivo aqui e arquivos diferentes lá — dá pra
quebrar a imagem no ar sem perceber nada localmente.

Regra: **nome de arquivo sempre minúsculo, sem espaço e sem acento.**

### Domínio próprio

Comprando um domínio, é grátis apontar pra cá e o HTTPS sai automático. Precisa de dois
passos: criar o arquivo `CNAME` na raiz com o domínio dentro, e apontar o DNS pro GitHub.
Ao fazer isso, trocar as URLs absolutas de `og:url` e `og:image` no `<head>` do
`index.html` — elas estão fixas no endereço do Pages.
