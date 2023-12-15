class Map extends Phaser.Scene {
    constructor(){
        super("mapScene");
    }

    preload() {

    }

    create() {
        // add last battle info
        if (lastWin) {
            wonBattles.push(lastBattle)
        }

        // tilemap info
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')

        const bgLayer = map.createLayer('Background', tileset, 0, 0)

        // create player object
        this.PLAYER_VEL = 500;
        this.playerSpawn = map.findObject('Spawns', obj => obj.name === "playerSpawn")
        this.player = this.physics.add.image(playerPosX, playerPosY, 'player').setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true)
        this.player.setDepth(2)

        // create object markers
        this.frame = this.add.image(this.player.x, this.player.y, 'frame')

        // set up main camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels).setZoom(1)
        this.cameras.main.startFollow(this.player, false, 0.4, 0.4)

        // create overlay
        this.overlay = this.add.image(0,0,'overlay').setOrigin(0)
        this.overlay.setScrollFactor(0).setDepth(5)

        // set up roster icons
        const ignoreArray = []
        for (let i = 0; i < roster.length; i++) {
            ignoreArray.push(this.add.image(168 + (i * 120), 696, roster[i] + '_icon').setOrigin(0,0).setScrollFactor(0).setDepth(6))
        }

        // set up coin counter
        let coinConfig = {
            fontFamily: 'Seagram',
            fontSize: '72px',
            backgroundColor: '#000000',
            color: '#3fAAA1',
            align: 'center',
            padding: {
                top: 6,
                bottom: 7,
                left: 12,
                right: 9
            },
            // fixedWidth: 200
        }
        if (coins < 10) {
            this.resources = this.add.text(768, 696, '000' + coins, coinConfig).setScrollFactor(0)
        }
        else if (coins < 100) {
            this.resources = this.add.text(768, 696, '00' + coins, coinConfig).setScrollFactor(0)
        }else if (coins < 1000) {
            this.resources = this.add.text(768, 696, '0' + coins, coinConfig).setScrollFactor(0)
        }else{
            this.resources = this.add.text(768, 696, coins, coinConfig).setScrollFactor(0)
        }
        this.resources.setDepth(7)

        // set up mini map
        this.miniMapCamera = this.cameras.add(1008, 528, 264, 264).setBounds(0, 0, map.widthInPixels, map.heightInPixels).setZoom(0.1095)
        this.miniMapCamera.startFollow(this.player, false, 0.4, 0.4)

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo(game.config.width/8, game.config.height/4, map.widthInPixels - this.game.config.width/4, map.heightInPixels - this.game.config.height/2)

        // tutorial text
        let tutorialConfig = {
            fontFamily: 'Seagram',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#AAFFFF',
            align: 'center',
            padding: {
                top: 4,
                bottom: 4,
                left: 7,
                right: 7
            },
        }

        this.tutorialText
        this.tutorialArrow
            
        if (tutorial == 0) {
            tutorial = 1
            this.tutorialText = this.add.text(720, 204, 'Welcome To Heaven Vs. Hell\nCommand the armies of heaven against the forces of Satan.\n\nComplete battles and work your way towards the final boss\n\nPress TAB to select your roster and\nview information on minions you have discovered', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0).setDepth(6)
            this.tutorialArrow = this.add.image(1188, 233, 'red_arrow').setOrigin(0).setScrollFactor(0).setAlpha(0.75).setDepth(6)
        } else if (tutorial == 2) { 
            tutorial = 3
            this.tutorialText = this.add.text(720, 204, 'Use WASD to move the avatar and navigate to battles\n\nPress SPACE to enter a battle\n\nNOTE: Press ESC to exit at any time', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0).setDepth(6)
        }

        // set up keyboard input
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)

        // collisions        
        const objects = map.createFromObjects('Spawns', {
            type: 'level'
        })

        const scene = this
        // objects for the nodes
        objects.forEach(function (object) {
            object.setTexture('red_dot')
            if (object.name == '7') {
                object.setAlpha(0)
            }
            ignoreArray.push(scene.add.image(object.x, object.y, 'dark_seal').setDepth(1))
            wonBattles.forEach(function(battle) {
                if (object.name == battle) {
                    object.setTexture('blue_box')
                    ignoreArray.push(scene.add.image(object.x, object.y, 'light_seal').setDepth(1))
                }
            })
        })
        this.physics.world.enable(objects)

        // create levels
        this.physics.add.overlap(this.player, objects, (player, object) => {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                playerPosX = this.player.x
                playerPosY = this.player.y
                this.sound.play('select_sfx')
                if (object.name == 1 && level == 1) { // level 1
                    game.settings = {
                        spawnRate: 5000,
                        enemies: ['Pyromancer'],
                        exp: 9,
                        coins: 200
                    }
                    lastBattle = '1'
                    this.scene.start('battleScene')
                }
                else if (object.name == 2 && level == 10) { // level 2
                    game.settings = {
                        spawnRate: 5000,
                        enemies: ['Warrior', 'Pyromancer'],
                        exp: 10,
                        coins: 300
                    }
                    lastBattle = '2'
                    this.scene.start('battleScene')
                }
                else if (object.name == 3 && level == 20) { // level 3
                    game.settings = {
                        spawnRate: 4000,
                        enemies: ['Warrior', 'Pyromancer'],
                        exp: 10,
                        coins: 400
                    }
                    lastBattle = '2'
                    this.scene.start('battleScene')
                }
                else if (object.name == 4 && level == 30) { // level 4
                    game.settings = {
                        spawnRate: 4000,
                        enemies: ['Warrior', 'Pyromancer'],
                        exp: 10,
                        coins: 500
                    }
                    lastBattle = '2'
                    this.scene.start('battleScene')
                }
                else if (object.name == 5 && level == 40) { // level 5
                    game.settings = {
                        spawnRate: 4000,
                        enemies: ['Warrior', 'Pyromancer'],
                        exp: 10,
                        coins: 600
                    }
                    lastBattle = '2'
                    this.scene.start('battleScene')
                }
                else if (object.name == 6 && level == 50) { // level 6
                    game.settings = {
                        spawnRate: 4000,
                        enemies: ['Warrior', 'Pyromancer'],
                        exp: 10,
                        coins: 700
                    }
                    lastBattle = '2'
                    this.scene.start('battleScene')
                }
                else if (object.name == 7 && level == 60) { // level 7
                    game.settings = {
                        spawnRate: 4000,
                        enemies: ['Warrior', 'Pyromancer'],
                        exp: 0,
                        coins: 800
                    }
                    lastBattle = '2'
                    this.scene.start('battleScene')
                }
            }
        })

        // camera ignores
        this.cameras.main.ignore([this.frame, objects])
        this.miniMapCamera.ignore([ bgLayer, this.overlay, this.resources, ignoreArray, this.tutorialText, this.tutorialArrow, this.player])
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

        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
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

        // escape to menu
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            playerPosX = this.player.x
            playerPosY = this.player.y
            this.sound.play('move_sfx')
            this.scene.start('menuScene')
        }
    }
}