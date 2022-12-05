window["Refinery"] = (() => {
  const maxHealth = 800;
  const name = "Refinery";
  const width = 190;
  const height = 180;
  const visionRange = 100;
  const unitClass = UnitClasses.BUILDING;
  const buildTime = 1200;

  class Refinery extends Unit {
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

      if (this.player) {
        const item = this.player.techTree.getHarvester();
        if (item) {
          this.player.productionManager.spawnUnitAtBuilding(item.class, this);
        }
      }
      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        385,
        368,
        this.height,
        12,
        9,
        "../assets/units/refinery.png"
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
  return Refinery;
})();
