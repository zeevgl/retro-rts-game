window["ActionMenu"] = (() => {
  class ActionMenu {
    constructor(game, wrapperDimensions, viewport) {
      this.game = game;

      this.viewport = viewport;

      this.width = wrapperDimensions.width;
      this.height = wrapperDimensions.height;
      this.x = wrapperDimensions.x;
      this.y = wrapperDimensions.y;

      this.itemWidth = this.width / 2;

      this.buildingBuild = {
        item: null,
        timePassedMil: 0,
      };
    }

    update(deltaTime, timestamp) {
      if (this.isBuildingInProgress()) {
        this.buildingBuild.timePassedMil += deltaTime;
        if (
          this.buildingBuild.timePassedMil >
          this.buildingBuild.item.unit.buildTime
        ) {
          this.buildingBuild.timePassedMil = 0;
          this.buildingBuild.item = null;
        }
      }
    }

    draw(ctx) {
      ctx.save();
      const unit = this.game.humanPlayer?.selectedUnits?.[0];
      if (unit) {
        this.drawUnitInfo(ctx, unit);
      } else {
        this.drawActionMenuOptions(ctx);
      }
      ctx.restore();
    }

    drawUnitInfo(ctx, unit) {
      //TODO: render it better later..
      ctx.fillStyle = "#b7bd93";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(unit.name, this.x + this.width / 2, this.y + 40);

      //draw unit name and health bar
      ctx.font = "20px Arial";
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.x + 10,
        this.y + 60,
        (unit.health / unit.maxHealth) * this.width - 20,
        30
      );

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        unit.health + "/" + unit.maxHealth,
        this.x + this.width / 2,
        this.y + 80
      );

      //draw unit attack and defense
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Attack: " + JSON.stringify(unit.attackDamage),
        this.x + this.width / 2,
        this.y + 120
      );
    }

    drawActionMenuOptions(ctx) {
      this.renderBuildings(ctx);
      this.renderUnits(ctx);
    }

    renderBuildings(ctx) {
      const buildings = this.game.humanPlayer.techTree.buildings;

      buildings
        .filter((building) => building.isVisible)
        .forEach((building, index) => {
          const y = this.y + index * this.itemWidth;
          this.renderItem(
            ctx,
            building,
            this.x,
            y,
            this.itemWidth,
            this.itemWidth
          );
        });
    }

    renderUnits(ctx) {
      const units = this.game.humanPlayer.techTree.units;
      const x = this.x + this.itemWidth;
      units
        .filter((unit) => unit.isVisible)
        .forEach((unit, index) => {
          const y = this.y + index * this.itemWidth;
          this.renderItem(ctx, unit, x, y, this.itemWidth, this.itemWidth);
        });
    }

    renderItem(ctx, item, x, y, width, height) {
      ctx.save();
      ctx.beginPath();

      if (
        !item.isUnlocked ||
        (this.isBuildingInProgress() &&
          this.buildingBuild.item.unit.name !== item.unit.name)
      ) {
        ctx.globalAlpha = 0.2;
      }

      ctx.fillStyle = "#b7bd93";
      ctx.rect(x, y, width, height);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(item.unit.name, x + width / 2, y + height / 2);

      this.drawBuildingInProgress(ctx, item, x, y, width, height);
      ctx.restore();
    }

    drawBuildingInProgress(ctx, item, x, y, width, height) {
      if (
        this.isBuildingInProgress() &&
        this.buildingBuild.item.unit.name === item.unit.name
      ) {
        const progress = this.buildingBuild.timePassedMil / item.unit.buildTime;
        const progressPercent = Math.round(progress * 100);
        const paddingX = 10;
        const paddingY = 40;

        ctx.fillStyle = "grey";
        ctx.fillRect(
          x + paddingX,
          y + height - paddingY,
          width - paddingX * 2,
          30
        );

        ctx.fillStyle = "green";
        ctx.fillRect(
          x + paddingX,
          y + height - paddingY,
          progress * (width - paddingX * 2),
          30
        );

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${progressPercent}%`, x + width / 2, y + height - 20);
      }
    }

    isXYInside(x, y) {
      return (
        x > this.x &&
        x < this.x + this.width &&
        y > this.y &&
        y < this.y + this.height
      );
    }

    getItemAtXy(x, y) {
      if (this.isXYInside(x, y)) {
        const itemX = x - this.x;
        const itemY = y - this.y;
        const itemIndex = Math.floor(itemY / this.itemWidth);
        const isBuilding = itemX < this.itemWidth;
        const units = this.game.humanPlayer.techTree.units;
        const buildings = this.game.humanPlayer.techTree.buildings;
        const items = isBuilding ? buildings : units;
        return items[itemIndex];
      }

      return null;
    }

    buildAUnit(item) {
      this.buildingBuild = {
        item: item,
        timePassedMil: 0,
      };
    }

    isBuildingInProgress() {
      return !!this.buildingBuild?.item;
    }

    isTrainingInProgress() {
      //
      return false;
    }
  }

  return ActionMenu;
})();
