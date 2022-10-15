window["Bullet"] = (() => {
  const name = "bullet";
  const width = 5;
  const height = 5;
  const color = "black";
  const speed = 8;

  class Bullet extends Projectile {
    constructor(x, y, targetUnit, attackDamage) {
      super(name, x, y, targetUnit, width, height, color, attackDamage, speed);
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
