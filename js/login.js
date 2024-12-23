function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '<EMAIL>' && password === '<PASSWORD>') {
        window.location.href = 'index.html';
    }
}