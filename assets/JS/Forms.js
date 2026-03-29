const container = document.getElementById('sl-container');
const registerBtn = document.getElementById('btn-register');
const loginBtn = document.getElementById('btn-login');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

console.log(registerBtn);
console.log(loginBtn);