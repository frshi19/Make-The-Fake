'use strict'

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    width: 1440,
    height: 816,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Menu, Credits, Inventory, Map, Battle ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySPACE, keyW, keyA, keyS, keyD, keyQ, keyE, keyESC, keyTAB

// keeps track of data between scenes
let tutorial = 0

let coins = 500
let level = 0

let playerPosX = 480
let playerPosY = 1920

let roster = ['Swordsman']
let MAXROSTERSIZE = 5

let lastBattle = "2"
let lastWin = false
let wonBattles = []