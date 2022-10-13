window["UserInput"] = (() => {
  class UserInput {
    constructor(game) {
      this.game = game;
      this.mouseHandler = new MouseHandler(game);
      this.targetXY = null;
      this.initMouseHandlers();
    }

    initMouseHandlers() {
      this.mouseHandler.handlers.onMouseLeftClicked =
        this.onMouseLeftClicked.bind(this);
      this.mouseHandler.handlers.onMouseRightClicked =
        this.onMouseRightClicked.bind(this);
      this.mouseHandler.handlers.onMouseMove = this.onMouseMove.bind(this);
    }

    draw(context) {
      if (this.targetXY !== null) {
        ctx.beginPath();
        ctx.arc(this.targetXY.x, this.targetXY.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#000000";
        ctx.stroke();
      }
    }

    onMouseLeftClicked(x, y) {
      if (this.game.humanPlayer.isUnitClicked(x, y)) {
        console.log("unit clicked");
      }
    }

    onMouseRightClicked(x, y) {
      console.log("sdsdsd");
      if (this.game.humanPlayer.selectedUnits.length) {
        this.whatWasClicked(x, y);
      }
    }

    whatWasClicked(x, y) {
      //is it an enemy unit?
      const unitClicked = this.getClickedEnemyUnit(x, y);
      if (unitClicked) {
        this.game.humanPlayer.attack(unitClicked);
      } else {
        //is it a terrain?
        //move to position
        this.game.humanPlayer.moveSelectedUnitsToPosition(x, y);
        this.targetXY = {
          x,
          y,
        };
        window.setTimeout(() => {
          this.targetXY = null;
        }, 150);
      }
      //is it a friendly unit?
      //is it a building?
      //is it a resource?
      //is it a terrain?
    }

    getClickedEnemyUnit(x, y) {
      const aiPlayers = this.game.aiPlayers;
      for (let i = 0; i < aiPlayers.length; i++) {
        const clickedUnit = aiPlayers[i].isUnitClicked(x, y, true);
        if (clickedUnit.length) {
          return clickedUnit[0];
        }
      }

      return null;
    }

    onMouseMove(x, y) {
      if (this.game.camera.scrollCamera(x, y)) {
        this.mouseHandler.setMouseScroll();
      } else if (this.game.humanPlayer.isUnitClicked(x, y, true).length) {
        this.mouseHandler.setMouseSelect();
      } else if (this.getClickedEnemyUnit(x, y)) {
        this.mouseHandler.setMouseAttack();
      } else {
        this.mouseHandler.setMouseDefault();
      }
    }
  }
  return UserInput;
})();
