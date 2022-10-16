window["Barracks"] = (() => {
  const maxHealth = 400;
  const name = "Barracks";
  const width = 75;
  const height = 75;
  const visionRange = 100;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 3000;

  class Barracks extends Unit {
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
  return Barracks;
})();
