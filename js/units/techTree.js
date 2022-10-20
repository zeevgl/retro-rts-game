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
          isUnlocked: () => false,
          exists: false,
        },
        {
          unit: new Barracks(0, 0, "gray"),
          class: Barracks,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([ContractionYard]),
          exists: false,
        },
      ];

      this.units = [
        {
          unit: new Infantry(),
          class: Infantry,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([Barracks]),
        },
        {
          unit: new Rocket(),
          class: Rocket,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([Barracks]),
        },
      ];
    }

    checkDependencies(dependencies) {
      return dependencies.every((dependency) => {
        return this.buildings.some((building) => {
          return building.unit instanceof dependency && building.exists;
        });
      });
    }

    getVisibleUnits() {
      return this.units.filter((unit) => unit.isVisible);
    }

    getVisibleBuildings() {
      return this.buildings.filter((building) => building.isVisible);
    }

    updateTechTree(unit) {
      if (unit.isABuilding()) {
        this.buildings.forEach((building) => {
          if (unit instanceof building.class) {
            building.exists = true;
          }
        });
      }
    }
  }

  return TechTree;
})();
