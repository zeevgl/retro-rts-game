window["Bullet"] = (() => {
  const name = "bullet";
  const width = 10;
  const height = 10;
  const color = "black";

  class Bullet extends Projectile {
    constructor(x, y, targetX, targetY, attackDamage) {
      super(name, x, y, targetX, targetY, width, height, color, attackDamage, 1);
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
    }
  }

  return Bullet;
})();
