window["Resources"] = (() => {
  class Resources {
    constructor(player) {
      this.player = player;
      this.money = 0;
      this.increaseAmount = 0;
      this.decreaseAmount = 0;
      this.rate = 10;
      this.increaseBy = 12;
      this.tick = 0;
    }

    update(deltaTime, timestamp) {
      if (this.increaseAmount >= 0 || this.decreaseAmount <= 0) {
        this.tick += deltaTime;
        if (this.tick >= this.rate) {
          this.tick = 0;

          if (this.increaseAmount - this.increaseBy >= 0) {
            this.money += this.increaseBy;
            this.increaseAmount -= this.increaseBy;
          } else if (this.increaseAmount > 0) {
            this.money += this.increaseAmount;
            this.increaseAmount = 0;
          } else  if (this.decreaseAmount + this.increaseBy <= 0) {
            this.money -= this.increaseBy;
            this.decreaseAmount += this.increaseBy;
          } else if (this.decreaseAmount < 0) {
            this.money += this.decreaseAmount;
            this.decreaseAmount = 0;
          }
        }
      }
    }

    addResources(amount) {
      this.increaseAmount += amount;
    }

    deductResources(amount) {
      this.decreaseAmount -= amount;
    }
  }

  return Resources;
})();
