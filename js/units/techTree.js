window["TechTree"] = (() => {
  class TechTree {
    constructor(player) {
      this.player = player;
      this.init();
    }

    init() {
      this.buildings = [
        {
          unit: new ContractionYard({ x: 0, y: 0, color: "gray" }),
          class: ContractionYard,
          isVisible: false,
          isUnlocked: () => false,
          exists: true,
        },
        {
          unit: new Refinery({ x: 0, y: 0, color: "gray" }),
          class: Refinery,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([ContractionYard]),
          exists: false,
        },
        {
          unit: new Barracks({ x: 0, y: 0, color: "gray" }),
          class: Barracks,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([ContractionYard]),
          exists: false,
        },
      ];

      this.units = [
        {
          unit: new Infantry({ x: 0, y: 0, color: "gray" }),
          class: Infantry,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([Barracks]),
        },
        {
          unit: new Rocketeer({ x: 0, y: 0, color: "gray" }),
          class: Rocketeer,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([Barracks]),
        },
        {
          unit: new Harvester({ x: 0, y: 0, color: "gray" }),
          class: Harvester,
          isVisible: true,
          isUnlocked: () => this.checkDependencies([Refinery]),
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

    getHarvester() {
      return this.units.find((unit) => unit.unit instanceof Harvester);
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
