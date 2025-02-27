var board;
var score = 0;
var rows = 4;
var columns = 4;
var dadiction = ['', 'da', 'yoda', 'dad', 'yodad', 'dada', 'yodada', 'dadada', 
    'yodada-da', 'dada-dada', 'yodada-dada', 'dada-dada8', 'pops', 'popah', 
    'popeye', 'daddy', 'godaddy', 'MAX SCORE OMG WHAT ARE YOU DOING', 
    'THIS SHOULDNT BE MATHAMATICALLY POSSIBLE', 'HUH???????']
var extreme = ['max', 'this', 'huh']
var gameLevel = 0;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {
            // creates a div tag <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); //0-0 r-c
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    daSet('da');
    daSet('da');
}

function hasEmptyTile() {
    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
            if (board[r][c] == 6) {
                midgame = true;
            }
            if (board[r][c] == 12) {
                endgame = true;
            }
        }
    }
    return false;

}

function daSet(whatText) {
    console.log(whatText)
    if (!hasEmptyTile()) {
        return;
    }

    let found = false;
    while(!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        
        if (board[r][c] == 0) {
            board[r][c] = 1;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = whatText;
            tile.classList.add(whatText);
            found = true;
        }
    }
}



function updateTile(tile, num) {
    tile.classList.value = ""; // clear the class list like <div id="x1 x2" etc>
    tile.classList.add("tile");
    
    tile.innerText = dadiction[num];
    //tile.innerText = num;

    if (num != 0) {
        if (num < 17) {
            tile.classList.add(dadiction[num]);
        }
        else {
            tile.classList.add(extreme[num-17]);
        }
    }
    

}

function addStuff() {
    if (gameLevel == 0) {
        daSet('da');
        daSet('da');
    }
    else if (gameLevel == 1) {
        daSet('da');
        daSet('yoda');       
    }
    else if (gameLevel == 2) {
        daSet('yoda');
        daSet('yoda');
    }

}


document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
    }

    addStuff();
    document.getElementById("score").innerText = score;
})

function killZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = killZero(row);
    for (let i=0; i<row.length-1; i++) {
        if (row[i] == row[i+1]) {
            console.log(row)
            row[i]++;
            row[i+1] = 0;

            score += row[i];
        }
        console.log(row)
    }

        row = killZero(row);
        while (row.length < columns) {
            row.push(0);
        }

    return row;
}


function slideLeft() {
    for (let r=0; r<rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c=0; c<columns; c++) {
            let tile = document.getElementById(r.toString()+"-"+c.toString());

            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r=0; r<rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c=0; c<columns; c++) {
            let tile = document.getElementById(r.toString()+"-"+c.toString());

            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c=0; c<columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r=0; r<rows; r++) {
            let tile = document.getElementById(r.toString()+"-"+c.toString());

            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c=0; c<columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r=0; r<rows; r++) {
            let tile = document.getElementById(r.toString()+"-"+c.toString());

            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}