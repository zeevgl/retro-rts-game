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
      this.targetUnit = null;
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
      } else if (this.state === UnitStates.ATTACK) {
        if (this.targetUnit.isAlive) {
          this.targetUnit.health -= this.attackDamage;
          if (this.targetUnit.health <= 0) {
            this.targetUnit.isAlive = false;
          }
        } else {
          this.state = UnitStates.IDLE;
        }
      }
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      this.drawSelectionBox(ctx);
      this.drawPath(ctx);
      this.drawHealthBar(ctx);
      this.drawAttack(ctx);
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
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
      }
    }

    drawHealthBar(ctx) {
      ctx.fillStyle = "blue";
      ctx.fillRect(
        this.x,
        this.y - 10,
        (this.health / this.maxHealth) * this.width,
        10
      );

      ctx.fillStyle = "white";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.health + "/" + this.maxHealth, this.x + 5, this.y - 2);
    }

    drawAttack(ctx) {
      //ray attack
      if (this.state === UnitStates.ATTACK) {
        ctx.beginPath();
        ctx.moveTo(this.targetUnit.x, this.targetUnit.y);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = "#000000";
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

    attack(enemyUnit) {
      this.state = UnitStates.ATTACK;
      this.targetUnit = enemyUnit;
    }
  }

  return Unit;
})();
