let c = document.querySelector(`canvas`);
let ctx = c.getContext(`2d`);
let fps = 1000 / 60;
let timer = setInterval(main, fps);

let box = new Box();

let key = [];

document.addEventListener(`keydown`, (e) => {
    key[e.key] = true;
});

document.addEventListener(`keyup`, (e) => {
    key[e.key] = false;
});

function main() {
    ctx.clearRect(0, 0, c.width, c.height);
    box.move();
    if (key[`w`]) box.y += -5;
    if (key[`s`]) box.y += 5;
    box.vy *= 0.9;
    box.vx *= 0.9;
    box.draw();
}