import { getCookie, clearAllCookies } from './helperFunctions.js';

const email = getCookie('email');
const username = getCookie('username');

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


