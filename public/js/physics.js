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

document.addEventListener("DOMContentLoaded", () => {
    speed = document.getElementById('speed').value;
    acceleration = document.getElementById('acceleration').value;
    console.log("Speed: " + speed + ", Acceleration: " + acceleration);
})

function handleDropdownChange() {
    const selectedValue = document.getElementById('previousParametersDropdown').value;
    console.log("Selected value: " + selectedValue);
    speed = parseFloat(JSON.parse(selectedValue).speed);
    acceleration = parseFloat(JSON.parse(selectedValue).acceleration);
    console.log("Speed: " + speed + ", Acceleration: " + acceleration);
    startSimulation(speed, acceleration);
}

function handleSpeedChange() {
    speed = parseFloat(document.getElementById('speed').value);
    console.log("Speed: " + speed);
}

function handleAccelerationChange() {
    acceleration = parseFloat(document.getElementById('acceleration').value);
    console.log("Acceleration: " + acceleration);
}

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
}

function stopSimulation() {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time = 0;
}

function startSimulation(dropdownSpeed=null, dropdownAcceleration=null) {
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

    if(dropdownAcceleration === null && dropdownSpeed === null) {
        const dropdown = document.getElementById('previousParametersDropdown');
        let option = document.createElement('option');
        option.value = JSON.stringify({speed: speed, acceleration: acceleration} );
        option.text = "Speed: " + String(speed) + ", Acceleration: " + String(acceleration);
        dropdown.appendChild(option);
        console.log("Appending: " + option.text);
    }

    stopSimulation();
    time = 0;
    interval = setInterval(drawMotion, 10);
}
