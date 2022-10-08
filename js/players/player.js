class Player {
  constructor(name, color, startingPoint) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.startingPoint = startingPoint;
    this.selectedUnits = [];

    this.addUnit(
      new Infantry(0 + this.startingPoint.x, 10 + this.startingPoint.y, color)
    );
    this.addUnit(
      new Infantry(
        100 + this.startingPoint.x,
        100 + this.startingPoint.y,
        color
      )
    );
    this.addUnit(
      new Infantry(
        200 + this.startingPoint.x,
        120 + this.startingPoint.y,
        color
      )
    );
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
  }

  isUnitClicked(x, y, isCommand = false) {
    //TODO: maybe need to split this into two classes
    if (!isCommand) {
      this.units.forEach((unit) => {
        unit.isSelected = false;
      });

      this.selectedUnits = [];
    }

    const selectedUnits = this.units.filter((unit) => {
      return unit.isAlive && unit.isClicked(x, y);
    });

    if (!isCommand) {
      selectedUnits.forEach((unit) => {
        unit.isSelected = true;
      });

      this.selectedUnits = selectedUnits;
    }

    return selectedUnits;
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
