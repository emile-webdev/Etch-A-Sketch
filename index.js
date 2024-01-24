/* ---GLOBAL VARIABLES--- */
const canvasSize = 600;

const cellsBtn = document.querySelector('#cells-btn');
const blackBtn = document.querySelector('#black-btn');
const randomBtn = document.querySelector('#random-btn');
const resetBtn = document.querySelector('#reset-btn');
const canvas = document.querySelector('#canvas');

let color = 'black';
let click = false;

/* ---GRID INPUT--- */
document.addEventListener('DOMContentLoaded', function() {
    createGridCells(16);

    document.querySelector('body').addEventListener('click', function(e) {
        if(e.target.tagName != 'BUTTON') {
            click = !click;
            let draw = document.querySelector('#message');
            if(click) {
                draw.innerHTML = 'Start drawing';
            } else {
                draw.innerHTML = 'Stopped drawing';
            }
        }
    })

    cellsBtn.addEventListener('click', function() {
        let grid = inputCells();
        removeGridCells();
        createGridCells(grid);
    })
})

/* ---CANVAS SIZE---*/
canvas.style.width = canvas.style.height =`${canvasSize}px`;

/* ---GRID COLORS--- */
function cellColor() {
    if(click) {
        if(color == 'random') {
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
            this.style.backgroundColor = 'black';
        }
    }
}

function setColor(colorChoice) {
    color = colorChoice;
}

/* ---RESET GRID--- */
function resetCanvas() {
    let clearCells = document.querySelectorAll('.cell');
    clearCells.forEach(gridCell => gridCell.style.backgroundColor = "white");
}

/* ---CREATE GRID--- */
function createGridCells(grid) {
    const numCells = (grid * grid);
    const cellSize = `${(canvasSize / grid)}px`;

    for(let i = 0; i < numCells; i++) {
        const gridCell = document.createElement('div');

        gridCell.style.width = gridCell.style.height = cellSize;
        gridCell.classList.add('cell');

        canvas.appendChild(gridCell);

        gridCell.addEventListener('mouseover', cellColor);
    }
}

/* ---POPUP--- */
function inputCells() {
    let input = prompt('Enter amount of cells');
    let message = document.querySelector('#message');
    if(input == '') {
        message.innerHTML = 'Please enter amount of cells!';
    } else if(input < 1 || input > 100) {
        message.innerHTML = 'Please enter a number between 1 and 100!';
    } else {
        return input;
    }
}

function removeGridCells() {
    while(canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

