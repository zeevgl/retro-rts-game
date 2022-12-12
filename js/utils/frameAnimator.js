class FrameAnimator {
  constructor(
    sprite,
    startIndex,
    endIndex,
    loop = false,
    frameDuration = 80,
    { onComplete = null } = {}
  ) {
    this.sprite = sprite;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.loop = loop;
    this.frameDuration = frameDuration; //ms
    this.onComplete = onComplete;

    this.imageFrame = null;
    this.isRunning = false;
    this.totalDt = 0;
  }

  static fromAnimationFrame(
    sprite,
    { start, length, loop, frameDuration },
    options = undefined
  ) {
    return new this(
      sprite,
      start,
      start + length,
      loop,
      frameDuration,
      options
    );
  }

  update(dt, timestamp) {
    if (!this.isRunning) {
      return;
    }

    this.totalDt += dt;

    if (this.totalDt >= this.frameDuration) {
      this.imageFrame++;
      if (this.imageFrame === this.endIndex) {
        if (this.loop) {
          this.imageFrame = this.startIndex;
        } else {
          this.stop();
          this.onComplete?.();
        }
      }
      this.totalDt = 0;
    }
  }

  draw(canvas, x, y) {
    //use draw to render OR use getActiveFrame manually render
    this.sprite.draw(canvas, this.imageFrame, x, y);
  }

  getActiveFrame() {
    return this.imageFrame;
  }

  start() {
    this.imageFrame = this.startIndex;
    this.totalDt = 0;
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }
}
