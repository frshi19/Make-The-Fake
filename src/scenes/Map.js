class Map extends Phaser.Scene {
    constructor(){
        super("mapScene");
    }

    preload() {

    }

    create() {
        // tilemap info
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const nodeLayer = map.createLayer('Node Layer', tileset, 0, 0)

        // create player object
        this.PLAYER_VEL = 600;
        const playerSpawn = map.findObject('Spawns', obj => obj.name === "playerSpawn")
        this.player = this.physics.add.image(playerSpawn.x, playerSpawn.y, 'player').setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true)

        // create object markers
        this.frame = this.add.image(this.player.x, this.player.y, 'frame')

        // set up main camera
        this.cameras.main.setBounds(0, 0, 2400, 2400).setZoom(1)
        this.cameras.main.startFollow(this.player, false, 0.4, 0.4)
        this.cameras.main.ignore([this.frame])

        // create overlay
        this.overlay = this.add.image(0,0,'overlay').setOrigin(0)
        this.overlay.setScrollFactor(0)

        // set up mini map
        this.miniMapCamera = this.cameras.add(672, 352, 176, 176).setBounds(0, 0, 2400, 2400).setZoom(0.073)
        this.miniMapCamera.startFollow(this.player, false, 0.4, 0.4)
        this.miniMapCamera.ignore([ bgLayer, this.overlay])

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo(960/8, 544/4, 2400 - 960/4, 2400 - 544/2)

        // set up keyboard input
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // collisions
        nodeLayer.setCollisionByProperty({
            collides: true
        })

        this.physics.add.overlap(this.player, nodeLayer, (player, node) => {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.scene.start('battleScene')
            }
        })
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