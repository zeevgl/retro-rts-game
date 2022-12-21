window["AiPlayer"] = (() => {
  class AiPlayer extends Player {
    constructor({ name, color, startingPoint, game }) {
      super({ name, color, startingPoint, game });
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
