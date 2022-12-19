window["Rocket"] = (() => {
  const name = "rocket";
  const width = 15;
  const height = 32;
  const color = "white";
  const speed = 3;

  class Rocket extends Projectile {
    constructor(x, y, targetUnit, attackDamage) {
      super(
        name,
        x,
        y - 40,
        targetUnit,
        width,
        height,
        color,
        attackDamage,
        speed
      );

      this.initSprites();
      this.degree =
        getDegree180(
          this.x,
          this.y,
          this.targetUnit.centerX,
          this.targetUnit.centerY
        ) + 90;
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        535,
        2294,
        this.width,
        1,
        1,
        "../assets/projectiles/missile.png",
        this.height
      );

      this.sprite = sprite;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawProjectile(ctx) {
      ctx.save();

      const cx = this.x + 0.5 * this.width;
      const cy = this.y + 0.5 * this.height;

      ctx.translate(cx, cy);
      ctx.rotate((Math.PI / 180) * this.degree);
      ctx.translate(-cx, -cy);

      this.sprite.draw(ctx, 0, this.x, this.y);
      ctx.restore();
    }
  }

  return Rocket;
})();
