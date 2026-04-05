document.addEventListener('DOMContentLoaded', () => {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!usuarioLogado || !usuarioLogado.admin) {
        alert('Acesso negado');
        window.location.href = "index.html";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const lista = document.getElementById('lista-usuarios');

    if (usuarios.length === 0) {
        lista.innerHTML = "<p>Nenhum usuário cadastrado</p>";
        return;
    }

    usuarios.forEach(user => {

        const div = document.createElement('div');

        div.innerHTML = `
            <p><strong>Nome:</strong> ${user.usuario}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <button onclick="excluirUsuario(${user.id})">Excluir</button>
            <hr>
        `;

        lista.appendChild(div);
    });

});

function excluirUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios = usuarios.filter(user => user.id !== id);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário excluído');

    location.reload();
}