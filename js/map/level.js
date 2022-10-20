class Level {
  constructor(map, assetsFolder) {
    this.assetsFolder = assetsFolder;
    this.positions = [];
    this.map = map;
    this.sprite = null;
    this.platfroms = null;
    this.tilesPosition = [];
    this.tileSize = 32;
    this.initSprite();
    this.initLayers();
  }

  update(deltaTime, timestamp) {}

  draw(context) {
    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        const tile = this.getTile(this.ground.data, x, y);
        if (tile !== 0) {
          this.sprite.draw(context, tile - 1, x * this.tileSize, y * this.tileSize);
        }
      }
    }

    //DEBUG_MODE && this.drawPlatforms(context);
  }

  // drawPlatforms(context) {
  //   this.platfroms.objects.forEach((p) => {
  //     context.strokeRect(p.x, p.y, p.width, p.height);
  //   });
  // }

  getTile(tiles, col, row) {
    //int oneDindex = (row * length_of_row) + column; // Indexes
    const index = row * this.map.width + col;
    return tiles[index];
  }

  initSprite() {
    const tileset = this.map.tilesets[0];
    const { positions, sprite } = getSpritePositions(
      tileset.tilewidth,
      tileset.tileheight,
      this.tileSize,
      tileset.columns,
      tileset.columns,
      `${this.assetsFolder}/${tileset.image}`
    );
    this.sprite = sprite;
    this.positions = positions;
  }

  initLayers() {
    this.platfroms = this.map.layers.find((layer) => layer.name === 'platform');
    this.ground = this.map.layers.find((layer) => layer.name === 'ground');
    this.interactable = this.map.layers.find(
      (layer) => layer.name === 'interactable'
    );
  }
}
