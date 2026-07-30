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

/* ---------- Catálogo (INATIVO) ----------
   A seção Coleção saiu do index.html, então este array não é usado hoje —
   renderizarProdutos() não encontra o grid e sai sem fazer nada.
   Para reativar, ver README. Enquanto isso o Instagram é a vitrine.

   imagem: caminho em assets/images/produtos/ ou '' para usar o placeholder.
   Exemplo: 'assets/images/produtos/polo-preta.jpg'                   */
const PRODUTOS = [
  { marca: 'Grife', nome: 'Camisa polo clássica', preco: 'R$ 000,00', imagem: '' },
  { marca: 'Grife', nome: 'Camiseta oversized',   preco: 'R$ 000,00', imagem: '' },
  { marca: 'Grife', nome: 'Bermuda sarja',        preco: 'R$ 000,00', imagem: '' },
  { marca: 'Grife', nome: 'Conjunto moletom',     preco: 'R$ 000,00', imagem: '' },
  { marca: 'Grife', nome: 'Boné aba curva',       preco: 'R$ 000,00', imagem: '' },
  { marca: 'Grife', nome: 'Tênis casual',         preco: 'R$ 000,00', imagem: '' },
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

/* ---------- Catálogo ---------- */
function renderizarProdutos() {
  const grid = document.getElementById('grid-produtos');
  if (!grid) return;

  grid.innerHTML = PRODUTOS.map((produto) => {
    const media = produto.imagem
      ? `<img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">`
      : `<span class="card__placeholder">Foto em breve</span>`;

    const mensagem = `Olá! Tenho interesse na peça: ${produto.nome} (${produto.marca}).`;

    return `
      <li class="card">
        <div class="card__media">${media}</div>
        <div class="card__body">
          <span class="card__marca">${produto.marca}</span>
          <h3 class="card__nome">${produto.nome}</h3>
          <p class="card__preco">${produto.preco}</p>
          <a class="card__link" href="${linkWhatsapp(mensagem)}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
        </div>
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
  renderizarProdutos();
  montarLinks();
  iniciarMenu();
  iniciarHeaderScroll();
  iniciarReveal();
});
