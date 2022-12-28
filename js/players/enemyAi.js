window["EnemyAI"] = (() => {
  const AISpeed = 800;
  class EnemyAI {
    constructor(game) {
      this.game = game;
      this.tick = 0;
    }

    update(deltaTime, timestamp) {
      this.tick += deltaTime;
      if (this.tick > AISpeed) {
        this.tick = 0;
        this.performAI();
      }
    }

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
        this.sendHarvester(aiPlayer);
        this.searchAndDestroy(aiPlayer);
      });
    }

    searchAndDestroy(aiPlayer) {
      aiPlayer.unitByGroups[UnitGroups.fighter]?.forEach((aiUnit) => {
        if (
          aiUnit.isAlive &&
          (aiUnit.state === UnitStates.IDLE ||
            aiUnit.state === UnitStates.MOVING)
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

    sendHarvester(aiPlayer) {
      aiPlayer.unitByGroups[UnitGroups.harvesters]?.forEach((aiUnit) => {
        if (aiUnit.isAlive && aiUnit.state === UnitStates.IDLE) {
          const closestSpiceField =
            this.game.gameMap.level.getClosestSpiceFieldByPosition(
              aiUnit.x,
              aiUnit.y
            );

          const destinationObject = {
            type: MapObjects.SPICE,
            object: closestSpiceField,
          };

          aiPlayer.selectedUnits = [aiUnit];
          aiPlayer.moveSelectedUnitsToPosition(
            destinationObject.object.x,
            destinationObject.object.y,
            destinationObject
          );
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

        const randomX = Math.random() * 500 - 50;
        const randomY = Math.random() * 100;

        aiPlayer.productionManager.placeBuilding(
          contractionYard.x + contractionYard.width / 2 + randomX,
          contractionYard.y + contractionYard.height + 10 + randomY
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
        const items = aiPlayer.techTree
          .getVisibleFightingUnits()
          .filter((item) => {
            return item.isUnlocked();
          });

        const randomIndex = Math.floor(Math.random() * items.length);

        if (items.length) {
          aiPlayer.productionManager.startUnit(items[randomIndex]);
        }
      }
    }
  }

  return EnemyAI;
})();
