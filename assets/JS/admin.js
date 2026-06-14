document.addEventListener('DOMContentLoaded', () => {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado || !usuarioLogado.admin) {
        alert('Acesso negado');
        window.location.href = "../../Index.html";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const lista = document.getElementById('lista-usuarios');

    if (usuarios.length === 0) {
        lista.innerHTML = "<p>Nenhum usuário cadastrado</p>";
        return;
    }

    usuarios.forEach(user => {

    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${user.id}</td>
        <td>${user.usuario}</td>
        <td>${user.email}</td>
        <td>${user.dataCadastro || "Não informado"}</td>
        <td>
            <button class="excluir" onclick="excluirUsuario(${user.id})">
                Excluir
            </button>
        </td>
    `;

    lista.appendChild(linha);
    });

});

function excluirUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios = usuarios.filter(user => user.id !== id);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário excluído');

    location.reload();
}