window["TechTree"] = (() => {
  class TechTree {
    constructor(player) {
      //contains all the possible units and building a player can build

      this.player = player;
      this.init();
    }

    init() {
      this.buildings = [
        {
          unit: new Barracks(),
          isVisible: true,
          isUnlocked: false,
        },
      ];

      this.units = [
        {
          unit: new Infantry(),
          isVisible: true,
          isUnlocked: false,
        },
        {
          unit: new Rocket(),
          isVisible: true,
          isUnlocked: false,
        },
      ];
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.save();

      ctx.restore();
    }
  }

  return TechTree;
})();
