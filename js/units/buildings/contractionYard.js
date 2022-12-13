window["ContractionYard"] = (() => {

  const AnimationFrames = {
    [UnitStates.SPAWN]: {
      // start: 17,
      // length: 15,
      start: 0,
      length: 32,
      loop: false,
      frameDuration: 80,
      next: UnitStates.IDLE,
    },
    [UnitStates.IDLE]: {
      start: 32,
      length: 1,
      frameDuration: 80,
      loop: true,
    },
  };

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
      this.initAnimations();
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

    initAnimations() {
      this.activeAnimation = null;

      //TODO:maybe do this in onne function?
      this.animations = {
        [UnitStates.SPAWN]: FrameAnimator.fromAnimationFrame(
            this.sprite,
            AnimationFrames[UnitStates.SPAWN],
            {
              frameDuration: AnimationFrames[UnitStates.SPAWN].frameDuration,
              onComplete: () => {
                this.state = AnimationFrames[UnitStates.SPAWN].next;
                this.activeAnimation = this.animations[this.state];
                this.activeAnimation.start();
              },
            }
        ),
        [UnitStates.IDLE]: FrameAnimator.fromAnimationFrame(
            this.sprite,
            AnimationFrames[UnitStates.IDLE],
            { frameDuration: 80 }
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
      //this.sprite.draw(ctx, 46, this.x, this.y);
      this.sprite.draw(ctx, this.activeAnimation.getActiveFrame(), this.x, this.y);
    }
  }
  return ContractionYard;
})();
