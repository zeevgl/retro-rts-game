class Player {
  constructor(name, color, startingPoint) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.startingPoint = startingPoint;

    this.addUnit(new Infantry(0, 10, "#0000ff"));
    this.addUnit(new Infantry(100, 100, "#0000ff"));
    this.addUnit(new Infantry(200, 120, "#0000ff"));
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

  isUnitClicked(x, y) {
    this.units.forEach((unit) => {
      unit.isSelected = false;
    });

    const selectedUnits = this.units.some((unit) => {
      return unit.isClicked(x, y) ? unit : null;
    });
  }
}
