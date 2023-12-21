const boardSize = 3;
let currentPlayer = 'X';
let board = initializeBoard();

function initializeBoard() {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(''));
}

function renderBoard() {
    const table = document.getElementById('ticTacToeBoard');
    table.innerHTML = '';

    for (let row = 0; row < boardSize; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < boardSize; col++) {
            const td = document.createElement('td');
            td.textContent = board[row][col];
            td.addEventListener('click', () => onCellClick(row, col));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function onCellClick(row, col) {
    if (board[row][col] === '' && !checkWinner()) {
        board[row][col] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
        } else if (board.flat().every(cell => cell !== '')) {
            alert("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {

    for (let row = 0; row < boardSize; row++) {
        if (board[row][0] !== '' && board[row].every(cell => cell === board[row][0])) {
            return true;
        }
    }

    for (let col = 0; col < boardSize; col++) {
        if (board[0][col] !== '' && board.every(row => row[col] === board[0][col])) {
            return true;
        }
    }

    if (board[0][0] !== '' && board.every((row, index) => row[index] === board[0][0])) {
        return true;
    }

    if (board[0][boardSize - 1] !== '' && board.every((row, index) => row[boardSize - 1 - index] === board[0][boardSize - 1])) {
        return true;
    }

    return false;
}

renderBoard();