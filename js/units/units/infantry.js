window["Infantry"] = (() => {
  const animationFrames = {
    [UnitStates.SPAWN]: {
      start: 0,
      length: 0,
    },
    [UnitStates.IDLE]: {
      start: 0,
      length: 0,
    },
    [UnitStates.MOVING]: {
      start: 1,
      length: 5,
      loop: true,
    },
    [UnitStates.MOVING_TO_ATTACK]: {
      start: 1,
      length: 5,
      loop: true,
    },
    [UnitStates.ATTACK]: {
      start: 7,
      length: 4,
    },
  };

  const maxHealth = 100;
  const name = "infantry";
  const width = 35;
  const height = 75;
  const attackDamage = {
    [UnitClasses.LIGHT]: 8,
    [UnitClasses.MEDIUM]: 7,
    [UnitClasses.HEAVY]: 1,
    [UnitClasses.BUILDING]: 6,
  };
  const visionRange = 300;
  const attackRange = 200;
  const attackCooldown = 500;
  const unitClass = UnitClasses.LIGHT;
  const speed = 5;
  const buildTime = 500;

  class Infantry extends Unit {
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
        attackDamage,
        visionRange,
        attackRange,
        attackCooldown,
        unitClass,
        speed,
        buildTime,
        buildAt: Barracks,
      });
      this.initSprites();
      this.initAnimations(animationFrames, this.sprite);
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        30,
        24,
        this.height,
        8,
        29,
        "./assets/units/trooper.png"
      );

      this.sprite = sprite;
    }

    drawUnit(ctx) {
      ctx.save();
      const positionCol = this.degreeToPosition(this.degree);
      this.sprite.draw(ctx, positionCol + 8 * this.activeAnimation?.getActiveFrame(), this.x, this.y);
      ctx.restore();
    }

    degreeToPosition(degree) {
      const frames = 8;
      const slice = 360 / frames;

      const col = Math.round(degree / slice);
      const colAdjusted = col - 2;

      if (colAdjusted < 0) {
        return col + 6;
      } else if (colAdjusted > 0) {
        return colAdjusted;
      } else {
        return 0;
      }
    }
  }
  return Infantry;
})();
