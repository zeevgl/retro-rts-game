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
  const width = 95;
  const height = 95;
  const visionRange = 250;
  const attackRange = 0;
  const unitClass = UnitClasses.HEAVY;
  const speed = 2;
  const buildTime = 1000;

  class Harvester extends Unit {
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
        attackRange,
        null,
        unitClass,
        speed,
        buildTime,
        Refinery
      );

      this.harvestingState = HarvesterState.Idle;
      this.spiceField = null;
      this.capacity = 1000;
      this.harvestSpeed = 250;
      this.dumpSpeed = 3000;
      this.dumpSpeedTick = 0;
      this.spice = 0;

      this.refinery = null;

      this.angle = 0;
      this.degree = 0;

      this.initSprites();
    }

    initSprites() {
      const { positions, sprite } = getSpritePositions(
        55,
        55,
        this.height,
        8,
        4,
        "../assets/units/harvester.png"
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

    degreeToPosition(degree) {
      //360 / 32 = 11.25
      // 90 / 11.25 = 8
      // 180 / 11.25 = 16

      //90 => 0
      //180 => 8
      //270 => 16
      //360 => 24

      const slice = 360 / 32;

      const p = Math.floor(degree / slice);
      // console.log("p = ", p, p + 14);
      if (degree >= 0 && degree <= 90) {
       console.log("p = ", p, p + 26);
        return p + 24;
      } else if (degree > 90 && degree <= 180) {
        return p - 8;
      } else if (degree > 180 && degree <= 270) {
        console.log("p = ", p, p - 8);
        return p - 8;
      } else if (degree > 270 && degree <= 360) {
        return p - 8;
      } else {
        return 0;
      }

      // if (degree >= 0 && degree <= 90) {
      //   return 1;
      // } else if (degree > 90 && degree <= 180) {
      //   return 2;
      // } else if (degree > 180 && degree <= 270) {
      //   return 3;
      // } else if (degree > 270 && degree <= 360) {
      //   return 4;
      // } else {
      //   return 0;
      // }
      //degree -= 90;
      // console.log("--degree = ", degree);

      // console.log("p = ", p);

      //25
      //return p - 10;
    }

    drawUnitRotate(ctx) {
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
      this.angle = this.getRadian(x, y);
      this.degree = this.getDegree(x, y);
      // console.log("this.angle  = ", this.angle);
      console.log("this.degree  = ", this.degree);
      console.log("pos=", this.degreeToPosition(this.degree));
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
              this.moveTo(this.refinery.x, this.refinery.y);
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

    getRadian() {
      const x = this.x + this.width / 2;
      const y = this.y + this.height / 2;
      const radian = Math.atan2(this.moveTargetY - y, this.moveTargetX - x);
      const degrees = Math.atan(this.moveTargetY - y, this.moveTargetX - x);
      //console.log('radian = ', radian, radian * (180 / Math.PI));
      return radian + 2 * Math.PI;
      //http://jsfiddle.net/rjCeV/2/
    }

    getDegree() {
      const x = this.x + this.width / 2;
      const y = this.y + this.height / 2;
      const radian = Math.atan2(this.moveTargetY - y, this.moveTargetX - x);
      return radian * (180 / Math.PI) + 180;
    }
  }
  return Harvester;
})();
