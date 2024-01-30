const canvas = document.getElementById('mazeCanvas');
const pen = canvas.getContext('2d');

const canvas2 = document.getElementById('mazeCanvas2');
const pen2 = canvas2.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let cellSize = 40; 
let points =0;
const cols = Math.floor(width / cellSize);
const rows = Math.floor(height / cellSize);
const player1 = {
    x: 0,
    y: 0,
    color: 'red',
};

const end = {
    x: cols - 1,
    y: rows - 1,
    color: 'blue',
};
function addListener(){
    document.addEventListener('keydown', handleKeyPress);
}

document.getElementById('btnUp').addEventListener('click', function () {
    movePlayer('ArrowUp', player1);
    draw();
});

document.getElementById('btnDown').addEventListener('click', function () {
    movePlayer('ArrowDown', player1);
    draw();
});

document.getElementById('btnLeft').addEventListener('click', function () {
    movePlayer('ArrowLeft', player1);
    draw();
});

document.getElementById('btnRight').addEventListener('click', function () {
    movePlayer('ArrowRight', player1);
    draw();
});

function handleKeyPress(event) {
    const key = event.key;
    movePlayer(key, player1);
    draw(); // remove the trace of player1 after movement
}

function movePlayer(key, player) {
    switch (key) {
        case 'ArrowUp':
            if (player.y > 0 && cells[player.x][player.y].walls.top === false) {
                player.y--;
                points++;
            }
            break;
        case 'ArrowDown':
            if (player.y < rows - 1 && cells[player.x][player.y].walls.bottom === false) {
                player.y++;
                points++;
            }
            break;
        case 'ArrowLeft':
            if (player.x > 0 && cells[player.x][player.y].walls.left === false) {
                player.x--;
                points++;
            }
            break;
        case 'ArrowRight':
            if (player.x < cols - 1 && cells[player.x][player.y].walls.right === false) {
                player.x++;
                points++;
            }
            break;
    }
    if(player.x==cols-1 && player.y==rows-1){
        document.removeEventListener('keydown', handleKeyPress);
        document.getElementById('moves').innerHTML="Moves:"+points;
        document.getElementsByClassName('msgbox')[0].style.visibility="visible";
    }
}

function clearScreen() {
    pen.canvas.width = pen.canvas.width;
}
function displayHidden(){
    document.getElementsByClassName('msgbox')[0].style.visibility="hidden";
}
// const cells = Array.from({length:cols},()=>new Array(rows))
const cells = [];
for (let x = 0; x < rows; x++) {
    cells[x] = [];
    for (let y = 0; y < cols; y++) {
        cells[x][y] = null; 
    }
}


class CellA {
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
            cells[x][y] = new CellA(x, y);
            
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
    clearScreen();
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            cells[x][y].show();
        }
    }

    drawPlayer(player1);
    drawPlayer(end);
    pen.strokeStyle = 'green';
    pen.lineWidth = 6;
    pen.lineCap = "round";
    pen.stroke();
}

function drawPlayer(player) {
    const x = player.x * cellSize;
    const y = player.y * cellSize;

    pen.fillStyle = player.color;
    pen.fillRect(x, y, cellSize, cellSize);
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

class CellB{
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
            cells[x][y] = new CellB(x, y);
            
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

setup2();
draw2();
