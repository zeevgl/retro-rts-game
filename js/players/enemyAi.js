window["EnemyAI"] = (() => {
  class EnemyAI {
    constructor(game) {
      this.game = game;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {}

    performAI() {
      //POC - simple AI: each AI unit attack closest human unit
      this.game.aiPlayers.forEach((aiPlayer) => {
        switch (aiPlayer.state) {
          case AiStates.IDLE: {
            this.whatToBuild(aiPlayer);
            this.buildUnits(aiPlayer);
            break;
          }
          case AiStates.ATTACK: {
            break;
          }
          case AiStates.SEARCHING: {
            break;
          }
        }
        this.searchAndDestroy(aiPlayer);
      });
    }

    searchAndDestroy(aiPlayer) {
      aiPlayer.units.forEach((aiUnit) => {
        if (
          (!aiUnit.isABuilding() &&
            aiUnit.isAlive &&
            aiUnit.state === UnitStates.IDLE) ||
          aiUnit.state === UnitStates.MOVING
        ) {
          const closestEnemyUnit = getClosestUnitOfPlayer(
            aiUnit,
            this.game.humanPlayer,
            { ignoreVisionRange: false }
          );

          if (closestEnemyUnit) {
            aiPlayer.selectedUnits = [aiUnit];
            aiPlayer.attack(closestEnemyUnit.unit);
          } else if (aiUnit.state === UnitStates.IDLE) {
            const randomPosition = {
              x: Math.floor(Math.random() * this.game.gameWidth),
              y: Math.floor(Math.random() * this.game.gameHeight),
            };
            aiPlayer.selectedUnits = [aiUnit];
            aiPlayer.moveSelectedUnitsToPosition(
              randomPosition.x,
              randomPosition.y
            );
          }
        }
      });
    }

    whatToBuild(aiPlayer) {
      if (aiPlayer.productionManager.isAnyBuildingReadyToBePlace()) {
        const contractionYard = aiPlayer.units.find((unit) => {
          if (unit.isABuilding() && unit instanceof ContractionYard) {
            return unit;
          }
        });

        aiPlayer.productionManager.placeBuilding(
          contractionYard.x + contractionYard.width / 2,
          contractionYard.y + contractionYard.height + 10
        );
      } else {
        const items = aiPlayer.techTree.getVisibleBuildings();
        const buildingToBuild = items.filter((item) => !item.exists);
        if (buildingToBuild.length) {
          aiPlayer.productionManager.startBuilding(buildingToBuild[0]);
        }
      }
    }

    buildUnits(aiPlayer) {
      if (aiPlayer.units.length < 10) {
        const items = aiPlayer.techTree.getVisibleUnits().filter((item) => {
          return item.isUnlocked();
        });
        if (items.length) {
          aiPlayer.productionManager.startUnit(items[0]);
        }
      }
    }
  }

  return EnemyAI;
})();
