/* =========================================================
   DL Griffes — script principal
   ========================================================= */

/* Marca que o JavaScript rodou. O CSS só esconde o conteúdo da animação de
   entrada quando esta classe existe — se o script quebrar, o site aparece
   inteiro em vez de ficar em branco. */
document.documentElement.classList.add('js');

/* ---------- Configuração da loja (editar aqui) ---------- */
const LOJA = {
  nome: 'DL Griffes',

  // Link curto oficial do WhatsApp. Sempre funciona, mas NÃO aceita mensagem pré-preenchida.
  whatsappLink: 'https://wa.me/message/RFQXEL6YGGZNP1',

  // Número completo em dígitos (55 + DDD + número). Com este campo preenchido,
  // os botões abrem o WhatsApp já com a mensagem escrita. Vazio, cai no link curto.
  whatsappNumero: '5583993023719',

  telefoneExibicao: '(83) 99302-3719',
  // Texto que já vem digitado ao abrir a conversa. Curto de propósito:
  // mensagem longa demais o cliente apaga antes de enviar.
  mensagemPadrao: 'Olá! Vim pelo site e gostaria de mais informações.',
  instagram: 'https://www.instagram.com/dl_.griffes/',
  endereco: 'Rua Deputado Plínio Salgado, 222 - Mangabeira, João Pessoa - PB',
  referencia: 'Ao lado do Mercado Público de Mangabeira',
};

/* ---------- Destaques (editar aqui) ----------
   Vitrine com preço, sem carrinho: a venda continua fechando pelo WhatsApp.
   Para trocar: joga a foto em assets/images/destaques/ (minúsculo, sem espaço
   e sem acento) e ajusta a linha aqui.

   arquivo  nome do arquivo dentro de assets/images/destaques/
   tipo     etiqueta curta acima do título (Kit, Camiseta, Boné, Chinelo)
   titulo   aparece sobre a foto e entra na mensagem do WhatsApp
   preco    texto livre. Deixando vazio, o site mostra "Consultar valor"
   alt      descrição para leitor de tela e para quando a imagem não carrega

   Ordem importa: é a ordem que aparece na tela. Kits primeiro, depois peça
   avulsa, acessório por último.                                            */
const DESTAQUES = [
  {
    arquivo: 'kit-polo-marinho.jpg',
    tipo: 'Kit polo',
    titulo: 'Kit polo marinho',
    preco: 'R$ 220,00',
    alt: 'Polo azul-marinho com estampa geométrica clara e bermuda marinho combinando',
  },
  {
    arquivo: 'kit-polo-preta-azul.jpg',
    tipo: 'Kit polo',
    titulo: 'Kit polo preta e azul',
    preco: 'R$ 220,00',
    alt: 'Polo preta com faixas azuis e brancas ao lado de bermuda azul-royal',
  },
  {
    arquivo: 'kit-camiseta-short.jpg',
    tipo: 'Kit',
    titulo: 'Kit camiseta e short',
    preco: 'R$ 199,99',
    alt: 'Camiseta preta com faixa azul e amarela no peito ao lado de short preto com faixa lateral',
  },
  {
    arquivo: 'camisetas-faixa-peito.jpg',
    tipo: 'Camiseta',
    titulo: 'Camiseta 2 faixas',
    preco: 'R$ 99,99',
    alt: 'Três camisetas com faixa horizontal no peito: preta, azul-marinho e off-white',
  },
  {
    arquivo: 'camisetas-crocodilo.jpg',
    tipo: 'Camiseta',
    titulo: 'Camiseta big crock',
    preco: 'R$ 99,99',
    alt: 'Camiseta preta com crocodilo verde-oliva e camiseta off-white com crocodilo preto',
  },
  {
    arquivo: 'camisetas-logo-listrado.jpg',
    tipo: 'Camiseta',
    titulo: 'Camiseta lançamento 2026',
    preco: 'R$ 99,99',
    alt: 'Duas camisetas com logo em degradê listrado, uma preta e uma azul-marinho',
  },
  {
    arquivo: 'lupas-coloridas.jpg',
    tipo: 'Lupa',
    titulo: 'Lupa lente colorida',
    preco: 'R$ 89,99',
    alt: 'Sete lupas com lentes espelhadas em vermelho, azul, preto, prata e roxo',
  },
  {
    arquivo: 'oculos-gascan-preto.jpg',
    tipo: 'Óculos',
    titulo: 'Gascan preto polarizado',
    preco: 'R$ 89,99',
    alt: 'Três óculos Gascan pretos com lente polarizada',
  },
  {
    arquivo: 'crocs-branco.jpg',
    tipo: 'Chinelo',
    titulo: 'Crocs branco',
    preco: 'R$ 99,99',
    alt: 'Vários chinelos Crocs brancos empilhados no balcão da loja',
  },
  {
    arquivo: 'bones-lacoste.jpg',
    tipo: 'Boné',
    titulo: 'Boné Lacoste',
    preco: 'R$ 69,99',
    alt: 'Quatro bonés Lacoste nas cores azul-claro, branco, azul-marinho e preto',
  },
  {
    // TODO: falta o valor fechado do combo. As três peças têm preço avulso
    // (69,99 + 89,99 + 99,99), mas ninguém definiu o preço do conjunto.
    // Enquanto vazio, o card mostra "Consultar valor".
    arquivo: 'bone-oculos-camiseta.jpg',
    tipo: 'Combo',
    titulo: 'Boné, lupa e camiseta',
    preco: '',
    alt: 'Boné branco, lupa prateada e camiseta preta com logo repetido',
  },
];

/* ---------- Helpers ---------- */
// Usa o número (com mensagem pronta) quando disponível; senão cai no link curto.
const linkWhatsapp = (mensagem = LOJA.mensagemPadrao) =>
  LOJA.whatsappNumero
    ? `https://wa.me/${LOJA.whatsappNumero}?text=${encodeURIComponent(mensagem)}`
    : LOJA.whatsappLink;

const linkMaps = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOJA.endereco)}`;

/* ---------- Links dinâmicos ---------- */
function montarLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.href = linkWhatsapp();
    el.target = '_blank';
    el.rel = 'noopener';
  });

  document.querySelectorAll('[data-maps]').forEach((el) => {
    el.href = linkMaps();
  });

  document.querySelectorAll('[data-ano]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Destaques ---------- */
function renderizarDestaques() {
  const grid = document.getElementById('grid-destaques');
  if (!grid) return;

  grid.innerHTML = DESTAQUES.map((item, indice) => {
    const preco = item.preco || 'Consultar valor';

    // Sem preço definido, não adianta citar valor na conversa.
    const mensagem = item.preco
      ? `Olá! Vi no site: ${item.titulo} — ${item.preco}. Ainda tem disponível?`
      : `Olá! Vi no site: ${item.titulo}. Qual o valor?`;

    // As duas primeiras carregam junto com a página; o resto só ao rolar até lá.
    const carregamento = indice < 2 ? 'eager' : 'lazy';

    return `
      <li class="destaque" data-reveal>
        <a class="destaque__link" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener"
           aria-label="Perguntar no WhatsApp sobre ${item.titulo}, ${preco}">
          <img class="destaque__img" src="assets/images/destaques/${item.arquivo}"
               alt="${item.alt}" loading="${carregamento}" decoding="async">
          <span class="destaque__info">
            <span class="destaque__tipo">${item.tipo}</span>
            <span class="destaque__titulo">${item.titulo}</span>
            <span class="destaque__preco">${preco}</span>
          </span>
        </a>
      </li>`;
  }).join('');
}

/* ---------- Menu mobile ---------- */
function iniciarMenu() {
  const botao = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav-principal');
  if (!botao || !nav) return;

  const fechar = () => {
    nav.classList.remove('is-open');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
  };

  botao.addEventListener('click', () => {
    const aberto = nav.classList.toggle('is-open');
    botao.setAttribute('aria-expanded', String(aberto));
    botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', fechar));
  document.addEventListener('keydown', (evento) => { if (evento.key === 'Escape') fechar(); });
}

/* ---------- Header ao rolar ---------- */
function iniciarHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const atualizar = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  atualizar();
  window.addEventListener('scroll', atualizar, { passive: true });
}

/* ---------- Animação de entrada ---------- */
function iniciarReveal() {
  const alvos = document.querySelectorAll('[data-reveal]');
  if (!alvos.length) return;

  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (semAnimacao || !('IntersectionObserver' in window)) {
    alvos.forEach((alvo) => alvo.classList.add('is-visible'));
    return;
  }

  // threshold 0: basta um pixel entrar na tela. Com valor maior, elemento mais
  // alto que a tela nunca atinge a fração exigida e fica invisível para sempre —
  // foi o que aconteceu com o grid de destaques em coluna única no celular.
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

  alvos.forEach((alvo) => observador.observe(alvo));
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderizarDestaques();
  montarLinks();
  iniciarMenu();
  iniciarHeaderScroll();
  iniciarReveal();
});
