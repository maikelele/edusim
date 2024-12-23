const canvas = document.getElementById('informaticsCanvas');
const ctx = canvas.getContext('2d');

let array = [];
const size = 50;

let speedInput;
let algorithmSelect;

document.addEventListener("DOMContentLoaded", () => {
    speedInput = document.getElementById("speedInput").value;
    algorithmSelect = document.getElementById("algorithmSelect").value;
    console.log(
        "speedInput from DOM: " + speedInput,
        "algorithmSelect from DOM: " + algorithmSelect)
})

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
    console.log("Appending: " + option.text);
    dropdown.appendChild(option);

    if (algorithmSelect === 'bubble') {
        await bubbleSort(speedInput);
    } else if (algorithmSelect === 'selection') {
        await selectionSort(speedInput);
    }
}

generateArray();