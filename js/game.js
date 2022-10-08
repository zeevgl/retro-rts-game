class Game {
  constructor(gameWidth, gameHeight, canvas) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.mouseAction = null;
    this.mouseHandler = new MouseHandler(this, canvas);

    this.humanPlayer = new Player("player 1", "#00ff00", { x: 0, y: 0 });
    this.AiPlayers = [new AiPlayer("player 2", "#ff0000", { x: 500, y: 400 })];
  }

  update(deltaTime, timestamp) {
    [this.humanPlayer, ...this.AiPlayers].forEach((player) => {
      player.update(deltaTime, timestamp);
    });

    this.performAI();
  }

  draw(context) {
    context.save();

    this.drawBackground(context);
    // this.drawRect(context);

    [this.humanPlayer, ...this.AiPlayers].forEach((player) => {
      player.draw(context);
    });

    this.drawMouseAction(context);

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
    for (let i = 0; i < this.AiPlayers.length; i++) {
      const clickedUnit = this.AiPlayers[i].isUnitClicked(x, y, true);
      if (clickedUnit.length) {
        return clickedUnit[0];
      }
    }

    return null;
  }

  performAI() {
    //POC - simple AI: each AI unit attack closest human unit
    this.AiPlayers.forEach((aiPlayer) => {
      aiPlayer.units.forEach((aiUnit) => {
        if (aiUnit.isAlive) {
          let closestHumanUnit = null;
          this.humanPlayer.units.forEach((humanUnit) => {
            if (humanUnit.isAlive) {
              const distance = calcDistance(
                aiUnit.x,
                aiUnit.y,
                humanUnit.x,
                humanUnit.y
              );
              if (
                closestHumanUnit === null ||
                distance < closestHumanUnit.distance
              ) {
                closestHumanUnit = {
                  unit: humanUnit,
                  distance,
                };
              }
            }
          });

          if (closestHumanUnit) {
            aiPlayer.selectedUnits = [aiUnit];
            aiPlayer.attack(closestHumanUnit.unit);
          }
        }
      });
    });
  }
}
