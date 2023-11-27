class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    create() {
        // go to menu scene
        this.scene.start('menuScene')
    }
}