window["Rocket"] = (() => {
  const AnimationFrames = {
    [UnitStates.SPAWN]: {
      start: 0,
      length: 0,
      next: UnitStates.IDLE,
    },
    [UnitStates.IDLE]: {
      start: 0,
      length: 0,
    },
    [UnitStates.MOVING]: {
      start: 1,
      length: 4,
      loop: true,
    },
    [UnitStates.MOVING_TO_ATTACK]: {
      start: 1,
      length: 4,
      loop: true,
    },
    [UnitStates.ATTACK]: {
      start: 5,
      length: 5,
      loop: true,
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
      this.animationTick = 0;
      this.spriteRow = 0;
      this.initSprites();
      this.initAnimations();
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

    initAnimations() {
      this.activeAnimation = null;

      this.animations = {
        [UnitStates.SPAWN]: FrameAnimator.fromAnimationFrame(
          this.sprite,
          AnimationFrames[UnitStates.SPAWN],
          {
            frameDuration: 80,
            onComplete: () => {
              this.setState(AnimationFrames[UnitStates.SPAWN].next);
            },
          }
        ),
        [UnitStates.IDLE]: FrameAnimator.fromAnimationFrame(
          this.sprite,
          AnimationFrames[UnitStates.IDLE],
          { frameDuration: 80 }
        ),
        [UnitStates.MOVING]: FrameAnimator.fromAnimationFrame(
          this.sprite,
          AnimationFrames[UnitStates.MOVING],
          { frameDuration: 100 }
        ),
        [UnitStates.MOVING_TO_ATTACK]: FrameAnimator.fromAnimationFrame(
            this.sprite,
            AnimationFrames[UnitStates.MOVING_TO_ATTACK],
            { frameDuration: 100 }
        ),
        [UnitStates.ATTACK]: FrameAnimator.fromAnimationFrame(
            this.sprite,
            AnimationFrames[UnitStates.ATTACK],
            { frameDuration: 100 }
        ),
      };

      this.activeAnimation = this.animations[this.state];
      this.activeAnimation.start();
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.activeAnimation.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawUnit(ctx) {
      ctx.save();
      const positionCol = this.degreeToPosition(this.degree);
      this.sprite.draw(
        ctx,
        positionCol + 8 * this.activeAnimation.getActiveFrame(),
        this.x,
        this.y
      );
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

    setState(state) {
      super.setState(state);
      if (this.animations?.[state]) {
        this.activeAnimation = this.animations[this.state];
        this.activeAnimation.start();
      }
    }
  }
  return Rocket;
})();
