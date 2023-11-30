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

        // create inventory objects
        this.add.image(0, 0, 'inventory').setOrigin(0)

        // keyboard defs
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    update() {
        // return to map view
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('mapScene')
        }
    }
}