class Battle extends Phaser.Scene {
    constructor(){
        super("battleScene");
    }

    create() {
        // create invisible player obj
        this.PLAYER_VEL = 500;
        this.player = this.physics.add.image(960, 272, 'player').setOrigin(0.5)
        this.player.body.setCollideWorldBounds(true)

        // set up main camera
        //this.cameras.main.setBounds(0, 0, 1920, 544).setZoom(1)
        this.cameras.main.setZoom(1)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.flash(500, 255, 255, 0, true)

        // tilemap info
        const map2 = this.add.tilemap('tilemapJSON2')
        const tileset = map2.addTilesetImage('tileset', 'tilesetImage')
        const GroundLayer = map2.createLayer('Ground', tileset, 0, 0)
        const Sky = map2.createLayer('Sky', tileset, 0, 0)
        const Bases = map2.createLayer('Bases', tileset, 0, 0)
        const Sun = map2.createLayer('Sun and Clouds', tileset, 0, 0)

        // create overlay
        this.add.image(0, 0, 'overlay2').setScrollFactor(0).setOrigin(0)

        // create tooltips
        let textConfig = {
            fontFamily: 'Seagram',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 4,
                bottom: 4,
                left: 12,
                right: 8
            },
            fixedWidth: 64
        }
        this.add.text(112,48, 'Q', textConfig).setOrigin(0,0).setScrollFactor(0)
        this.add.text(592,48, 'E', textConfig).setOrigin(0,0).setScrollFactor(0)

        // set up roster icons
        this.rosterArray = []
        for (let i = 0; i < roster.length; i++) {
            this.rosterArray.push(this.physics.add.image(192 + (i * 80), 48, roster[i] + '_icon').setOrigin(0,0).setScrollFactor(0))
        }
        // assign names
        for (let i = 0; i < roster.length; i++) {
            this.rosterArray[i].name = roster[i]
        }

        // create player cursor object
        this.cursor = this.physics.add.image(this.rosterArray[0].x - 2, this.rosterArray[0].y - 2, 'cursor').setOrigin(0,0).setScrollFactor(0)

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
            this.resources = this.add.text(672, 48, '000' + coins, coinConfig).setScrollFactor(0)
        }
        else if (coins < 100) {
            this.resources = this.add.text(672, 48, '00' + coins, coinConfig).setScrollFactor(0)
        }else if (coins < 1000) {
            this.resources = this.add.text(672, 48, '0' + coins, coinConfig).setScrollFactor(0)
        }else{
            this.resources = this.add.text(672, 48, coins, coinConfig).setScrollFactor(0)
        }

        // keyboard input
        keyA = this.input.keyboard.addKey('A')
        keyD = this.input.keyboard.addKey('D')
        keyQ = this.input.keyboard.addKey('Q')
        keyE = this.input.keyboard.addKey('E')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo(0 + this.cameras.main.width / 2, 0, 1920 - this.cameras.main.width, 544)

        // prepare arrays for each army
        this.angels = []
        // summon angel troops
        this.physics.add.overlap(this.cursor, this.rosterArray, (cursor, troop)=> {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (troop.name == 'Swordsman'){ 
                    console.log('summoning swordsman')
                    this.angels.push(new Angel(this, 'Swordsman_icon', 'Swordsman', 100, 20, 'Swordsman', 200))

                }else if (troop.name == 'Archer'){ 
                    console.log('summoning archer')
                    this.angels.push(new Angel(this, 'Archer_icon', 'Archer', 100, 20, 'Archer', 200))
                    console.log(this.angels)
                }
                else if (troop.name == 'Shieldbearer'){ 
                    console.log('summoning shieldbearer')
                }
                else if (troop.name == 'Axeman'){ 
                    console.log('summoning axeman')
                }
                else if (troop.name == 'Spearman'){ 
                    console.log('summoning spearman')
                }
                else if (troop.name == 'Cavalry'){ 
                    console.log('summoning cavalry')
                }
                else if (troop.name == 'Archangel'){ 
                    console.log('summoning archangel')
                }
            }
        })
        // summon demon troops

        // creat collisions for troops
        GroundLayer.setCollisionByProperty({
            collides: true
        })

        this.physics.add.collider(this.angels, GroundLayer)
    }

    update() {
        // navigate battle roster
        if (Phaser.Input.Keyboard.JustDown(keyQ) && this.cursor.x != 192 - 2) {
            this.cursor.x -= 80
        }
        if (Phaser.Input.Keyboard.JustDown(keyE) && this.cursor.x != 512 - 2) {
            this.cursor.x += 80
        }

        // player(camera) movement
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

        // update angels
        for (let i = 0; i < this.angels.length; i++) {
            this.angels[i].update()
        }
    }
}