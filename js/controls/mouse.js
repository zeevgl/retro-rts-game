window["MouseHandler"] = (() => {
  const LEFT_BUTTON = 0;
  const RIGHT_BUTTON = 2;

  class MouseHandler {
    constructor(game) {
      this.game = game;
      this.position = { x: 0, y: 0 };
      this.handlers = {
        onMouseLeftClicked: null,
        onMouseRightClicked: null,
        onMouseMove: null,
        onMouseDown: null,
        onMouseUp: null,
      };

      this.game.canvas.addEventListener("click", this.onClick.bind(this));
      this.game.canvas.addEventListener("contextmenu", this.onClick.bind(this));
      this.game.canvas.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );
      this.game.canvas.addEventListener(
        "mousedown",
        this.onMouseDown.bind(this)
      );
      this.game.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));

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

    setMouseSelect() {
      this.game.canvas.style.cursor = "grab";
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
      this.position = {
        x,
        y,
      };
      this.handlers.onMouseMove?.(x, y);
    }

    onMouseDown(event) {
      event.preventDefault();
      if (event.button === LEFT_BUTTON) {
        const { x, y } = this.getXY(event);
        this.handlers.onMouseDown?.(x, y);
      }
    }

    onMouseUp(event) {
      event.preventDefault();
      if (event.button === LEFT_BUTTON) {
        const { x, y } = this.getXY(event);
        this.handlers.onMouseUp?.(x, y);
      }
    }
  }
  return MouseHandler;
})();
