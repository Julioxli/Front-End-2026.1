const container = document.getElementById('sl-container');
const registerBtn = document.getElementById('btn-register');
const loginBtn = document.getElementById('btn-login');
const body = document.querySelector('.body-sl');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
    body.classList.add('active-bg');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
    body.classList.remove('active-bg');
});