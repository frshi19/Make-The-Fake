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

        this.archer = this.physics.add.image(176, 112, 'archer_icon').setOrigin(0,0)
        this.archer.name = 'Archer'
        troops.push(this.archer)

        this.sword = this.physics.add.image(256, 112, 'sword_icon').setOrigin(0,0)
        this.sword.name = 'Swordsman'
        troops.push(this.sword)

        this.shield = this.physics.add.image(416, 112, 'shield_icon').setOrigin(0,0)
        this.shield.name = 'Shieldbearer'
        troops.push(this.shield)

        this.axe = this.physics.add.image(336, 112, 'axe_icon').setOrigin(0,0)
        this.axe.name = 'Axeman'
        troops.push(this.axe)

        this.spearman = this.physics.add.image(176, 192, 'spearman_icon').setOrigin(0,0)
        this.spearman.name = 'Spearman'
        troops.push(this.spearman)

        this.cavalry = this.physics.add.image(256, 192, 'cavalry_icon').setOrigin(0,0)
        this.cavalry.name = 'Cavalry'
        troops.push(this.cavalry)

        
        this.archangel = this.physics.add.image(336, 192, 'archangel_icon').setOrigin(0,0)
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

        // adding troops to roster
        this.physics.add.overlap(this.cursor, troops, (cursor, troop)=> {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (troop.name == 'Archer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Archer')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                } else if (troop.name == 'Swordsman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Swordsman')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Shieldbearer'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Shieldbearer')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Axeman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Axeman')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Spearman'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Spearman')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Cavalry'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Cavalry')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
                else if (troop.name == 'Archangel'){ 
                    if (roster.length < MAXROSTERSIZE && level >= 1 && !this.checkDuplicates(troop)) {
                        roster.push('Archangel')
                    } else if(this.checkDuplicates(troop)){
                        this.removeTroop(troop)
                    } else {
                        console.log("NUH UH (play err anim)")
                    }
                }
            }
        })
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
}