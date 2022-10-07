window["AiPlayer"] = (() => {
  class AiPlayer extends Player {
    constructor(name, color, startingPoint) {
      super(name, color, startingPoint);
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
    }

    draw(ctx) {
      super.draw(ctx);
    }
  }

  return AiPlayer;
})();
