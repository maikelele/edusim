function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('='); // Trim and split
        if (key === name) { // Correct comparison after trimming
            return decodeURIComponent(value); // Decode the cookie value in case it's encoded
        }
    }
    return null; // Return null if cookie not found
}

console.log(document.cookie)

const email = getCookie('email');

if (email) { // Check if email exists and is not empty
    console.log('logged in');
    document.getElementById('welcomeMessage').textContent = `Welcome, ${email}`;
} else {
    console.log('not logged in');
}