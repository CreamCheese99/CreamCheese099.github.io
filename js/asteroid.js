const canvas = document.getElementById("asteroidCanvas");
const ctx = canvas.getContext("2d");

let ship = { x: 225, y: 350, width: 50, height: 50 };
let bullets = [];
let asteroids = [];
let score = 0;

function drawShip() {
    ctx.fillStyle = "red";
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, 5, 10));
}

function drawAsteroids() {
    ctx.fillStyle = "yellow";
    asteroids.forEach(asteroid => ctx.fillRect(asteroid.x, asteroid.y, 30, 30));
}

function moveBullets() {
    bullets.forEach(bullet => bullet.y -= 5);
    bullets = bullets.filter(bullet => bullet.y > 0);
}

function moveAsteroids() {
    asteroids.forEach(asteroid => asteroid.y += 2);
    asteroids = asteroids.filter(asteroid => asteroid.y < 400);
}

function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        asteroids.forEach((asteroid, aIndex) => {
            if (
                bullet.x < asteroid.x + 30 &&
                bullet.x + 5 > asteroid.x &&
                bullet.y < asteroid.y + 30 &&
                bullet.y + 10 > asteroid.y
            ) {
                bullets.splice(bIndex, 1);
                asteroids.splice(aIndex, 1);
                score += 10;
            }
        });
    });

    asteroids.forEach(asteroid => {
        if (
            asteroid.x < ship.x + ship.width &&
            asteroid.x + 30 > ship.x &&
            asteroid.y < ship.y + ship.height &&
            asteroid.y + 30 > ship.y
        ) {
            alert(`Game Over! คะแนน: ${score}`);
            document.location.reload();
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
    drawBullets();
    drawAsteroids();
    moveBullets();
    moveAsteroids();
    checkCollisions();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && ship.x > 0) ship.x -= 20;
    if (e.key === "ArrowRight" && ship.x < 450) ship.x += 20;
    if (e.key === " ") bullets.push({ x: ship.x + 22, y: ship.y });
});

setInterval(() => {
    asteroids.push({ x: Math.random() * 470, y: 0 });
}, 1000);

setInterval(gameLoop, 50);