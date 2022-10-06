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
