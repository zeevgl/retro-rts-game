window["Projectile"] = (() => {
  class Projectile {
    constructor(
      name,
      x,
      y,
      targetX,
      targetY,
      width,
      height,
      color,
      attackDamage,
      speed
    ) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.width = width;
      this.height = height;
      this.color = color;
      this.attackDamage = attackDamage;
      this.speed = speed;
      this.isActive = true;

      const distance = calcDistance(this.x, this.y, this.targetX, this.targetY);
      this.moves = calcMoves(
        this.speed,
        distance,
        this.x,
        this.y,
        this.targetX,
        this.targetY
      );
    }

    update(deltaTime, timestamp) {
      if (this.isActive) {
        this.x += this.moves.xunits;
        this.y += this.moves.yunits;
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
  }

  return Projectile;
})();
