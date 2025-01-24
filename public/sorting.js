const canvas = document.getElementById('informaticsCanvas');
const ctx = canvas.getContext('2d');
const email = getCookie('email');

let array = [];
const size = 50;

let speedInput;
let algorithmSelect;

document.addEventListener("DOMContentLoaded", () => {
    generateArray();
    speedInput = document.getElementById("speedInput").value;
    algorithmSelect = document.getElementById("algorithmSelect").value;
    console.log(
        "speedInput from DOM: " + speedInput,
        "algorithmSelect from DOM: " + algorithmSelect)
    if(email) {
        fetch('getSorting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
            .then(response => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.error('Error retrieving sorting parameters from database');
                    return [];
                }
            })
            .then(data => {
                console.log("Data: " + JSON.stringify(data));
                const dropdown = document.getElementById('previousParametersDropdown');
                data.sorting.forEach(item => {
                    const option = document.createElement('option');
                    option.value = JSON.stringify({algorithm: item.algorithm_name, speed: item.sorting_speed});
                    console.log(
                        "Algorytm: " + item.algorithm_name,
                        "Prędkość: " + item.sorting_speed)
                    option.text = "Algorytm: " + item.algorithm_name + ", Prędkość: " + item.sorting_speed;

                    for (let i = 0; i < dropdown.length; i++) {
                        const el = dropdown.options[i];
                        console.log(`dropdown[${i}].text: `, el.text);
                        if (el.text === option.text) {
                            return;
                        }
                        dropdown.appendChild(option);
                    }
                });

            })
            .catch(error => {
                console.error('Error:', error);
            })
    }
})

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null; // Return null if cookie not found
}

function handleAlgorithmSelect() {
    algorithmSelect = document.getElementById("algorithmSelect").value;
    console.log("Algorithm selected: " + algorithmSelect);
}

function handleSpeedInputChange() {
    speedInput = document.getElementById("speedInput").value;
    console.log("Speed input changed: " + speedInput);
}

async function handlePreviousParametersChange() {
    speedInput = JSON.parse(document.getElementById('previousParametersDropdown').value).speed;
    algorithmSelect = JSON.parse(document.getElementById('previousParametersDropdown').value).algorithm;
    console.log("speedInput: " + speedInput, "\nalgorithmSelect: " + algorithmSelect)
    await startSorting();
}

function generateArray() {
    array = Array.from({length: size}, () => Math.floor(Math.random() * canvas.height));
    drawArray();
}

async function bubbleSort(speedInput=null) {
    let swapped;
    for (let i = 0; i < size - 1; i++) {
        swapped = false;
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
                drawArray(j);
                await new Promise(resolve => setTimeout(resolve, speedInput));
            }
        }
        if (!swapped) break;
    }
}

async function selectionSort() {
    for (let i = 0; i < size - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < size; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
                drawArray(minIndex, -1);
                await new Promise(resolve => setTimeout(resolve, speedInput));
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray(i, minIndex);
            await new Promise(resolve => setTimeout(resolve, speedInput));
        }
    }
}

function drawArray(highlightIndex1 = -1, highlightIndex2 = -1) {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / size;

    array.forEach((value, index) => {
        if (index === highlightIndex1) {
            ctx.fillStyle = '#28a745'; // Green for the first highlighted element
        } else if (index === highlightIndex2) {
            ctx.fillStyle = '#ff073a'; // Red for the second highlighted element
        } else {
            ctx.fillStyle = '#007bff';
        }
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth - 2, value);
    });
}

async function startSorting() {
    generateArray();
    console.log("Speed input: " + speedInput + ", Algorithm: " + algorithmSelect);

    const dropdown = document.getElementById('previousParametersDropdown');
    const option = document.createElement('option');
    option.value = JSON.stringify({algorithm: algorithmSelect, speed: speedInput});
    option.text = "Algorytm: " + String(algorithmSelect) + ", Prędkość: " + String(speedInput);
    if (!Array.from(dropdown.options).some(el => el.text === option.text)) {
        console.log("Appending: " + option.text);
        dropdown.appendChild(option);
        fetch('saveSorting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { email: email, algorithm: algorithmSelect, speed: speedInput}),
        });
    }

    if (algorithmSelect === 'bubble') {
        await bubbleSort(speedInput);
    } else if (algorithmSelect === 'selection') {
        await selectionSort(speedInput);
    }
}
