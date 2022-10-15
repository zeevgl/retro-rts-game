class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.canvas = canvas;

    this.camera = new Camera(this);
    this.userInput = new UserInput(this);
    this.hud = new Hud(this);
    this.humanPlayer = new Player("player 1", "#00ff00", { x: 50, y: 80 });
    this.aiPlayers = [new AiPlayer("player 2", "#ff0000", { x: 500, y: 400 })];
    this.enemyAI = new EnemyAI(this);
    this.gameMap = new GameMap(this);
  }

  update(deltaTime, timestamp) {
    [this.humanPlayer, ...this.aiPlayers].forEach((player) => {
      player.update(deltaTime, timestamp);
    });

    //this.enemyAI.performAI();
    this.hud.update(deltaTime, timestamp);
    this.camera.update(deltaTime, timestamp);
  }

  draw(context) {
    context.save();
    this.camera.draw(context);

    this.drawBackground(context);

    this.userInput.draw(context);

    [this.humanPlayer, ...this.aiPlayers].forEach((player) => {
      player.draw(context);
    });

    this.hud.draw(context);

    this.gameMap.draw(context);

    context.restore();
  }

  drawBackground(context) {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);

    DEBUG_MODE && this.drawRect(context);
  }

  drawRect(context) {
    for (let i = 0; i < this.gameMap.mapWidth; i++) {
      context.fillStyle = i % 2 === 0 ? "#ff0000" : "#00ff00";
      context.fillRect(50 * i + i * 50, 0, 10, 800);
    }

    for (let i = 0; i < this.gameMap.mapHeight; i++) {
      context.fillStyle = i % 2 === 0 ? "yellow" : "black";
      context.fillRect(0, 50 * i + i * 50, 800, 10);
    }
  }
}
