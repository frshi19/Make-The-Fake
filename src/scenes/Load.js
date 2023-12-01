class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    preload() {
        this.load.path = 'assets/'
        this.load.image('map', 'map.png')
        this.load.image('player', 'player.png')
        this.load.image('overlay', 'map_overlay.png')
        this.load.image('overlay2', 'battle_overlay.png')
        this.load.image('frame', 'camera_frame.png')
        this.load.image('red_dot', 'red_dot.png')
        this.load.image('blue_box', 'blue_box.png')
        this.load.image('black_box', 'black_box.png')
        this.load.image('inventory', 'inventory.png')
        this.load.image('cursor', 'cursor.png')

        // load icons
        this.load.image('Shieldbearer_icon', 'shield_icon.png')
        this.load.image('Axeman_icon', 'axe_icon.png')
        this.load.image('Swordsman_icon', 'sword_icon.png')
        this.load.image('Archer_icon', 'archer_icon.png')
        this.load.image('Archangel_icon', 'archangel_icon.png')
        this.load.image('Spearman_icon', 'spearman_icon.png')
        this.load.image('Cavalry_icon', 'cavalry_icon.png')
        this.load.image('question_mark', 'question_mark.png')

        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json')
        this.load.tilemapTiledJSON('tilemapJSON2', 'battlefield.json')
    }

    create() {
        // go to menu scene
        this.scene.start('menuScene')
    }
}