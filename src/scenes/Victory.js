class Victory extends Phaser.Scene {
    constructor(){
        super("victoryScene");
    }

    preload() {

    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.add.image(0,0, 'victoryScreen').setOrigin(0,0)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('move_sfx')
            this.scene.start('menuScene')
        }
    }
}