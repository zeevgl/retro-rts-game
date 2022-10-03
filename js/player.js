class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.units = [];
  }

  update(deltaTime, timestamp) {

  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(50, 50, 150, 150);
  }
}