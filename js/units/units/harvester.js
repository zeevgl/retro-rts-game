const HarvesterState = {
  OnRoutToField: "OnRoutToField",
  Harvesting: "Harvesting",
  Returning: "Returning",
  Dumping: "Dumping",
  DumpingWait: "DumpingWait",
  Idle: "Idle",
};
window["Harvester"] = (() => {
  const maxHealth = 1000;
  const name = "Harvester";
  const width = 120;
  const height = 120;
  const visionRange = 250;
  const attackRange = 0;
  const unitClass = UnitClasses.HEAVY;
  const speed = 2;
  const buildTime = 1000;

  class Harvester extends Unit {
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
        attackRange,
        unitClass,
        speed,
        buildTime,
        buildAt: Refinery,
      });

      this.harvestingState = HarvesterState.Idle;
      this.spiceField = null;
      this.capacity = 1000;
      this.harvestSpeed = 250;
      this.dumpSpeed = 3000;
      this.dumpSpeedTick = 0;
      this.spice = 0;

      this.refinery = null;

      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        55,
        55,
        this.height,
        8,
        4,
        "../assets/units/harvester2.png"
      );

      this.sprite = sprite;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.harvest(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
    }

    drawUnit(ctx) {
      ctx.save();
      const position = this.degreeToPosition(this.degree);
      this.sprite.draw(ctx, position, this.x, this.y);

      ctx.restore();
    }

    drawUnitRotate(ctx) {
      //this uses canvas rotate to draw. currently not in use
      ctx.save();

      const cx = this.x + this.width / 2;
      const cy = this.y + this.height / 2;

      ctx.translate(cx, cy);
      ctx.rotate(this.angle);
      ctx.translate(-cx, -cy);

      if (
        (this.angle >= 7.8 && this.angle <= 10) ||
        (this.angle >= 3 && this.angle <= 4.6)
      ) {
        ctx.scale(1, -1);
        this.sprite.draw(ctx, 8, this.x, -this.y - this.height);
      } else {
        this.sprite.draw(ctx, 8, this.x, this.y);
      }

      ctx.restore();
    }

    moveTo(x, y) {
      super.moveTo(x, y);
    }

    setSpiceField(x, y, object) {
      this.spiceField = { x, y, object };
      this.harvestingState = HarvesterState.OnRoutToField;
    }

    stopHarvest() {
      this.spiceField = null;
      this.harvestingState = HarvesterState.Idle;
    }

    returnToSpiceField() {
      this.moveTo(this.spiceField.x, this.spiceField.y);
    }

    harvest(deltaTime, timestamp) {
      //TODO:Zeev: this function is TOO LONG
      switch (this.harvestingState) {
        case HarvesterState.OnRoutToField:
          if (this.isInSpiceField()) {
            this.harvestingState = HarvesterState.Harvesting;
          }
          break;
        case HarvesterState.Harvesting:
          if (this.spice < this.capacity) {
            this.spice += this.harvestSpeed / deltaTime;
          } else if (this.spice >= this.capacity) {
            this.harvestingState = HarvesterState.Returning;
            const closestUnit = getClosestUnitOfPlayer(this, this.player, {
              unitTypeClass: Refinery,
            });
            if (closestUnit?.unit) {
              this.refinery = closestUnit.unit;
            }
            if (this.refinery) {
              this.moveTo(this.refinery.centerX, this.refinery.centerY);
            } else {
              this.harvestingState = HarvesterState.Idle;
            }
          }
          break;
        case HarvesterState.Returning:
          if (this.isInRefinery()) {
            this.harvestingState = HarvesterState.Dumping;
          }
          break;
        case HarvesterState.Dumping:
          this.player.resources.addResources(this.spice);
          this.spice = 0;
          this.harvestingState = HarvesterState.DumpingWait;
          break;
        case HarvesterState.DumpingWait:
          this.dumpSpeedTick += deltaTime;
          if (this.dumpSpeedTick >= this.dumpSpeed) {
            this.dumpSpeedTick = 0;
            this.harvestingState = HarvesterState.OnRoutToField;
            this.returnToSpiceField();
          }
          break;
        case HarvesterState.Idle:
          break;
      }
    }

    isInSpiceField() {
      return (
        this.spiceField &&
        this.x < this.spiceField.x + this.spiceField.object.width &&
        this.x + this.width > this.spiceField.x &&
        this.y < this.spiceField.y + this.spiceField.object.height &&
        this.y + this.height > this.spiceField.y
      );
    }

    isInRefinery() {
      return (
        this.refinery &&
        this.x < this.refinery.x + this.refinery.width &&
        this.x + this.width > this.refinery.x &&
        this.y < this.refinery.y + this.refinery.height &&
        this.y + this.height > this.refinery.y
      );
    }
  }
  return Harvester;
})();
