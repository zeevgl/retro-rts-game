window["Rocket"] = (() => {
  const name = "rocket";
  const width = 5;
  const height = 5;
  const color = "white";
  const speed = 4;

  class Rocket extends Projectile {
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

  return Rocket;
})();
