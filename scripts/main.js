/* =========================================================
   DL Griffes — script principal
   ========================================================= */

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
   Vitrine solta, sem preço e sem estoque — só mostra o que roda na loja.
   Para trocar: joga a foto em assets/images/destaques/ (minúsculo, sem espaço
   e sem acento) e ajusta a linha aqui.

   arquivo  nome do arquivo dentro de assets/images/destaques/
   titulo   aparece sobre a foto e entra na mensagem do WhatsApp
   alt      descrição para leitor de tela e para quando a imagem não carrega  */
const DESTAQUES = [
  {
    arquivo: 'conjunto-polo-bermuda-marinho.jpg',
    titulo: 'Conjunto polo e bermuda',
    alt: 'Polo azul-marinho com estampa geométrica clara, bermuda marinho, boné branco e Crocs',
  },
  {
    arquivo: 'polo-bermuda-azul.jpg',
    titulo: 'Polo preta com bermuda azul',
    alt: 'Polo preta com faixas azuis e brancas, bermuda azul, boné branco e chinelo Crocs',
  },
  {
    arquivo: 'camisetas-faixa-peito.jpg',
    titulo: 'Camisetas com faixa no peito',
    alt: 'Três camisetas com faixa horizontal no peito: preta, azul-marinho e off-white',
  },
  {
    arquivo: 'camisetas-crocodilo.jpg',
    titulo: 'Camisetas de crocodilo grande',
    alt: 'Camiseta preta com crocodilo verde-oliva e camiseta off-white com crocodilo preto',
  },
  {
    arquivo: 'camisetas-estampa-listrada.jpg',
    titulo: 'Camisetas de estampa listrada',
    alt: 'Duas camisetas com logo em degradê listrado, uma preta e uma azul-marinho',
  },
  {
    arquivo: 'bone-oculos-camiseta.jpg',
    titulo: 'Boné, óculos e camiseta',
    alt: 'Boné branco, óculos de sol prateado e camiseta preta com logo repetido',
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
    const mensagem = `Olá! Vi no site o destaque "${item.titulo}". Ainda tem disponível?`;

    // As duas primeiras carregam junto com a página; o resto só ao rolar até lá.
    const carregamento = indice < 2 ? 'eager' : 'lazy';

    return `
      <li class="destaque">
        <a class="destaque__link" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener">
          <img class="destaque__img" src="assets/images/destaques/${item.arquivo}"
               alt="${item.alt}" loading="${carregamento}" decoding="async">
          <span class="destaque__info">
            <span class="destaque__titulo">${item.titulo}</span>
            <span class="destaque__acao">Perguntar no WhatsApp</span>
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

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

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
