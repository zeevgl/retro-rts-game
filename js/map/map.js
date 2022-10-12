window["Map"] = (() => {
  class Map {
    constructor() {
      this.mapWidth = 2000;
      this.mapHeight = 2000;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {}
  }

  return Map;
})();
