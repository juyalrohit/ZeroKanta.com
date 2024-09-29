let click = new Audio("click.mp3");
let gameOverMusic = new Audio("gameOver.mp3");
let matrix = [
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1']
];

let win = false;
let flag = 1;
let turn = document.getElementById("player_turn");
let cells = document.querySelectorAll('.boxes');
let winner = document.querySelector('.winner');
let button = document.querySelectorAll('.btn');


let gameOver = document.querySelector(".game_over");

cells.forEach((cell, index) => {
    cell.addEventListener('click', function handleClick() {
        let row = Math.floor(index / 3);
        let col = index % 3;

        if (matrix[row][col] !== '-1') return; // Ignore if cell is already filled

        click.play();

        if (flag) {
            cell.innerHTML = "<p>×<p>";
            matrix[row][col] = '×';
            turn.innerHTML = 'Turn : O';
        } else {
            cell.innerHTML = "<p>𝚘<p>";
            matrix[row][col] = '𝚘';
            turn.innerHTML = 'Turn : X';
        }

        win = checkWinner(matrix, row, col, flag ? '×' : '𝚘');

        if (win) {
            gameOverMusic.play();
            let  w =(flag ? 'X' : 'O');
            winner.innerHTML = `<span> ${w} Won`;
            
            document.querySelector('img').style.width = "100px";
            gameOver.style.transform = "scale(1)";
            cells.forEach(c => c.removeEventListener('click', handleClick)); // Remove listeners after win
        }

        flag = !flag; // Toggle between 1 and 0
        cell.removeEventListener('click', handleClick); // Remove the click listener from the current cell
    });
});

button.forEach(function(element){
element.addEventListener('click', () => location.reload())});

function checkWinner(matrix, row, col, target) {
    // Check the current row
    if (matrix[row][0] === target && matrix[row][1] === target && matrix[row][2] === target) {
        return true;
    }

    // Check the current column
    if (matrix[0][col] === target && matrix[1][col] === target && matrix[2][col] === target) {
        return true;
    }

    // Check the main diagonal
    if (row === col && matrix[0][0] === target && matrix[1][1] === target && matrix[2][2] === target) {
        return true;
    }

    // Check the anti-diagonal
    if (row + col === 2 && matrix[2][0] === target && matrix[1][1] === target && matrix[0][2] === target) {
        return true;
    }

    return false;
}
