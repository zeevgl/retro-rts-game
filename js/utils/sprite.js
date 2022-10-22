function Sprite(img, width, height, positions, sizeW, sizeH) {
  //https://davetayls.me/blog/2013/02/11/drawing-sprites-with-canvas
  this.img = img;
  this.width = width;
  this.height = height;
  this.positions = positions;
  this.sizeW = sizeW;
  this.sizeH = sizeH || sizeW;
}
Sprite.prototype = {
  draw: function (ctx, position, x, y) {
    const pos = this.positions[position];
    if (pos) {
      ctx.drawImage(
        this.img,
        pos[0],
        pos[1],
        this.width,
        this.height,
        x,
        y,
        this.sizeW,
        this.sizeH
      );

      DEBUG_MODE && ctx.strokeRect(x, y, this.sizeW, this.sizeH);
    }
  },
};

function drawAllSpritePositions(ctx, sprite, itemSize, cols, rows) {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      sprite.draw(ctx, y * rows + x, x * itemSize, y * itemSize);
    }
  }
}

/*
used for evn spread sprites
return {
  positions: [[],[]],
  sprite: Sprite

}
*/
function getSpritePositions(
  singelItemWidth,
  singelItemHeight,
  singleItemSize,
  cols,
  rows,
  filePath
) {
  const positions = [];

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      positions.push([i * singelItemWidth, j * singelItemHeight]);
    }
  }

  const img = new Image();
  img.src = filePath;

  const sprite = new Sprite(
    img,
    singelItemWidth,
    singelItemHeight,
    positions,
    singleItemSize
  );

  return {
    positions,
    sprite,
  };
}
