const canvas = document.getElementById('mazeCanvas');
const pen = canvas.getContext('2d');

const canvas2 = document.getElementById('mazeCanvas2');
const pen2 = canvas2.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const cellSize =40;

const cols = Math.floor(width/ cellSize);
const rows = Math.floor(height/ cellSize);
function clearScreen(){
    pen.canvas.width = pen.canvas.width;
}
function sizeCelle(){
    cellSize =50;
}
function sizeCellm(){
    cellSize =20;
}
function sizeCellh(){
    cellSize =10;
}
// const cells = Array.from({length:cols},()=>new Array(rows))
const cells = [];
for (let x = 0; x < rows; x++) {
    cells[x] = [];
    for (let y = 0; y < cols; y++) {
        cells[x][y] = null; 
    }
}


class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        };
    }

    show() {
        const x = this.x * cellSize;
        const y = this.y * cellSize;

        
        if (this.walls.top) {
            pen.moveTo(x, y);
            pen.lineTo(x + cellSize, y);
        }

        if (this.walls.right) {
            pen.moveTo(x + cellSize, y);
            pen.lineTo(x + cellSize, y + cellSize);
        }

        if (this.walls.bottom) {
            pen.moveTo(x + cellSize, y + cellSize);
            pen.lineTo(x, y + cellSize);
        }

        if (this.walls.left) {
            pen.moveTo(x, y + cellSize);
            pen.lineTo(x, y);
        }
    }
}
function setup() {
    // Initialize the cells
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            cells[x][y] = new Cell(x, y);
            
        }
    }
    genMaze(0,0);    
}
// function genMaze basically setting values as true/false for different directions-walls 
// and adding a line/wall if true
function genMaze(x, y) {
    const presentCell = cells[x][y];
    presentCell.visited = true;

    const directions = randomize(['top', 'right', 'bottom', 'left']);

    for (const direction of directions) {
        const dx = { top: 0, right: 1, bottom: 0, left: -1 }[direction];
        const dy = { top: -1, right: 0, bottom: 1, left: 0 }[direction];

        const newX= x + dx;
        const newY= y + dy;
        // if the coordinates are inbound
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
            const neighbour = cells[newX][newY];

            // removing walls

            if (!neighbour.visited) {
                presentCell.walls[direction] = false;
                neighbour.walls[{
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[direction]] = false;
                genMaze(newX, newY);
            }
        }
    }
}

function draw() {

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            cells[x][y].show();
        }
    }
    pen.strokeStyle = 'orange';
    pen.lineWidth = 7;
    pen.lineCap = "round";
    pen.stroke();

}
function randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;

}

// grid 2 for making all the cells
// and then overlapping with grid1 by setting position as absolute 

class Cell2{
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        };
    }
    show2(){
        const r = this.x * cellSize;
        const c = this.y * cellSize;

        
        if (this.walls.top) {
            pen2.moveTo(r, c);
            pen2.lineTo(r + cellSize, c);
        }

        if (this.walls.right) {
            pen2.moveTo(r + cellSize, c);
            pen2.lineTo(r + cellSize, c + cellSize);
        }

        if (this.walls.bottom) {
            pen2.moveTo(r + cellSize, c + cellSize);
            pen2.lineTo(r, c + cellSize);
        }

        if (this.walls.left) {
            pen2.moveTo(r, c + cellSize);
            pen2.lineTo(r, c);
        }

    }
}

function setup2() {

    // Initialize the cells
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            cells[x][y] = new Cell2(x, y);
            
        }
    }
}

function draw2() {

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            cells[x][y].show2();
        }
    }

    pen2.strokeStyle = 'black';
    pen2.lineWidth=0.25;
    pen2.stroke();
}
setup();
draw();

setup2();
draw2();
