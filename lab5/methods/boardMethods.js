

module.exports.isBoardFull = (board) => {
    
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (board[i][j] === '-') {
                return false;
                
            }
        }
    }

return true;
}

module.exports.fistEmptyPlaceInBoard = (board) => {
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (board[i][j] === '-') {
                return {x: i, y: j};
                
            }
        }
    }

    return {x: -1, y: -1}
}

const checkWinHorizontal = (board) => {
    for (let i = 0; i < 3; i++){
        // console.log(board[i][0], board[i][1], board[i][2]);
        // console.log((board[i][0] === board[i][1]) && (board[i][1] === board[i][2]));
        if (board[i][0] !== "-" && 
        (board[i][0] === board[i][1]) && (board[i][1] === board[i][2])){
            return {win: true, winner: board[i][0]}
        } else {
            continue;
        }
    }

    return {win: false}
}

const checkWinVertical = (board) => {
    for (let i = 0; i < 3; i++){
        if (board[0][i] !== "-" && 
        (board[0][i] === board[1][i]) && (board[1][i] === board[2][i])){
            return {win: true, winner: board[0][i]}
        } else {
            continue;
        }
    }

    return {win: false}
}

const checkWinDiagonal = (board) => {
    const middleField = board[1][1];
    if (middleField === "-")
        return {win: false}
    
    const diagonalLeft = (board[0][0] === middleField) && 
    (middleField === board[2][2]);
    const diagonalRight = (board[0][2] === middleField) && 
    (middleField === board[2][0]);

    if (diagonalLeft || diagonalRight)
        return {win: true, winner: middleField}

        
    return {win: false}
}

module.exports.checkWin = (board) => {
    const horizontal = checkWinHorizontal(board);
    if (horizontal.win)
        return horizontal;

    const vertical = checkWinVertical(board);
    if (vertical.win)
        return vertical;

    const diagonal = checkWinDiagonal(board);
    if (diagonal.win)
        return diagonal;
    
    return {win: false};
}
