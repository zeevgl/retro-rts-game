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
        new ContractionYard({
          player: humanPlayer,
          x,
          y,
          color: humanPlayer.color,
        })
      );

      humanPlayer.addUnit(
        new Barracks({
          player: humanPlayer,
          x: x + 220,
          y: y + 10,
          color: humanPlayer.color,
        })
      );
      humanPlayer.addUnit(
        new Refinery({
          player: humanPlayer,
          x: x + 420,
          y: y + 30,
          color: humanPlayer.color,
        })
      );

      humanPlayer.addUnit(
        new Infantry({
          player: humanPlayer,
          x: 160 + x,
          y: 280 + y,
          color: humanPlayer.color,
        })
      );
      humanPlayer.addUnit(
        new Rocket({
          player: humanPlayer,
          x: 160 + x + 80,
          y: 200 + y,
          color: humanPlayer.color,
        })
      );
    }

    initAiPlayer() {
      const { aiPlayers } = this.game;
      const positions = this.level.getAiPlayersPositions();
      aiPlayers.forEach((player, index) => {
        player.addUnit(
          new ContractionYard({
            player: aiPlayers,
            x: positions[index].x,
            y: positions[index].y,
            color: player.color,
          })
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

        player.addUnit(
          new Rocket({ player: aiPlayers, x: 500, y: 500, color: player.color })
        );
      });
    }
  }

  return GameMap;
})();
