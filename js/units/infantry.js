window["Infantry"] = (() => {
  const maxHealth = 100;
  const name = "infantry";
  const width = 25;
  const height = 25;
  const attackDamage = 8;

  class Infantry extends Unit {
    constructor(x, y, color) {
      super(name, x, y, width, height, color, maxHealth, attackDamage);
    }

    update(deltaTime, timestamp) {
      super.draw(ctx);
    }

    draw(ctx) {
      super.draw(ctx);
    }
  }
  return Infantry;
})();
