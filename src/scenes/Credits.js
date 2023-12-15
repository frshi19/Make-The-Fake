class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }

    preload() {

    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.creditsConfig = {
            fontFamily: 'Garamond',
            fontSize: '48px',
            color: '#EEEEEE',
            align: 'Left',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
        }
        this.add.text(0, 0, 'Based on South Park: Season 9 Episode 4, Best Friends Forever\nProgramming by Frank\nArt by Frank\nSound by Frank\n', this.creditsConfig)
        this.creditsConfig.fontFamily = 'Seagram'
        this.add.text(0, 192, 'Seagram Font by zanatlija\n(Free for personal use)', this.creditsConfig)
        this.creditsConfig.fontFamily = 'Garamond'
        this.add.text(0, game.config.height - 48, 'ESC - Back to Menu', this.creditsConfig)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('move_sfx')
            this.scene.start('menuScene')
        }
    }
}