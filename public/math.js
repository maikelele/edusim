const canvas = document.getElementById('plotCanvas');
const ctx = canvas.getContext('2d');
const xMin = -5;
const xMax = 5;
const yMin = -5;
const yMax = 5;
const email = getCookie('email');

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

document.addEventListener("DOMContentLoaded", () => {
    console.log("Email: " + email);
    if (email) {
        fetch('/getPlots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response as JSON
                } else {
                    console.error('Error retrieving functions from database');
                    return [];
                }
            })
            .then(data => {
                const functions = data.functions;
                const dropdown = document.getElementById('previousPlotsDropdown');
                for (let i = 0; i < functions.length; i++) {
                    console.log(functions[i]);
                    const option = document.createElement('option');
                    option.value = functions[i]; // Assume the response contains function strings
                    option.text = functions[i];
                    dropdown.appendChild(option);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.log("No email cookie found");
    }
})

function handlePreviousPlotChange() {
    const dropdown = document.getElementById('previousPlotsDropdown');
    const selectedFunction = dropdown.value;

    plotFunction(selectedFunction);
}

function plotFunction(argumentInput = null) {
    console.log("Argument input: " + argumentInput);
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
        if(email) {
            fetch('/savePlot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    funcInput: funcInput,
                }),
            }).then(response => {
                if (response.ok) {
                    console.log('Plot data saved successfully');
                } else {
                    console.error('Error saving plot data');
                }
            }).catch(error => {
                console.error('Network error:', error);
            });
        }
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
