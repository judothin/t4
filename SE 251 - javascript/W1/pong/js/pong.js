//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .85

//p1 setup
var p1 = new Box();
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2
p1.color = `purple`

//ball setup
var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -5
ball.vy = -5
ball.color = `black`

//p2 setup
var p2 = new Box();
p2.w = 20
p2.h = 150
p2.x = c.width - p2.w/2
p2.color = `purple`

function main() {
    // Erase the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Player 1 controls and movement
    if (keys[`w`]) {
        p1.vy += -p1.force;
    }
    if (keys[`s`]) {
        p1.vy += p1.force;
    }
    p1.vy *= fy; // Apply friction
    p1.move(); // Player 1 movement

    // Player 1 collision with canvas boundaries
    if (p1.y < 0 + p1.h / 2) {
        p1.y = 0 + p1.h / 2;
    }
    if (p1.y > c.height - p1.h / 2) {
        p1.y = c.height - p1.h / 2;
    }

    // Player 2 controls and movement
    if (keys[`o`]) {
        p2.vy += -p2.force;
    }
    if (keys[`l`]) {
        p2.vy += p2.force;
    }
    p2.vy *= fy; // Apply friction
    p2.move(); // Player 2 movement

    // Player 2 collision with canvas boundaries
    if (p2.y < 0 + p2.h / 2) {
        p2.y = 0 + p2.h / 2;
    }
    if (p2.y > c.height - p2.h / 2) {
        p2.y = c.height - p2.h / 2;
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
    if (ball.collide(p1)) {
        ball.x = p1.x + p1.w / 2 + ball.w / 2;
        ball.vx = -ball.vx;
        applyShakeEffect(p1);
    }
    if (ball.collide(p2)) {
        ball.x = p2.x - p2.w / 2 - ball.w / 2;
        ball.vx = -ball.vx;
        applyShakeEffect(p2);
    }

    // Draw the objects
    p1.draw();
    p2.draw();
    ball.draw();
}