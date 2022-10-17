const DEBUG_MODE = false;

// window.addEventListener(
//   "resize",
//   function (event) {
//     console.log("resize");
//     initGame();
//   },
//   true
// );

function initGame() {
  const GAME_WIDTH = window.innerWidth;
  const GAME_HEIGHT = window.innerHeight;

  const canvas = document.getElementById("gameScreen");
  canvas.setAttribute("width", GAME_WIDTH.toString());
  canvas.setAttribute("height", GAME_HEIGHT.toString());
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
}

initGame();
