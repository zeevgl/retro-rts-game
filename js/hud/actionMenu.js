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
    }

    update(deltaTime, timestamp) {
      //
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
      this.drawBuildingsCol(ctx);
      this.drawUnitsCol(ctx);
    }

    drawBuildingsCol(ctx) {
      const buildings = this.game.humanPlayer.techTree.getVisibleBuildings();

      buildings.forEach((building, index) => {
        const y = this.y + index * this.itemWidth;
        this.drawItem(ctx, building, this.x, y, this.itemWidth, this.itemWidth);
      });
    }

    drawUnitsCol(ctx) {
      const units = this.game.humanPlayer.techTree.getVisibleUnits();
      const x = this.x + this.itemWidth;
      units.forEach((unit, index) => {
        const y = this.y + index * this.itemWidth;
        this.drawItem(ctx, unit, x, y, this.itemWidth, this.itemWidth);
      });
    }

    drawItem(ctx, item, x, y, width, height) {
      ctx.save();
      ctx.beginPath();


      const canAfford = this.game.humanPlayer.resources.canAfford(
        item.unit.cost
      );

      if (
        !item.isUnlocked() ||
        (this.game.humanPlayer.productionManager.isBuildingInProgress() &&
          this.game.humanPlayer.productionManager.buildingProduction.item.unit
            .name !== item.unit.name) ||
        (this.game.humanPlayer.productionManager.isUnitInProgress() &&
          this.game.humanPlayer.productionManager.unitProduction.item.unit
            .name !== item.unit.name)
      ) {
        ctx.globalAlpha = 0.2;
      } else if (!canAfford) {
        ctx.globalAlpha = 0.6;
      }

      ctx.fillStyle = "#b7bd93";
      ctx.rect(x, y, width, height);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.stroke();

      drawText(ctx, item.unit.name, x + width / 2, y + height / 2, "black");
      drawText(
        ctx,
        `${item.unit.cost} $`,
        x + width / 2,
        y + 20 + height / 2,
        canAfford ? "green" : "red"
      );

      this.drawItemInProgress(ctx, item, x, y, width, height);
      this.drawBuildingReadyToPlace(ctx, item, x, y, width, height);
      ctx.restore();
    }

    drawItemInProgress(ctx, item, x, y, width, height) {
      if (this.game.humanPlayer.productionManager.isItemInProgress(item)) {
        const progress =
          this.game.humanPlayer.productionManager.getProgress(item);
        this.drawItemProgressBar(ctx, item, x, y, width, height, progress);
      }
    }

    drawItemProgressBar(ctx, item, x, y, width, height, progress) {
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

      drawText(
        ctx,
        `${progressPercent}%`,
        x + width / 2,
        y + height - 20,
        "white"
      );
    }

    drawBuildingReadyToPlace(ctx, item, x, y, width, height) {
      if (
        this.game.humanPlayer.productionManager.isBuildingReadyToBePlace(item)
      ) {
        ctx.save();
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "grey";
        ctx.fillRect(x, y, width, height);
        ctx.restore();

        drawText(
          ctx,
          "Click to place",
          x + width / 2,
          y + height / 3,
          "red",
          "center",
          "18px Arial"
        );
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

    getItemAtXy(originalX, originalY) {
      const { x, y } = this.game.camera.adjustPointToCamera(
        originalX,
        originalY
      );
      if (this.isXYInside(x, y)) {
        const itemX = x - this.x;
        const itemY = y - this.y;
        const itemIndex = Math.floor(itemY / this.itemWidth);
        const isBuilding = itemX < this.itemWidth;
        const items = isBuilding
          ? this.game.humanPlayer.techTree.getVisibleBuildings()
          : this.game.humanPlayer.techTree.getVisibleUnits();
        return items[itemIndex];
      }

      return null;
    }
  }

  return ActionMenu;
})();
