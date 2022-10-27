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
  const width = 65;
  const height = 95;
  const visionRange = 250;
  const attackRange = 0;
  const unitClass = UnitClasses.HEAVY;
  const speed = 10;
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
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      this.harvest(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        this.name,
        this.x + this.width / 2,
        this.y + this.height / 2
      );
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
            const closestUnit = getClosestUnitOfPlayer(
              this.x,
              this.y,
              this.player,
              Refinery
            );
            if (closestUnit?.unit) {
              this.refinery = closestUnit.unit;
            }
            if (this.refinery) {
              this.moveTo(this.refinery.x, this.refinery.y); //TODO: find closest refinery
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
