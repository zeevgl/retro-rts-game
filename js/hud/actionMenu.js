window["ActionMenu"] = (() => {
  class ActionMenu {
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
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(unit.name, this.x + this.width / 2, this.y + 40);

      //draw unit name and health bar
      ctx.font = "20px Arial";
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x + 10,
        this.y + 60,
        (unit.health / unit.maxHealth) * this.width - 20,
        30
      );

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        unit.health + "/" + unit.maxHealth,
        this.x + this.width / 2,
        this.y + 80
      );

      //draw unit attack and defense
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Attack: " + JSON.stringify(unit.attackDamage),
        this.x + this.width / 2,
        this.y + 120
      );
    }
  }

  return ActionMenu;
})();
