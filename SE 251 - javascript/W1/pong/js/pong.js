//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .85

// Player array
var player = [];
player[0] = new Player();
player[1] = new Player();

// Pad array
var pad = [];
pad[0] = player[0].pad;
pad[1] = player[1].pad;

// Player 1 setup
pad[0].w = 20;
pad[0].h = 150;
pad[0].x = player[0].pad.w / 2;
pad[0].y = c.height / 2;
pad[0].color = `purple`;

// Player 2 setup
pad[1].w = 20;
pad[1].h = 150;
pad[1].x = c.width - player[1].pad.w / 2;
pad[1].color = `purple`;

// Ball setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.vx = -5;
ball.vy = -5;
ball.color = `black`;


function main() {
    // Erase the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Player 1 controls and movement
    if (keys[`w`]) {
        pad[0].vy += -pad[0].force;
    }
    if (keys[`s`]) {
        pad[0].vy += pad[0].force;
    }
    pad[0].vy *= fy; // Apply friction
    pad[0].move(); // Player 1 movement

    // Player 1 collision with canvas boundaries
    if (pad[0].y < 0 + pad[0].h / 2) {
        pad[0].y = 0 + pad[0].h / 2;
    }
    if (pad[0].y > c.height - pad[0].h / 2) {
        pad[0].y = c.height - pad[0].h / 2;
    }

    // Player 2 controls and movement
    if (keys[`o`]) {
        pad[1].vy += -pad[1].force;
    }
    if (keys[`l`]) {
        pad[1].vy += pad[1].force;
    }
    pad[1].vy *= fy; // Apply friction
    pad[1].move(); // Player 2 movement

    // Player 2 collision with canvas boundaries
    if (pad[1].y < 0 + pad[1].h / 2) {
        pad[1].y = 0 + pad[1].h / 2;
    }
    if (pad[1].y > c.height - pad[1].h / 2) {
        pad[1].y = c.height - pad[1].h / 2;
    }

    // Ball movement
    ball.move();

    // Ball collision with canvas boundaries
    if (ball.x < 0 || ball.x > c.width) {
        ball.x = c.width / 2;
        ball.y = c.height / 2;
    }
    if (ball.y < 0) {
        ball.y = 0;
        ball.vy = -ball.vy;
    }
    if (ball.y > c.height) {
        ball.y = c.height;
        ball.vy = -ball.vy;
    }

    // Ball collision with players
    if (ball.collide(pad[0])) {
        ball.x = pad[0].x + pad[0].w / 2 + ball.w / 2;
        ball.vx = -ball.vx;
        applyShakeEffect(pad[0]);
    }
    if (ball.collide(pad[1])) {
        ball.x = pad[1].x - pad[1].w / 2 - ball.w / 2;
        ball.vx = -ball.vx;
        applyShakeEffect(pad[1]);
    }

    // Draw the objects
    pad[0].draw();
    pad[1].draw();
    ball.draw();
}