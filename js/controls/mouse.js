window["MouseHandler"] = (() => {
  class MouseHandler {
    constructor(game, canvas) {
      canvas.addEventListener("click", function (event) {
        game.onMouseClicked(event.clientX, event.clientY);
      });
    }
  }
  return MouseHandler;
})();
