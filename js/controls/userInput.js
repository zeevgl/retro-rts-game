const UserInputStates = {
  IDLE: "IDLE",
  PLACE_BUILDING: "PLACE_BUILDING",
};

window["UserInput"] = (() => {
  class UserInput {
    constructor(game) {
      this.game = game;
      this.mouseHandler = new MouseHandler(game);
      this.targetXY = null;
      this.state = UserInputStates.IDLE;
      this.initMouseHandlers();
    }

    initMouseHandlers() {
      this.mouseHandler.handlers.onMouseLeftClicked =
        this.onMouseLeftClicked.bind(this);
      this.mouseHandler.handlers.onMouseRightClicked =
        this.onMouseRightClicked.bind(this);
      this.mouseHandler.handlers.onMouseMove = this.onMouseMove.bind(this);
    }

    draw(ctx) {
      if (this.targetXY !== null) {
        ctx.beginPath();
        ctx.arc(this.targetXY.x, this.targetXY.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#000000";
        ctx.stroke();
      }

      if (this.state === UserInputStates.PLACE_BUILDING) {
        const newUnit = this.game.hud.actionMenu.buildingBuild.item.unit;
        newUnit.color = "gray";
        newUnit.x = this.mouseHandler.position.x;
        newUnit.y = this.mouseHandler.position.y;
        newUnit.draw(ctx);
      }
    }

    onMouseLeftClicked(x, y) {
      const actionMenuItem = this.game.hud.actionMenu.getItemAtXy(x, y);

      if (actionMenuItem) {
        this.handleActionMenuItem(actionMenuItem);
      } else if (this.state === UserInputStates.PLACE_BUILDING) {
        this.placeBuilding(x, y);
      } else {
        const units = this.game.humanPlayer.attemptToClickUnitAtPoint(x, y);
        if (units.length) {
          console.log("unit clicked");
        }
      }
    }

    onMouseRightClicked(x, y) {
      if (this.game.humanPlayer.selectedUnits.length) {
        this.whatWasClicked(x, y);
      }
    }

    whatWasClicked(x, y) {
      //is it an enemy unit?
      const unitClicked = this.getEnemyUnitInPoint(x, y);
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
      //is it a resource?
      //is it a terrain?
    }

    getEnemyUnitInPoint(x, y) {
      const aiPlayers = this.game.aiPlayers;
      for (let i = 0; i < aiPlayers.length; i++) {
        const unit = aiPlayers[i].getUnitsInPoint(x, y);
        if (unit.length) {
          return unit[0];
        }
      }

      return null;
    }

    onMouseMove(x, y) {
      if (this.game.camera.scrollCamera(x, y)) {
        this.mouseHandler.setMouseScroll();
      } else if (this.game.humanPlayer.getUnitsInPoint(x, y).length) {
        this.mouseHandler.setMouseSelect();
      } else if (this.getEnemyUnitInPoint(x, y)) {
        this.mouseHandler.setMouseAttack();
      } else {
        this.mouseHandler.setMouseDefault();
      }
    }

    handleActionMenuItem(actionMenuItem) {
      if (actionMenuItem.unit.isBuilding()) {
        if (this.game.hud.actionMenu.isBuildingReadyToPlace()) {
          this.state = UserInputStates.PLACE_BUILDING;
        } else if (!this.game.hud.actionMenu.isBuildingInProgress()) {
          this.game.hud.actionMenu.buildAUnit(actionMenuItem);
        } else {
          console.log("unable to comply building in progress");
        }
      } else {
        //TODO: train a unit
      }
    }

    placeBuilding(x, y) {
      const newUnit = new this.game.hud.actionMenu.buildingBuild.item.class(
        x,
        y,
        this.game.humanPlayer.color
      );
      this.game.humanPlayer.addUnit(newUnit);
      this.state = UserInputStates.IDLE;
      this.game.hud.actionMenu.buildingWasPlaced();
    }
  }
  return UserInput;
})();
