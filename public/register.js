window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get('error');
    console.log(errorMessage);
    if (errorMessage) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = "Nazwa email już zajęta";
        console.log("Nazwa email już zajęta")
        errorDiv.style.display = 'block';
    }
}
