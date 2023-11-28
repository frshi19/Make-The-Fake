class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    preload() {
        this.load.path = 'assets/'
        this.load.image('map', 'map.png')
        this.load.image('player', 'player.png')
        this.load.image('overlay', 'map_overlay.png')
    }

    create() {
        // go to menu scene
        this.scene.start('menuScene')
    }
}