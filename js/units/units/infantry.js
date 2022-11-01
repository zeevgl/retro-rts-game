const infantrySpritePositions = [
  { x: 1, y: 12, width: 22, height: 30 },
  { x: 24, y: 12, width: 22, height: 30 },
];

window["Infantry"] = (() => {
  //TODO: change all these consts into static properties of the class
  const maxHealth = 100;
  const name = "infantry";
  const width = 25;
  const height = 25;
  const attackDamage = {
    [UnitClasses.LIGHT]: 8,
    [UnitClasses.MEDIUM]: 7,
    [UnitClasses.HEAVY]: 1,
    [UnitClasses.BUILDING]: 6,
  };
  const visionRange = 150;
  const attackRange = 100;
  const attackCooldown = 700;
  const unitClass = UnitClasses.LIGHT;
  const speed = 5;
  const buildTime = 500;

  class Infantry extends Unit {
    constructor(player, x, y, color) {
      super(
        player,
        name,
        x,
        y,
        width,
        height,
        color,
        maxHealth,
        attackDamage,
        visionRange,
        attackRange,
        attackCooldown,
        unitClass,
        speed,
        buildTime,
        Barracks
      );
      this.initSprites();
    }

    initSprites() {
      //idle
      const { positions, sprite } = getSpriteByPositions(
        this.height,
        infantrySpritePositions,
        "../assets/units/marin.png"
      );

      //walking...

      this.sprite = sprite;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawUnit(ctx) {
      this.sprite.draw(ctx, 0, this.x, this.y);
    }
  }
  return Infantry;
})();
