window["Refinery"] = (() => {
  const animationFrames = {
    [UnitStates.SPAWN]: {
      start: 0,
      length: 18,
      loop: false,
      frameDuration: 80,
      next: UnitStates.IDLE,
    },
    [UnitStates.IDLE]: {
      start: 25,
      length: 6,
      loop: true,
      frameDuration: 80,
    },
  };

  const maxHealth = 800;
  const name = "Refinery";
  const width = 190;
  const height = 180;
  const visionRange = 100;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 1200;

  class Refinery extends Unit {
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

      if (this.player) {
        const item = this.player.techTree.getHarvester();
        if (item) {
          this.player.productionManager.spawnUnitAtBuilding(item.class, this);
        }
      }
      this.initSprites();
      this.initAnimations(animationFrames, this.sprite);
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        385,
        368,
        this.height,
        12,
        9,
        "./assets/units/refinery.png"
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
  return Refinery;
})();
