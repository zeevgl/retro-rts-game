window["GameMap"] = (() => {
  class GameMap {
    constructor(game) {
      this.game = game;
      this.mapWidth = 2000;
      this.mapHeight = 2000;

      this.initPlayers();
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

    initPlayers() {
      this.initHumanPlayer();
      this.initAiPlayer();
    }

    initHumanPlayer() {
      const { humanPlayer } = this.game;
      humanPlayer.addUnit(
        new Infantry(
          30 + humanPlayer.startingPoint.x,
          40 + humanPlayer.startingPoint.y,
          humanPlayer.color
        )
      );
      humanPlayer.addUnit(
        new Rocket(
          100 + humanPlayer.startingPoint.x,
          100 + humanPlayer.startingPoint.y,
          humanPlayer.color
        )
      );
    }

    initAiPlayer() {
      const { aiPlayers } = this.game;
      aiPlayers.forEach((player) => {
        player.addUnit(
          new Rocket(
            30 + player.startingPoint.x,
            40 + player.startingPoint.y,
            player.color
          )
        );
        player.addUnit(
          new Rocket(
            100 + player.startingPoint.x,
            100 + player.startingPoint.y,
            player.color
          )
        );
      });
    }
  }

  return GameMap;
})();
