class Load extends Phaser.Scene {
    constructor(){
        super("loadScene");
    }

    preload() {
        // load map images
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

        // load battle images
        this.load.image('angelBaseImg', 'angelBaseImg.png')
        this.load.image('demonBaseImg', 'demonBaseImg.png')

        // load angel icons
        this.load.image('Swordsman_icon', 'sword_icon.png')
        this.load.image('Archer_icon', 'archer_icon.png')
        this.load.image('Axeman_icon', 'axe_icon.png')
        this.load.image('Shieldbearer_icon', 'shield_icon.png')
        this.load.image('Spearman_icon', 'spearman_icon.png')
        this.load.image('Cavalry_icon', 'cavalry_icon.png')
        this.load.image('Archangel_icon', 'archangel_icon.png')
        this.load.image('God_icon', 'question_mark.png')

        // load demon icons
        this.load.image('Warrior_icon', 'warrior_icon.png')
        this.load.image('Pyromancer_icon', 'pyro_icon.png')

        // load angel info
        this.load.image('Swordsman_info', 'swordsman_info.png')
        this.load.image('Archer_info', 'archer_info.png')
        this.load.image('Axeman_info', 'axeman_info.png')
        this.load.image('Shieldbearer_info', 'shield_info.png')
        this.load.image('Spearman_info', 'spear_info.png')
        this.load.image('Cavalry_info', 'cavalry_info.png')
        this.load.image('Archangel_info', 'archangel_info.png')
        this.load.image('God_info', 'God_info.png')

        // load tileset and info
        this.load.image('tilesetImage', 'tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'map.json')
        this.load.tilemapTiledJSON('tilemapJSON2', 'battlefield.json')

        // load sfx and music
        this.load.audio('move_sfx', 'move.wav')
        this.load.audio('in_sfx', 'click_in.wav')
        this.load.audio('out_sfx', 'click_out.wav')
        this.load.audio('err_sfx', 'click_err.wav')
        this.load.audio('select_sfx', 'select.wav')
    }

    create() {
        // go to menu scene
        this.scene.start('menuScene')
    }
}