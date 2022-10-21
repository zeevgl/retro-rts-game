window["GameMap"] = (() => {
  class GameMap {
    constructor(game) {
      this.game = game;
      this.level = new Level(TileMaps.map2, "assets");

      this.mapWidth = this.level.getWidth();
      this.mapHeight = this.level.getHeight();

      this.initPlayers();
    }

    update(deltaTime, timestamp) {
      this.level.update(deltaTime, timestamp);
    }

    draw(ctx) {
      this.level.draw(ctx);

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

    initPlayers() {
      this.initHumanPlayer();
      this.initAiPlayer();
    }

    initHumanPlayer() {
      const { humanPlayer } = this.game;
      const { x, y } = this.level.getHumanPlayerPosition();

      humanPlayer.addUnit(new ContractionYard(x, y, humanPlayer.color));

      humanPlayer.addUnit(new Barracks(x + 120, y + 10, humanPlayer.color));

      humanPlayer.addUnit(new Infantry(130 + x, 140 + y, humanPlayer.color));
      humanPlayer.addUnit(new Rocket(160 + x + 80, 100 + y, humanPlayer.color));
    }

    initAiPlayer() {
      const { aiPlayers } = this.game;
      const positions = this.level.getAiPlayersPositions()
      aiPlayers.forEach((player, index) => {
        console.log('positions = ', positions[index]);
        player.addUnit(
          new ContractionYard(
            positions[index].x,
            positions[index].y,
            player.color
          )
        );

        player.addUnit(
          new Barracks(
            positions[index].x + 120,
            positions[index].y + 10,
            player.color
          )
        );

        player.addUnit(
          new Rocket(
            positions[index].x - 100,
            positions[index].y,
            player.color
          )
        );
        player.addUnit(
          new Rocket(
            positions[index].x - 150,
            100 + positions[index].y,
            player.color
          )
        );
      });
    }
  }

  return GameMap;
})();
