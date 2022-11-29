window["Rocket"] = (() => {
  const AnimationFrames = {
    [UnitStates.IDLE]: {
      start: 0,
      length: 0,
    },
    [UnitStates.MOVING]: {
      start: 1,
      length: 4,
    },
    [UnitStates.MOVING_TO_ATTACK]: {
      start: 1,
      length: 4,
    },
    [UnitStates.ATTACK]: {
      start: 5,
      length: 5,
    },
  };

  const maxHealth = 100;
  const name = "rocket";
  const width = 45;
  const height = 100;
  const attackDamage = {
    [UnitClasses.LIGHT]: 6,
    [UnitClasses.MEDIUM]: 25,
    [UnitClasses.HEAVY]: 25,
    [UnitClasses.BUILDING]: 30,
  };
  const visionRange = 300;
  const attackRange = 250;
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
      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        185,
        147,
        this.height,
        8,
        11,
        "../assets/units/rockets3.png"
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
      if (col === 0) {
        return 2;
      } else if (col <= 2) {
        return 2 - col;
      } else {
        return 8 - col;
      }
    }
  }
  return Rocket;
})();
