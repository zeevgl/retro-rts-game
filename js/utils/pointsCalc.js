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

function getClosestUnitOfPlayer(
  fromUnit,
  player,
  { unitTypeClass = null, ignoreVisionRange = true } = {}
) {
  return player.units
    .filter((unit) => {
      if (unitTypeClass) {
        return unit.isAlive && unit instanceof unitTypeClass;
      }
      return unit.isAlive;
    })
    .map((unit) => ({
      unit,
      distance: calcDistance(fromUnit.x, fromUnit.y, unit.x, unit.y),
    }))
    .filter(
      (unit) => ignoreVisionRange || unit.distance <= fromUnit.visionRange
    )
    .reduce(
      (prev, curr) => (prev?.distance < curr?.distance ? prev : curr),
      null
    );
}

function getDegree(x1, y1, x2, y2) {
  const radian = Math.atan2(y2 - y1, x2 - x1);
  return radian * (180 / Math.PI) + 180;
}

function getRadian(x1, y1, x2, y2) {
  //currently not used
  const radian = Math.atan2(y2 - y1, x2 - x1);
  const degrees = Math.atan(y2 - y1, x2 - x1);
  //console.log('radian = ', radian, radian * (180 / Math.PI));
  return radian + 2 * Math.PI;
  //http://jsfiddle.net/rjCeV/2/
}
