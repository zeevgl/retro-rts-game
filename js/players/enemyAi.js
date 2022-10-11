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
        aiPlayer.units.forEach((aiUnit) => {
          if (
            (aiUnit.isAlive && aiUnit.state === UnitStates.IDLE) ||
            aiUnit.state === UnitStates.MOVING
          ) {
            const closestEnemyUnit = this.getClosestEnemyUnit(aiUnit);

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
      });
    }

    getClosestEnemyUnit(aiUnit) {
      return this.game.humanPlayer.units.reduce(
        (closestHumanUnit, humanUnit) => {
          if (humanUnit.isAlive) {
            const distance = calcDistance(
              aiUnit.x,
              aiUnit.y,
              humanUnit.x,
              humanUnit.y
            );

            if (
              distance <= aiUnit.visionRange &&
              (closestHumanUnit === null ||
                distance < closestHumanUnit.distance)
            ) {
              closestHumanUnit = {
                unit: humanUnit,
                distance,
              };
            }
          }

          return closestHumanUnit;
        },
        null
      );
    }
  }

  return EnemyAI;
})();
