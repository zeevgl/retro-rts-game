window["MiniMap"] = (() => {
  const miniMapHeight = 0.4;

  class MiniMap {
    constructor(game, wrapperDimensions, viewport) {
      this.game = game;

      this.viewport = viewport;
      this.minimapWidth = wrapperDimensions.width;
      this.minimapHeight = wrapperDimensions.height * miniMapHeight;
      this.minimapX = wrapperDimensions.x;
      this.minimapY = wrapperDimensions.y;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();

      this.drawMinimap(ctx);
      ctx.restore();
    }

    drawMinimap(ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(
        this.minimapX,
        this.minimapY,
        this.minimapWidth,
        this.minimapHeight
      );

      this.drawUnitsOnMiniMap(ctx);
      this.drawViewPortMiniMap(ctx);
    }

    drawUnitsOnMiniMap(ctx) {
      this.game.humanPlayer.units.forEach(
        (unit) => unit.isAlive && this.drawUnitOnMiniMap(ctx, unit)
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
          this.minimapX +
          (unit.x / this.game.gameMap.mapWidth) * this.minimapWidth,
        y:
          this.minimapY +
          (unit.y / this.game.gameMap.mapHeight) * this.minimapHeight,
      };
    }

    drawViewPortMiniMap(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        this.minimapX +
          this.viewport.x +
          (this.game.camera.x / this.game.gameMap.mapWidth) * this.minimapWidth,
        this.minimapY +
          this.viewport.y +
          (this.game.camera.y / this.game.gameMap.mapHeight) *
            this.minimapHeight,
        (this.viewport.width / this.game.gameMap.mapWidth) * this.minimapWidth,
        (this.viewport.height / this.game.gameMap.mapHeight) *
          this.minimapHeight
      );
      ctx.lineWidth = "3";
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.restore();
    }
  }

  return MiniMap;
})();
