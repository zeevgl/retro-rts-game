class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  update(deltaTime, timestamp) {}

  draw(context) {
    context.save();

    this.drawBackground(context);
    this.drawRect(context);
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
