const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");

infoDisplay.textContent = "X goes first";
let gameover=false;

const startCells = Array(9).fill("");
let go="cross"
function createBoard() {
    gameBoard.innerHTML = ""; 

    startCells.forEach((_cell,index) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.id=index
        square.addEventListener("click",addGo)
        gameBoard.appendChild(square);
    });
}


function addGo(e){
    if(gameover)return
    const goDisplay=document.createElement("div")
    goDisplay.classList.add(go)
    e.target.appendChild(goDisplay)
    go = go === "cross" ? "circle" : "cross";
    infoDisplay.textContent="it is now "+go+"'s turn"
    e.target.removeEventListener("click",addGo)
    checkScore();

}
function checkScore(){
    const allSquares=document.querySelectorAll(".square")
    const winningCombos=[
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6],[1,4,7], [2,5,8],
        [0,4,8],[2,4,6]
    ]
    winningCombos.forEach(array=>{
        const circleWins=array.every(cell=>
            allSquares[cell].firstChild && allSquares[cell].firstChild.classList.contains("circle")
        );
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild && allSquares[cell].firstChild.classList.contains("cross")
        );
        if(circleWins){
            infoDisplay.textContent="O wins!"
            gameover=true;

        }
        else if(crossWins){
            infoDisplay.textContent="X wins!"
            gameover=true;
        }
    })
}

createBoard();