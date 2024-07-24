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

// Player setup
for (let i = 0; i < pad.length; i++) {
    pad[i].w = 20;
    pad[i].h = 150;
    pad[i].x = i === 0 ? pad[i].w / 2 : c.width - pad[i].w / 2;
    pad[i].y = c.height / 2;
    pad[i].color = `purple`;
}

// Ball setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.vx = -5;
ball.vy = -5;
ball.color = `black`;

// Player scores
var playerScores = [0, 0];

// Get the divs from the HTML
var scoreDivs = document.querySelectorAll('#score div');

function main() {
    // Erase the canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // Draw the scores
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Player 1: ${playerScores[0]}`, 50, 50);
    ctx.fillText(`Player 2: ${playerScores[1]}`, c.width - 200, 50);

    // Player controls and movement
    const controls = [['w', 's'], ['o', 'l']];
    
    for (let i = 0; i < pad.length; i++) {
        if (keys[controls[i][0]]) {
            pad[i].vy += -pad[i].force;
        }
        if (keys[controls[i][1]]) {
            pad[i].vy += pad[i].force;
        }
        pad[i].vy *= fy; // Apply friction
        pad[i].move(); // Player movement

        // Player collision with canvas boundaries
        if (pad[i].y < 0 + pad[i].h / 2) {
            pad[i].y = 0 + pad[i].h / 2;
        }
        if (pad[i].y > c.height - pad[i].h / 2) {
            pad[i].y = c.height - pad[i].h / 2;
        }
    }

    // Ball movement
    ball.move();

    // Ball collision with canvas boundaries
    const boundaries = [
        { axis: 'y', limit: 0, condition: ball.y < 0 },
        { axis: 'y', limit: c.height, condition: ball.y > c.height }
    ];

    for (let i = 0; i < boundaries.length; i++) {
        if (boundaries[i].condition) {
            ball[boundaries[i].axis] = boundaries[i].limit;
            ball.vy = -ball.vy;
        }
    }

    // Score
    if (ball.x < 0) {
        playerScores[1]++; // Increment player[1]'s score
        ball.x = c.width / 2;
        ball.y = c.height / 2;
        console.log(`${playerScores[0]} | ${playerScores[1]}`);
    }
    if (ball.x > c.width) {
        playerScores[0]++; // Increment player[0]'s score
        ball.x = c.width / 2;
        ball.y = c.height / 2;
        console.log(`${playerScores[0]} | ${playerScores[1]}`);
    }

    // Ball collision with players
    for (let i = 0; i < pad.length; i++) {
        if (ball.collide(pad[i])) {
            if (i === 0) {
                ball.x = pad[i].x + pad[i].w / 2 + ball.w / 2;
            } else {
                ball.x = pad[i].x - pad[i].w / 2 - ball.w / 2;
            }
            ball.vx = -ball.vx;
            applyShakeEffect(pad[i]);
        }
    }

    // Draw the objects
    for (let i = 0; i < pad.length; i++) {
        pad[i].draw();
        ball.draw();
    }

    // Update the scores in the HTML
    for (let i = 0; i < scoreDivs.length; i++) {
        scoreDivs[i].innerText = `Player ${i + 1}: ${playerScores[i]}`;
    }
}