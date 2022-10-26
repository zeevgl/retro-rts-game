window["Refinery"] = (() => {
  const maxHealth = 800;
  const name = "Refinery";
  const width = 150;
  const height = 60;
  const visionRange = 100;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 1200;

  class Refinery extends Unit {
    constructor(player, x, y, color) {
      super(
        player,
        name,
        x,
        y,
        width,
        height,
        color,
        maxHealth,
        null,
        visionRange,
        0,
        null,
        unitClass,
        0,
        buildTime
      );

      if (this.player) {
        const item = this.player.techTree.getHarvester();
        if (item) {
          this.player.productionManager.spawnUnitAtBuilding(item.class, this);
        }
      }
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        this.name,
        this.x + this.width / 2,
        this.y + this.height / 2
      );
    }
  }
  return Refinery;
})();
