class Player {
  constructor(name, color, startingPoint) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.startingPoint = startingPoint;
  }

  update(deltaTime, timestamp) {

  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.startingPoint.x, this.startingPoint.y, 150, 150);
  }
}