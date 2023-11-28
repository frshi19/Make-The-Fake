class Map extends Phaser.Scene {
    constructor(){
        super("mapScene");
    }

    preload() {

    }

    create() {
        this.bg = this.add.image(0,0,'map').setOrigin(0)

        // create player object
        this.PLAYER_VEL = 600;
        this.player = this.physics.add.image(playerPosX, playerPosY, 'player').setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true)

        // create object markers
        this.frame = this.add.image(this.player.x, this.player.y, 'frame')

        // set up main camera
        this.cameras.main.setBounds(0, 0, 3000, 3000).setZoom(1)
        this.cameras.main.startFollow(this.player, false, 0.4, 0.4)
        this.cameras.main.ignore([this.frame])

        // create overlay
        this.overlay = this.add.image(0,0,'overlay').setOrigin(0)
        this.overlay.setScrollFactor(0)

        // set up mini map
        this.miniMapCamera = this.cameras.add(672, 352, 176, 176).setBounds(0, 0, 3000, 3000).setZoom(0.059)
        this.miniMapCamera.startFollow(this.player, false, 0.4, 0.4)
        this.miniMapCamera.ignore([ this.bg, this.overlay])

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo(0, 0, 3000, 3000)

        // set up keyboard input
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
    }

    update() {
        // player movement
        this.playerDirection = new Phaser.Math.Vector2(0)
        if(keyW.isDown) {
            this.playerDirection.y = -1
        } else if(keyS.isDown) {
            this.playerDirection.y = 1
        }
        if(keyA.isDown) {
            this.playerDirection.x = -1
            this.player.setFlipX(true)
        } else if(keyD.isDown) {
            this.playerDirection.x = 1
            this.player.setFlipX(false)
        }
        this.playerDirection.normalize()
        this.player.setVelocity(this.PLAYER_VEL * this.playerDirection.x, this.PLAYER_VEL * this.playerDirection.y)
        this.frame.setPosition(this.player.x, this.player.y)
    }
}