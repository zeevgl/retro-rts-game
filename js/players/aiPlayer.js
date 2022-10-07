window["AiPlayer"] = (() => {
  class AiPlayer extends Player {
    constructor(name, color, startingPoint) {
      super(name, color, startingPoint);
      this.state = AiStates.IDLE;
    }

    update(deltaTime, timestamp) {
      super.update(deltaTime, timestamp);
      //search for enemy units
      //if ()
    }

    draw(ctx) {
      super.draw(ctx);
    }
  }

  return AiPlayer;
})();
