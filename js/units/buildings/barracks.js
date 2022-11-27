window["Barracks"] = (() => {
  const maxHealth = 400;
  const name = "Barracks";
  const width = 150;
  const height = 150;
  const visionRange = 100;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 900;

  class Barracks extends Unit {
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
          257,
          211,
          this.height,
          10,
          4,
          "../assets/units/barracks.png"
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
      this.sprite.draw(ctx, 18, this.x, this.y);
    }
  }
  return Barracks;
})();
