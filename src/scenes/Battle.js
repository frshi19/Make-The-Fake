class Battle extends Phaser.Scene {
    constructor(){
        super("battleScene");
    }

    create() {
        // create invisible player obj
        this.PLAYER_VEL = 500;
        this.player = this.physics.add.image(760, 272, 'player').setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true)

        // tilemap info
        const map2 = this.add.tilemap('tilemapJSON2')
        const tileset = map2.addTilesetImage('tileset', 'tilesetImage')
        const GroundLayer = map2.createLayer('Ground', tileset, 0, 0)
        const Sky = map2.createLayer('Sky', tileset, 0, 0)
        const Bases = map2.createLayer('Bases', tileset, 0, 0)
        const Sun = map2.createLayer('Sun and Clouds', tileset, 0, 0)

        // set up main camera
        this.cameras.main.setBounds(0, 0, 1920, 544).setZoom(1)
        this.cameras.main.startFollow(this.player)
        
        keyA = this.input.keyboard.addKey('A')
        keyD = this.input.keyboard.addKey('D')

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo(0 + this.cameras.main.width / 2, 0, 1920 - this.cameras.main.width, 544)


    }

    update() {
         // player movement
         this.playerDirection = new Phaser.Math.Vector2(0)
         if(keyA.isDown) {
             this.playerDirection.x = -1
             this.player.setFlipX(true)
         } else if(keyD.isDown) {
             this.playerDirection.x = 1
             this.player.setFlipX(false)
         }
         this.playerDirection.normalize()
         this.player.setVelocity(this.PLAYER_VEL * this.playerDirection.x, this.PLAYER_VEL * this.playerDirection.y)
    }
}