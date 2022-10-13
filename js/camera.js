window["Camera"] = (() => {
  class Camera {
    constructor(game) {
      this.game = game;
      this.x = 0;
      this.y = 0;
    }

    update(deltaTime, timestamp) {}

    draw(context) {
      context.translate(-this.x, -this.y);
    }

    scrollRight() {

    }
  }
  return Camera;
})();
