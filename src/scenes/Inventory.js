class Inventory extends Phaser.Scene {
    constructor(){
        super('inventoryScene')
    }

    create() {
        // flag for printing info just once
        this.infoFlag = true;
        
        // add snapshot image from prior Scene
        if (this.textures.exists('titlesnapshot')) {
            let titleSnap = this.add.image(0, 0, 'titlesnapshot').setOrigin(0);
            titleSnap.setScrollFactor(0)
        } else {
            console.log('texture error');
        }

        // create inventory box
        this.add.image(0, 0, 'inventory').setOrigin(0)

        // prepare array
        const troops = [];

        // create slot objects
        this.sword = this.physics.add.image(264, 168, 'Swordsman_icon').setOrigin(0,0)
        this.sword.name = 'Swordsman'
        troops.push(this.sword)

        this.archer = this.physics.add.image(384, 168, 'Archer_icon').setOrigin(0,0)
        this.archer.name = 'Archer'
        troops.push(this.archer)

        this.shield = this.physics.add.image(624, 168, 'Shieldbearer_icon').setOrigin(0,0)
        this.shield.name = 'Shieldbearer'
        if (level < 20) {
            this.shield.setTexture('lock')
            this.shield.name = 'lock'
        }
        troops.push(this.shield)

        this.axe = this.physics.add.image(504, 168, 'Axeman_icon').setOrigin(0,0)
        this.axe.name = 'Axeman'
        if (level < 10) {
            this.axe.setTexture('lock')
            this.axe.name = 'lock'
        }
        troops.push(this.axe)

        this.spearman = this.physics.add.image(264, 288, 'Spearman_icon').setOrigin(0,0)
        this.spearman.name = 'Spearman'
        if (level < 30) {
            this.spearman.setTexture('lock')
            this.spearman.name = 'lock'
        }
        troops.push(this.spearman)

        this.cavalry = this.physics.add.image(384, 288, 'Cavalry_icon').setOrigin(0,0)
        this.cavalry.name = 'Cavalry'
        if (level < 40) {
            this.cavalry.setTexture('lock')
            this.cavalry.name = 'lock'
        }
        troops.push(this.cavalry)

        
        this.archangel = this.physics.add.image(504, 288, 'Archangel_icon').setOrigin(0,0)
        this.archangel.name = 'Archangel'
        if (level < 50) {
            this.archangel.setTexture('lock')
            this.archangel.name = 'lock'
        }
        troops.push(this.archangel)

        this.god = this.physics.add.image(624, 288, 'God_icon').setOrigin(0,0)
        this.god.name = 'God'
        if (level < 9999) {
            this.god.setTexture('lock')
            this.god.name = 'lock'
        }
        troops.push(this.god)

        // demon icons
        this.warrior = this.physics.add.image(744, 168, 'Warrior_icon').setOrigin(0,0)
        this.warrior.name = 'Warrior'
        if (!warriorDisc) {
            this.warrior.setTexture('what')
            this.warrior.name = 'undisc'
        }
        troops.push(this.warrior)

        this.pyromancer = this.physics.add.image(864, 168, 'Pyromancer_icon').setOrigin(0,0)
        this.pyromancer.name = 'Pyromancer'
        if (!pyroDisc) {
            this.pyromancer.setTexture('what')
            this.pyromancer.name = 'undisc'
        }
        troops.push(this.pyromancer)

        this.hound = this.physics.add.image(864, 288, 'Hound_icon').setOrigin(0,0)
        this.hound.name = 'Hound'
        if (!houndDisc) {
            this.hound.setTexture('what')
            this.hound.name = 'undisc'
        }
        troops.push(this.hound)

        this.knight = this.physics.add.image(1104, 168, 'BK_icon').setOrigin(0,0)
        this.knight.name = 'BK'
        if (!bkDisc) {
            this.knight.setTexture('what')
            this.knight.name = 'undisc'
        }
        troops.push(this.knight)

        this.spearman = this.physics.add.image(744, 288, 'Speardemon_icon').setOrigin(0,0)
        this.spearman.name = 'Speardemon'
        if (!speardemonDisc) {
            this.spearman.setTexture('what')
            this.spearman.name = 'undisc'
        }
        troops.push(this.spearman)

        this.soulripper = this.physics.add.image(984, 168, 'Soulripper_icon').setOrigin(0,0)
        this.soulripper.name = 'Soulripper'
        if (!srDisc) {
            this.soulripper.setTexture('what')
            this.soulripper.name = 'undisc'
        }
        troops.push(this.soulripper)

        this.dragon = this.physics.add.image(984, 288, 'Dragon_icon').setOrigin(0,0)
        this.dragon.name = 'Dragon'
        if (!dragonDisc) {
            this.dragon.setTexture('what')
            this.dragon.name = 'undisc'
        }
        troops.push(this.dragon)

        this.satan = this.physics.add.image(1104, 288, 'Satan_icon').setOrigin(0,0)
        this.satan.name = 'Satan'
        if (!satanDisc) {
            this.satan.setTexture('what')
            this.satan.name = 'undisc'
        }
        troops.push(this.satan)

        // create level display
        let lvlConfig = {
            fontFamily: 'Seagram',
            fontSize: '50px',
            backgroundColor: '#090a14',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 6,
                bottom: 3,
                left: 3,
                right: 9
            },
            fixedWidth: 264,
            fixedHeight: 72,
        }
        this.leveltxt = this.add.text(840, 528, 'LEVEL ' + level, lvlConfig).setScrollFactor(0)

        // create player cursor object
        this.cursor = this.physics.add.image(this.sword.x - 2, this.sword.y - 2, 'cursor').setOrigin(0,0)

        // create tutorial text
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
        if (tutorial == 1) {
            tutorial = 2
            this.tutorialText = this.add.text(480, 64, 'Use WASD to move your cursor around\nPress SPACE to select or deselect a minion', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0)
            this.add.text(480, 152, 'Select the Archer!', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0).setDepth(10)
            this.add.text(520, 640, 'Press TAB again to exit', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0)
        }

        // keyboard defs
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)

        // adding troops to roster, remove if pressed again
        this.physics.add.overlap(this.cursor, troops, (cursor, troop)=> {
            if (this.infoFlag) {
                this.sound.play('move_sfx')
                this.add.image(240, 408, troop.name + '_info').setOrigin(0,0)
                this.infoFlag = false;
            }
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (troop.name == 'Swordsman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Swordsman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }
                else if (troop.name == 'Archer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Archer')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                } 
                else if (troop.name == 'Shieldbearer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 20 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Shieldbearer')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }
                else if (troop.name == 'Axeman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 10 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Axeman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }
                else if (troop.name == 'Spearman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 30 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Spearman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }
                else if (troop.name == 'Cavalry'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 40 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Cavalry')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }
                else if (troop.name == 'Archangel'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 50 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Archangel')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }
                else if (troop.name == 'God'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 9999 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('God')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                    }
                }else if (troop.name == 'lock'){ 
                    this.sound.play('err_sfx')
                }
            }
        })

        // create empty roster objects
        this.slots = []
        this.slot0 = this.add.image(168, 696, 'black_box').setOrigin(0,0)
        this.slot1 = this.add.image(288, 696, 'black_box').setOrigin(0,0)
        this.slot2 = this.add.image(408, 696, 'black_box').setOrigin(0,0)
        this.slot3 = this.add.image(528, 696, 'black_box').setOrigin(0,0)
        this.slot4 = this.add.image(648, 696, 'black_box').setOrigin(0,0)
        this.slots.push(this.slot0)
        this.slots.push(this.slot1)
        this.slots.push(this.slot2)
        this.slots.push(this.slot3)
        this.slots.push(this.slot4)

        this.updateRoster()
    }

    update() {
        // navigate inventory
        if (Phaser.Input.Keyboard.JustDown(keyW) && this.cursor.y != 168 - 2) {
            this.cursor.y -= 120
            this.infoFlag = true
        }
        if (Phaser.Input.Keyboard.JustDown(keyA) && this.cursor.x != 264 - 2) {
            this.cursor.x -= 120
            this.infoFlag = true
        }
        if (Phaser.Input.Keyboard.JustDown(keyS) && this.cursor.y != 288 - 2) {
            this.cursor.y += 120
            this.infoFlag = true
        }
        if (Phaser.Input.Keyboard.JustDown(keyD) && this.cursor.x != 1104 - 2) {
            this.cursor.x += 120
            this.infoFlag = true
        }
        // return to map view
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.sound.play('move_sfx')
            this.scene.start('mapScene')
        }
        // escape to menu
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('move_sfx')
            this.scene.start('mapScene')
        }
    }

    // helper function to check for duplicates in roster
    checkDuplicates (troopToAdd) {
        for (let i = 0; i < roster.length; i++) {
            if (roster[i] == troopToAdd.name) {
                return true
            }
        }
        return false
    }

    // remove a troop from the roster
    removeTroop (troopToRemove) {
        for (let i = 0; i < roster.length; i++) {
            if (roster[i] == troopToRemove.name) {
                roster.splice(i, 1)
            }
        }
    }

    // updates roster in bottom of screen
    updateRoster() {
        let i
        for (i = 0; i < roster.length; i++) {
            this.slots[i].setTexture(roster[i] + '_icon')
        }
        while(i < 5) {
            this.slots[i].setTexture('black_box')
            i++
        }
    }
}