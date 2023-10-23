const gameboard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

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
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute('square-id', i)
        
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "light" : "dark")
        } else {
            square.classList.add(i % 2 === 0 ? "dark" : "light")
        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black')
        }

        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white')
        }

        gameboard.append(square)
    })
}

createBoard()

const allsquare = document.querySelectorAll(".square")

allsquare.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragover)
    square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function dragStart (e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragover(e) {
   e.preventDefault()

}

function dragDrop(e) {
    e.stopPropagation()
    console.log('e.target', e.target)
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        //must check this first
        if  (takenByOpponent && valid) {
             e.target.parentNode.append(draggedElement)
             e.target.remove()
             checkForWin()
             changePlayer()
             return
         }
        //then check this
        if (taken && !takenByOpponent) {
            infoDisplay.textContent = "you cannot go here!"
            setTimeout(() =>  infoDisplay.textContent = "", 2000)
            return
        }
        if (valid) {
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }
   
}


function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('squareid'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log('targetId',targetId)
    console.log('startId',startId)
    console.log('piece',piece)


     switch (piece) {
        case 'pawn':
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
            if (
                starterRow.includes(startId) && startId + width * 2 === targetId ||
                    startId + width === targetId ||
                    startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                    startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild
             )  {
                return true
            }
            break;
            case 'knight':
                if (
                    startId + width * 2 + 1 === targetId ||
                    startId + width * 2 - 1 === targetId ||
                    startId + width - 2 === targetId ||
                    startId + width + 2 === targetId ||
                    startId  - width * 2 + 1 === targetId ||
                    startId - width * 2 - 1 === targetId ||
                    startId - width - 2 === targetId ||
                    startId - width + 2 === targetId
                ) {
                    return true
                }
                break;
                case 'bishop':
                        if (
                        startId + width + 1 === targetId ||
                        startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild ||
                        startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild ||
                        startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild ||
                        startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstchild ||
                        startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstchild ||
                        startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstchild ||
                        // --
                        startId - width - 1 === targetId ||
                        startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild ||
                        startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild ||
                        startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild ||
                        startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstchild ||
                        startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstchild ||
                        startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstchild ||
                       //--
                        startId - width + 1 === targetId ||
                        startId - width * 2 + 2  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild ||
                        startId - width * 3 + 3  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild ||
                        startId - width * 4 + 4  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild ||
                        startId - width * 5 + 5  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstchild ||
                        startId - width * 6 + 6  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstchild ||
                        startId - width * 7 + 7  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstchild ||
                        // --
                        startId + width - 1 === targetId ||
                        startId + width * 2 - 2  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild ||
                        startId + width * 3 - 3  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild ||
                        startId + width * 4 - 4  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild ||
                        startId + width * 5 - 5  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstchild ||
                        startId + width * 6 - 6  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstchild ||
                        startId + width * 7 - 7  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstchild 
                         ) {
                        return true
                    }
                    break;
                    case 'rook':
                        if (
                            startId + width === targetId ||
                            startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild ||             
                            startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild ||
                            startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild ||
                            startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstchild ||
                            startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstchild ||
                            startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstchild ||
                            
                            // --
                            startId - width === targetId ||
                            startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild ||             
                            startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild ||
                            startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild ||
                            startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstchild ||
                            startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstchild ||
                            startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstchild ||
                            
                            // --
                            startId + 1 === targetId ||
                            startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild ||             
                            startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild ||
                            startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild ||
                            startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild && !document.querySelector(`[square-id="${startId +  4}"]`).firstchild ||
                            startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild && !document.querySelector(`[square-id="${startId +  4}"]`).firstchild && !document.querySelector(`[square-id="${startId +  5}"]`).firstchild ||
                            startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild && !document.querySelector(`[square-id="${startId +  4}"]`).firstchild && !document.querySelector(`[square-id="${startId +  5}"]`).firstchild && !document.querySelector(`[square-id="${startId +  6}"]`).firstchild ||
                            
                             // --
                             startId - 1 === targetId ||
                             startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild ||             
                             startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild ||
                             startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId - 3}"]`).firstchild ||
                             startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId  -  4}"]`).firstchild ||
                             startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId -  3}"]`).firstchild && !document.querySelector(`[square-id="${startId -  4}"]`).firstchild && !document.querySelector(`[square-id="${startId - 5}"]`).firstchild ||
                             startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId -  3}"]`).firstchild && !document.querySelector(`[square-id="${startId -  4}"]`).firstchild && !document.querySelector(`[square-id="${startId -  5}"]`).firstchild && !document.querySelector(`[square-id="${startId -  6}"]`).firstchild 

                        ) {
                         return true
                        }  
                        break;
                        case 'queen':
                            if (
                                startId + width + 1 === targetId ||
                        startId + width * 2 + 2  === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild ||
                        startId + width * 3 + 3  === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild ||
                        startId + width * 4 + 4  === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild ||
                        startId + width * 5 + 5  === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstchild ||
                        startId + width * 6 + 6  === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstchild ||
                        startId + width * 7 + 7  === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstchild ||
                        // --
                        startId - width - 1 === targetId ||
                        startId - width * 2 - 2  === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild ||
                        startId - width * 3 - 3  === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild ||
                        startId - width * 4 - 4  === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild ||
                        startId - width * 5 - 5  === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstchild ||
                        startId - width * 6 - 6  === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstchild ||
                        startId - width * 7 - 7  === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstchild ||
                        // --
                        startId - width + 1 === targetId ||
                        startId - width * 2 + 2  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild ||
                        startId - width * 3 + 3  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild ||
                        startId - width * 4 + 4  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild ||
                        startId - width * 5 + 5  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstchild ||
                        startId - width * 6 + 6  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstchild ||
                        startId - width * 7 + 7  === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstchild ||
                        // --
                        startId + width - 1 === targetId ||
                        startId + width * 2 - 2  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild ||
                        startId + width * 3 - 3  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild ||
                        startId + width * 4 - 4  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild ||
                        startId + width * 5 - 5  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstchild ||
                        startId + width * 6 - 6  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstchild ||
                        startId + width * 7 - 7  === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstchild  && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstchild ||
                        //--
                        startId + width === targetId ||
                            startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild ||             
                            startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild ||
                            startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild ||
                            startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstchild ||
                            startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstchild ||
                            startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstchild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstchild ||
                            
                            // --
                            startId - width === targetId ||
                            startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild ||             
                            startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild ||
                            startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild ||
                            startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstchild ||
                            startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstchild ||
                            startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstchild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstchild ||
                            
                            // --
                            startId + 1 === targetId ||
                            startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild ||             
                            startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild ||
                            startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild ||
                            startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild && !document.querySelector(`[square-id="${startId +  4}"]`).firstchild ||
                            startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild && !document.querySelector(`[square-id="${startId +  4}"]`).firstchild && !document.querySelector(`[square-id="${startId +  5}"]`).firstchild ||
                            startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstchild && !document.querySelector(`[square-id="${startId +  2}"]`).firstchild && !document.querySelector(`[square-id="${startId +  3}"]`).firstchild && !document.querySelector(`[square-id="${startId +  4}"]`).firstchild && !document.querySelector(`[square-id="${startId +  5}"]`).firstchild && !document.querySelector(`[square-id="${startId +  6}"]`).firstchild ||
                            
                             // --
                             startId - 1 === targetId ||
                             startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild ||             
                             startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild ||
                             startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId - 3}"]`).firstchild ||
                             startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId - 3}"]`).firstchild && !document.querySelector(`[square-id="${startId  -  4}"]`).firstchild ||
                             startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId -  3}"]`).firstchild && !document.querySelector(`[square-id="${startId -  4}"]`).firstchild && !document.querySelector(`[square-id="${startId - 5}"]`).firstchild ||
                             startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstchild && !document.querySelector(`[square-id="${startId -  2}"]`).firstchild && !document.querySelector(`[square-id="${startId -  3}"]`).firstchild && !document.querySelector(`[square-id="${startId -  4}"]`).firstchild && !document.querySelector(`[square-id="${startId -  5}"]`).firstchild && !document.querySelector(`[square-id="${startId -  6}"]`).firstchild 
                         )
                    
                    
                          {
                            return true
                         }
                         break;
                         case 'king':
                            if (
                                startId + 1 === targetId ||
                                startId - 1 === targetId ||
                                startId + width === targetId ||
                                startId - width === targetId ||
                                startId + width - 1 === targetId ||
                                startId + width + 1 === targetId ||
                                startId - width - 1 === targetId ||
                                startId - width + 1 === targetId 

                            ) {
                                return true
                         }

        }
    } 

 function changePlayer() {
    if (playerGo === "black") {
        reverseIds()
        playerGo = "white"
        playerDisplay.textContent = 'white'
    } else {
        revertIds()
        playerGo = "black"
        playerDisplay.textContent = 'black'
    }
}


function reverseIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) =>  
    square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds() { 
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}

function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'))
    console.log(kings)
    if (!kings.some(king => king.firstChild.classList.contains('white')))  {
        infoDisplay.innerHTML = "Black player wins!"
        const allSquares = document.querySelector('.squares')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))

    }
    if (!kings.some(king => king.firstChild.classList.contains('black')))  {
        infoDisplay.innerHTML = "white player wins!"
        const allSquares = document.querySelector('.squares')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))

    }
}
