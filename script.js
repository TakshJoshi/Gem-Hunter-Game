const fills = document.querySelectorAll('.fill');
const empties = document.querySelectorAll('.empty');
const scoreDisplay = document.getElementById('score');

const droppedGems = {};
let score = 0;

for (const fill of fills) {
    fill.addEventListener('dragstart', dragStart);
    fill.addEventListener('dragend', dragEnd);
}

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

let draggedItem = null;

function dragStart() {
    draggedItem = this;
    const width = this.offsetWidth;
    const height = this.offsetHeight;
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
    this.classList.add('hold');
    this.classList.remove('invisible');
    setTimeout(() => this.classList.add('invisible'), 0);
}

function dragEnd() {
    this.classList.remove('hold');
    this.style.width = '';
    this.style.height = '';
    draggedItem = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    this.classList.remove('hovered');
    const cellIndex = Array.from(this.parentNode.children).indexOf(this);
    const gemType = draggedItem.querySelector('img').cloneNode(true); 

    if (droppedGems[cellIndex] && droppedGems[cellIndex].length >= 6) {
        return; 
    }

    if (!droppedGems[cellIndex]) {
        droppedGems[cellIndex] = [gemType];
    } else {
        droppedGems[cellIndex].push(gemType);
    }

    if (droppedGems[cellIndex].length >= 3 && allSame(droppedGems[cellIndex])) {
        const cells = this.parentNode.children;
        for (const cell of cells) {
            cell.innerHTML = '';
        }

        score += 5;
        scoreDisplay.textContent = score;

        droppedGems[cellIndex] = [];
    }

    this.appendChild(gemType); 

    if (droppedGems[cellIndex].length >= 6) {
        draggedItem.removeAttribute('draggable');
    }
}


function allSame(arr) {
    return arr.every(val => val === arr[0]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const imageSources = [
    "emerald-stone.png",
    "amethyst-stone.png",
    "ruby-stone.png",
    "https://www.transparentpng.com/thumb/opal/opal-png-transparent-6.png"
];

const fillElements = document.querySelectorAll(".fill");

fillElements.forEach(fill => {
    const img = fill.querySelector("img");
    const shuffledSources = shuffleArray(imageSources);
    img.src = shuffledSources[0];
});
