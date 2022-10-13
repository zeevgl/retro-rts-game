class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.canvas = canvas;

    this.userInput = new UserInput(this);
    this.hud = new Hud(this);
    this.humanPlayer = new Player("player 1", "#00ff00", { x: 0, y: 0 });
    this.aiPlayers = [new AiPlayer("player 2", "#ff0000", { x: 500, y: 400 })];
    this.enemyAI = new EnemyAI(this);
    this.map = new Map();

    this.camera = {
      x: 0,
      y: 0,
    };
  }

  update(deltaTime, timestamp) {
    [this.humanPlayer, ...this.aiPlayers].forEach((player) => {
      player.update(deltaTime, timestamp);
    });

    //this.enemyAI.performAI();
    this.hud.update(deltaTime, timestamp);
  }

  draw(context) {
    context.save();
    this.drawCamera(context);

    this.drawBackground(context);

    this.userInput.draw(context);

    [this.humanPlayer, ...this.aiPlayers].forEach((player) => {
      player.draw(context);
    });

    this.hud.draw(context);

    this.map.draw(context);

    context.restore();
  }

  drawBackground(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);

    DEBUG_MODE && this.drawRect(context);
  }

  drawCamera(context) {
    context.translate(-this.camera.x, -this.camera.y);
  }

  drawRect(context) {
    for (let i = 0; i < this.map.mapWidth; i++) {
      context.fillStyle = i % 2 === 0 ? "#ff0000" : "#00ff00";
      context.fillRect(50 * i + i * 50, 0, 10, 800);
    }

    for (let i = 0; i < this.map.mapHeight; i++) {
      context.fillStyle = i % 2 === 0 ? "yellow" : "black";
      context.fillRect(0, 50 * i + i * 50, 800, 10);
    }
  }
}
