class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    create() {
        // temporary menu
        this.menuConfig = {
            fontFamily: 'Seagram',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#CCCCCC',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
        }
        this.add.text(game.config.width/2, game.config.height/4, 'Heaven Vs. Hell (PROTOTYPE)', this.menuConfig).setOrigin(0.5)

        this.add.text(game.config.width/2, game.config.height/2, 'Press Space to Start', this.menuConfig).setOrigin(0.5)

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('move_sfx')
            this.scene.start('mapScene')
        }
    }
}