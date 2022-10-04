class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.mouseHandler = new MouseHandler(this, canvas);
    this.players = [
      new Player("player 1", "#00ff00", { x: 10, y: 20 }),
      //new Player("player 2", "#ff0000", { x: 500, y: 400 }),
    ];
  }

  update(deltaTime, timestamp) {
    this.players.forEach((player) => {
      player.update(deltaTime, timestamp);
    });
  }

  draw(context) {
    context.save();

    this.drawBackground(context);
    // this.drawRect(context);

    this.players.forEach((player) => {
      player.draw(context);
    });

    context.restore();
  }

  drawBackground(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? "#ff0000" : "#00ff00";
      context.fillRect(50 * i + i * 50, 0, 10, 800);
    }
  }

  onMouseLeftClicked(x, y) {
    this.players.forEach((player) => {
      if (player.isUnitClicked(x, y)) {
        console.log("unit clicked");
      }
    });
  }

  onMouseRightClicked(x, y) {
    console.log("right clicked", x, y);
  }
}
