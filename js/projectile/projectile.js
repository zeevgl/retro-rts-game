window["Projectile"] = (() => {

    class Projectile {
        constructor(name, x, y, width, height, color, attackDamage) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.attackDamage = attackDamage;
        }

        update(deltaTime, timestamp) {

        }

        draw(ctx) {

        }

    }

    return Projectile;
})();
