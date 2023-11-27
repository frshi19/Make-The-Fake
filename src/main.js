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
    width: 1280,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Load, Menu, Credits, Map, Battle ]
}

let game = new Phaser.Game(config);