class Player {
  constructor(name, color, startingPoint) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.startingPoint = startingPoint;
    this.selectedUnit = [];

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

  isUnitClicked(x, y, isAction = false) {
    if (isAction) {
      this.selectedUnit = this.units.filter((unit) => {
        return unit.isClicked(x, y, isAction);
      });

      return this.selectedUnit.length > 0;
    } else {
      this.units.forEach((unit) => {
        unit.isSelected = false;
      });

      this.selectedUnit = this.units.filter((unit) => {
        return unit.isClicked(x, y, isAction);
      });

      return this.selectedUnit.length > 0;
    }
  }

  issueCommand(x, y) {
    if (this.selectedUnit.length) {
      // this.selectedUnit.forEach((unit) => {
      //   unit.issueCommand(x, y);
      // });
    }
  }
}
