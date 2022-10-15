window["Infantry"] = (() => {
  const maxHealth = 100;
  const name = "infantry";
  const width = 25;
  const height = 25;
  const attackDamage = 8;
  const visionRange = 150;
  const attackRange = 100;
  const attackCooldown = 700;

  class Infantry extends Unit {
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
        attackCooldown
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
  return Infantry;
})();
