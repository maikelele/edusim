const canvas = document.getElementById('plotCanvas');
const ctx = canvas.getContext('2d');
const xMin = -5;
const xMax = 5;
const yMin = -5;
const yMax = 5;

function handlePreviousPlotChange() {
    const dropdown = document.getElementById('previousPlotsDropdown');
    const selectedFunction = dropdown.value;

    plotFunction(selectedFunction);
}
function plotFunction(argumentInput = null) {
    console.log(argumentInput);
    const selectInput = document.getElementById('functionInput').value;
    const customInput = document.getElementById('functionCustomInput').value;
    let funcInput = argumentInput || customInput || selectInput;
    console.log(funcInput);
    if (!argumentInput) {
        // Add to previous plots
        const dropdown = document.getElementById('previousPlotsDropdown');
        const option = document.createElement('option');
        option.value = funcInput;
        option.text = String(funcInput);
        dropdown.appendChild(option);
    }

    try {
        console.log("Plotting function:", funcInput);
        const func = new Function('x', `return ${funcInput}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxes();
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = xMin; x <= xMax; x += 0.01) {
            const y = func(x);
            const screenX = canvas.width * (x - xMin) / (xMax - xMin);
            const screenY = canvas.height * (yMax - y) / (yMax - yMin);
            if (x === xMin) {
                ctx.moveTo(screenX, screenY);
            } else {
                ctx.lineTo(screenX, screenY);
            }
        }

        ctx.stroke();
    } catch (error) {
        alert("Nieprawidłowy wzór funkcji. Wprowadź prawidłową funkcję.");
    }
}

function drawAxes() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // Draw X axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Draw Y axis
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // X-axis ticks
    for (let x = xMin; x <= xMax; x++) {
        const screenX = canvas.width * (x - xMin) / (xMax - xMin);
        ctx.fillText(String(x), screenX, canvas.height / 2 + 15);
        ctx.beginPath();
        ctx.moveTo(screenX, canvas.height / 2 - 5);
        ctx.lineTo(screenX, canvas.height / 2 + 5);
        ctx.stroke();
    }

    // Y-axis ticks
    for (let y = yMin; y <= yMax; y++) {
        const screenY = canvas.height * (yMax - y) / (yMax - yMin);
        if (y !== 0) {
            ctx.fillText(String(y), canvas.width / 2 + 10, screenY + 5);
        }
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 5, screenY);
        ctx.lineTo(canvas.width / 2 + 5, screenY);
        ctx.stroke();
    }
}


drawAxes();
