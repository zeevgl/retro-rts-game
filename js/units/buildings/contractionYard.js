window["ContractionYard"] = (() => {
  const maxHealth = 1000;
  const name = "ContractionYard";
  const width = 100;
  const height = 75;
  const visionRange = 150;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 10000;

  class ContractionYard extends Unit {
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
        0,
        null,
        unitClass,
        0,
        buildTime
      );
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
  return ContractionYard;
})();
