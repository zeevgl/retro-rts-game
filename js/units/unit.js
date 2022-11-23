window["Unit"] = (() => {
  const selectionMargin = 5;

  class Unit {
    constructor(
      player,
      name,
      x,
      y,
      width,
      height,
      color,
      maxHealth,
      attackDamage,
      visionRange,
      attackRange,
      attackCooldown,
      unitClass,
      speed,
      buildTime,
      buildAt
    ) {
      this.player = player;
      this.id = uuidv4();
      this.name = name;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.maxHealth = maxHealth;
      this.attackDamage = attackDamage;
      this.visionRange = visionRange;
      this.attackRange = attackRange;
      this.attackCooldown = attackCooldown;
      this.unitClass = unitClass;
      this.speed = speed;
      this.buildTime = buildTime || 2000;
      this.buildAt = buildAt || ContractionYard;

      //
      this.attackCooldownInProgress = 0;
      this.health = maxHealth;
      this.isAlive = true;
      this.isDecaying = false;
      this.state = UnitStates.IDLE;
      this.moveTargetX = null;
      this.moveTargetY = null;
      this.targetUnit = null;
      this.isSelected = false;
      this.projectiles = [];

      this.degree = 0;
    }

    update(deltaTime, timestamp) {
      if (!this.isAlive) {
        return;
      }

      if (
        this.state === UnitStates.MOVING ||
        this.state === UnitStates.MOVING_TO_ATTACK
      ) {
        this.updateMove(deltaTime, timestamp);
      }

      this.updateAttack(deltaTime, timestamp);
    }

    updateMove(deltaTime, timestamp) {
      const distance = calcDistance(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.moveTargetX,
        this.moveTargetY
      );

      if (
        this.state === UnitStates.MOVING_TO_ATTACK &&
        distance <= this.attackRange
      ) {
        this.attack(this.targetUnit);
      } else if (Math.floor(distance) <= 3 || distance < this.speed) {
        this.state = UnitStates.IDLE;
        return;
      }

      //TODO: if unit is moving to location, why reclac each time? only recalc when attacking...
      const moves = calcMoves(
        this.speed,
        distance,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.moveTargetX,
        this.moveTargetY
      );

      this.x += moves.xunits;
      this.y += moves.yunits;
    }

    updateAttack(deltaTime, timestamp) {
      this.updateAttackCoolDown(deltaTime, timestamp);
      if (this.projectiles.length) {
        const activeProjectile = this.projectiles[0];
        activeProjectile.update(deltaTime, timestamp);

        if (
          this.state === UnitStates.ATTACK &&
          !activeProjectile.targetUnit.isAlive
        ) {
          // target is dead
          this.state = UnitStates.IDLE;
          this.projectiles = [];
        } else if (
          this.state === UnitStates.ATTACK &&
          activeProjectile.targetUnit.isAlive &&
          !activeProjectile.isActive
        ) {
          // target is still alive, but current projectile is not active
          //auto attack again or next target
          if (this.attackCooldownInProgress > 0) {
            return;
          }

          this.projectiles.shift(); //remove dead projectile
          this.attack(this.targetUnit); //attack again
        }
      }
    }

    updateAttackCoolDown(deltaTime, timestamp) {
      if (this.attackCooldownInProgress > 0) {
        this.attackCooldownInProgress -= deltaTime;
      }
    }

    draw(ctx) {
      ctx.save();

      if (!this.isAlive) {
        ctx.globalAlpha = 0.1;
      }

      this.drawUnit(ctx);

      if (this.isAlive) {
        this.drawSelectionBox(ctx);
        this.drawPath(ctx);
        this.drawHealthBar(ctx);
        this.drawTargeting(ctx);
        this.drawAttack(ctx);

        if (DEBUG_MODE) {
          this.drawAttackRange(ctx);
          this.drawVisionRange(ctx);
          this.drawCoordinates(ctx);
          this.drawName(ctx);
        }
      }

      ctx.restore();
    }

    drawUnit(ctx) {
      //each unit should override this with their own draw method. this is just a placeholder
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
        ctx.moveTo(this.moveTargetX, this.moveTargetY);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        ctx.strokeStyle = "#00FF00";
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
      ctx.fillText(
        this.health + "/" + this.maxHealth,
        this.x + this.width / 2,
        this.y - 2
      );
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

      if (this.projectiles.length) {
        this.projectiles[0].draw(ctx);
      }
    }

    drawTargeting(ctx) {
      if (
        this.targetUnit &&
        (this.state === UnitStates.ATTACK ||
          this.state === UnitStates.MOVING_TO_ATTACK)
      ) {
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(this.targetUnit.x, this.targetUnit.y);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
      }
    }

    drawAttackRange(ctx) {
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.attackRange,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "gray";
      ctx.stroke();
    }

    drawVisionRange(ctx) {
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.visionRange,
        0,
        2 * Math.PI
      );
      ctx.strokeStyle = "purple";
      ctx.stroke();
    }

    drawCoordinates(ctx) {
      drawText(ctx, `x:${this.x}, y:${this.y}`, this.x + 25, this.y + 15);
    }

    drawName(ctx) {
      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        this.name,
        this.x + this.width / 2,
        this.y + this.height / 2
      );
    }

    inPointInUnit(x, y) {
      const margin = 20; //so it will be easier to click moving units
      return (
        x >= this.x - margin &&
        x <= this.x + this.width + margin &&
        y >= this.y - margin &&
        y <= this.y + this.height + margin
      );
    }

    moveTo(x, y) {
      this.state = UnitStates.MOVING;
      this.moveTargetX = x;
      this.moveTargetY = y;
      this.degree = getDegree(this.centerX, this.centerY, this.moveTargetX, this.moveTargetY);
    }

    moveToAttack(x, y) {
      this.state = UnitStates.MOVING_TO_ATTACK;
      this.moveTargetX = x;
      this.moveTargetY = y;
    }

    attack(enemyUnit) {
      if (!this.isAlive) {
        return;
      }

      this.targetUnit = enemyUnit;

      const distance = calcDistance(this.x, this.y, enemyUnit.x, enemyUnit.y);
      if (distance <= this.attackRange) {
        this.state = UnitStates.ATTACK;
        if (this.projectiles.length > 1) {
          this.projectiles = this.projectiles.slice(0, 1);
        }
        this.projectiles.push(
          new Bullet(this.x, this.y, enemyUnit, this.attackDamage)
        );
        this.attackCooldownInProgress = this.attackCooldown;
      } else {
        this.moveToAttack(enemyUnit.x, enemyUnit.y);
      }
    }

    isABuilding() {
      return this.unitClass === UnitClasses.BUILDING;
    }

    get centerX() {
      return this.x + this.width / 2;
    }

    get centerY() {
      return this.y + this.height / 2;
    }

    degreeToPosition(degree) {
      //TODO: need to make this code more dynamic. it should calc according to available positions in sprite..

      //360 / 32 = 11.25
      // 90 / 11.25 = 8
      // 180 / 11.25 = 16

      //90 => 0
      //180 => 8
      //270 => 16
      //360 => 24

      const slice = 360 / 32;

      const p = Math.floor(degree / slice);
      if (degree >= 0 && degree <= 90) {
        return p + 24;
      } else if (degree > 90 && degree <= 180) {
        return p - 8;
      } else if (degree > 180 && degree <= 270) {
        return p - 8;
      } else if (degree > 270 && degree <= 360) {
        return p - 8;
      } else {
        return 0;
      }
    }
  }

  return Unit;
})();
