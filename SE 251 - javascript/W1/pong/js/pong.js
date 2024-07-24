//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .85


var player = [];

player[0] = new Player();
player[1] = new Player();

// Player 1 setup
player[0].pad.w = 20;
player[0].pad.h = 150;
player[0].pad.x = 0 + player[0].pad.w / 2;
player[0].pad.color = `purple`;

// Player 2 setup
player[1].pad.w = 20;
player[1].pad.h = 150;
player[1].pad.x = c.width - player[1].pad.w / 2;
player[1].pad.color = `purple`;

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
        player[0].pad.vy += -player[0].pad.force;
    }
    if (keys[`s`]) {
        player[0].pad.vy += player[0].pad.force;
    }
    player[0].pad.vy *= fy; // Apply friction
    player[0].pad.move(); // Player 1 movement

    // Player 1 collision with canvas boundaries
    if (player[0].pad.y < 0 + player[0].pad.h / 2) {
        player[0].pad.y = 0 + player[0].pad.h / 2;
    }
    if (player[0].pad.y > c.height - player[0].pad.h / 2) {
        player[0].pad.y = c.height - player[0].pad.h / 2;
    }

    // Player 2 controls and movement
    if (keys[`o`]) {
        player[1].pad.vy += -player[1].pad.force;
    }
    if (keys[`l`]) {
        player[1].pad.vy += player[1].pad.force;
    }
    player[1].pad.vy *= fy; // Apply friction
    player[1].pad.move(); // Player 2 movement

    // Player 2 collision with canvas boundaries
    if (player[1].pad.y < 0 + player[1].pad.h / 2) {
        player[1].pad.y = 0 + player[1].pad.h / 2;
    }
    if (player[1].pad.y > c.height - player[1].pad.h / 2) {
        player[1].pad.y = c.height - player[1].pad.h / 2;
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
    if (ball.collide(player[0].pad)) {
        ball.x = player[0].pad.x + player[0].pad.w / 2 + ball.w / 2;
        ball.vx = -ball.vx;
        applyShakeEffect(player[0].pad);
    }
    if (ball.collide(player[1].pad)) {
        ball.x = player[1].pad.x - player[1].pad.w / 2 - ball.w / 2;
        ball.vx = -ball.vx;
        applyShakeEffect(player[1].pad);
    }

    // Draw the objects
    player[0].pad.draw();
    player[1].pad.draw();
    ball.draw();
}