const HarvesterState = {
  OnRoutToField: "OnRoutToField",
  Harvesting: "Harvesting",
  Returning: "Returning",
  Dumping: "Dumping",
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
    constructor(x, y, color) {
      super(
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
        ContractionYard //TODO: change to War Factory
      );

      this.harvestingState = HarvesterState.Idle;
      this.spiceField = null;
      this.capacity = 20;
      this.spice = 0;

      //TMP refinery
      this.refinery = {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      };
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
      //TODO: change to SWITCH statement
      if (
        this.harvestingState === HarvesterState.OnRoutToField &&
        this.isInSpiceField()
      ) {
        this.harvestingState = HarvesterState.Harvesting;
      } else if (
        this.harvestingState === HarvesterState.Harvesting &&
        this.isInSpiceField()
      ) {
        if (this.spice < this.capacity) {
          this.spice += 1;
        } else {
          this.harvestingState = HarvesterState.Returning;
          this.moveTo(this.refinery.x, this.refinery.y); //TODO: find closest refinery
        }
      } else if (this.harvestingState === HarvesterState.Returning) {
        if (this.isInRefinery()) {
          this.harvestingState = HarvesterState.Dumping;
        }
      } else if (this.harvestingState === HarvesterState.Dumping) {
        console.log("dumping", this.spice);
        this.spice = 0;
        this.harvestingState = HarvesterState.OnRoutToField;
        this.returnToSpiceField();
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
