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
      this.draggin = {
        active: false,
        moved: false,
        x: 0,
        y: 0,
        x2: 0,
        y2: 0,
      };
    }

    initMouseHandlers() {
      this.mouseHandler.handlers.onMouseLeftClicked =
        this.onMouseLeftClicked.bind(this);
      this.mouseHandler.handlers.onMouseRightClicked =
        this.onMouseRightClicked.bind(this);
      this.mouseHandler.handlers.onMouseMove = this.onMouseMove.bind(this);

      this.mouseHandler.handlers.onMouseDown = this.onMouseDown.bind(this);
      this.mouseHandler.handlers.onMouseUp = this.onMouseUp.bind(this);
    }

    draw(ctx) {
      if (this.targetXY !== null) {
        ctx.beginPath();
        ctx.arc(this.targetXY.x, this.targetXY.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#000000";
        ctx.stroke();
      }

      if (this.state === UserInputStates.PLACE_BUILDING) {
        const newUnit =
          this.game.humanPlayer.productionManager.buildingProduction.item.unit;
        newUnit.color = "gray";
        newUnit.x = this.mouseHandler.position.x;
        newUnit.y = this.mouseHandler.position.y;
        newUnit.draw(ctx);
      }

      this.drawSelectionBox(ctx);
    }

    drawSelectionBox(ctx) {
      if (this.draggin.active) {
        ctx.beginPath();
        ctx.rect(
          this.draggin.x,
          this.draggin.y,
          this.draggin.x2 - this.draggin.x,
          this.draggin.y2 - this.draggin.y
        );
        ctx.strokeStyle = "lightgreen";
        ctx.stroke();
      }
    }

    onMouseLeftClicked(x, y) {
      if (this.draggin.moved) {
        this.draggin.moved = false;
        return;
      }

      const actionMenuItem = this.game.hud.actionMenu.getItemAtXy(x, y);
      const positionFromMiniMap = this.game.hud.miniMap.getPositionFromMiniMap(
        x,
        y
      );
      if (actionMenuItem) {
        this.handleActionMenuItem(actionMenuItem);
      } else if (positionFromMiniMap) {
        this.game.camera.moveCameraTo(
          positionFromMiniMap.x,
          positionFromMiniMap.y
        );
      } else if (this.state === UserInputStates.PLACE_BUILDING) {
        this.game.humanPlayer.productionManager.placeBuilding(x, y);
        this.state = UserInputStates.IDLE;
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
        //TODO: maybe move "getWhatIsOnPosition" into player?
        const destinationObject = this.game.gameMap.level.getWhatIsOnPosition(
          x,
          y
        );
        this.game.humanPlayer.moveSelectedUnitsToPosition(
          x,
          y,
          destinationObject
        );

        //is it a terrain?
        //move to position
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
      if (this.draggin.active) {
        this.draggin.moved = true;
        this.draggin.x2 = x;
        this.draggin.y2 = y;
      }

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
      if (!actionMenuItem.isUnlocked()) {
        this.game.hud.notifications.notify("Unit unavailable");
        return;
      }

      if (actionMenuItem.unit.isABuilding()) {
        if (
          this.game.humanPlayer.productionManager.isBuildingReadyToBePlace(
            actionMenuItem
          )
        ) {
          this.state = UserInputStates.PLACE_BUILDING;
        } else {
          const message =
            this.game.humanPlayer.productionManager.startBuilding(
              actionMenuItem
            );
          if (message) {
            this.game.hud.notifications.notify(message);
          }
        }
      } else {
        const message =
          this.game.humanPlayer.productionManager.startUnit(actionMenuItem);
        if (message) {
          this.game.hud.notifications.notify(message);
        }
      }
    }

    onMouseDown(x, y) {
      this.draggin.active = true;
      this.draggin.moved = false;
      this.draggin.x = x;
      this.draggin.y = y;
      this.draggin.x2 = x;
      this.draggin.y2 = y;
    }

    onMouseUp(x, y) {
      this.draggin.active = false;
      if (this.draggin.moved) {

        const x1 = Math.min(this.draggin.x, this.draggin.x2);
        const x2 = Math.max(this.draggin.x, this.draggin.x2);
        const y1 = Math.min(this.draggin.y, this.draggin.y2);
        const y2 = Math.max(this.draggin.y, this.draggin.y2);

        this.game.humanPlayer.attemptToSelectUnitsAtRange(x1, y1, x2, y2);
      }
    }
  }
  return UserInput;
})();
