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
    scene: [ Load, Menu, Credits, Inventory, Map, Battle ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySPACE, keyW, keyA, keyS, keyD, keyESC

// keeps track of data between scenes
let coins = 500;
let playerPosX = 480
let playerPosY = 1920