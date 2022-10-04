class Unit {
  constructor(name, x, y, width, height, color, maxHealth, attackDamage) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.maxHealth = maxHealth;
    this.attackDamage = attackDamage;

    //
    this.health = maxHealth;
    this.isAlive = true;
    this.isAttacking = false;
    this.isMoving = false;
    this.isDefending = false;
    this.isIdle = true;
    this.isSelected = false;
  }

  update(deltaTime, timestamp) {}

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
