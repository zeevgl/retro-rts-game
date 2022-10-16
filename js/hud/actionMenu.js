window["ActionMenu"] = (() => {
  class ActionMenu {
    constructor(game, wrapperDimensions, viewport) {
      this.game = game;

      this.viewport = viewport;

      this.actionMenuWidth = wrapperDimensions.width;
      this.actionMenuHeight = wrapperDimensions.height;
      this.actionMenuX = wrapperDimensions.x;
      this.actionMenuY = wrapperDimensions.y;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();
      //TODO: extract into its own class
      const unit = this.game.humanPlayer?.selectedUnits?.[0];
      if (unit) {
        this.drawUnitInfo(ctx, unit);
      } else {
        //this.drawActionMenuOptions(ctx);
      }
      ctx.restore();
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
  }

  return ActionMenu;
})();
