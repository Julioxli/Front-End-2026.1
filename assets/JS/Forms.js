
document.addEventListener('DOMContentLoaded', () => {


const container = document.getElementById('sl-container');
const registerBtn = document.getElementById('btn-register');
const loginBtn = document.getElementById('btn-login');
const body = document.querySelector('.body-sl');

const form = document.querySelector('#form-registro');

const usuario = document.querySelector('#registro-usuario');
const email = document.querySelector('#registro-email');
const cpf = document.querySelector('#registro-cpf');
const cep = document.querySelector('#registro-cep');
const senha = document.querySelector('#registro-senha');
const confSenha = document.querySelector('#registro-conf-senha');


const modal = document.getElementById('modal-cep');
const resultado = document.getElementById('resultado-endereco');
const btnFechar = document.getElementById('btn-fechar');
const btnConfirmar = document.getElementById('btn-confirmar');




const admin = {
    usuario: "admin",
    senha: "12345678",
    admin: true
};


registerBtn.addEventListener('click', ativarRegistro);
loginBtn.addEventListener('click', ativarLogin);
form.addEventListener('submit', validarFormulario);

cep.addEventListener('blur', () => {
    let cepLimpo = cep.value.replace(/\D/g, '');

    if (cepLimpo.length === 8) {
        modal.style.display = 'block';
        buscarCep(cepLimpo);
    }
});

btnFechar.addEventListener('click', () => {
    modal.style.display = 'none';
    cep.value = '';
});

btnConfirmar.addEventListener('click', () => {
    modal.style.display = 'none';
});
    
async function buscarCep(cepValor) {
    resultado.innerHTML = "Buscando...";

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValor}/json/`);
        const data = await response.json();

        if (data.erro) {
            resultado.innerHTML = "CEP não encontrado!";
            return;
        }

        resultado.innerHTML = `
            <p><strong>Rua:</strong> ${data.logradouro}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>
        `;

    } catch {
        resultado.innerHTML = "Erro ao buscar CEP!";
    }
}

function ativarRegistro() {
    container.classList.add('active');
    body.classList.add('active-bg');
}

function ativarLogin() {
    container.classList.remove('active');
    body.classList.remove('active-bg');
}

function mostrarErro(input, mensagem) {
    const box = input.parentElement;

    input.classList.add('input-erro');

    let erro = box.querySelector('.erro-msg');

    if (!erro) {
        erro = document.createElement('span');
        erro.classList.add('erro-msg');
        box.appendChild(erro);
    }

    erro.innerText = mensagem;
}

function limparErros() {
    document.querySelectorAll('.input-box input').forEach(input => {
        input.classList.remove('input-erro');
    });

    document.querySelectorAll('.erro-msg').forEach(el => el.remove());
}


function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf[10])) return false;

    return true;
}


function validarFormulario(e) {
    e.preventDefault();

    let valido = true;

    limparErros();

    if (usuario.value.trim() === '') {
        mostrarErro(usuario, 'Preencha o nome de usuário');
        valido = false;
    }

    if (!validarEmail(email.value)) {
        mostrarErro(email, 'Email inválido');
        valido = false;
    }

    if (!validarCPF(cpf.value)) {
        mostrarErro(cpf, 'CPF inválido');
        valido = false;
    }

    if (cep.value.length < 8) {
        mostrarErro(cep, 'CEP inválido');
        valido = false;
    }

    if (senha.value.length < 8) {
        mostrarErro(senha, 'A senha precisa de 8 digitos');
        valido = false;
    }

    if (senha.value !== confSenha.value) {
        mostrarErro(confSenha, 'As senhas estão diferentes');
        valido = false;
    }

    if (valido) {

    const novoUsuario = {
        id: Date.now(),
        usuario: usuario.value.trim(),
        email: email.value.trim(),
        cpf: cpf.value.trim(),
        cep: cep.value.trim(),
        senha: senha.value
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const emailExiste = usuarios.some(user => user.email === novoUsuario.email);

    if (emailExiste) {
        mostrarErro(email, 'Este email já está cadastrado');
        return;
    }

    const cpfExiste = usuarios.some(user => user.cpf === novoUsuario.cpf);

    if (cpfExiste) {
        mostrarErro(cpf, 'Este CPF já está cadastrado');
        return;
    }

    usuarios.push(novoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Você foi cadastrado');

    form.reset();

    ativarLogin();
}
}

const formLogin = document.querySelector('#form-login');

formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    const usuarioLogin = document.querySelector('#Login-usuario').value;
    const senhaLogin = document.querySelector('#Login-senha').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarioLogin === admin.usuario && senhaLogin === admin.senha) {

    localStorage.setItem('usuarioLogado', JSON.stringify(admin));

    window.location.href = "admin.html";
    return;
    }

    const usuarioEncontrado = usuarios.find(user => 
        user.usuario === usuarioLogin && user.senha === senhaLogin
    );

    if (usuarioEncontrado) {
        alert('Login realizado com sucesso ');

        window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=LN8awtC4Uwa-HBo5"

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

    } else {
        alert('Usuário ou senha incorretos');
    }
});



})