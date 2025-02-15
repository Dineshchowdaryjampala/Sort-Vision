let array = [];

function generateArray() {
    let inputValues = document.getElementById("arrayInput").value;
    array = inputValues.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    
    document.getElementById("bars").innerHTML = "";
    
    array.forEach(value => {
        let barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value * 3 + "px";

        let label = document.createElement("div");
        label.classList.add("bar-label");
        label.innerText = value;

        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        document.getElementById("bars").appendChild(barContainer);
    });
}

// Delay function for animations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let labels = document.querySelectorAll(".bar-label");

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");
            await sleep(500);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = array[j] * 3 + "px";
                bars[j + 1].style.height = array[j + 1] * 3 + "px";

                labels[j].innerText = array[j];
                labels[j + 1].innerText = array[j + 1];

                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");
                await sleep(500);
            }

            bars[j].classList.remove("compare", "swap");
            bars[j + 1].classList.remove("compare", "swap");
        }
        bars[array.length - 1 - i].classList.add("sorted");
    }
}

// Selection Sort
async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    let labels = document.querySelectorAll(".bar-label");

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("compare");
            await sleep(500);
            bars[j].classList.remove("compare");

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];

            bars[i].style.height = array[i] * 3 + "px";
            bars[minIndex].style.height = array[minIndex] * 3 + "px";

            labels[i].innerText = array[i];
            labels[minIndex].innerText = array[minIndex];

            bars[i].classList.add("swap");
            bars[minIndex].classList.add("swap");
            await sleep(500);

            bars[i].classList.remove("swap");
            bars[minIndex].classList.remove("swap");
        }

        bars[i].classList.add("sorted");
    }
    bars[array.length - 1].classList.add("sorted");
}

// Insertion Sort
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    let labels = document.querySelectorAll(".bar-label");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            bars[j + 1].classList.add("compare");
            await sleep(500);
            
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j] * 3 + "px";
            labels[j + 1].innerText = array[j];

            bars[j + 1].classList.remove("compare");
            j--;
        }

        array[j + 1] = key;
        bars[j + 1].style.height = key * 3 + "px";
        labels[j + 1].innerText = key;

        bars[j + 1].classList.add("swap");
        await sleep(500);
        bars[j + 1].classList.remove("swap");
    }

    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add("sorted");
    }
}

// Merge Sort (Helper function)
async function merge(start, mid, end) {
    let bars = document.querySelectorAll(".bar");
    let labels = document.querySelectorAll(".bar-label");

    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        bars[k].classList.add("compare");
        await sleep(500);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }

        bars[k].style.height = array[k] * 3 + "px";
        labels[k].innerText = array[k];

        bars[k].classList.remove("compare");
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = array[k] * 3 + "px";
        labels[k].innerText = array[k];
        i++; k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = array[k] * 3 + "px";
        labels[k].innerText = array[k];
        j++; k++;
    }
}

async function merge(start, mid, end) {
    let bars = document.querySelectorAll(".bar");
    let labels = document.querySelectorAll(".bar-label");

    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        bars[k].classList.add("compare");
        await sleep(500);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }

        bars[k].style.height = array[k] * 3 + "px";
        labels[k].innerText = array[k];

        bars[k].classList.remove("compare");
        k++;
    }

    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = array[k] * 3 + "px";
        labels[k].innerText = array[k];
        i++; k++;
    }

    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = array[k] * 3 + "px";
        labels[k].innerText = array[k];
        j++; k++;
    }

    // ✅ Apply "sorted" class only when the full segment is merged
    for (let i = start; i <= end; i++) {
        bars[i].classList.add("sorted");
    }
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
    }
}


async function partition(low, high) {
    let bars = document.querySelectorAll(".bar");
    let labels = document.querySelectorAll(".bar-label");

    let pivot = array[high]; // Choosing the last element as pivot
    let i = low - 1; // Index for smaller elements

    bars[high].classList.add("pivot"); // Highlight pivot

    for (let j = low; j < high; j++) {
        bars[j].classList.add("compare");
        await sleep(500);

        if (array[j] < pivot) {
            i++;
            // Swap array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];

            // Update bar heights and labels
            bars[i].style.height = array[i] * 3 + "px";
            bars[j].style.height = array[j] * 3 + "px";
            labels[i].innerText = array[i];
            labels[j].innerText = array[j];

            bars[i].classList.add("swap");
            bars[j].classList.add("swap");
            await sleep(500);
        }

        bars[j].classList.remove("compare", "swap");
    }

    // Place pivot in the correct position
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = array[i + 1] * 3 + "px";
    bars[high].style.height = array[high] * 3 + "px";
    labels[i + 1].innerText = array[i + 1];
    labels[high].innerText = array[high];

    bars[high].classList.remove("pivot");

    return i + 1; // Returning correct pivot index
}

async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = await partition(low, high);

        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);

        // ✅ Mark sorted elements only after full partitioning
        for (let i = low; i <= high; i++) {
            document.querySelectorAll(".bar")[i].classList.add("sorted");
        }
    }
}


generateArray();
