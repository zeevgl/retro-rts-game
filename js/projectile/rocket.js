window["Rocket"] = (() => {
  const name = "rocket";
  const width = 5;
  const height = 15;
  const color = "white";
  const speed = 1;

  class Rocket extends Projectile {
    constructor(x, y, targetUnit, attackDamage) {
      super(name, x, y, targetUnit, width, height, color, attackDamage, speed);
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.degree = getDegree(this.x, this.y, this.targetUnit.centerX, this.targetUnit.centerY) - 180;
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawProjectile(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.width, this.height, this.degree, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  return Rocket;
})();
