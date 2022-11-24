window["Rocket"] = (() => {
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
      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        30,
        24,
        this.height,
        8,
        22,
        "../assets/units/trooper.png"
      );

      this.sprite = sprite;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
      // ctx.fillStyle = "black";
      // ctx.font = "12px Arial";
      // ctx.textAlign = "center";
      // ctx.fillText(
      //   this.name,
      //   this.x + this.width / 2,
      //   this.y + this.height / 2
      // );
    }

    drawUnit(ctx) {
      ctx.save();
      const position = this.degreeToPosition(this.degree);
      console.log("position = ", position);
      this.sprite.draw(ctx, position, this.x, this.y);

      ctx.restore();
    }

    degreeToPosition(degree) {
      const frames = 8;
      const row = 1;

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
