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
const music = document.getElementById('music');
let isPlaying = false;

// Start musikken når spillet starter
music.play();
isPlaying = true;

// Tilføj eventlistener til at lytte efter mellemrumstasten for at hoppe
document.addEventListener('keydown', function(event) {
    console.log(event.code); // Tilføj denne linje for at kontrollere, om mellemrumstasten bliver fanget korrekt
    if (event.code === 'Space' && !dino.jumping) {
        dino.jumping = true;
        jump();
    }
});

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

// Hop-funktionen
function jump() {
    let jumpHeight = 100; // Juster denne værdi efter behov
    let jumpSpeed = 5; // Juster denne værdi efter behov
    let jumpInterval = setInterval(function() {
        if (dino.y > canvas.height - jumpHeight) {
            dino.y -= jumpSpeed;
        } else {
            clearInterval(jumpInterval);
            // Når dinoen er nået sin maksimale højde, falder den ned
            fall();
        }
    }, 20);
}

// Fald-funktionen
function fall() {
    let fallSpeed = 5; // Juster denne værdi efter behov
    let fallInterval = setInterval(function() {
        if (dino.y < canvas.height - dino.height) {
            dino.y += fallSpeed;
        } else {
            clearInterval(fallInterval);
            dino.jumping = false;
        }
    }, 20);
}

let lastBeat = -1; // For at holde styr på sidste beat nummer vi hoppede på

function update() {
    let currentTime = music.currentTime; // Aktuel tid i musikken
    let bpm = 120; // BPM for Für Elise
    let beatDuration = 60 / bpm; // Varighed af et beat i sekunder
    let beatNumber = Math.floor(currentTime / beatDuration); // Nummer af aktuelle beat

    if (beatNumber !== lastBeat) { // Kun tjekke for ny beat
        if (beatNumber % 4 === 0 && !dino.jumping) {
            dino.jumping = true;
            jump();
            lastBeat = beatNumber; // Opdater sidste beat nummer
        }
    }
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawDino();
    requestAnimationFrame(gameLoop);
}

gameLoop();
