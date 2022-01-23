const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

let speed = 5;
let littleSquaresCount = 20;
let littleSquareSize = canvas.width/littleSquaresCount - 2;

let headX = 10;
let headY = 10;

class bodyPeace {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const snakeBodyPeaces = [];
let bodyLength = 2;

let foodX = 2;
let foodY = 2;

let velocityX = 0;
let velocityY = 0;

const eatSound = new Audio ("sounds/eat.wav");
const gameOverSound = new Audio("sounds/game-over.wav");
const winSound = new Audio("sounds/game-win.wav");

let gameScore = 0;
let gameLevel = 0;

const reloadButton = document.getElementById("reloadButton");

function snakeGame() {

    changeSnakePosition();

    let gameResult = isGameOver();
    if (gameResult) return;

    clearGameField();

    isFoodEaten();
    drawFood();
    drawSnake();

    drawScore();
    drawLevel();

    if (gameScore > 2) {
        gameLevel = 1;
        speed = 6;
    }
    if (gameScore > 5) {
        gameLevel = 2;
        speed = 7;
    }
    if (gameScore > 10) {
        gameLevel = 3;
        speed = 8;
    }
    if (gameScore > 15) {
        gameLevel = 4;
        speed = 10;
    }
    if (gameScore > 20) {
        gameLevel = 5;
        speed = 12;
    }
    if (gameScore > 25) {
        gameLevel = 6;
        speed = 14;
    }
    if (gameScore > 30) {
        gameLevel = 7;
        speed = 15;
    }
    if (gameScore > 35) {
        gameLevel = 8;
        speed = 16;
    }
    if (gameScore > 40) {
        gameLevel = 9;
        speed = 17;
    }
    if (gameScore > 45) {
        gameLevel = 10;
        speed = 18;
    }
    if (gameScore === 5) {
        drawWinMessage();
        drawReloadButton();
        return;
    }

    setTimeout(snakeGame, 1000/speed);
}

function clearGameField() {
    ctx.fillStyle = "rgb(142,192,154)";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    ctx.setLineDash([]);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(0,0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

    for (let i = 0; i < snakeBodyPeaces.length; i++) {
        let peace = snakeBodyPeaces[i];
        ctx.fillRect(peace.x * littleSquaresCount, peace.y * littleSquaresCount, littleSquareSize, littleSquareSize);
    }

    snakeBodyPeaces.push(new bodyPeace(headX, headY));

    while (snakeBodyPeaces.length > bodyLength) {
        snakeBodyPeaces.shift();
    }

    ctx.fillStyle = "rgb(142, 192, 154)";
    ctx.fillRect(headX * littleSquaresCount, headY * littleSquaresCount, littleSquareSize, littleSquareSize);
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.strokeRect(headX * littleSquaresCount, headY * littleSquaresCount, littleSquareSize, littleSquareSize);

}

function changeSnakePosition() {
    headX = headX + velocityX;
    headY = headY + velocityY;
}

document.body.addEventListener("keydown", (event) => {
    if (event.keyCode === 38) {
        if (velocityY === 1) return;
        velocityY = -1;
        velocityX = 0;
    }
    if (event.keyCode === 40) {
        if (velocityY === -1) return;
        velocityY = 1;
        velocityX = 0;
    }
    if (event.keyCode === 37) {
        if (velocityX === 1) return;
        velocityY = 0;
        velocityX = -1;
    }
    if (event.keyCode === 39) {
        if (velocityX === -1) return;
        velocityY = 0;
        velocityX = 1;
    }
})

function drawFood() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(foodX * littleSquaresCount + 7, foodY * littleSquaresCount + 1, 6, 6);
    ctx.fillRect(foodX * littleSquaresCount + 1, foodY * littleSquaresCount + 7, 6, 6);
    ctx.fillRect(foodX * littleSquaresCount + 13, foodY * littleSquaresCount + 7, 6, 6);
    ctx.fillRect(foodX * littleSquaresCount + 7, foodY * littleSquaresCount + 13, 6, 6);
}

function isFoodEaten() {
    if(foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * littleSquaresCount);
        foodY = Math.floor(Math.random() * littleSquaresCount);
        bodyLength++;

        eatSound.play();

        gameScore++;
    }
}

function isGameOver() {

    if (velocityX === 0 && velocityY === 0) {
        return false;
    }

    let gameOver = false;

    if (headX < 0 || headY < 0 || headX === littleSquaresCount || headY === littleSquaresCount) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBodyPeaces.length; i++) {

        let bodyPeace = snakeBodyPeaces[i];

        if (bodyPeace.x === headX && bodyPeace.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "50px Verdana";
        ctx.fillText("Game over!", canvas.width / 5, canvas.height / 2);

        gameOverSound.play();

        drawReloadButton();
    }

    return gameOver;

}

function drawWinMessage() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "50px Verdana";
    ctx.fillText("You win!", canvas.width / 4, canvas.height / 2);

    winSound.play();
}

function drawScore() {

    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + gameScore, canvas.width - 100, 20);

}

function drawLevel() {

    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Level: " + gameLevel, 20, 20);

}

function drawReloadButton() {

    reloadButton.style.visibility = "visible";
    reloadButton.style.height = "50px";
    reloadButton.style.opacity = "1";

    reloadWindow();

}

function reloadWindow() {
    reloadButton.addEventListener("click", function (){
        window.location.reload();
    });
}

snakeGame();