window["Rocket"] = (() => {
  const AnimationFrames = {
    [UnitStates.IDLE]: {
      start: 0,
      length: 0,
    },
    [UnitStates.MOVING]: {
      start: 1,
      length: 6,
    },
    [UnitStates.MOVING_TO_ATTACK]: {
      start: 1,
      length: 6,
    },
    [UnitStates.ATTACK]: {
      start: 7,
      length: 2,
    },
  };

  const maxHealth = 100;
  const name = "rocket";
  const width = 55;
  const height = 117;
  const attackDamage = {
    [UnitClasses.LIGHT]: 6,
    [UnitClasses.MEDIUM]: 25,
    [UnitClasses.HEAVY]: 25,
    [UnitClasses.BUILDING]: 30,
  };
  const visionRange = 150;
  const attackRange = 140;
  const attackCooldown = 2500;
  const unitClass = UnitClasses.LIGHT;
  const speed = 4;
  const buildTime = 600;

  class Rocket extends Unit {
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
      console.log("this.animationFrames = ", this.animationFrames);
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
  return Rocket;
})();
