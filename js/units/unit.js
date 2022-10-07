window["Unit"] = (() => {
  const selectionMargin = 5;

  class Unit {
    constructor(name, x, y, width, height, color, maxHealth, attackDamage) {
      this.id = uuidv4();
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
      this.projectiles = {};
    }

    update(deltaTime, timestamp) {
      if (this.state === UnitStates.MOVING) {
        this.updateMove(deltaTime, timestamp);
      }

      this.updateAttack(deltaTime, timestamp);
    }

    updateMove(deltaTime, timestamp) {
      if (this.state === UnitStates.MOVING) {
        const distance = calcDistance(
          this.x,
          this.y,
          this.targetX,
          this.targetY
        );

        if (distance < 3) {
          this.state = UnitStates.IDLE;
          return;
        }

        const moves = calcMoves(
          this.speed,
          distance,
          this.x,
          this.y,
          this.targetX,
          this.targetY
        );

        this.x += moves.xunits;
        this.y += moves.yunits;
      }
    }

    updateAttack(deltaTime, timestamp) {
      Object.values(this.projectiles).forEach((projectile) => {
        projectile.update(deltaTime, timestamp);
      });

      this.removeInactiveProjectiles();

      if (this.state === UnitStates.ATTACK && !this.targetUnit.isAlive) {
        this.state = UnitStates.IDLE;
      } else if (this.state === UnitStates.ATTACK && this.targetUnit.isAlive) {
        this.attack(this.targetUnit);
      }


    }

    removeInactiveProjectiles() {
      Object.values(this.projectiles).forEach((projectile) => {
        if (projectile.isActive === false) {
          delete this.projectiles[projectile.targetUnit.id];
        }
      });
    }

    draw(ctx) {
      ctx.save();

      if (!this.isAlive) {
        ctx.globalAlpha = 0.1;
      }

      this.drawUnit(ctx);
      this.drawSelectionBox(ctx);
      this.drawPath(ctx);
      this.drawHealthBar(ctx);
      this.drawAttack(ctx);

      ctx.restore();
    }

    drawUnit(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
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
      // //ray attack
      // if (this.state === UnitStates.ATTACK) {
      //   ctx.beginPath();
      //   ctx.moveTo(this.targetUnit.x, this.targetUnit.y);
      //   ctx.lineTo(this.x, this.y);
      //   ctx.strokeStyle = "#000000";
      //   ctx.stroke();
      // }

      Object.values(this.projectiles).forEach((projectile) => {
        projectile.draw(ctx);
      });
    }

    isClicked(x, y) {
      //TODO: use checkCollision() here
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
      if (!this.projectiles[enemyUnit.id]) {
        this.projectiles[enemyUnit.id] = new Bullet(
          this.x,
          this.y,
          enemyUnit,
          this.attackDamage
        );
      }
    }
  }

  return Unit;
})();
