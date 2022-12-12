window["Barracks"] = (() => {
  const AnimationFrames = {
    [UnitStates.SPAWN]: {
      start: 0,
      length: 18,
      loop: false,
      next: UnitStates.IDLE,
    },
    [UnitStates.IDLE]: {
      start: 20,
      length: 9,
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
      this.state = UnitStates.SPAWN;
      this.initAnimations();
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

    initAnimations() {
      this.activeAnimation = null;

      this.animations = {
        [UnitStates.SPAWN]: Animation.fromAnimationFrame(
          this.sprite,
          AnimationFrames[UnitStates.SPAWN],
          {
            frameDuration: 80,
            onComplete: () => {
              this.state = AnimationFrames[UnitStates.SPAWN].next;
              this.activeAnimation = this.animations[this.state];
              this.activeAnimation.start();
            },
          }
        ),
        [UnitStates.IDLE]: Animation.fromAnimationFrame(
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
      this.sprite.draw(ctx, this.activeAnimation.getActiveFrame(), this.x, this.y);
    }
  }
  return Barracks;
})();
