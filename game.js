const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const dino = {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
    speed: 5,
    jumping: false
};

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function update() {
    // Opdater spillogikken her (f.eks. dino hopper i takt med musik)
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawDino();
    requestAnimationFrame(gameLoop);
}

gameLoop();
