'use strict'

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    width: 960,
    height: 544,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Menu, Credits, Map, Battle ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySPACE, keyW, keyA, keyS, keyD

// keeps track of player position
let playerPosX = 500;
let playerPosY = 2500;