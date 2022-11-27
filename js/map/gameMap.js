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

      humanPlayer.addUnit(
        new ContractionYard(humanPlayer, x, y, humanPlayer.color)
      );

      humanPlayer.addUnit(
        new Barracks(humanPlayer, x + 220, y + 10, humanPlayer.color)
      );
      humanPlayer.addUnit(
        new Refinery(humanPlayer, x + 420, y + 30, humanPlayer.color)
      );

      humanPlayer.addUnit(
        new Infantry(humanPlayer, 160 + x, 280 + y, humanPlayer.color)
      );
      humanPlayer.addUnit(
        new Rocket(humanPlayer, 160 + x + 80, 200 + y, humanPlayer.color)
      );
    }

    initAiPlayer() {
      const { aiPlayers } = this.game;
      const positions = this.level.getAiPlayersPositions();
      aiPlayers.forEach((player, index) => {
        player.addUnit(
          new ContractionYard(
            aiPlayers,
            positions[index].x,
            positions[index].y,
            player.color
          )
        );

        // player.addUnit(
        //   new Barracks(
        //     aiPlayers,
        //     positions[index].x + 120,
        //     positions[index].y + 10,
        //     player.color
        //   )
        // );
        //
        // player.addUnit(
        //   new Rocket(
        //     aiPlayers,
        //     positions[index].x - 100,
        //     positions[index].y,
        //     player.color
        //   )
        // );
        // player.addUnit(
        //   new Rocket(
        //     aiPlayers,
        //     300,
        //     300,
        //     player.color
        //   )
        // );

        // player.addUnit(
        //   new Rocket(
        //     aiPlayers,
        //     300,
        //     300,
        //     player.color
        //   )
        // );

        // player.addUnit(
        //     new Rocket(
        //         aiPlayers,
        //         300,
        //         300,
        //         player.color
        //     )
        // );
      });
    }
  }

  return GameMap;
})();
