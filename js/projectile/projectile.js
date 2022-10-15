window["Projectile"] = (() => {
  class Projectile {
    constructor(
      name,
      x,
      y,
      targetUnit,
      width,
      height,
      color,
      attackDamage,
      speed
    ) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.targetUnit = targetUnit;
      this.targetUnitLocked = { ...targetUnit };
      this.width = width;
      this.height = height;
      this.color = color;
      this.attackDamage = attackDamage;
      this.speed = speed;
      this.state = ProjectileStates.FLYING;

      const distance = calcDistance(
        this.x,
        this.y,
        this.targetUnit.x,
        this.targetUnit.y
      );
      this.moves = calcMoves(
        this.speed,
        distance,
        this.x,
        this.y,
        this.targetUnit.x,
        this.targetUnit.y
      );
    }

    update(deltaTime, timestamp) {
      if (this.state === ProjectileStates.FLYING) {
        this.x += this.moves.xunits;
        this.y += this.moves.yunits;
        this.checkHitTarget();
      } else if (this.state === ProjectileStates.EXPLODING) {
        this.state = ProjectileStates.INACTIVE;
      }
    }

    draw(ctx) {
      ctx.save();
      switch (this.state) {
        case ProjectileStates.FLYING:
          this.drawProjectile(ctx);
          break;
        case ProjectileStates.EXPLODING:
          this.drawExplosion(ctx);
          break;
      }
      ctx.restore();
    }

    drawProjectile(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    drawExplosion(ctx) {
      ctx.beginPath();
      const randomPaddingX = Math.floor(Math.random() * 10) - 10;
      const randomPaddingY = Math.floor(Math.random() * 10) - 10;
      ctx.arc(
        this.x + randomPaddingX,
        this.y + randomPaddingY,
        30,
        0,
        2 * Math.PI
      );

      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    }

    checkHitTarget() {
      if (checkCollisionBetweenProjectileAndUnit(this, this.targetUnit)) {
        this.state = ProjectileStates.EXPLODING;
        this.targetUnit.health -= this.attackDamage[this.targetUnit.type];
        if (this.targetUnit.health <= 0) {
          this.targetUnit.isAlive = false;
          this.targetUnit.isSelected = false;
        }
        return true;
      } else if (
        checkCollisionBetweenProjectileAndUnit(this, this.targetUnitLocked)
      ) {
        this.state = ProjectileStates.EXPLODING;
        return true;
      }

      return false;
    }

    get isActive() {
      return this.state !== ProjectileStates.INACTIVE;
    }
  }

  return Projectile;
})();
