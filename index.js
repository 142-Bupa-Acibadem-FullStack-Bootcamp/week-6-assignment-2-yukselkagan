


let activeTurn = "X";
let gameBoard = document.getElementById("game-board");
let boardPartArray = [];

let matchStatus = "started";
let gameMessage = "";



class BoardPart{
    constructor(id, marked) {
        this.id = id;
        this.marked = marked;
        this.mark = null;
    }
}


/* 
        .board-part{
            background-color: yellow;
            width: 30px;
            height: 30px;
            border : 1px solid black;
            display: inline-block;
            cursor: pointer;
            text-align: center;
            vertical-align: middle;

            margin-top: 1px;
        }
        */ 
/* 
        .board-part div{
            margin: 0;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
 */


function initBoard(){

    let style = document.createElement('style');
    style.innerHTML = `
    .board-part { 
        background-color: yellow;
        width: 30px;
        height: 30px;
        border : 1px solid black;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        vertical-align: middle;
        margin-top: 1px;
    
    }

    .board-part div{
        margin: 0;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    
    `;
    document.getElementsByTagName('head')[0].appendChild(style);




    let newPart = new BoardPart(0,false);
    boardPartArray.push(newPart);
    

    for(let i=1; i <= 9; i++){
        let newPart = new BoardPart(i,false);
        boardPartArray.push(newPart);

        let boardPart = document.createElement("div");
        boardPart.classList.add("board-part");
        boardPart.innerHTML = "<div></div>";
        boardPart.onclick = function() { markPart(boardPart, i, null); };

        gameBoard.appendChild(boardPart);

        if(i % 3 == 0){
            let breakTag = document.createElement("br");
            gameBoard.appendChild(breakTag);
        }

    }

}


function markPart(e, id){

    if(matchStatus != "end"){

        if(boardPartArray[id].marked == false ){
            boardPartArray[id].marked = true;
            let Player = activeTurn;
            if(activeTurn == "X"){
                e.innerHTML = "<div>X</div>";
                activeTurn = "O";
                boardPartArray[id].mark = "X";
            }else{
                e.innerHTML = "<div>O</div>";
                activeTurn = "X";
                boardPartArray[id].mark = "O";
            }

            let resultControl = controlWin();
            let drawControl = controlDraw();
            if(resultControl == true){
                matchStatus = "end";
                gameMessage = `${Player} win`;
                alert(gameMessage);            
            }else if(drawControl == true){
                matchStatus = "end";
                gameMessage = `Draw`;
                alert(gameMessage); 
            }
            
        }else{
            alert("Already marked");
        }

    }else{
        alert(gameMessage);
    }

}


function controlWin(){

    let horizontalWin = horizontalControl();
    let verticalWin = verticalControl();
    let crossWin = crossControl();

    if(horizontalWin == true || verticalWin == true || crossWin == true ){
        return true;
    }else{
        return false;
    }

}

function controlDraw(){

    let drawGame = true;
    for(let i=1; i<=9; i++){
        if(boardPartArray[i].marked == true){
            
        }else{
            drawGame = false;
        }
    }

    return drawGame;

}




function horizontalControl(){

    for(let i=0; i < 3; i++){
        let winGame = true;
        startPartId = (i*3)+1;
        let activeMark = boardPartArray[startPartId].mark;
        for(let i=1; i <= 2; i++){
            if(activeMark != null && activeMark == boardPartArray[startPartId+i].mark){
 
            }else{
                winGame = false;
            }
        }
        if(winGame == true){
            return true;
        }
    }
    return false;

}


function verticalControl(){

    for(let i=1; i <= 3; i++){
        let winGame = true;
        startPartId = i;
        let activeMark = boardPartArray[startPartId].mark;
        for(let i=1; i <= 2; i++){
            if(activeMark != null && activeMark == boardPartArray[startPartId+(i*3)].mark){
 
            }else{
                winGame = false;
            }
        }
        if(winGame == true){
            return true;
        }
    }
    return false;

}


function crossControl(){

    let cross1Array = [1,5,9];
    let cross2Array = [3,5,7];

    activeMarkCross1 = boardPartArray[1].mark;
    let winGameCross1 = true;
    for(let i=0; i < cross1Array.length; i++){
        partId = cross1Array[i];
        if(activeMarkCross1 != null && activeMarkCross1 == boardPartArray[partId].mark){

        }else{
            winGameCross1 = false;
        }        
    }

    activeMarkCross2 = boardPartArray[3].mark;
    let winGameCross2 = true;
    for(let i=0; i < cross2Array.length; i++){
        partId = cross2Array[i];
        if(activeMarkCross2 != null && activeMarkCross2 == boardPartArray[partId].mark){

        }else{
            winGameCross2 = false;
        }        
    }

    if(winGameCross1 == true || winGameCross2 == true){
        return true;
    }else{
        return false;
    }

}




initBoard();
















