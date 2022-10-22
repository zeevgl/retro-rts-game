class Player {
  constructor(name, color, startingPoint) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.startingPoint = startingPoint;
    this.selectedUnits = [];
    this.techTree = new TechTree(this);
    this.productionManager = new ProductionManager(this);
    this.resources = new Resources(this);
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

    this.productionManager.update(deltaTime, timestamp);
    this.resources.update(deltaTime, timestamp);
  }

  draw(ctx) {
    this.units.forEach((unit) => {
      unit.draw(ctx);
    });
  }

  addUnit(unit) {
    this.units.push(unit);
    this.techTree.updateTechTree(unit);
  }

  attemptToClickUnitAtPoint(x, y) {
    this.deselectAllUnits();

    // const selectedUnits = this.getUnitsInPoint(x, y);
    const unit = this.getUnitInPoint(x, y); //allow only 1 unit selected for now
    const selectedUnits = unit ? [unit] : [];

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

  getUnitInPoint(x, y) {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].isAlive && this.units[i].inPointInUnit(x, y)) {
        return this.units[i];
      }
    }

    return null;
  }

  deselectAllUnits() {
    this.selectedUnits.forEach((unit) => {
      unit.isSelected = false;
    });

    this.selectedUnits = [];
  }

  moveSelectedUnitsToPosition(x, y, destinationObject = null) {
    if (this.selectedUnits.length) {
      this.selectedUnits.forEach((unit) => {
        unit.moveTo(x, y);

        if (unit instanceof Harvester) {
          if (destinationObject?.type === MapObjects.SPICE) {
            unit.setSpiceField(x, y, destinationObject.object);
          } else {
            unit.stopHarvest();
          }
        }
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
