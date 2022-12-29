window["Unit"] = (() => {
  const selectionMargin = 5;

  class Unit {
    constructor({
      player,
      name,
      x,
      y,
      width,
      height,
      color,
      maxHealth,
      attackDamage = 0,
      visionRange = 0,
      attackRange = 0,
      attackCooldown = 0,
      projectileClass = Bullet,
      unitClass,
      speed = 0,
      buildTime = 2000,
      buildAt = null,
      group = null,
      cost = 100,
    }) {
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
      this.projectileClass = projectileClass;
      this.unitClass = unitClass;
      this.speed = speed;
      this.buildTime = buildTime;
      this.buildAt = buildAt;
      this.group = group;
      this.cost = cost;

      //
      this.attackCooldownInProgress = 0;
      this.health = maxHealth;
      this.isAlive = true;
      this.isDecaying = false;
      this.setState(this.player ? UnitStates.SPAWN : UnitStates.IDLE);
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
      this.activeAnimation?.update(deltaTime, timestamp);
    }

    updateMove(deltaTime, timestamp) {
      const distance = calcDistance(
        this.centerX,
        this.centerY,
        this.moveTargetX,
        this.moveTargetY
      );

      if (
        this.state === UnitStates.MOVING_TO_ATTACK &&
        distance <= this.attackRange
      ) {
        this.attack(this.targetUnit);
      } else if (Math.floor(distance) <= 3 || distance < this.speed) {
        this.setState(UnitStates.IDLE);
        return;
      }

      //TODO: if unit is moving to location, why reclac each time? only recalc when attacking...
      const moves = calcMoves(
        this.speed,
        distance,
        this.centerX,
        this.centerY,
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
        if (activeProjectile.isActive) {
          activeProjectile.update(deltaTime, timestamp);
        }

        if (
          this.state === UnitStates.ATTACK &&
          !activeProjectile.targetUnit.isAlive
        ) {
          // target is dead
          this.setState(UnitStates.IDLE);
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

      //TODO: WIP teams colors
      if (this.color === "#ff0000") {
        // ctx.filter = "contrast(1.4) sepia(1)";
        ctx.filter = " hue-rotate(90deg)";
      } else {
        ctx.filter = null;
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
        ctx.lineTo(this.centerX, this.centerY);
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
        this.centerX,
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
        ctx.moveTo(this.targetUnit.centerX, this.targetUnit.centerY);
        ctx.lineTo(this.centerX, this.centerY);
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
      }
    }

    drawAttackRange(ctx) {
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.attackRange, 0, 2 * Math.PI);
      ctx.strokeStyle = "gray";
      ctx.stroke();
    }

    drawVisionRange(ctx) {
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.arc(this.centerX, this.centerY, this.visionRange, 0, 2 * Math.PI);
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
      ctx.fillText(this.name, this.centerX, this.centerY);
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

    isInsideRect(x1, y1, x2, y2, { fullRect = false } = {}) {
      if (fullRect) {
        return (
          this.x >= x1 &&
          this.x + this.width <= x2 &&
          this.y >= y1 &&
          this.y + this.height <= y2
        );
      } else {
        return (
          this.centerX >= x1 &&
          this.centerX <= x2 &&
          this.centerY >= y1 &&
          this.centerY <= y2
        );
      }
    }

    moveTo(x, y) {
      this.setState(UnitStates.MOVING);
      this.moveTargetX = x;
      this.moveTargetY = y;
      this.setDirectionDegree(this.moveTargetX, this.moveTargetY);
    }

    moveToAttack(x, y) {
      this.moveTo(x, y);
      this.setState(UnitStates.MOVING_TO_ATTACK);
    }

    attack(enemyUnit) {
      if (!this.isAlive) {
        return;
      }

      this.targetUnit = enemyUnit;

      this.setDirectionDegree(this.targetUnit.centerX, this.targetUnit.centerY);

      const distance = calcDistance(this.x, this.y, enemyUnit.x, enemyUnit.y);
      if (distance <= this.attackRange) {
        this.setState(UnitStates.ATTACK);
        if (this.projectiles.length > 1) {
          this.projectiles = this.projectiles.slice(0, 1);
        }
        this.projectiles.push(
          new this.projectileClass(
            this.centerX,
            this.centerY,
            enemyUnit,
            this.attackDamage
          )
        );
        this.attackCooldownInProgress = this.attackCooldown;
      } else {
        this.moveToAttack(enemyUnit.x, enemyUnit.y);
      }
    }

    setDirectionDegree(x, y) {
      this.degree = getDegree360(this.centerX, this.centerY, x, y);
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

    setState(state) {
      this.state = state;
      if (this.animations?.[state]) {
        this.activeAnimation = this.animations[this.state];
        this.activeAnimation.start();
      }
    }

    initAnimations(animationFrames, sprite) {
      this.activeAnimation = null;

      this.animations = Object.entries(animationFrames).reduce((acc, pair) => {
        const [key, value] = pair;
        let onComplete;
        if (value.next) {
          onComplete = () => {
            this.setState(value.next);
          };
        }
        acc[key] = FrameAnimator.fromAnimationFrame(sprite, value, {
          onComplete,
        });
        return acc;
      }, {});

      this.activeAnimation = this.animations[this.state];
      this.activeAnimation.start();
    }
  }

  return Unit;
})();
