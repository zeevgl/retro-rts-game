window["Hud"] = (() => {
  class Hud {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.hudWidth = this.gameWidth * 0.33;
      this.hudHeight = this.gameHeight;
      this.hudX = this.gameWidth - this.hudWidth;
      this.hudY = this.gameHeight - this.hudHeight;

      this.minimapWidth = this.hudWidth * 0.9;
      this.minimapHeight = this.hudHeight * 0.4;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(this.hudX, this.hudY, this.hudWidth, this.hudHeight);

      this.drawMinimap(ctx);
    }

    drawMinimap(ctx) {
      //TODO: should mini map be its own class?
      ctx.fillStyle = "#000000";
      ctx.fillRect(
        this.hudX + this.hudWidth * 0.045,
        this.hudY + this.hudHeight * 0.015,
        this.minimapWidth,
        this.minimapHeight
      );
    }
  }
  return Hud;
})();
