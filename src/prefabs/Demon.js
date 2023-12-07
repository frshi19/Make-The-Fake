// Demon prefab
class Demon extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, name, health, damage, modifier, moveSpeed, gold, x, y) {
        super(scene, x, y, texture);
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.name = name
        this.health = health
        this.damage = damage
        this.modifier = modifier
        this.moveSpeed = moveSpeed;
        this.hp = new HealthBar(scene, x - 32, y, health, 64);
        this.money = gold;
    }

    update(){
        // move Demon left
        this.body.setVelocity(this.moveSpeed * -1, 0)
        this.hp.update(this.x, this.y)
    }
}