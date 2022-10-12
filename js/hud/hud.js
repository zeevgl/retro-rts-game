window["Hud"] = (() => {
  const hidWidthPercent = 0.33;

  class Hud {
    constructor(game) {
      this.game = game;
      this.hudWidth = this.game.gameWidth * hidWidthPercent;
      this.hudHeight = this.game.gameHeight;
      this.hudX = this.game.gameWidth - this.hudWidth;
      this.hudY = this.game.gameHeight - this.hudHeight;

      this.minimapWidth = this.hudWidth * 0.9;
      this.minimapHeight = this.hudHeight * 0.4;
      this.minimapX = this.hudX + this.hudWidth * 0.045;
      this.minimapY = this.hudY + this.hudHeight * 0.015;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();
      ctx.translate(this.game.camera.x, this.game.camera.y);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(this.hudX, this.hudY, this.hudWidth, this.hudHeight);

      this.drawMinimap(ctx);
      ctx.restore();
    }

    drawMinimap(ctx) {
      //TODO: should mini map be its own class?
      ctx.fillStyle = "#000000";
      ctx.fillRect(
        this.minimapX,
        this.minimapY,
        this.minimapWidth,
        this.minimapHeight
      );

      //draw units on minimap
      this.game.humanPlayer.units.forEach((unit) =>
        this.drawUnitOnMiniMap(ctx, unit)
      );

      this.game.aiPlayers.forEach((aiPlayer) => {
        aiPlayer.units.forEach((unit) => this.drawUnitOnMiniMap(ctx, unit));
      });
    }

    drawUnitOnMiniMap(ctx, unit) {
      ctx.fillStyle = unit.color;
      const { x, y } = this.calcUnitPositionOnMiniMap(unit);
      ctx.fillRect(x, y, 5, 5);
    }

    calcUnitPositionOnMiniMap(unit) {
      return {
        x:
          this.minimapX + (unit.x / this.game.map.mapWidth) * this.minimapWidth,
        y:
          this.minimapY +
          (unit.y / this.game.map.mapHeight) * this.minimapHeight,
      };
    }
  }
  return Hud;
})();
