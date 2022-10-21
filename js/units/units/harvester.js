window["Harvester"] = (() => {
  const maxHealth = 1000;
  const name = "Harvester";
  const width = 65;
  const height = 95;
  const visionRange = 150;
  const attackRange = 100;
  const unitClass = UnitClasses.HEAVY;
  const speed = 10;
  const buildTime = 1000;

  class Harvester extends Unit {
    constructor(x, y, color) {
      super(
        name,
        x,
        y,
        width,
        height,
        color,
        maxHealth,
        null,
        visionRange,
        attackRange,
        null,
        unitClass,
        speed,
        buildTime,
        ContractionYard //TODO: change to War Factory
      );

      this.spiceField = null;
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

    setSpiceField(x, y) {
      this.spiceField = { x, y };
    }
  }
  return Harvester;
})();
