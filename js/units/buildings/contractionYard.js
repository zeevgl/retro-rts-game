window["ContractionYard"] = (() => {
  const maxHealth = 1000;
  const name = "ContractionYard";
  const width = 120;
  const height = 120;
  const visionRange = 150;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 10000;

  class ContractionYard extends Unit {
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
        null,
        visionRange,
        0,
        null,
        unitClass,
        0,
        buildTime
      );

      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        97,
        86,
        this.height,
        1,
        1,
        "../assets/units/construction_yard.png"
      );

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
  return ContractionYard;
})();
