const GAME_WIDTH = 800;
const GAME_HEIGHT = 630;
const DEBUG_MODE = true;

const canvas = document.getElementById("gameScreen");
canvas.setAttribute("width", GAME_WIDTH);
canvas.setAttribute("height", GAME_HEIGHT);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas);

let lastTime = 0;

function gameLoop(timestamp) {
  /*
    deltaTime - milliseconds since last frame
    deltaTime / 1000 - seconds since last frame
   */
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime, timestamp);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
