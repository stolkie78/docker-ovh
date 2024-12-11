const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Speelveld instellingen
const court = {
    width: canvas.width,
    height: canvas.height,
    netHeight: 100,
};

// Spelers
const player1 = { x: 100, y: court.height - 50, width: 20, height: 50, color: 'red', speed: 5 };
const player2 = { x: court.width - 120, y: court.height - 50, width: 20, height: 50, color: 'blue', speed: 5 };

// Bal
const ball = { x: court.width / 2, y: court.height / 2, radius: 10, dx: 2, dy: -2, color: 'white' };

// Controls
let keys = {};

// Teken functies
function drawCourt() {
    ctx.fillStyle = '#FFD700'; // Zandkleur
    ctx.fillRect(0, court.height - 50, court.width, 50); // Ondergrond
    ctx.fillStyle = '#000';
    ctx.fillRect(court.width / 2 - 2, court.height - court.netHeight - 50, 4, court.netHeight); // Net
}

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Update functies
function updatePlayer(player, upKey, downKey) {
    if (keys[upKey] && player.y > 0) player.y -= player.speed;
    if (keys[downKey] && player.y < court.height - player.height - 50) player.y += player.speed;
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Botsing met muren
    if (ball.x + ball.radius > court.width || ball.x - ball.radius < 0) ball.dx *= -1;
    if (ball.y + ball.radius > court.height - 50 || ball.y - ball.radius < 0) ball.dy *= -1;

    // Botsing met spelers
    if (
        ball.x - ball.radius < player1.x + player1.width &&
        ball.y > player1.y &&
        ball.y < player1.y + player1.height
    ) {
        ball.dx *= -1;
    }

    if (
        ball.x + ball.radius > player2.x &&
        ball.y > player2.y &&
        ball.y < player2.y + player2.height
    ) {
        ball.dx *= -1;
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourt();
    drawPlayer(player1);
    drawPlayer(player2);
    drawBall();

    updatePlayer(player1, 'ArrowUp', 'ArrowDown');
    updatePlayer(player2, 'w', 's');
    updateBall();

    requestAnimationFrame(gameLoop);
}

// Controls toevoegen
document.addEventListener('keydown', (e) => (keys[e.key] = true));
document.addEventListener('keyup', (e) => (keys[e.key] = false));

// Start het spel
gameLoop();