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
//TODO:need ot refactor all to be new Barracks({.....}) with defaults and ad demo mode for building placement
  class Barracks extends Unit {
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
        null,
        visionRange,
        0,
        null,
        unitClass,
        0,
        buildTime
      );
      this.initSprites();
      this.initAnimation();

      this.state = UnitStates.SPAWN;
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

    initAnimation() {
      this.animationTick = 0;
      this.animationFrame = -1;
      this.animationFrames = AnimationFrames[this.state];
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.updateAnimation(deltaTime, timestamp);
    }

    updateAnimation(deltaTime, timestamp) {
      this.animationFrames = AnimationFrames[this.state];

      this.animationTick += deltaTime;
      if (this.animationTick > 80) {
        this.animationTick = 0;

        if (this.animationFrame < this.animationFrames.start) {
          this.animationFrame = this.animationFrames.start;
        } else if (
          this.animationFrame >=
          this.animationFrames.start + this.animationFrames.length
        ) {
          if (this.animationFrames.loop) {
            this.animationFrame = this.animationFrames.start;
          } else if (this.animationFrames.next) {
            this.state = this.animationFrames.next;
          }
        } else {
          this.animationFrame++;
        }
      }
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawUnit(ctx) {
      this.sprite.draw(ctx, this.animationFrame, this.x, this.y);
    }
  }
  return Barracks;
})();
