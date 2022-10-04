window["MouseHandler"] = (() => {
  class MouseHandler {
    constructor(game, canvas) {
      this.game = game;
      this.canvas = canvas;

      canvas.addEventListener("click", this.onClick.bind(this));
      canvas.addEventListener("contextmenu", this.onClick.bind(this));
    }

    onClick(event) {
      event.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (event.button === 0) {
        this.game.onMouseLeftClicked(x, y);
      } else if (event.button === 2) {
        this.game.onMouseRightClicked(x, y);
      }
    }
  }
  return MouseHandler;
})();
