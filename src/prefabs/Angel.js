// Angel prefab
class Angel extends Phaser.GameObjects.Sprite{
    constructor(scene, texture, name, health, damage, modifier, moveSpeed) {
        super(scene, 200, 432, texture);
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.name = name
        this.health = health
        this.damage = damage
        this.modifier = modifier
        this.moveSpeed = moveSpeed;
        this.body.setGravity(0, 100)
    }

    update(){
        // move Angel right
        this.body.setVelocity(this.moveSpeed, 0)
    }
}