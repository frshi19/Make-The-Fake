class Battle extends Phaser.Scene {
    constructor(){
        super("battleScene");
    }

    create() {
        // create game over flag
        this.gameOver = false;

        // create invisible player obj
        this.PLAYER_VEL = 500;
        this.player = this.physics.add.image(960, 272, 'player').setOrigin(0.5).setAlpha(0)
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
        const Sun = map2.createLayer('Sun and Clouds', tileset, 0, 0)

        // create overlay
        this.add.image(0, 0, 'overlay2').setScrollFactor(0).setOrigin(0).depth = 1

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
            this.rosterArray[i].depth = 2
        }

        // create player cursor object
        this.cursor = this.physics.add.image(this.rosterArray[0].x - 2, this.rosterArray[0].y - 2, 'cursor').setOrigin(0,0).setScrollFactor(0)
        this.cursor.depth = 3

        // set up coin counter
        this.coinConfig = {
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
            this.resources = this.add.text(672, 48, '000' + coins, this.coinConfig).setScrollFactor(0)
        }
        else if (coins < 100) {
            this.resources = this.add.text(672, 48, '00' + coins, this.coinConfig).setScrollFactor(0)
        }else if (coins < 1000) {
            this.resources = this.add.text(672, 48, '0' + coins, this.coinConfig).setScrollFactor(0)
        }else{
            this.resources = this.add.text(672, 48, coins, this.coinConfig).setScrollFactor(0)
        }
        this.resources.depth = 4

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
        this.demons = []
        
        // summon angel troops
        this.physics.add.overlap(this.cursor, this.rosterArray, (cursor, troop)=> {
            if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.gameOver) {
                if (troop.name == 'Swordsman'){
                    if (coins >= 120) {
                        coins -= 120
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Swordsman_icon', 'Swordsman', 600, 2, 'Swordsman', 150))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                    
                }
                else if (troop.name == 'Archer'){ 
                    if (coins >= 100) {
                        coins -= 100
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Archer_icon', 'Archer', 200, 2, 'Archer', 150))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
                else if (troop.name == 'Shieldbearer'){ 
                    if (coins >= 200) {
                        coins -= 200
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Shieldbearer_icon', 'Shieldbearer', 800, 1, 'Shieldbearer', 150))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
                else if (troop.name == 'Axeman'){ 
                    if (coins >= 200) {
                        coins -= 200
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Axeman_icon', 'Axeman', 600, 3, 'Axeman', 225))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
                else if (troop.name == 'Spearman'){ 
                    if (coins >= 300) {
                        coins -= 300
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Spearman_icon', 'Spearman', 600, 3, 'Spearman', 75))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
                else if (troop.name == 'Cavalry'){ 
                    if (coins >= 400) {
                        coins -= 400
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Cavalry_icon', 'Cavalry', 800, 4, 'Cavalry', 300))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
                else if (troop.name == 'Archangel'){ 
                    if (coins >= 800) {
                        coins -= 800
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Archangel_icon', 'Archangel', 800, 4, 'Archangel', 75))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
            }
        })
        // summon demon troops
        this.summoner = this.time.addEvent({
            delay: this.game.settings.spawnRate, 
            callback: () => {
                if(!this.gameOver) {
                    let k = Phaser.Math.Between(0, game.settings.enemies.length-1)
                    console.log()
                    if (this.game.settings.enemies[k] == 'Warrior') {
                        this.demons.push(new Demon(this, 'Warrior_icon', 'Warrior' , 600, 2, 'Warrior', 150))
                    } else if (this.game.settings.enemies[k] == 'Pyromancer') {
                        this.demons.push(new Demon(this, 'Pyromancer_icon', 'Pyromancer' , 200, 2, 'Pyromancer', 150))
                    }
                }
            },
            callbackScope:this,
            loop: true
        });

        // create angel and demon bases
        this.angelBaseSpawn = map2.findObject('BaseObjs', obj => obj.name === "angelBase")
        this.demonBaseSpawn = map2.findObject('BaseObjs', obj => obj.name === "demonBase")
        this.angelBase = this.physics.add.sprite(this.angelBaseSpawn.x, this.angelBaseSpawn.y, 'angelBaseImg').setImmovable(true)
        this.angelBase.hp = new HealthBar(this, 200 + 24 - 2 , 432 - 192, 1000);
        this.demonBase = this.physics.add.sprite(this.demonBaseSpawn.x, this.demonBaseSpawn.y, 'demonBaseImg').setImmovable(true)
        this.demonBase.hp = new HealthBar(this, 1720 - 96 + 2, 432 - 192, 1000);

        // create collisions for troops
        GroundLayer.setCollisionByProperty({
            collides: true
        })

        // collision with ground because theres gravity for some reason
        this.physics.add.collider(this.angels, GroundLayer)
        this.physics.add.collider(this.demons, GroundLayer)

        // collision between troop and base
        this.physics.add.collider(this.demons, this.angelBase, (demon, base)=> {
            base.hp.decrease(1)
        }) 
        this.physics.add.collider(this.angels, this.demonBase, (angel, base)=> {
            base.hp.decrease(1)
        })
        
        // collision between troops
        this.physics.add.collider(this.angels, this.demons, (angel, demon)=> {
            angel.hp.decrease(demon.damage)
            demon.hp.decrease(angel.damage)
        })

    }

    update() {
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

        if (!this.gameOver) {
            // navigate battle roster
            if (Phaser.Input.Keyboard.JustDown(keyQ) && this.cursor.x != 192 - 2) {
                this.sound.play('move_sfx')
                this.cursor.x -= 80
            }
            if (Phaser.Input.Keyboard.JustDown(keyE) && this.cursor.x != 512 - 2) {
                this.sound.play('move_sfx')
                this.cursor.x += 80
            }

            // update angels
            for (let i = 0; i < this.angels.length; i++) {
                this.angels[i].update()
                if(this.angels[i].hp.value == 0) {
                    this.sound.play('out_sfx')
                    this.angels[i].hp.bar.destroy()
                    this.angels[i].destroy()
                    this.angels.splice(i, 1)
                }
            }

            // update demons
            for (let i = 0; i < this.demons.length; i++) {
                this.demons[i].update()
                if(this.demons[i].hp.value == 0) {
                    this.sound.play('out_sfx')
                    this.demons[i].hp.bar.destroy()
                    this.demons[i].destroy()
                    this.demons.splice(i, 1)
                }
            }
        }
        
        // check base health to see if game over
        if (!this.gameOver && this.angelBase.hp.value == 0) {
            this.add.image(480,272, 'defeat').setOrigin(0.5).setScrollFactor(0).setScale(0.5)
            this.gameOver = true;
        } else if (!this.gameOver && this.demonBase.hp.value == 0) {
            this.gameOver = true;
            this.add.image(480,272, 'victory').setOrigin(0.5).setScrollFactor(0).setScale(0.5)
        } 

        // game over interactions
        if (this.gameOver) {
            for (let i = 0; i < this.angels.length; i++) {
                this.angels[i].body.setVelocity(0,0)
            }

            // update demons
            for (let i = 0; i < this.demons.length; i++) {
                this.demons[i].body.setVelocity(0,0)
            }
            if (Phaser.Input.Keyboard.JustDown(keyESC)) {
                this.scene.start('mapScene')
            }
        }
    }

    updateCoins() {
        console.log('coins: ' + coins)
        if (coins < 10) {
            this.resources.setText('000' + coins, this.coinConfig).setScrollFactor(0)
        }
        else if (coins < 100) {
            this.resources.setText('00' + coins, this.coinConfig).setScrollFactor(0)
        }else if (coins < 1000) {
            this.resources.setText('0' + coins, this.coinConfig).setScrollFactor(0)
        }else{
            this.resources.setText(coins, this.coinConfig).setScrollFactor(0)
        }
    }
}