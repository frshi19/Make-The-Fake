// Angel prefab
class Angel extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, name, health, damage, modifier, moveSpeed, x, y) {
        super(scene, x, y, texture);
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.name = name
        this.health = health
        this.damage = damage
        this.modifier = modifier
        this.moveSpeed = moveSpeed;
        this.hp = new HealthBar(scene, x - 32, y, health, 64);
    }

    update(){
        // move Angel right
        this.body.setVelocity(this.moveSpeed, 0)
        this.hp.update(this.x, this.y)
    }
}