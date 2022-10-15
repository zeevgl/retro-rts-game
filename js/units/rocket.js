window["Rocket"] = (() => {
  const maxHealth = 100;
  const name = "rocket";
  const width = 20;
  const height = 20;
  const attackDamage = {
    [UnitTypes.LIGHT]: 6,
    [UnitTypes.MEDIUM]: 25,
    [UnitTypes.HEAVY]: 25,
  };
  const visionRange = 150;
  const attackRange = 140;
  const attackCooldown = 2500;
  const type = UnitTypes.LIGHT;
  const speed = 4;

  class Rocket extends Unit {
    constructor(x, y, color) {
      super(
        name,
        x,
        y,
        width,
        height,
        color,
        maxHealth,
        attackDamage,
        visionRange,
        attackRange,
        attackCooldown,
        type,
        speed
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
  return Rocket;
})();
