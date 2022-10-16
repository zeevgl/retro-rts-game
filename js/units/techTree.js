window["TechTree"] = (() => {
  class TechTree {
    constructor(game) {
      //TODO:POC, not really sure how to do this yet
      this.game = game;
      this.buildings = [
        {
          item: new ContractionYard(),
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
