class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    preload() {

    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('move_sfx')
            this.scene.start('menuScene')
        }
    }
}