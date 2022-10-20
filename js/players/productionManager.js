const ProductionStates = {
  IDLE: "IDLE",
  IN_PROGRESS: "IN_PROGRESS",
  READY: "READY",
};

window["ProductionManager"] = (() => {
  class ProductionManager {
    constructor(player) {
      this.player = player;
      this.resetBuildingProduction();
      this.resetUnitProduction();
    }

    resetBuildingProduction() {
      this.buildingProduction = {
        item: null,
        tick: 0,
        state: ProductionStates.IDLE,
      };
    }

    resetUnitProduction() {
      this.unitProduction = {
        item: null,
        tick: 0,
        state: ProductionStates.IDLE,
      };
    }

    update(deltaTime, timestamp) {
      if (this.isBuildingInProgress()) {
        this.buildingProduction.tick += deltaTime;
        if (
          this.buildingProduction.tick >
          this.buildingProduction.item.unit.buildTime
        ) {
          this.buildingProduction.state = ProductionStates.READY;
        }
      } else if (this.isUnitInProgress()) {
        this.unitProduction.tick += deltaTime;
        if (
          this.unitProduction.tick > this.unitProduction.item.unit.buildTime
        ) {
          this.spawnUnit();
        }
      }
    }

    startBuilding(item) {
      this.buildingProduction = {
        item: item,
        tick: 0,
        state: ProductionStates.IN_PROGRESS,
      };
    }

    startUnit(item) {
      this.unitProduction = {
        item: item,
        tick: 0,
        state: ProductionStates.IN_PROGRESS,
      };
    }

    isBuildingInProgress() {
      return this.buildingProduction.state === ProductionStates.IN_PROGRESS;
    }

    isUnitInProgress() {
      return this.unitProduction.state === ProductionStates.IN_PROGRESS;
    }

    isItemInProgress(item) {
      const isItemIsABuildingProgress =
        !item.unit.isABuilding() &&
        this.isUnitInProgress() &&
        item.unit.name === this.unitProduction.item.unit.name;

      const isItemIsAnUnitProgress =
        item.unit.isABuilding() &&
        this.isBuildingInProgress() &&
        item.unit.name === this.buildingProduction.item.unit.name;

      return isItemIsABuildingProgress || isItemIsAnUnitProgress;
    }

    getProgress(item) {
      if (item.unit.isABuilding()) {
        return this.buildingProduction.tick / item.unit.buildTime;
      } else {
        return this.unitProduction.tick / item.unit.buildTime;
      }
    }

    isBuildingReadyToBePlace(item) {
      return (
        this.buildingProduction.state === ProductionStates.READY &&
        this.buildingProduction.item.unit.isABuilding() &&
        this.buildingProduction.item.unit.name === item.unit.name
      );
    }

    spawnUnit(item) {
      const building = this.player.units.find((unit) => {
        if (
          unit.isABuilding() &&
          unit instanceof this.unitProduction.item.unit.buildAt
        ) {
          return unit;
        }
      });

      const newUnit = new this.unitProduction.item.class(
        building.x + building.width / 2,
        building.y + building.height + 10,
        this.player.color
      );
      this.player.addUnit(newUnit);
      this.resetUnitProduction();
    }

    placeBuilding(x, y) {
      const newUnit = new this.buildingProduction.item.class(
        x,
        y,
        this.player.color
      );
      this.player.addUnit(newUnit);
      this.state = UserInputStates.IDLE;

      this.resetBuildingProduction();
    }
  }

  return ProductionManager;
})();
