window["Notifications"] = (() => {
  class Notifications {
    constructor(game, viewport) {
      this.game = game;

      this.viewport = viewport;

      this.width = this.viewport.width * 0.9;
      this.height = 100;
      this.x = this.viewport.x + this.viewport.width * 0.05;
      this.y = this.viewport.y + 35;
      this.messages = [];
      this.messageTimeout = 3000;
      this.tick = 0;
    }

    update(deltaTime, timestamp) {
      if (this.messages.length > 0) {
        if (this.tick > this.messageTimeout) {
          this.messages.pop();
          this.tick = 0;
        } else {
          this.tick += deltaTime;
        }
      }
    }

    draw(ctx) {
      if (this.messages.length > 0) {
        const message = this.messages[0];
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        drawText(
          ctx,
          message,
          this.x + this.width / 2,
          this.y + this.height / 2,
          "white",
          "center",
          "20px Arial"
        );
        ctx.restore();
      }
    }

    notify(message) {
      this.messages.push(message);
    }
  }

  return Notifications;
})();
