const gameBoard = document.querySelector("#gameBoard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,

    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,

]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable',true)
        square.setAttribute('square-id', i)
        const row = Math.floor( (63 - i) / 8) + 1
        if (row % 2 === 0){
            square.classList.add(i % 2 === 0 ? "dark" : "light")
        } else {square.classList.add(i % 2 === 0 ? "light" : "dark")
    }

    if ( i <= 15){
    square.firstChild.firstChild.classList.add('black')
}

if ( i >= 48) {
    square.firstChild.firstChild.classList.add('white')
}

        gameboard.append(square);
    });
}

createBoard();

const allsquare = document.querySelectorAll("#gameboard .square")

allsquare.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragover)
})

let startPositionId = 
let draggedElement
function dragStart (e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver()

