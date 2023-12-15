class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create() {
        // temporary menu
        this.menuConfig = {
            fontFamily: 'Seagram',
            fontSize: '72px',
            color: '#EEEE00',
            align: 'Left',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
        }
        this.add.text(0, game.config.height/2, 'SPACE - Start\n             G - God/Grader Mode\n             C - Credits', this.menuConfig)
        this.add.image(0,0,'title').setOrigin(0,0)

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('move_sfx')
            this.scene.start('mapScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyG)) {
            coins = 9999
            this.sound.play('move_sfx')
            this.scene.start('mapScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.sound.play('move_sfx')
            this.scene.start('creditsScene')
        }
    }
}