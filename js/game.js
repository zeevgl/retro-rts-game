class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.players = [
      new Player("player 1", "#00ff00"),
      new Player("player 2", "#ff0000"),
    ];
  }

  update(deltaTime, timestamp) {
    this.players.forEach((player) => {
      player.update(deltaTime, timestamp);
    });
  }

  draw(context) {
    context.save();

    // this.drawBackground(context);
    // this.drawRect(context);

    this.players.forEach((player) => {
      player.draw(context);
    });

    context.restore();
  }

  drawBackground(context) {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? "#ff0000" : "#00ff00";
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }
}
