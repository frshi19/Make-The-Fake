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
        troops.push(this.shield)

        this.axe = this.physics.add.image(504, 168, 'Axeman_icon').setOrigin(0,0)
        this.axe.name = 'Axeman'
        troops.push(this.axe)

        this.spearman = this.physics.add.image(264, 288, 'Spearman_icon').setOrigin(0,0)
        this.spearman.name = 'Spearman'
        troops.push(this.spearman)

        this.cavalry = this.physics.add.image(384, 288, 'Cavalry_icon').setOrigin(0,0)
        this.cavalry.name = 'Cavalry'
        troops.push(this.cavalry)

        
        this.archangel = this.physics.add.image(504, 288, 'Archangel_icon').setOrigin(0,0)
        this.archangel.name = 'Archangel'
        troops.push(this.archangel)

        this.god = this.physics.add.image(624, 288, 'God_icon').setOrigin(0,0)
        this.god.name = 'God'
        troops.push(this.god)
        
        this.mystery = this.physics.add.image(624, 288, 'God_icon').setOrigin(0,0)

        // demon icons
        this.warrior = this.physics.add.image(744, 168, 'Warrior_icon').setOrigin(0,0)
        this.pyromancer = this.physics.add.image(864, 168, 'Pyromancer_icon').setOrigin(0,0)
        this.hound = this.physics.add.image(984, 168, 'Hound_icon').setOrigin(0,0)
        this.knight = this.physics.add.image(744, 288, 'BK_icon').setOrigin(0,0)
        this.spearman = this.physics.add.image(864, 288, 'Speardemon_icon').setOrigin(0,0)
        this.soulripper = this.physics.add.image(984, 288, 'Soulripper_icon').setOrigin(0,0)
        this.dragon = this.physics.add.image(864, 408, 'BD_icon').setOrigin(0,0)
        this.satan = this.physics.add.image(984, 408, 'Satan_icon').setOrigin(0,0)

        // create level display
        let lvlConfig = {
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
        }
        //this.level = this.add.text(768, 696, '000' + coins, coinConfig).setScrollFactor(0)

        // create player cursor object
        this.cursor = this.physics.add.image(this.sword.x - 2, this.sword.y - 2, 'cursor').setOrigin(0,0)

        // create tutorial text
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
        if (tutorial == 1) {
            tutorial = 2
            this.tutorialText = this.add.text(480, 64, 'Use WASD to move your cursor around\nPress SPACE to select or deselect a minion', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0)
            this.add.text(1140, 564, 'Press TAB again to exit', tutorialConfig).setOrigin(0.5).setAlpha(0.75).setScrollFactor(0)
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
                        console.log("play err anim")
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
                        console.log("play err anim")
                    }
                } 
                else if (troop.name == 'Shieldbearer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Shieldbearer')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                        console.log("play err anim")
                    }
                }
                else if (troop.name == 'Axeman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Axeman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                        console.log("play err anim")
                    }
                }
                else if (troop.name == 'Spearman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Spearman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                        console.log("play err anim")
                    }
                }
                else if (troop.name == 'Cavalry'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Cavalry')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                        console.log("play err anim")
                    }
                }
                else if (troop.name == 'Archangel'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('Archangel')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                        console.log("play err anim")
                    }
                }
                else if (troop.name == 'God'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 60 && !this.checkDuplicates(troop)) {
                        this.sound.play('in_sfx')
                        roster.push('God')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.sound.play('out_sfx')
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        this.sound.play('err_sfx')
                        console.log("play err anim")
                    }
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
        if (Phaser.Input.Keyboard.JustDown(keyD) && this.cursor.x != 624 - 2) {
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