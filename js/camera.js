window["Camera"] = (() => {
  const scrollSpeed = 5;
  class Camera {
    constructor(game) {
      this.game = game;
      this.x = 0;
      this.y = 0;

      this.isScrolling = true;
      this.scrollDirectionVertical = 0;
      this.scrollDirectionHorizontal = 0;
    }

    update(deltaTime, timestamp) {
      if (this.isScrolling) {
        this.x += this.scrollDirectionHorizontal * scrollSpeed;
        this.y += this.scrollDirectionVertical * scrollSpeed;

        this.validateCameraEdges();
      }
    }

    draw(context) {
      context.translate(-this.x, -this.y);
    }

    scrollStop() {
      this.isScrolling = false;
      this.scrollDirectionHorizontal = 0;
      this.scrollDirectionVertical = 0;
    }

    scrollRight() {
      this.isScrolling = true;
      this.scrollDirectionHorizontal = 1;
    }

    scrollLeft() {
      this.isScrolling = true;
      this.scrollDirectionHorizontal = -1;
    }

    scrollUp() {
      this.isScrolling = true;
      this.scrollDirectionVertical = -1;
    }

    scrollDown() {
      this.isScrolling = true;
      this.scrollDirectionVertical = 1;
    }

    validateCameraEdges() {
      const { hud, map } = this.game;

      if (this.x < 0) {
        this.x = 0;
      } else if (this.x + hud.viewport.width > map.mapWidth) {
        this.x = map.mapWidth - hud.viewport.width;
      }

      if (this.y < 0) {
        this.y = 0;
      } else if (this.y + hud.viewport.height > map.mapHeight) {
        this.y = map.mapHeight - hud.viewport.height;
      }
    }

    scrollCamera(x, y) {
      const { hud } = this.game;
      const margin = 25;
      let isOnEdge = false
      this.scrollStop();

      if (
        x >= this.x + hud.viewport.width - margin &&
        x <= this.x + hud.viewport.width
      ) {
        this.scrollRight();
        isOnEdge = true;
      } else if (x <= this.x + margin && x >= this.x) {
        this.scrollLeft();
        isOnEdge = true;
      }

      if (
        y >= this.y + hud.viewport.height - margin &&
        y <= this.y + hud.viewport.height
      ) {
        this.scrollDown();
        isOnEdge = true;
      } else if (y <= this.y + margin && y >= this.y) {
        this.scrollUp();
        isOnEdge = true;
      }

      return isOnEdge;
    }
  }

  return Camera;
})();
