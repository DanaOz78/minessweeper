// JavaScript source code

'use strict'

const BOMB = '💣';
const FLAG = '🚩';
const BLOCK = '';
const NORMAL = '😀';
const LOSE = '🤯';
const WIN = '😎';

//state of cell
var gcell = {
    minesAroundCount: 0,
    isShown: true,
    isMine: false,
    isMarked: false
};
//state board game level
var gLevel = {
    1: {
        SIZE: 4,
        MINES: 2,
    },
    2: {
        SIZE: 8,
        MINES: 12,
    },
    3: {
        SIZE: 12,
        MINES: 30,
    },

}

var gSelectedLevel = null;
//state of game
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gMines = [];
var gFirstClicked = true;
var gBoard;
//var gCountFlag = 0;
var gScore;
var gBestScore = 0;
//var gResult = '';
var gCountLives = 3;

var gElScore = null;
var gElBestScore = null;

var gElTimer = null;
var gTimerId = null;
var gTimerCount = 0;


function init() {
    // gBoard = buildBoard(gLevel);
    //renderBoard(gBoard);
    //setMines(1,2);
    gElScore = document.getElementById('score');
    gElBestScore = document.getElementById('bestscore');
    gElTimer = document.getElementById('timer');
}

function gSelectedLevel(level) {
    console.log('level', level);

    gSelectedLevel = gLevel[level];
    console.log('gSelectedLevel', gSelectedLevel);
    newGame();

}

function updateScore() {
    gElScore.innerHTML = 'score: ${gScore}';
}

function newGame() {

    // gCountLive =3;
    gBestScore = gScore > gBestScore ? gScore : gBestScore;
    gElBestScore.innerHTML = 'best score:${gBestScore}';
    gScore = 0;
    gFirstClicked = true;
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);

    clearIntreval(gTimerId);
    gTimerCount = 0;

    gTimerId =setInterval(function(){
        gElTimer.innerHTML ='timer: ${timerCount++}';},1000)
    }


}




function buildBoard(gLevel) {

    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { ...gcell };//copy object to new object

        }
    }
    return board;
    console.log(board);
}


function setMines(a, b) {//check

    // console.log('set mines',a,b);
    // console.log(gBoard);
    for (var i = 0; i < gSelectedLevel.MINES; i++) {
        var intI = getRandomInt(0, gSelectLevel.SIZE - 1);//getRandomInt
        var intJ = getRandomInt(0, gSelectLevel.SIZE - 1);
        console.log(intI, intJ);
        if (intI === a && intJ === b && gFirstClicked) {
            i--;
            continue;
        }
        gBoard[intI][intJ].isMine = true;
        gMines.push(gBoard[intI][intJ]);
    }
}


function renderBoard(board) {
    console.log("render");
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            var icon = '';
            var className = !cell.isMine && cell.isShown && cell.minesAroundCount <= 0 ? 'shown' : '';
            // console.log(cell);
            if (cell.isShown) {
                if (cell.minesAroundCount > 0) {
                    icon = cell.minesAroundCount;
                }
            }
            if (cell.isMarked){
                icon =FLAG;
            }
            if (cell.isShown && cell.isMine)
            // if (cell.isMine) {
            //     console.log(cell.isMine);
            //    icon =BOMB;
            // }
            //console.log('cell',cell.isMine,icon);

            strHtml += `<td class="cell ${className}" data-i="${i}" data-j="${j}"
            onclick="cellClicked( ${i},${j})">${icon}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}




function cellClicked(i, j) {
    console.log('cell clicked:', i, j);
    var clickedCell = gBoard[i][j];
    if (gFirstClicked) {//only first click
        console.log('firstclick');
        setMines(i, j);
        setMinesNegCount();
        gFirstClicked = false;
        gScore += 5;
        if (gScore > gBestScore) {
            gBestScore = gScore;
        }

    }
    clickedCell.isShown = true;

    if (!clickedCell.minesAroundCount && !clickedCell.isMine) {
        selectAllShown(i, j);
        gScore = +10;
        if (gScore > gBestScore) {
            gBestScore = gScore;
        }
    }
    if (clickedCell.isMine && gCountLives > 0) {//?
        gCountLives--;
        alert('there is a bomb here');
        console.log(gCountLives);
    }
    if (clickedCell.isMine && gCountLives === 0) {//?
        alert('you lose');
    }
}





// if (gBoard[i][j].isMine) {//render
//  gBoard[i][j].isShown = true;
// for (var ind = 0; ind < gMines.length; ind++) {//?
//    var i = gMines[ind].i;
//   var j = gMines[ind].j;
//  gBoard[i][j].isShown =true;
//   gResult='lose';//?
//  renderBoard();
//  gameOver();

// } else if (gBoard[i][j].minesAroundCount != 0) {
//    gBoard[i][j].isShown = true;
// } else if (gBoard[i][j] === 0) expandShown(gBoard, el, i, j);
// renderBoard(gBoard);
//}

function cellMarked(elMarked) {

    gScore = +10;
    if (gScore > gBestScore) {
        gBestScore = gScore;//rigth click
    }

}

function checkGameOver() {//win or not

    gResult = '';
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];
            if (((currCell.isMine && currCell.isMarked)) ||
                ((currCell.isShown && (!currCell.isMine)))) {
                gResult = win;
            }
        }
    }
    return gResult;
}

function gameOver() {//stop timer ,mines

}




//function expandShown(board, elCell, i, j) {

// var indI = i;
// var indJ = j;
//for (var indI = i - 1; indI <= i + 1; indI++) {
// for (var indJ = j - 1; indJ <= j + 1; indJ++) {
// if (intI < 0 || IntI > gBoard.length || intJ < 0 || intJ > gBoard.length) {
// continue;
// }
//if (gBoard[intI][indJ].minesAroundCount != 0) {
//gBoard[indI][intJ].isShown === true;
// continue;
// } else if (gBoard[indI][intJ].minesAroundCount === 0) {
// expandShown(gBoard, elCell, intI, intJ);
// }
// }
// }
//}





function setMinesNegCount() {
    console.log('check');
    //var countMines = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                for (var x = i - 1; x <= i + 1; x++) {
                    for (var y = j - 1; y <= j + 1; y++) {
                        if (gBoard[x] && gBoard[x][y]) {
                            if (!gBoard[x][y].isMine) {
                                gBoard[x][y].minesAroundCount++;
                            }
                        }
                    }
                }
            }
        }
    }
}


function selectAllShown(x, y) {
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (gBoard[i] && gBoard[i][j]) {
                var cell = gBoard[i][j];
                if (!cell.isShown && !cell.isMine) {
                    if (!cell.minesAroundCount) {
                        cell.isShown = true;
                        selectAllShown(i, j);
                    } else {
                        cell.isShown = true;
                    }
                }
            }
        }
    }
}





function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}










