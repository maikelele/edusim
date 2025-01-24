const email = getCookie('email');
const username = getCookie('username');
console.log("Email" + email);
console.log("Username: " + username);

if (email && username) {
    console.log('logged in');
    document.getElementById('welcomeMessage').textContent = `Witaj, ${username}`;
    document.getElementById('auth').innerHTML = `
    <p>
        <a href="#" id="logout">Wyloguj się</a>
    </p>
`;

    document.getElementById('logout').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        clearAllCookies(); // Clear all cookies
        alert('Zostałeś wylogowany.'); // Notify the user
        document.getElementById('auth').innerHTML = `
        <p>
            <a href="login.html">Zaloguj się</a> |
            <a href="register.html">Zarejestruj się</a>
        </p>
    `;
        document.getElementById('welcomeMessage').textContent = 'Witaj!'; // Reset welcome message
    });

} else {
    console.log('not logged in');
    document.getElementById('auth').innerHTML = `
        <p>
            <a href="login.html">Zaloguj się</a> |
            <a href="register.html">Zarejestruj się</a>
        </p>
    `;
}


function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function clearAllCookies() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
}
