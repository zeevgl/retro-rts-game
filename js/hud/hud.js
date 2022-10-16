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

      this.initDimensions();

      this.miniMap = new MiniMap(
        this.game,
        {
          width: this.innerHudWidth,
          height: this.innerHudHeight,
          x: this.innerHudX,
          y: this.innerHudY,
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

      //action menu
      this.actionMenuWidth = this.innerHudWidth;
      this.actionMenuHeight = this.innerHudHeight - this.minimapHeight;
      this.actionMenuX = this.innerHudX;
      this.actionMenuY = this.minimapY + this.minimapHeight + 10;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();
      ctx.translate(this.game.camera.x, this.game.camera.y);
      ctx.fillStyle = "grey";
      ctx.fillRect(this.hudX, this.hudY, this.hudWidth, this.hudHeight);

      this.miniMap.draw(ctx);
      this.drawViewport(ctx);
      // this.drawActionMenu(ctx);
      ctx.restore();
    }

    drawActionMenu(ctx) {
      //TODO: extract into its own class
      const unit = this.game.humanPlayer?.selectedUnits?.[0];
      if (unit) {
        this.drawUnitInfo(ctx, unit);
      } else {
        //this.drawActionMenuOptions(ctx);
      }
    }

    drawUnitInfo(ctx, unit) {
      //TODO: render it better later..
      ctx.fillStyle = "#b7bd93";
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
        "Attack: " + JSON.stringify(unit.attackDamage),
        this.actionMenuX + this.actionMenuWidth / 2,
        this.actionMenuY + 120
      );
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
