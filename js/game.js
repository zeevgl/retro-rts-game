class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.mouseHandler = new MouseHandler(this, canvas);

    this.humanPlayer = new Player("player 1", "#00ff00", { x: 0, y: 0 });
    this.AiPlayers = [new Player("player 2", "#ff0000", { x: 500, y: 400 })];
  }

  update(deltaTime, timestamp) {
    [this.humanPlayer, ...this.AiPlayers].forEach((player) => {
      player.update(deltaTime, timestamp);
    });
  }

  draw(context) {
    context.save();

    this.drawBackground(context);
    // this.drawRect(context);

    [this.humanPlayer, ...this.AiPlayers].forEach((player) => {
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
    if (this.humanPlayer.isUnitClicked(x, y)) {
      console.log("unit clicked");
    }
  }

  onMouseRightClicked(x, y) {
    if (this.humanPlayer.selectedUnits.length) {
      this.whatWasClicked(x, y);
    }
  }

  whatWasClicked(x, y) {
    //is it an enemy unit?
    if (this.isEnemyUnitClicked(x, y)) {
      console.log("attack = ");
    } else {
      //is it a terrain?
      //move to position
      this.humanPlayer.moveSelectedUnitsToPosition(x, y);
    }
    //is it a friendly unit?
    //is it a building?
    //is it a resource?
    //is it a terrain?
  }

  isEnemyUnitClicked(x, y) {
    this.AiPlayers.forEach((player) => {
      const unit = player.isUnitClicked(x, y, true);
      if (unit.length) {
        console.log("enemy unit clicked", unit);
        //this.humanPlayer.selectedUnit.attack(player);
      }
    });
  }
}
