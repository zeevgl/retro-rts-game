window["Unit"] = (() => {
  const selectionMargin = 5;

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
      this.targetX = null;
      this.targetY = null;
    }

    update(deltaTime, timestamp) {}

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      if (this.isSelected) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(
          this.x - selectionMargin,
          this.y - selectionMargin,
          this.width + selectionMargin * 2,
          this.height + selectionMargin * 2
        );
      }
    }

    isClicked(x, y) {
      if (
        this.x <= x &&
        this.x + this.width >= x &&
        this.y <= y &&
        this.y + this.height >= y
      ) {
        return true;
      }
      return false;
    }

    moveTo(x, y) {
      this.isMoving = true;
      this.isIdle = false;
      this.isAttacking = false;
      this.isDefending = false;
      this.targetX = x;
      this.targetY = y;
    }
  }

  return Unit;
})();
