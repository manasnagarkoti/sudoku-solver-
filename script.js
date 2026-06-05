
let board = [
['5','3','.','.','7','.','.','.','.'],
['6','.','.','1','9','5','.','.','.'],
['.','9','8','.','.','.','.','6','.'],
['8','.','.','.','6','.','.','.','3'],
['4','.','.','8','.','3','.','.','1'],
['7','.','.','.','2','.','.','.','6'],
['.','6','.','.','.','.','2','8','.'],
['.','.','.','4','1','9','.','.','5'],
['.','.','.','.','8','.','.','7','9']
];

const boardDiv = document.getElementById("board");

function drawBoard(){
    boardDiv.innerHTML = "";

    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){

            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = `cell-${r}-${c}`;

            if(board[r][c] !== '.')
                cell.innerText = board[r][c];

            boardDiv.appendChild(cell);
        }
    }
}

drawBoard();

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function check(row,col,num){

    for(let c=0;c<9;c++)
        if(board[row][c]===num)
            return false;

    for(let r=0;r<9;r++)
        if(board[r][col]===num)
            return false;

    let startRow = Math.floor(row/3)*3;
    let startCol = Math.floor(col/3)*3;

    for(let r=startRow;r<startRow+3;r++){
        for(let c=startCol;c<startCol+3;c++){
            if(board[r][c]===num)
                return false;
        }
    }

    return true;
}

async function backtracking(){

    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){

            if(board[row][col]==='.'){

                for(let num=1;num<=9;num++){

                    let ch = String(num);

                    if(check(row,col,ch)){

                        board[row][col]=ch;

                        document.getElementById(
                        `cell-${row}-${col}`
                        ).innerText = ch;

                        await sleep(50);

                        if(await backtracking())
                            return true;

                        board[row][col]='.';

                        document.getElementById(
                        `cell-${row}-${col}`
                        ).innerText = "";

                        await sleep(50);
                    }
                }

                return false;
            }
        }
    }

    return true;
}

async function solve(){
    await backtracking();
}
