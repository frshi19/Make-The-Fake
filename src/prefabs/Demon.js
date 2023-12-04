// Demon prefab
class Demon extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, name, health, damage, modifier, moveSpeed) {
        super(scene, 1720, 432, texture);
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.name = name
        this.health = health
        this.damage = damage
        this.modifier = modifier
        this.moveSpeed = moveSpeed;
        this.body.setGravity(0, 100)
        this.hp = new HealthBar(scene, 200 - 32, 432 - 48, health);
    }

    update(){
        // move Demon left
        this.body.setVelocity(this.moveSpeed * -1, 0)
        this.hp.update(this.x, this.y)
    }
}