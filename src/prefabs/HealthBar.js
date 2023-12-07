// health bar prefab
class HealthBar{
    constructor(scene, x, y, maxHealth, size) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = maxHealth;
        this.p = size / maxHealth;
        this.size  =size

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value < 0)
        {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.size + 4, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, this.size, 12);

        if (this.value < .3 * this.maxHealth)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }

    update(x, y) {
        this.x = x - 32;
        this.y = y - 72;
        this.draw();
    }
}