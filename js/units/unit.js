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
      this.speed = 5; //TODO used fixed speed for now
      this.health = maxHealth;
      this.isAlive = true;
      this.state = UnitStates.IDLE;
      this.targetX = null;
      this.targetY = null;
      this.isSelected = false;
    }

    update(deltaTime, timestamp) {
      if (this.state === UnitStates.MOVING) {
        const speed = this.speed;
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 3) {
          this.state = UnitStates.IDLE;
          return;
        }

        const moves = distance / speed;
        const xunits = (this.targetX - this.x) / moves;
        const yunits = (this.targetY - this.y) / moves;
        this.x += xunits;
        this.y += yunits;

        //simple move:
        // this.x+= (this.targetX - this.x) * this.speed;
        // this.y+= (this.targetY - this.y) * this.speed;
      }
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      this.drawSelectionBox(ctx);
      this.drawPath(ctx);
    }

    drawSelectionBox(ctx) {
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

    drawPath(ctx) {
      if (this.state === UnitStates.MOVING) {
        ctx.beginPath();
        ctx.moveTo(this.targetX, this.targetY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
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
      this.state = UnitStates.MOVING;
      this.targetX = x;
      this.targetY = y;
    }
  }

  return Unit;
})();
