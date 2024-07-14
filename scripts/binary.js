document.addEventListener("DOMContentLoaded", () => {
    initializeArray();
});

const array = [];
const arraySize = 20;
let animationDelay = 1500; 
let searchInProgress = false;
let targetValue = 0;
let targetIndex = -1;

function initializeArray() {
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    array.sort((a, b) => a - b); 
    renderArray();
}

function renderArray() {
    const visualizer = document.getElementById("visualizer");
    visualizer.innerHTML = "";

    array.forEach((value, index) => {
        const arrayItem = document.createElement("div");
        arrayItem.className = "array-item";
        arrayItem.textContent = value;
        arrayItem.id = `item-${index}`;
        visualizer.appendChild(arrayItem);
    });
}

function showTargetInputModal() {
    document.getElementById("targetInputModal").style.display = "block";
    document.getElementById("targetValue").focus(); 
}

function closeTargetInputModal() {
    document.getElementById("targetInputModal").style.display = "none";
}

function startBinarySearchFromModal() {
    const inputValue = document.getElementById("targetValue").value;
    if (inputValue !== "") {
        targetValue = parseInt(inputValue, 10);
        closeTargetInputModal();
        startBinarySearch(targetValue);
    }
}

async function startBinarySearch(target) {
    if (searchInProgress) return;

    searchInProgress = true;
    targetIndex = -1;
    let left = 0;
    let right = array.length - 1;

    async function searchStep() {
        if (left <= right) {
            const mid = Math.floor((left + right) / 2);
            updateDescription(`Checking middle index ${mid} (value: ${array[mid]})`);

            if (array[mid] === target) {
                targetIndex = mid;
                updateDescription(`Target ${target} found at index ${mid}`);
                highlightFound(mid);
                searchInProgress = false;
                return;
            }

            highlightComparison(mid);

            if (array[mid] < target) {
                updateDescription(`Value at index ${mid} is less than target ${target}. Searching in the right subarray.`);
                highlightInactive(left, mid);
                left = mid + 1;
            } else {
                updateDescription(`Value at index ${mid} is greater than target ${target}. Searching in the left subarray.`);
                highlightInactive(mid, right);
                right = mid - 1;
            }

            setTimeout(searchStep, animationDelay);
        } else {
            updateDescription(`Target ${target} not found in the array.`);
            searchInProgress = false;
        }
    }

    searchStep();
}

function highlightComparison(index) {
    const item = document.getElementById(`item-${index}`);
    item.classList.add("comparing");

    setTimeout(() => {
        item.classList.remove("comparing");
    }, animationDelay);
}

function highlightFound(index) {
    const item = document.getElementById(`item-${index}`);
    item.classList.add("comparing");
}

function highlightInactive(start, end) {
    for (let i = start; i <= end; i++) {
        const item = document.getElementById(`item-${i}`);
        item.classList.add("inactive");
    }
}

function updateDescription(message) {
    const description = document.getElementById("description");
    description.textContent = message;
}

function resetArray() {
    searchInProgress = false;
    array.length = 0;
    initializeArray();
    updateDescription("Procedure Explanation.");
}

function stopSearching() {
    searchInProgress = false;
}

function showJavaCode() {
    document.getElementById("javaCodeModal").style.display = "block";
}

function closeModal() {
    document.getElementById("javaCodeModal").style.display = "none";
}

function showTimeComplexity() {
    document.getElementById("timeComplexityModal").style.display = "block";
}

function closeTimeComplexityModal() {
    document.getElementById("timeComplexityModal").style.display = "none";
}
