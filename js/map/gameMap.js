window["GameMap"] = (() => {
  class GameMap {
    constructor() {
      this.mapWidth = 2000;
      this.mapHeight = 2000;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      if (DEBUG_MODE) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, this.mapWidth, this.mapHeight);
        ctx.lineWidth = "30";
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  return GameMap;
})();
