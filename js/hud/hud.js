window["Hud"] = (() => {
  const viewPortWidthPercent = 0.66;
  const miniMapHeight = 0.4;

  class Hud {
    constructor(game) {
      this.game = game;

      this.viewport = {
        x: 0,
        y: 0,
        width: this.game.gameWidth * viewPortWidthPercent,
        height: this.game.gameHeight,
      };

      this.initDimensions();

      this.miniMap = new MiniMap(
        this.game,
        {
          width: this.innerHudWidth,
          height: this.innerHudHeight * miniMapHeight,
          x: this.innerHudX,
          y: this.innerHudY,
        },
        this.viewport
      );

      this.actionMenu = new ActionMenu(
        this.game,
        {
          width: this.innerHudWidth,
          height: this.innerHudHeight - this.miniMap.height,
          x: this.innerHudX,
          y: this.miniMap.y + this.miniMap.height + 10,
        },
        this.viewport
      );
    }

    initDimensions() {
      //TODO:change some ofd them to constants
      //outer hud rectangle
      this.hudWidth = this.game.gameWidth - this.viewport.width;
      this.hudHeight = this.game.gameHeight;
      this.hudX = this.game.gameWidth - this.hudWidth;
      this.hudY = this.game.gameHeight - this.hudHeight;

      //inner hud rectangle
      this.innerHudWidth = this.hudWidth * 0.9;
      this.innerHudHeight = this.hudHeight * 0.96;
      this.innerHudX = this.hudX + this.hudWidth * 0.045;
      this.innerHudY = this.hudY + this.hudHeight * 0.015;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();
      ctx.translate(this.game.camera.x, this.game.camera.y);
      ctx.fillStyle = "grey";
      ctx.fillRect(this.hudX, this.hudY, this.hudWidth, this.hudHeight);

      this.miniMap.draw(ctx);
      this.drawViewport(ctx);
      this.actionMenu.draw(ctx);
      ctx.restore();
    }

    drawViewport(context) {
      if (DEBUG_MODE) {
        context.beginPath();
        context.rect(
          this.viewport.x,
          this.viewport.y,
          this.viewport.width,
          this.viewport.height
        );
        context.strokeStyle = "red";
        context.stroke();
      }
    }
  }
  return Hud;
})();
