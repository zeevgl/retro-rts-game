class Player {
  constructor(name, color, startingPoint) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.startingPoint = startingPoint;
    this.selectedUnits = [];
    this.techTree = new TechTree(this);
  }

  update(deltaTime, timestamp) {
    this.units.forEach((unit) => {
      unit.update(deltaTime, timestamp);

      if (!unit.isAlive) {
        if (unit.isDecaying) {
          //TODO: add some decay animation & timer
          //this.units.splice(this.units.indexOf(unit), 1);
        } else {
          unit.isDecaying = true;
          this.selectedUnits.splice(this.selectedUnits.indexOf(unit), 1);
        }
      }
    });
  }

  draw(ctx) {
    this.units.forEach((unit) => {
      unit.draw(ctx);
    });
  }

  addUnit(unit) {
    this.units.push(unit);
    //TODO: update tech tree
  }

  attemptToClickUnitAtPoint(x, y) {
    this.deselectAllUnits();

    const selectedUnits = this.getUnitsInPoint(x, y);

    selectedUnits.forEach((unit) => {
      unit.isSelected = true;
    });

    this.selectedUnits = selectedUnits;

    return selectedUnits;
  }

  getUnitsInPoint(x, y) {
    return this.units.filter((unit) => {
      return unit.isAlive && unit.inPointInUnit(x, y);
    });
  }

  deselectAllUnits() {
    this.selectedUnits.forEach((unit) => {
      unit.isSelected = false;
    });

    this.selectedUnits = [];
  }

  moveSelectedUnitsToPosition(x, y) {
    if (this.selectedUnits.length) {
      this.selectedUnits.forEach((unit) => {
        unit.moveTo(x, y);
      });
    }
  }

  attack(enemyUnit) {
    if (enemyUnit) {
      this.selectedUnits.forEach((unit) => {
        unit.attack(enemyUnit);
      });
    }
  }
}
