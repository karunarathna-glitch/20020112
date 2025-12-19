const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const speedSelect = document.getElementById("speedSelect");
const startBtn = document.getElementById("startBtn");

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 20;
let dy = 0;
let score = 0;
let lives = 10;
let gameInterval;
let boxSize = 20;

function initGame() {
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
    score = 0;
    lives = 10;
    updateUI();
    createFood();
    if (gameInterval) clearInterval(gameInterval);
}

function startGame() {
    initGame();
    const speed = parseInt(speedSelect.value);
    gameInterval = setInterval(draw, speed);
}

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
}

function draw() {
    // 背景
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 蛇の移動
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // 壁との衝突判定
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        lives--;
        updateUI();
        if (lives <= 0) {
            alert("ක්‍රීඩාව අවසන්! (Game Over)");
            clearInterval(gameInterval);
        } else {
            resetSnakePosition();
        }
        return;
    }

    snake.unshift(head);

    // 餌を食べたか
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateUI();
        createFood();
    } else {
        snake.pop();
    }

    // 蛇の描画
    ctx.fillStyle = "#2ecc71";
    snake.forEach(part => ctx.fillRect(part.x, part.y, boxSize - 2, boxSize - 2));

    // 餌の描画
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x, food.y, boxSize - 2, boxSize - 2);
}

function resetSnakePosition() {
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
}

function updateUI() {
    scoreElement.innerText = score;
    livesElement.innerText = lives;
}

// キーボード操作
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -boxSize; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = boxSize; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -boxSize; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = boxSize; dy = 0; }
});

startBtn.addEventListener("click", startGame);
createFood();