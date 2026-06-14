const user = JSON.parse(localStorage.getItem('usuarioLogado'));
const nomePerfil = document.getElementById('nomePerfil');
const sidebarNomeUsuario = document.getElementById('sidebarNomeUsuario');

if(user){
  nomePerfil.textContent = user.usuario || 'Usuário';
  sidebarNomeUsuario.textContent = user.usuario || 'Usuário';
  document.getElementById('emailPerfil').textContent = user.email || 'Sem email';
  document.getElementById('dataPerfil').textContent = 'Cadastro: ' + (user.dataCadastro || 'Não informado');
}

document.getElementById('logoutBtn').addEventListener('click',()=>{
  localStorage.removeItem('usuarioLogado');
  window.location='login.html';
});

const toggleCart = document.getElementById('toggleCart');
const cartArea = document.getElementById('profileCartArea');
const cartItems = document.getElementById('profileCartItems');
const cartTotal = document.getElementById('profileCartTotal');
const cartCount = document.getElementById('profileCartCount');
const closeCartProfile = document.getElementById('closeCartProfile');
const profileCheckout = document.getElementById('profileCheckout');

function formatarMoeda(valor){
  return valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}

function carregarCarrinho(){
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(carrinho){
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function agruparCarrinho(carrinho){
  const agrupado = [];

  carrinho.forEach(item => {
    const produtoExistente = agrupado.find(produto => produto.id === item.id);

    if(produtoExistente){
      produtoExistente.qtd++;
    }else{
      agrupado.push({...item, qtd: 1});
    }
  });

  return agrupado;
}

function removerProdutoPerfil(idProduto){
  const carrinho = carregarCarrinho();
  const index = carrinho.findIndex(item => item.id === idProduto);

  if(index !== -1){
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    renderProfileCart();
  }
}

function renderProfileCart(){
  const carrinho = carregarCarrinho();
  const produtosAgrupados = agruparCarrinho(carrinho);
  const total = carrinho.reduce((soma,item)=> soma + item.price, 0);

  cartCount.textContent = carrinho.length;
  cartTotal.textContent = formatarMoeda(total);

  if(carrinho.length === 0){
    cartItems.innerHTML = '<p class="profile-empty">Carrinho vazio</p>';
    return;
  }

  cartItems.innerHTML = produtosAgrupados.map(item => `
    <div class="profile-cart-row">
      <div class="profile-product">
        <img src="../../${item.image}" alt="${item.title}">
        <p>${item.title}</p>
      </div>
      <span class="profile-price">${formatarMoeda(item.price)}</span>
      <span class="profile-qty">${item.qtd}</span>
      <i class="fa-solid fa-trash profile-remove" onclick="removerProdutoPerfil(${item.id})" title="Remover uma unidade"></i>
    </div>
  `).join('');
}

toggleCart.addEventListener('click',()=>{
  cartArea.classList.toggle('ativo');
  if(cartArea.classList.contains('ativo')) renderProfileCart();
});

closeCartProfile.addEventListener('click',()=>{
  cartArea.classList.remove('ativo');
});

profileCheckout.addEventListener('click',()=>{
  const carrinho = carregarCarrinho();

  if(carrinho.length === 0){
    alert('Seu carrinho está vazio.');
    return;
  }

  alert('Compra finalizada com sucesso!');
  salvarCarrinho([]);
  renderProfileCart();
});