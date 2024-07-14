let array = [];
let timer = null;
let isSearching = false;

function openTargetModal() {
    document.getElementById('targetModal').style.display = 'block';
}

function closeTargetModal() {
    document.getElementById('targetModal').style.display = 'none';
}

function startLinearSearch() {
    const targetInput = document.getElementById('targetValueInput');
    const target = parseInt(targetInput.value);
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        return;
    }
    closeTargetModal();
    if (isSearching) return;
    isSearching = true;
    linearSearch(target);
}

function resetArray() {
    array = generateRandomArray(10, 1, 100);
    displayArray();
    clearDescription();
}

function generateRandomArray(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

function stopSearching() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    isSearching = false;
    clearDescription();
}

function displayArray() {
    const visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = '';
    array.forEach((value, index) => {
        const arrayItem = document.createElement('div');
        arrayItem.className = 'array-item';
        arrayItem.textContent = value;
        visualizer.appendChild(arrayItem);
    });
}

function updateDescription(text) {
    const description = document.getElementById('description');
    description.textContent = text;
}

function clearDescription() {
    updateDescription('Procedure Explanation.');
}

async function linearSearch(target) {
    for (let i = 0; i < array.length; i++) {
        updateDescription(`Checking element ${array[i]}`);
        highlightComparing(i);
        await delay(1000);
        if (array[i] === target) {
            updateDescription(`Element found at index ${i}`);
            isSearching = false;
            return;
        }
        await delay(1000);
        removeHighlight(i);
    }
    updateDescription('Element not found');
    isSearching = false;
}

function highlightComparing(index) {
    const items = document.getElementsByClassName('array-item');
    items[index].classList.add('comparing');
}

function removeHighlight(index) {
    const items = document.getElementsByClassName('array-item');
    items[index].classList.remove('comparing');
}

function delay(ms) {
    return new Promise(resolve => {
        timer = setTimeout(resolve, ms);
    });
}

function showJavaCode() {
    const modal = document.getElementById('javaCodeModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('javaCodeModal');
    modal.style.display = 'none';
}

function showTimeComplexity() {
    const modal = document.getElementById('timeComplexityModal');
    modal.style.display = 'block';
}

function closeTimeComplexityModal() {
    const modal = document.getElementById('timeComplexityModal');
    modal.style.display = 'none';
}

window.onload = function() {
    resetArray();
}

function showTargetInputModal() {
    var modal = document.getElementById("targetInputModal");
    modal.style.display = "block";
    var inputBox = document.getElementById("targetValue");
    inputBox.focus(); // Focus on the input box
}

function closeTargetInputModal() {
    var modal = document.getElementById("targetInputModal");
    modal.style.display = "none";
}

function startLinearSearchFromModal() {
    const targetInput = document.getElementById('targetValue');
    const target = parseInt(targetInput.value);
    if (isNaN(target)) {
        alert("Please enter a valid number.");
        return;
    }
    closeTargetInputModal();
    if (isSearching) return;
    isSearching = true;
    linearSearch(target);
}
