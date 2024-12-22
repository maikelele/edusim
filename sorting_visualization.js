const canvas = document.getElementById('informaticsCanvas');
const ctx = canvas.getContext('2d');

let array = [];
const size = 50;
let speed = document.getElementById('speedInput').value;
const algorithm= document.getElementById('algorithmSelect').value;

const speedInput = document.getElementById('speedInput');
const algorithmSelect = document.getElementById('algorithmSelect');

speedInput.addEventListener('input', (e) => {
    sortingSpeed = parseInt(e.target.value);
});

algorithmSelect.addEventListener('change', (e) => {
    selectedAlgorithm = e.target.value;
});

function generateArray() {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * canvas.height));
    drawArray();
}

function drawArray(highlightIndex = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / size;

    array.forEach((value, index) => {
        ctx.fillStyle = index === highlightIndex ? '#ff5733' : '#007bff';
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth - 2, value);
    });
}

async function bubbleSort() {
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(j);
                await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < size - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < size; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
                drawArray(minIndex);
                await new Promise(resolve => setTimeout(resolve, sortingSpeed));
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray(i);
            drawArray(minIndex);
            await new Promise(resolve => setTimeout(resolve, sortingSpeed));
        }
    }
}

async function startSorting() {
    if (selectedAlgorithm === 'bubble') {
        await bubbleSort();
    } else if (selectedAlgorithm === 'selection') {
        await selectionSort();
    }
}

generateArray();
setTimeout(startSorting, 1000);