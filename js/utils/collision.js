function checkCollision(x1, y1, width1, height1, x2, y2, width2, height2) {
  if (
    x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    y1 + height1 > y2
  ) {
    return true;
  }
  return false;
}

function checkCollisionBetweenProjectileAndUnit(projectile, unit) {
  return checkCollision(
    projectile.x,
    projectile.y,
    projectile.width,
    projectile.height,
    unit.x,
    unit.y,
    unit.width,
    unit.height
  );
}
