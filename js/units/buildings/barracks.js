window["Barracks"] = (() => {
  const animationFrames = {
    [UnitStates.SPAWN]: {
      start: 0,
      length: 18,
      loop: false,
      frameDuration: 80,
      next: UnitStates.IDLE,
    },
    [UnitStates.IDLE]: {
      start: 20,
      length: 9,
      frameDuration: 80,
      loop: true,
    },
  };

  const maxHealth = 400;
  const name = "Barracks";
  const width = 150;
  const height = 150;
  const visionRange = 100;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 900;

  class Barracks extends Unit {
    constructor({ player, x, y, color }) {
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
      this.initAnimations(animationFrames, this.sprite);
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        257,
        211,
        this.height,
        10,
        4,
        "./assets/units/barracks.png"
      );

      this.sprite = sprite;
    }

    drawUnit(ctx) {
      this.sprite.draw(
        ctx,
        this.activeAnimation?.getActiveFrame(),
        this.x,
        this.y
      );
    }
  }
  return Barracks;
})();
