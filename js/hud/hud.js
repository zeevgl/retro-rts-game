window["Hud"] = (() => {
  const viewPortWidthPercent = 0.66;

  class Hud {
    constructor(game) {
      this.game = game;

      this.viewport = {
        x: 0,
        y: 0,
        width: this.game.gameWidth * viewPortWidthPercent,
        height: this.game.gameHeight,
      };

      this.hudWidth = this.game.gameWidth - this.viewport.width;
      this.hudHeight = this.game.gameHeight;
      this.hudX = this.game.gameWidth - this.hudWidth;
      this.hudY = this.game.gameHeight - this.hudHeight;

      this.innerHudWidth = this.hudWidth * 0.9;
      this.innerHudHeight = this.hudHeight * 0.9;
      this.innerHudX = this.hudX + this.hudWidth * 0.045;
      this.innerHudY = this.hudY + this.hudHeight * 0.015;

      this.minimapWidth = this.innerHudWidth;
      this.minimapHeight = this.hudHeight * 0.4;
      this.minimapX = this.innerHudX;
      this.minimapY = this.innerHudY;

      this.actionMenuWidth = this.innerHudWidth;
      this.actionMenuHeight = this.hudHeight - this.minimapHeight;
      this.actionMenuX = this.innerHudX;
      this.actionMenuY = this.minimapY + this.minimapHeight + 10;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();
      ctx.translate(this.game.camera.x, this.game.camera.y);
      ctx.fillStyle = "grey";
      ctx.fillRect(this.hudX, this.hudY, this.hudWidth, this.hudHeight);

      this.drawMinimap(ctx);
      this.drawViewport(ctx);
      this.drawActionMenu(ctx);
      ctx.restore();
    }

    drawActionMenu(ctx) {
      const unit = this.game.humanPlayer?.selectedUnits?.[0];
      if (unit) {
        this.drawUnitInfo(ctx, unit);
      } else {
        //this.drawActionMenuOptions(ctx);
      }
    }

    drawUnitInfo(ctx) {
      const unit = this.game.humanPlayer?.selectedUnits?.[0];
      //draw green rectangle
      ctx.fillStyle = "#b7bd93";
      // ctx.shadowColor = "black";
      // ctx.shadowBlur = 10;
      // ctx.shadowOffsetX = 5;
      // ctx.shadowOffsetY = 5;
      ctx.fillRect(
        this.actionMenuX,
        this.actionMenuY,
        this.actionMenuWidth,
        this.actionMenuHeight
      );

      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        unit.name,
        this.actionMenuX + this.actionMenuWidth / 2,
        this.actionMenuY + 40
      );

      //draw unit name and health bar
      ctx.font = "20px Arial";
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.actionMenuX + 10,
        this.actionMenuY + 60,
        (unit.health / unit.maxHealth) * this.actionMenuWidth - 20,
        30
      );
      //
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        unit.health + "/" + unit.maxHealth,
        this.actionMenuX + this.actionMenuWidth / 2,
        this.actionMenuY + 80
      );

      //draw unit attack and defense
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Attack: " + "unit.attackDamage[UnitClasses.LIGHT]",
        this.actionMenuX + this.actionMenuWidth / 2,
        this.actionMenuY + 120
      );
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
      this.game.humanPlayer.units.forEach(
        (unit) => unit.isAlive && this.drawUnitOnMiniMap(ctx, unit)
      );

      this.game.aiPlayers.forEach((aiPlayer) => {
        aiPlayer.units.forEach((unit) => this.drawUnitOnMiniMap(ctx, unit));
      });

      this.drawViewPortMiniMap(ctx);
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
  return Hud;
})();
