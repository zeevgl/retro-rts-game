function calcDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function calcMoves(speed, distance, x1, y1, x2, y2) {
  const moves = distance / speed;
  const xunits = (x2 - x1) / moves;
  const yunits = (y2 - y1) / moves;

  return {
    xunits,
    yunits,
  };
}

function getClosestUnitOfPlayer(x, y, player, unitTypeClass = null) {
  return player.units
      .filter((unit) => {
        if (unitTypeClass) {
          return unit.isAlive && unit instanceof unitTypeClass;
        }
        return unit.isAlive;
      })
      .map((unit) => ({
        unit,
        distance: calcDistance(x, y, unit.x, unit.y),
      }))
      .reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
}