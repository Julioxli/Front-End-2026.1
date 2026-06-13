const product = [
  {
    id: 0,
    image: 'assets/img/1e28e71be67add26a6514118bff44c7f.webp',
    title: 'Placa de Vídeo NVIDIA GeForce RTX 4060 Ti',
    price: 3569,
  },
  {
    id: 1,
    image: 'assets/img/2b96e91d9340b41866f779e473da6bb0.webp',
    title: 'Placa de Vídeo NVIDIA GeForce RTX 2080 Ti',
    price: 1700,
  },
  {
    id: 2,
    image: 'assets/img/06bafd92d2458c2311a7e4eedff05974.webp',
    title: 'Ram G.Skill Trident Z RGB DDR4 32GB (2x16GB)',
    price: 2430,
  },
  {
    id: 3,
    image: 'assets/img/6ddb7bce75e74c0abe31700b6a868121.webp',
    title: 'Oloy DDR5 Ram 32GB (2x16GB) Blade-RGB',
    price: 1279,
  },
  {
    id: 4,
    image: 'assets/img/22ad7a82e7a8f6491c742afa2e47d7b8.webp',
    title: 'Processador AMD Ryzen 5 5500',
    price: 579,
  },
  {
    id: 5,
    image: 'assets/img/56a3048d76e92547f1cd8a875e6efa2c.webp',
    title: 'Cooler Aerocool Verkho 5 Dark',
    price: 299,
  },
  {
    id: 6,
    image: 'assets/img/1465e5f73e990deff141b01c9e79c411.webp',
    title: 'Processador Intel i9-14900K',
    price: 2999,
  },
  {
    id: 7,
    image: 'assets/img/4367d74087e6522fb272716bcb9f5dd3.webp',
    title: 'Placa de Vídeo NVIDIA GeForce GTX 1070 GAMING',
    price: 1299,
  },
  {
    id: 8,
    image: 'assets/img/e5c8ccb8ca0f44f83d1a954192cae95b.webp',
    title: 'Processador Intel i7-12700K',
    price: 1660,
  },
  {
    id: 9,
    image: 'assets/img/e784d06db50a99e464a2e8c3a6d65b5e.webp',
    title: 'Placa de Vídeo Radeon RX 6600 XT Gaming OC PRO',
    price: 1549,
  },
  {
    id: 10,
    image: 'assets/img/ec68beecd70d1de2497556cb4ce89ffb.webp',
    title: 'Processador AMD Ryzen 7 5800X',
    price: 974,
  },
  {
    id: 11,
    image: 'assets/img/gtx1080.jpg',
    title: 'Placa de Vídeo NVIDIA GeForce GTX 1080',
    price: 1899,
  },
  {
    id: 12,
    image: 'assets/img/ram-kingston-32gb.jpg',
    title: 'Ram Kingston FURY Renegade RGB 32GB DDR4',
    price: 1999,
  },
  {
    id: 13,
    image: 'assets/img/ram-hyperx-16gb.jpg',
    title: 'Ram Kingston HyperX RGB 16GB DDR4',
    price: 950,
  },
  {
    id: 14,
    image: 'assets/img/placa-mae1.webp',
    title: 'Placa Mãe ASUS ROG STRIX B550-F GAMING',
    price: 1299,
  },
  {
    id: 15,
    image: 'assets/img/fone1.webp',
    title: 'Fone de Ouvido HyperX Cloud Stinger Core',
    price: 299,
  },
];

const root = document.getElementById('root');
const cartItem = document.getElementById('cartItem');
const count = document.getElementById('count');
const totalEl = document.getElementById('total');
const icone = document.getElementById('icone');
const lista = document.getElementById('listaCarrinho');

let cart = JSON.parse(localStorage.getItem('carrinho')) || [];

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(cart));
}

function renderProducts() {
  if (!root) return;

  root.innerHTML = product.map((item, index) => `
    <div class="card-produto">
      <img class="images" src="${item.image}" alt="${item.title}">
      <h1>${item.title}</h1>
      <h2>${formatarMoeda(item.price)}</h2>
      <button type="button" onclick="addtocart(${index})">Adicionar ao carrinho</button>
    </div>
  `).join('');
}

function addtocart(index) {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado) {

    window.location.href = "assets/pages/login.html";

    return;
  }

  cart.push({ ...product[index] });

  salvarCarrinho();

  displaycart();
}

function delElement(index) {
  cart.splice(index, 1);
  salvarCarrinho();
  displaycart();
}

function displaycart() {
  if (!cartItem || !count || !totalEl) return;

  count.innerHTML = cart.length;

  if (cart.length === 0) {
    cartItem.innerHTML = 'Carrinho vazio';
    totalEl.innerHTML = formatarMoeda(0);
    return;

  }

  const total = cart.reduce((soma, item) => soma + item.price, 0);
  totalEl.innerHTML = formatarMoeda(total);

  cartItem.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="row-img">
        <img class="rowimg" src="${item.image}" alt="${item.title}">
      </div>
      <p>${item.title}</p>
      <h2>${formatarMoeda(item.price)}</h2>
      <i class="fa-solid fa-trash" onclick="delElement(${index})" title="Remover produto"></i>
    </div>
  `).join('');
}
if (icone && lista) {
  icone.addEventListener("click", (event) => {
    event.stopPropagation();
    lista.classList.toggle("ativo");
  });

  lista.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    lista.classList.remove("ativo");
  });
}

renderProducts();
displaycart();
