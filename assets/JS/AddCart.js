const product = [
  {
    id: 0,
    image: 'assets/img/1e28e71be67add26a6514118bff44c7f.webp',
    title: '<p>Placa de Vídeo NVIDIA GeForce RTX 4060 Ti</p>',
    price: 3569,
  },
  {
    id: 1,
    image: 'assets/img/2b96e91d9340b41866f779e473da6bb0.webp',
    title: '<p>Placa de Vídeo NVIDIA GeForce RTX 2080 Ti</p>',
    price: 1700,
  },
  {
    id: 2,
    image: 'assets/img/06bafd92d2458c2311a7e4eedff05974.webp',
    title: '<p>Ram G.Skill Trident Z Rgb DDR4 32GB (2x16GB)</p>',
    price: 2430,
  },
  {
    id: 3,
    image: 'assets/img/6ddb7bce75e74c0abe31700b6a868121.webp',
    title: '<p>Oloy DDR5 Ram 32gb (2x16gb) Blade-RGB</p>',
    price: 1279,
  },
  {
    id: 4,
    image: 'assets/img/22ad7a82e7a8f6491c742afa2e47d7b8.webp',
    title: '<p>Processador AMD Ryzen 5 5500</p>',
    price: 579,
  },
  {
    id: 5,
    image: 'assets/img/56a3048d76e92547f1cd8a875e6efa2c.webp',
    title: '<p>Cooler Aerocool Verkho 5 Dark</p>',
    price: 299,
  },
  {
    id: 6,
    image: 'assets/img/1465e5f73e990deff141b01c9e79c411.webp',
    title: ' <p>Processador Intel i9-14900k</p>',
    price: 2999,
  },
  {
    id: 7,
    image: 'assets/img/4367d74087e6522fb272716bcb9f5dd3.webp',
    title: '<p>Placa de Vídeo NVIDIA GeForce GTX 1070 GAMING</p>',
    price: 1299,
  },
  {
    id: 8,
    image: 'assets/img/e5c8ccb8ca0f44f83d1a954192cae95b.webp',
    title: '<p>Processador Intel i7-12700K</p>',
    price: 1660,
  },
  {
    id: 9,
    image: 'assets/img/e784d06db50a99e464a2e8c3a6d65b5e.webp',
    title: '<p>Placa de Vídeo RadeOn RX 6600 XT Gaming OC PRO</p>',
    price: 1549,
  },
  {
    id: 10,
    image: 'assets/img/ec68beecd70d1de2497556cb4ce89ffb.webp',
    title: '<p>Processador AMD Ryzen 7 5800X</p>',
    price: 974,
  },
  {
    id: 11,
    image: 'assets/img/gtx1080.jpg',
    title: '<p>Placa de Vídeo NVIDIA GeForce GTX 1080</p>',
    price: 1899,
  },
  {
    id: 12,
    image: 'assets/img/ram-kingston-32gb.jpg',
    title: '<p>Ram Kingston FURY Renegade RGB 32GB DDR4</p>',
    price: 1999,
  },
  {
    id: 13,
    image: 'assets/img/ram-hyperx-16gb.jpg',
    title: '<p>Ram Kingston HyperX RGB 16GB DDR4</p>',
    price: 950,
  }
];
const categories = [...new Set(product.map((item) => { return item }))]
let i = 0;
document.getElementById('root').innerHTML = categories.map((item) => {
  var { image, title, price } = item;
  return (
    `<div class="card-produto">
        <img class='images' src=${image} alt="Produto"></img>
        <h1>${title}</h1>
        <h2>R$ ${price}.00</h2>
    ` +
        "<button onclick='addtocart(" + (i++) + ")'>Add to cart</button>" +
      `
      </div>`     
  )
}).join('')

var cart = [];

function addtocart(a) {
  cart.push({ ...categories[a] });
  displaycart();
}
function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let j = 0, total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById('cartItem').innerHTML = "Carrinho vazio";
    document.getElementById("total").innerHTML = "R$ " + 0 + ".00";
  }
  else {
    document.getElementById("cartItem").innerHTML = cart.map((items) => {
      var { image, title, price } = items;
      total = total + price;
      document.getElementById("total").innerHTML = "R$ " + total + ".00";
      return (
        `<div class='cart-item'>
          <div class='row-img'>
            <img class='rowimg' src=${image}>
          </div>
          <p style='font-size:12px;'>${title}</p>
          <h2 style='font-size: 15px;'>R$ ${price}.00</h2>` +
        "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
      );
    }).join('');
  }
}

//lista do carrinho
const icone = document.getElementById("icone");
const lista = document.getElementById("listaCarrinho");

    icone.addEventListener("click", () => {
      if (lista.style.display === "block") {
        lista.style.display = "none";
      } else {
        lista.style.display = "block";
      }
    });