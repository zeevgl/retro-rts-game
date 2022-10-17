window["TechTree"] = (() => {
  class TechTree {
    constructor(player) {
      this.player = player;
      this.init();
    }

    init() {
      this.buildings = [
        {
          unit: new ContractionYard(0, 0, "gray"),
          class: ContractionYard,
          isVisible: false,
          isUnlocked: false,
          exists: true,
        },
        {
          unit: new Barracks(0, 0, "gray"),
          class: Barracks,
          isVisible: true,
          isUnlocked: true,
          exists: false,
        },
      ];

      this.units = [
        {
          unit: new Infantry(),
          class: Infantry,
          isVisible: true,
          isUnlocked: this.hasBarracks(),
        },
        {
          unit: new Rocket(),
          class: Rocket,
          isVisible: true,
          isUnlocked: this.hasBarracks(),
        },
      ];
    }

    hasBarracks() {
      //TODO not sure if it is the best way to check if a building exists
      return this.buildings.some((building) => {
        return building.unit instanceof Barracks && building.exists;
      });
    }

    getVisibleUnits() {
      return this.units.filter((unit) => unit.isVisible);
    }

    getVisibleBuildings() {
      return this.buildings.filter((building) => building.isVisible);
    }
  }

  return TechTree;
})();
