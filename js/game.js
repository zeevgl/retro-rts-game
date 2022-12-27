class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.canvas = canvas;

    this.camera = new Camera(this);
    this.userInput = new UserInput(this);
    this.hud = new Hud(this);
    this.humanPlayer = new Player({
      name: "player 1",
      color: "#00ff00",
      startingPoint: { x: 50, y: 80 },
      game: this,
    });
    this.aiPlayers = [
      new AiPlayer({
        name: "player 2",
        color: "#ff0000",
        startingPoint: { x: 500, y: 400 },
        game: this,
      }),
    ];
    this.enemyAI = new EnemyAI(this);
    this.gameMap = new GameMap(this);

    this.humanPlayer.resources.addResources(1000);
  }

  update(deltaTime, timestamp) {
    [this.humanPlayer, ...this.aiPlayers].forEach((player) => {
      player.update(deltaTime, timestamp);
    });

    this.enemyAI.update(deltaTime, timestamp);
    this.hud.update(deltaTime, timestamp);
    this.camera.update(deltaTime, timestamp);
  }

  draw(context) {
    context.save();

    this.camera.draw(context);

    this.drawBackground(context);
    this.gameMap.draw(context);

    this.userInput.draw(context);

    [this.humanPlayer, ...this.aiPlayers].forEach((player) => {
      player.draw(context);
    });

    this.hud.draw(context);

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
