class Level {
  constructor(map, assetsFolder) {
    this.assetsFolder = assetsFolder;
    this.positions = [];
    this.map = map;
    this.sprite = null;
    this.platfroms = null;
    this.playerPositions = null;
    this.tileSize = 64;
    const originalTileSize = this.map.tilesets[0].tilewidth;
    this.tileSizeMultiplayer = this.tileSize / originalTileSize;
    this.initSprite();
    this.initLayers();
  }

  update(deltaTime, timestamp) {}

  draw(context) {
    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        const tile = this.getTile(this.ground.data, x, y);
        if (tile !== 0) {
          this.sprite.draw(
            context,
            tile - 1,
            x * this.tileSize,
            y * this.tileSize
          );
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
    this.platfroms = this.map.layers.find((layer) => layer.name === "platform");
    this.playerPositions = this.map.layers.find(
      (layer) => layer.name === "players_positions"
    );

    this.ground = this.map.layers.find((layer) => layer.name === "ground");
    this.interactable = this.map.layers.find(
      (layer) => layer.name === "interactable"
    );
  }

  getWidth() {
    return this.map.width * this.tileSize;
  }

  getHeight() {
    return this.map.height * this.tileSize;
  }

  getHumanPlayerPosition() {
    const position = this.playerPositions.objects.find(
      (p) => p.name === "player1"
    );

    return {
      x: position.x * this.tileSizeMultiplayer,
      y: position.y * this.tileSizeMultiplayer,
    };
  }

  getAiPlayersPositions() {
    return this.playerPositions.objects
      .filter((p) => p.name !== "player1")
      .map((o) => ({
        x: o.x * this.tileSizeMultiplayer,
        y: o.y * this.tileSizeMultiplayer,
      }));
  }
}
