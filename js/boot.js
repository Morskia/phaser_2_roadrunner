var RoadRunner = {
    music: null,
    level: 1
};

RoadRunner.boot = {
    // set default parametrs to engine
    init: function () {
  
        this.input.maxPointers = 2;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
       // this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.ARCADE);
    },
    // preload assets for game
    preload: function () {
        this.load.path = 'assets/';
        this.load.image('progressBar', 'progressBar.png');

    },
    create: function () {
        this.state.start('preload');
    }
};

