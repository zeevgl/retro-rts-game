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

      this.messageFlashingTick = 0;
      this.messageFlashingSpped = 500;
      this.messageFlash = false;
    }

    update(deltaTime, timestamp) {
      if (this.messages.length > 0) {
        if (this.tick > this.messageTimeout) {
          this.messages.splice(0, 1);
          this.tick = 0;
        } else {
          this.tick += deltaTime;
        }

        if (this.messageFlashingTick > this.messageFlashingSpped) {
          this.messageFlashingTick = 0;
          this.messageFlash = !this.messageFlash;
        } else {
          this.messageFlashingTick += deltaTime;
        }
      }
    }

    draw(ctx) {
      if (this.messages.length > 0 && this.messageFlash) {
        console.log('this.messages = ', this.messages);
        const message = this.messages[0];
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        drawText(
          ctx,
          message,
          this.x + this.width / 2,
          this.y + this.height / 2,
          "black",
          "center",
          "20px Arial"
        );
        ctx.restore();
      }
    }

    notifyText(text) {
      this.messageFlash = true;
      this.messages = [text];
      this.tick = 0;
      this.messageFlashingTick = 0;
    }

    notify(messageObject) {
      this.messageFlash = true;
      this.messages = [messageObject.text];
      this.tick = 0;
      this.messageFlashingTick = 0;
    }

    notifyToQueue(messageObject) {
      this.messageFlash = true;
      this.messages.push(messageObject.text);
    }
  }

  return Notifications;
})();
