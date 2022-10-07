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
      this.width = width;
      this.height = height;
      this.color = color;
      this.attackDamage = attackDamage;
      this.speed = speed;
      this.isActive = true;

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
      if (this.isActive) {
        this.x += this.moves.xunits;
        this.y += this.moves.yunits;
        this.checkHitTarget();
      }
    }

    draw(ctx) {
      if (this.isActive) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    checkHitTarget() {
      if (checkCollisionBetweenProjectileAndUnit(this, this.targetUnit)) {
        this.isActive = false;
        this.targetUnit.health -= this.attackDamage;
        if (this.targetUnit.health <= 0) {
          this.targetUnit.isAlive = false;
        }
      }
    }
  }

  return Projectile;
})();
