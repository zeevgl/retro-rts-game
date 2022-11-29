window["Infantry"] = (() => {
  const AnimationFrames = {
    [UnitStates.IDLE]: {
      start: 0,
      length: 0,
    },
    [UnitStates.MOVING]: {
      start: 1,
      length: 5,
    },
    [UnitStates.MOVING_TO_ATTACK]: {
      start: 1,
      length: 5,
    },
    [UnitStates.ATTACK]: {
      start: 7,
      length: 2,
    },
  };

  //TODO: change all these consts into static properties of the class
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
      this.animationTick = 0;
      this.spriteRow = 0;
      this.animationFrames = AnimationFrames[UnitStates.IDLE];
      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
          30,
          24,
          this.height,
          8,
          29,
          "../assets/units/trooper.png"
      );

      this.sprite = sprite;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.updateAnimation(deltaTime, timestamp);
    }

    updateAnimation(deltaTime, timestamp) {
      this.animationFrames = AnimationFrames[this.state];

      this.animationTick += deltaTime;
      if (this.animationTick > 100) {
        this.animationTick = 0;

        if (this.spriteRow < this.animationFrames.start) {
          this.spriteRow = this.animationFrames.start;
        } else if (
            this.spriteRow >=
            this.animationFrames.start + this.animationFrames.length
        ) {
          this.spriteRow = this.animationFrames.start;
        } else {
          this.spriteRow = this.spriteRow + 1;
        }
      }
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawUnit(ctx) {
      ctx.save();
      const positionCol = this.degreeToPosition(this.degree);
      this.sprite.draw(ctx, positionCol + 8 * this.spriteRow, this.x, this.y);
      ctx.restore();
    }

    degreeToPosition(degree) {
      const frames = 8;
      const slice = 360 / frames;

      const col = Math.floor(degree / slice);
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
