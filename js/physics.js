const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');

// Set canvas width to the width of the whole screen
canvas.width = window.innerWidth;
canvas.height = 200; // Set a default height for the canvas

let position = 0;
let speed = 0;
let acceleration = 0;
let interval;
let time = 0;

function drawMotion() {
    position = speed * time + (acceleration * Math.pow(time, 2)) / 2;

    if (position > canvas.width + 20 || position < -20) {
        position = -20;
        time = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#007bff';
    ctx.beginPath();
    ctx.arc(position, canvas.height / 2, 20, 0, 2 * Math.PI);
    ctx.fill();

    time += 1 / 100;
    console.log("position: " + position);
    console.log("t: " + time)
}

function startSimulation() {
    // Display a message on the screen when the simulation starts
    const messageDiv = document.createElement('div');
    messageDiv.id = 'simulationMessage';
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '10px';
    messageDiv.style.left = '10px';
    messageDiv.style.padding = '10px';
    messageDiv.style.backgroundColor = '#ffffff';
    messageDiv.style.border = '2px solid #007bff';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.innerText = 'Symulacja rozpoczęta!';

    messageDiv.innerText = 'Symulacja rozpoczęta! Prędkość początkowa: '
        + parseFloat(document.getElementById('speed').value) + ' px/s, Przyspieszenie: '
        + parseFloat(document.getElementById('acceleration').value) + ' px/s²';
    // Add the message to the body
    document.body.appendChild(messageDiv);

    // Remove the message after 3 seconds
    setTimeout(() => {
        if (messageDiv) {
            messageDiv.remove();
        }
    }, 3000);
    clearInterval(interval);
    position = -40;
    speed = parseFloat(document.getElementById('speed').value);
    acceleration = parseFloat(document.getElementById('acceleration').value);
    interval = setInterval(drawMotion, 10);
}
