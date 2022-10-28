window["MiniMap"] = (() => {
  class MiniMap {
    constructor(game, wrapperDimensions, viewport) {
      this.game = game;

      this.viewport = viewport;
      this.width = wrapperDimensions.width;
      this.height = wrapperDimensions.height;
      this.x = wrapperDimensions.x;
      this.y = wrapperDimensions.y;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();

      this.drawMinimap(ctx);
      ctx.restore();
    }

    drawMinimap(ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(this.x, this.y, this.width, this.height);

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
      if (unit.isABuilding()) {
        ctx.fillRect(x, y, 15, 15);
      } else {
        ctx.fillRect(x, y, 5, 5);
      }
    }

    calcUnitPositionOnMiniMap(unit) {
      return {
        x: this.x + (unit.x / this.game.gameMap.mapWidth) * this.width,
        y: this.y + (unit.y / this.game.gameMap.mapHeight) * this.height,
      };
    }

    calcUnitPositionOnMainMap(x, y) {
      return {
        x: (x - this.x) * (this.game.gameMap.mapWidth / this.width),
        y: (y - this.y) * (this.game.gameMap.mapHeight / this.height),
      };
    }

    drawViewPortMiniMap(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(
        this.x +
          this.viewport.x +
          (this.game.camera.x / this.game.gameMap.mapWidth) * this.width,
        this.y +
          this.viewport.y +
          (this.game.camera.y / this.game.gameMap.mapHeight) * this.height,
        (this.viewport.width / this.game.gameMap.mapWidth) * this.width,
        (this.viewport.height / this.game.gameMap.mapHeight) * this.height
      );
      ctx.lineWidth = "3";
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.restore();
    }

    isXYInside(x, y) {
      return (
        x > this.x &&
        x < this.x + this.width &&
        y > this.y &&
        y < this.y + this.height
      );
    }

    getPositionFromMiniMap(originalX, originalY) {
      const { x, y } = this.game.camera.adjustPointToCamera(
        originalX,
        originalY
      );

      return this.isXYInside(x, y) && this.calcUnitPositionOnMainMap(x, y);
    }
  }

  return MiniMap;
})();
