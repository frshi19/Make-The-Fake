class Inventory extends Phaser.Scene {
    constructor(){
        super('inventoryScene')
    }

    create() {
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
        this.archer = this.physics.add.image(176, 112, 'Archer_icon').setOrigin(0,0)
        this.archer.name = 'Archer'
        troops.push(this.archer)

        this.sword = this.physics.add.image(256, 112, 'Swordsman_icon').setOrigin(0,0)
        this.sword.name = 'Swordsman'
        troops.push(this.sword)

        this.shield = this.physics.add.image(416, 112, 'Shieldbearer_icon').setOrigin(0,0)
        this.shield.name = 'Shieldbearer'
        troops.push(this.shield)

        this.axe = this.physics.add.image(336, 112, 'Axeman_icon').setOrigin(0,0)
        this.axe.name = 'Axeman'
        troops.push(this.axe)

        this.spearman = this.physics.add.image(176, 192, 'Spearman_icon').setOrigin(0,0)
        this.spearman.name = 'Spearman'
        troops.push(this.spearman)

        this.cavalry = this.physics.add.image(256, 192, 'Cavalry_icon').setOrigin(0,0)
        this.cavalry.name = 'Cavalry'
        troops.push(this.cavalry)

        
        this.archangel = this.physics.add.image(336, 192, 'Archangel_icon').setOrigin(0,0)
        this.archangel.name = 'Archangel'
        troops.push(this.archangel)
        
        this.mystery = this.physics.add.image(416, 192, 'question_mark').setOrigin(0,0)

        console.log(troops)

        // create player cursor object
        this.cursor = this.physics.add.image(this.archer.x - 2, this.archer.y - 2, 'cursor').setOrigin(0,0)
        

        // keyboard defs
        keyW = this.input.keyboard.addKey('W')
        keyA = this.input.keyboard.addKey('A')
        keyS = this.input.keyboard.addKey('S')
        keyD = this.input.keyboard.addKey('D')
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        // adding troops to roster, remove if pressed again
        this.physics.add.overlap(this.cursor, troops, (cursor, troop)=> {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (troop.name == 'Archer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Archer')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                } else if (troop.name == 'Swordsman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Swordsman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Shieldbearer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Shieldbearer')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Axeman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Axeman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Spearman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Spearman')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Cavalry'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Cavalry')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Archangel'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Archangel')
                        this.updateRoster()
                    } else if(this.checkDuplicates(troop) && roster.length > 1){
                        this.removeTroop(troop)
                        this.updateRoster()
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
            }
        })

        // create empty roster objects
        this.slots = []
        this.slot0 = this.add.image(112, 464, 'black_box').setOrigin(0,0)
        this.slot1 = this.add.image(192, 464, 'black_box').setOrigin(0,0)
        this.slot2 = this.add.image(272, 464, 'black_box').setOrigin(0,0)
        this.slot3 = this.add.image(352, 464, 'black_box').setOrigin(0,0)
        this.slot4 = this.add.image(432, 464, 'black_box').setOrigin(0,0)
        this.slots.push(this.slot0)
        this.slots.push(this.slot1)
        this.slots.push(this.slot2)
        this.slots.push(this.slot3)
        this.slots.push(this.slot4)

        this.updateRoster()
    }

    update() {
        // navigate inventory
        if (Phaser.Input.Keyboard.JustDown(keyW) && this.cursor.y != 112 - 2) {
            this.cursor.y -= 80
        }
        if (Phaser.Input.Keyboard.JustDown(keyA) && this.cursor.x != 176 - 2) {
            this.cursor.x -= 80
        }
        if (Phaser.Input.Keyboard.JustDown(keyS) && this.cursor.y != 192 - 2) {
            this.cursor.y += 80
        }
        if (Phaser.Input.Keyboard.JustDown(keyD) && this.cursor.x != 416 - 2) {
            this.cursor.x += 80
        }
        // return to map view
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
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