class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.mouseAction = null;
    this.mouseHandler = new MouseHandler(this, canvas);
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


    this.drawMouseAction(context);

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

  drawCamera(context) {
    context.translate(-this.camera.x, -this.camera.y);
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? "#ff0000" : "#00ff00";
      context.fillRect(50 * i + i * 50, 0, 10, 800);
    }

    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? "yellow" : "black";
      context.fillRect(0, 50 * i + i * 50, 800, 10);
    }
  }

  drawMouseAction(ctx) {
    if (this.mouseAction !== null) {
      ctx.beginPath();
      ctx.arc(this.mouseAction.x, this.mouseAction.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.stroke();
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
    const unitClicked = this.getClickedEnemyUnit(x, y);
    if (unitClicked) {
      this.humanPlayer.attack(unitClicked);
    } else {
      //is it a terrain?
      //move to position
      this.humanPlayer.moveSelectedUnitsToPosition(x, y);
      this.mouseAction = {
        x,
        y,
      };
      window.setTimeout(() => {
        this.mouseAction = null;
      }, 150);
    }
    //is it a friendly unit?
    //is it a building?
    //is it a resource?
    //is it a terrain?
  }

  getClickedEnemyUnit(x, y) {
    for (let i = 0; i < this.aiPlayers.length; i++) {
      const clickedUnit = this.aiPlayers[i].isUnitClicked(x, y, true);
      if (clickedUnit.length) {
        return clickedUnit[0];
      }
    }

    return null;
  }
}
