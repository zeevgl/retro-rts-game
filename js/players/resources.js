window["Resources"] = (() => {
  class Resources {
    constructor(player) {
      this.player = player;
      this.money = 0;
      this.increaseAmount = 0;
      this.rate = 1;
      this.increaseBy = 12;
      this.tick = 0;
    }

    update(deltaTime, timestamp) {
      if (this.increaseAmount !== 0) {
        this.tick += deltaTime;
        if (this.tick >= this.rate) {
          this.tick = 0;

          const sign = Math.abs(this.increaseAmount) / this.increaseAmount;
          const abs = Math.abs(this.increaseAmount - sign * this.increaseBy);
          if (abs >= this.increaseBy) {
            this.money += sign * this.increaseBy;
            this.increaseAmount -= sign * this.increaseBy;
          } else {
            this.money += this.increaseAmount;
            this.increaseAmount = 0;
          }
        }
      }
    }

    addResources(amount) {
      this.increaseAmount += Math.round(amount);
    }

    deductResources(amount) {
      this.increaseAmount -= Math.round(amount);
    }

    canAfford(cost) {
      return this.money >= cost;
    }
  }

  return Resources;
})();
