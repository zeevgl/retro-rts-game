window["TechTree"] = (() => {
  class TechTree {
    constructor(player) {
      this.player = player;
      this.init();
    }

    init() {
      this.buildings = [
        {
          unit: new Barracks(),
          isVisible: true,
          isUnlocked: true,
          exists: true,
        },
      ];

      this.units = [
        {
          unit: new Infantry(),
          isVisible: true,
          isUnlocked: this.hasBarracks(),
        },
        {
          unit: new Rocket(),
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
  }

  return TechTree;
})();
