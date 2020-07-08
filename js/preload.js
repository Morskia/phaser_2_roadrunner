var RoadRunner = RoadRunner || {};

RoadRunner.preload = {
    // preload assets for game
    preload: function () {
        this.load.path = 'assets/';
        this.preloadBar = this.add.sprite(this.world.centerX - 130, this.world.centerY, 'progressBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.load.images(['forest_tiles', 'forest', 'mountains', 'ocean', 'stones', 'hole', 'traffic', 'police', 'car']);
        this.load.image('ice', 'icespot.png');
        this.load.tilemap('road1', 'road1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('road2', 'road2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('road3', 'road3.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('road4', 'road4.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'tiles.png');
        this.load.image('tiles2', 'tiles2.png');
        this.load.image('tiles3', 'tiles3.png');
        this.load.image('tiles4', 'tiles4.png');
        this.load.spritesheet('mute', 'mute.png', 28, 22);
//        this.load.spritesheet('fire', 'flame.png', 32, 75, 4);
//// Sound when the player jumps
//        this.load.audio('jump', ['jump.ogg', 'jump.mp3']);
//        this.load.audio('levelup', ['levelup.ogg', 'levelup.mp3']);
//
//// Sound when the player takes a coin
//        this.load.audio('coin', ['coin.ogg', 'coin.mp3']);
//// Sound when the player dies
//        this.load.audio('dead', ['dead.ogg', 'dead.mp3']);
////background music       

    },
    create: function () {
        this.state.start('currentlevel');
    }
};

