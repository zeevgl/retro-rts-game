window["ContractionYard"] = (() => {
  const maxHealth = 1000;
  const name = "ContractionYard";
  const width = 200;
  const height = 200;
  const visionRange = 150;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 10000;

  class ContractionYard extends Unit {
    constructor({player, x, y, color}) {
      super({
        player,
        name,
        x,
        y,
        width,
        height,
        color,
        maxHealth,
        visionRange,
        unitClass,
        buildTime,
      });

      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        389,
        258,
        this.height,
        8,
        11,
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
      this.sprite.draw(ctx, 46, this.x, this.y);
    }
  }
  return ContractionYard;
})();
