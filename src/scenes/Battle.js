class Battle extends Phaser.Scene {
    constructor(){
        super("battleScene");
    }

    create() {
        // create game over flag
        this.gameOver = false;

        // coins info
        if (coins < 500) {
            coins = 500;
        }

        // add passive income
        this.time.addEvent({
            delay: 1000, 
            callback: () => {
                if (!this.gameOver)  {
                    coins += 10
                    this.updateCoins()
                }
            },
            callbackScope:this,
            loop: true
        });

        //check for tutorial value
        if (tutorial == 5) {
            tutorial = 4
        }

        // discover demons in this level
        for (let i = 0; i < this.game.settings.enemies.length; i++) {
            if (this.game.settings.enemies[i] == 'Warrior') {
                warriorDisc = true
            } else if (this.game.settings.enemies[i] == 'Pyromancer') {
                pyroDisc = true
            } else if (this.game.settings.enemies[i] == 'BK') {
                bkDisc = true
            } else if (this.game.settings.enemies[i] == 'Soulripper') {
                srDisc = true
            } else if (this.game.settings.enemies[i] == 'Speardemon') {
                speardemonDisc = true
            } else if (this.game.settings.enemies[i] == 'Hound') {
                houndDisc = true
            } else if (this.game.settings.enemies[i] == 'Dragon') {
                dragonDisc = true
            }
        }

        // create invisible player obj
        this.PLAYER_VEL = 750;
        this.player = this.physics.add.image(game.config.width, game.config.height/2, 'player').setOrigin(0.5).setAlpha(0)
        this.player.body.setCollideWorldBounds(true)

        // set up main camera
        this.cameras.main.setZoom(1)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.flash(500, 255, 255, 0, true)

        // tilemap info
        const map2 = this.add.tilemap('tilemapJSON2')
        const tileset = map2.addTilesetImage('tileset', 'tilesetImage')
        const bg = map2.createLayer('Background', tileset, 0, 0)
        const fg = map2.createLayer('Foreground', tileset, 0, 0)

        // create overlay
        this.add.image(game.config.width/2, game.config.height/2, 'overlay2').setScrollFactor(0).setOrigin(0.5).depth = 1

        // tutorial
        let tutorialConfig = {
            fontFamily: 'Seagram',
            fontSize: '32px',
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
        if (tutorial == 3) {
            tutorial = -1
            let tutText1 = this.add.text(1440, 250, 'Use A and D to scroll the viewport', tutorialConfig).setOrigin(0.5).setAlpha(0.75)
            let tutText2 = this.add.text(1440, 400, 'Use W and S to switch lanes', tutorialConfig).setOrigin(0.5).setAlpha(0.75)
            let tutText3 = this.add.text(1440, 550, 'Use SPACE to summon the selected minion', tutorialConfig).setOrigin(0.5).setAlpha(0.75)


            this.time.addEvent({
                delay: 20000, 
                callback: () => {
                    tutText1.setAlpha(0)
                    tutText2.setAlpha(0)
                    tutText3.setAlpha(0)
                },
                callbackScope:this,
                loop: false
            });
        }

        // create tooltips
        let textConfig = {
            fontFamily: 'Seagram',
            fontSize: '72px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 6,
                bottom: 7,
                left: 12,
                right: 9
            },
            fixedWidth: 96
        }
        this.add.text(168, 72, 'Q', textConfig).setOrigin(0,0).setScrollFactor(0)
        this.add.text(888, 72, 'E', textConfig).setOrigin(0,0).setScrollFactor(0)

        // set up roster icons
        this.rosterArray = []
        for (let i = 0; i < roster.length; i++) {
            this.rosterArray.push(this.physics.add.image(288 + (i * 120), 72, roster[i] + '_icon').setOrigin(0,0).setScrollFactor(0))
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
            this.resources = this.add.text(1008, 72, '000' + coins, this.coinConfig).setScrollFactor(0)
        }
        else if (coins < 100) {
            this.resources = this.add.text(1008, 72, '00' + coins, this.coinConfig).setScrollFactor(0)
        }else if (coins < 1000) {
            this.resources = this.add.text(1008, 72, '0' + coins, this.coinConfig).setScrollFactor(0)
        }else{
            this.resources = this.add.text(1008, 72, coins, this.coinConfig).setScrollFactor(0)
        }
        this.resources.depth = 4

        // keyboard input
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
        keyQ = this.input.keyboard.addKey('Q')
        keyE = this.input.keyboard.addKey('E')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        // set physics world bounds (so collideWorldBounds works properly)
        this.physics.world.bounds.setTo((this.cameras.main.width / 2) - (this.player.width / 2), 0, 2880 - this.cameras.main.width + (this.player.width), 816)

        
        // create angel and demon bases
        this.angelBaseSpawn = map2.findObject('BaseObjs', obj => obj.name === "angelBase")
        this.demonBaseSpawn = map2.findObject('BaseObjs', obj => obj.name === "demonBase")
        this.angelBase = this.physics.add.sprite(this.angelBaseSpawn.x, this.angelBaseSpawn.y, 'angelBaseImg').setImmovable(true).setScale(2)
        this.angelBase.hp = new HealthBar(this, this.angelBaseSpawn.x - 128, this.angelBaseSpawn.y - 212, 1000, 256);
        this.demonBase = this.physics.add.sprite(this.demonBaseSpawn.x, this.demonBaseSpawn.y, 'demonBaseImg').setImmovable(true).setScale(2)
        this.demonBase.hp = new HealthBar(this, this.demonBaseSpawn.x - 128, this.demonBaseSpawn.y - 212, 1000, 256);

        // create pointer to lanes
        this.pointer = this.add.image(this.angelBase.x - 120, this.angelBase.y, 'pointer').setScrollFactor(0).setDepth(6)

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
                        this.angels.push(new Angel(this, 'Swordsman_icon', 'Swordsman', 600, 2, 'Swordsman', 150, this.angelBase.x, this.pointer.y))
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
                        this.angels.push(new Angel(this, 'Archer_icon', 'Archer', 200, 2, 'Archer', 150, this.angelBase.x, this.pointer.y))
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
                        this.angels.push(new Angel(this, 'Shieldbearer_icon', 'Shieldbearer', 800, 1, 'Shieldbearer', 150, this.angelBase.x, this.pointer.y))
                        this.updateCoins()
                    } else {
                        this.sound.play('err_sfx')
                        console.log('play err anim')
                    }
                }
                else if (troop.name == 'Axeman'){ 
                    if (coins >= 250) {
                        coins -= 250
                        this.sound.play('in_sfx')
                        this.angels.push(new Angel(this, 'Axeman_icon', 'Axeman', 600, 3, 'Axeman', 225, this.angelBase.x, this.pointer.y))
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
                        this.angels.push(new Angel(this, 'Spearman_icon', 'Spearman', 600, 3, 'Spearman', 75, this.angelBase.x, this.pointer.y))
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
                        this.angels.push(new Angel(this, 'Cavalry_icon', 'Cavalry', 800, 4, 'Cavalry', 300, this.angelBase.x, this.pointer.y))
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
                        this.angels.push(new Angel(this, 'Archangel_icon', 'Archangel', 800, 4, 'Archangel', 75, this.angelBase.x, this.pointer.y))
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
                    let n = Phaser.Math.Between(0, 2)
                    
                    if (this.game.settings.enemies[k] == 'Warrior') {
                        this.demons.push(new Demon(this, 'Warrior_icon', 'Warrior' , 600, 2, 'Warrior', 150, 60, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    } else if (this.game.settings.enemies[k] == 'Pyromancer') {
                        this.demons.push(new Demon(this, 'Pyromancer_icon', 'Pyromancer' , 200, 2, 'Pyromancer', 150, 50, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    } else if (this.game.settings.enemies[k] == 'BK') {
                        this.demons.push(new Demon(this, 'BK_icon', 'BK' , 800, 1, 'BK', 150, 100, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    } else if (this.game.settings.enemies[k] == 'Soulripper') {
                        this.demons.push(new Demon(this, 'Soulripper_icon', 'Soulripper' , 600, 3, 'Soulripper', 225, 100, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    } else if (this.game.settings.enemies[k] == 'Speardemon') {
                        this.demons.push(new Demon(this, 'Speardemon_icon', 'Speardemon' , 600, 3, 'Speardemon', 75, 150, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    } else if (this.game.settings.enemies[k] == 'Hound') {
                        this.demons.push(new Demon(this, 'Hound_icon', 'Hound' , 800, 4, 'Hound', 300, 200, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    } else if (this.game.settings.enemies[k] == 'Dragon') {
                        this.demons.push(new Demon(this, 'Dragon_icon', 'Dragon' , 800, 4, 'Dragon', 75, 400, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
                    }
                }
            },
            callbackScope:this,
            loop: true
        });

        // summon satan on level 7
        if (this.game.settings.coins == 666) {
            this.demons.push(new Demon(this, 'Satan_icon', 'Satan' , 4000, 4, 'Satan', 75, 200, this.demonBase.x, this.demonBase.y - 160 + (160 * n)))
        }

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
            if (Phaser.Input.Keyboard.JustDown(keyQ) && this.cursor.x != 288 - 2) {
                this.sound.play('move_sfx')
                this.cursor.x -= 120
            }
            if (Phaser.Input.Keyboard.JustDown(keyE) && this.cursor.x != 768 - 2) {
                this.sound.play('move_sfx')
                this.cursor.x += 120
            }

            // navigate lanes
            if (Phaser.Input.Keyboard.JustDown(keyW) && this.pointer.y != this.angelBase.y - 160) {
                this.sound.play('move_sfx')
                this.pointer.y -= 160
            }
            if (Phaser.Input.Keyboard.JustDown(keyS) && this.pointer.y != this.angelBase.y + 160) {
                this.sound.play('move_sfx')
                this.pointer.y += 160
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
                    coins += this.demons[i].money
                    this.updateCoins()
                    this.demons[i].hp.bar.destroy()
                    this.demons[i].destroy()
                    this.demons.splice(i, 1)
                }
            }
        }
        
        // check base health to see if game over
        if (!this.gameOver && this.angelBase.hp.value == 0) { // lose
            this.add.image(game.config.width/2 ,game.config.height/2, 'defeat').setOrigin(0.5).setScrollFactor(0).setScale(0.5)
            this.gameOver = true;
            lastWin = false;
        } else if (!this.gameOver && this.demonBase.hp.value == 0) { // win
            tutorial = 4
            this.gameOver = true;
            this.add.image(game.config.width/2 ,game.config.height/2, 'victory').setOrigin(0.5).setScrollFactor(0).setScale(0.5)
            lastWin = true
            coins += this.game.settings.coins
            level += this.game.settings.exp
        } 

        // game over interactions
        if (this.gameOver) {
            for (let i = 0; i < this.angels.length; i++) {
                this.angels[i].body.setVelocity(0,0)
            }
            for (let i = 0; i < this.demons.length; i++) {
                this.demons[i].body.setVelocity(0,0)
            }
            if (Phaser.Input.Keyboard.JustDown(keyESC)) {
                this.sound.play('move_sfx')
                this.scene.start('mapScene')
            }
        }
    }

    updateCoins() {
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