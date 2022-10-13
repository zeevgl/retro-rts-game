window["MouseHandler"] = (() => {
  const LEFT_BUTTON = 0;
  const RIGHT_BUTTON = 2;

  class MouseHandler {
    constructor(game) {
      this.game = game;
      this.handlers = {
        onMouseLeftClicked: null,
        onMouseRightClicked: null,
        onMouseMove: null,
      };

      this.game.canvas.addEventListener("click", this.onClick.bind(this));
      this.game.canvas.addEventListener("contextmenu", this.onClick.bind(this));
      this.game.canvas.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );

      this.setMouseDefault();
    }

    draw(context) {}

    getXY(event) {
      const rect = this.game.canvas.getBoundingClientRect();
      const x = this.game.camera.x + event.clientX - rect.left;
      const y = this.game.camera.y + event.clientY - rect.top;
      return { x, y };
    }

    setMouseAttack() {
      this.game.canvas.style.cursor = "crosshair";
    }

    setMouseDefault() {
      this.game.canvas.style.cursor = "default";
    }

    setMouseScroll() {
      this.game.canvas.style.cursor = "all-scroll";
    }

    onClick(event) {
      event.preventDefault();
      const { x, y } = this.getXY(event);
      if (event.button === LEFT_BUTTON) {
        this.handlers.onMouseLeftClicked?.(x, y);
      } else if (event.button === RIGHT_BUTTON) {
        this.handlers.onMouseRightClicked?.(x, y);
      }
    }

    handleMouseMove(event) {
      const { x, y } = this.getXY(event);
      this.handlers.onMouseMove?.(x, y);
    }
  }
  return MouseHandler;
})();
