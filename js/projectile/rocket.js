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

      this.trail = [];
      this.pushTrail();

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
        "./assets/projectiles/missile.png",
        this.height
      );

      this.sprite = sprite;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.pushTrail();
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
      this.drawTrail(ctx);
    }

    drawTrail(ctx) {
      ctx.save();
      this.trail.slice(-45).forEach((trail, index) => {
        if (index % 2 === 0) {
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, index * 0.1, 0, 2 * Math.PI);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.closePath();
        }
      });
      ctx.restore();
    }

    pushTrail() {
      this.trail.push({
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
      });
    }
  }

  return Rocket;
})();
