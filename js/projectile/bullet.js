window["Bulet"] = (() => {

    const name = "bullet";
    const width = 10;
    const height = 10;

    class Bullet extends Projectile {
        constructor(x, y, color, attackDamage) {
            super(name, x, y, width, height, color, attackDamage);
        }

        update(deltaTime, timestamp) {
            super.update(deltaTime, timestamp);
        }

        draw(ctx) {
            super.draw(deltaTime, timestamp);
        }

    }

    return Bullet;
})();
