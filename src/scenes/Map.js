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
        this.PLAYER_VEL = 500;
        this.playerSpawn = map.findObject('Spawns', obj => obj.name === "playerSpawn")
        this.player = this.physics.add.image(playerPosX, playerPosY, 'player').setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true)

        // create object markers
        this.frame = this.add.image(this.player.x, this.player.y, 'frame')

        // set up main camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels).setZoom(1)
        this.cameras.main.startFollow(this.player, false, 0.4, 0.4)

        // create overlay
        this.overlay = this.add.image(0,0,'overlay').setOrigin(0)
        this.overlay.setScrollFactor(0)

        // set up roster icons
        for (let i = 0; i < roster.length; i++) {
            this.add.image(112 + (i * 80), 464, roster[i] + '_icon').setOrigin(0,0).setScrollFactor(0)
        }

        // set up coin counter
        let coinConfig = {
            fontFamily: 'Seagram',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#3fAAA1',
            align: 'center',
            padding: {
                top: 4,
                bottom: 4,
                left: 7,
                right: 7
            },
        }
        if (coins < 10) {
            this.resources = this.add.text(512, 464, '000' + coins, coinConfig).setScrollFactor(0)
        }
        else if (coins < 100) {
            this.resources = this.add.text(512, 464, '00' + coins, coinConfig).setScrollFactor(0)
        }else if (coins < 1000) {
            this.resources = this.add.text(512, 464, '0' + coins, coinConfig).setScrollFactor(0)
        }else{
            this.resources = this.add.text(512, 464, coins, coinConfig).setScrollFactor(0)
        }

        // set up mini map
        this.miniMapCamera = this.cameras.add(672, 352, 176, 176).setBounds(0, 0, map.widthInPixels, map.heightInPixels).setZoom(0.073)
        this.miniMapCamera.startFollow(this.player, false, 0.4, 0.4)

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo(960/8, 544/4, map.widthInPixels - this.game.config.width/4, map.heightInPixels - this.game.config.height/2)

        // set up keyboard input
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        // collisions        
        const objects = map.createFromObjects('Spawns', {
            type: 'level'
        })

        objects.forEach(function (object) {
            object.setTexture('red_dot')
        })
        this.physics.world.enable(objects)

        this.physics.add.overlap(this.player, objects, (player, object) => {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log(object.name)
                if (object.name == 1) {
                    game.settings = {
                        spawnRate: 5000,
                        enemies: [],
                        exp: 4,
                        coins: 200
                    }
                    this.scene.start('battleScene') // level 1
                }
                else if (object.name == 2) {
                    this.scene.start('battleScene')
                }
            }
        })

        // camera ignores
        this.cameras.main.ignore([this.frame, objects])
        this.miniMapCamera.ignore([ bgLayer, nodeLayer, this.overlay, this.resources])
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

        // inventory

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            playerPosX = this.player.x
            playerPosY = this.player.y
            let textureManager = this.textures;
            // take snapshot of the entire game viewport
            // https://newdocs.phaser.io/docs/3.55.2/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
            // .snapshot(callback, type, encoderOptions)
            // the image is automatically passed to the callback
            this.game.renderer.snapshot((snapshotImage) => {
                // make sure an existing texture w/ that key doesn't already exist
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                // take the snapshot img returned from callback and add to texture manager
                textureManager.addImage('titlesnapshot', snapshotImage);
            });
            this.scene.start('inventoryScene')
        }
    }
}