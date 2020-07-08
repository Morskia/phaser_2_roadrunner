var RoadRunner = RoadRunner || {};
var hurdle, tween, speedText;
var speed = 220;
window.onload = function () {
    c = document.getElementsByTagName('canvas');
    HEIGHT = c[0].offsetHeight;
};

RoadRunner.playGame = {
    init: function () {
        this.cursor = this.input.keyboard.createCursorKeys(); // active default buttons
        this.finished = false;
    },
    create: function () {


        switch (RoadRunner.level) {
            case 1:
                this.world.setBounds();
                this.background = this.add.tileSprite(0, 0, 800, 4000, 'forest_tiles');
                this.map = this.add.tilemap('road1');
                this.layerItems = this.map.addTilesetImage('tiles');
                this.layer = this.map.createLayer('Tile Layer 1');
                this.layer.resizeWorld();
                this.player = this.add.sprite(this.world.centerX, 4000, 'car');
                break;
            case 2:
                this.world.setBounds();
                this.background = this.add.tileSprite(0, 0, 1000, 8000, 'forest');
                this.map = this.add.tilemap('road2');
                this.layerItems = this.map.addTilesetImage('tiles2');
                this.layer = this.map.createLayer('Tile Layer 1');
                this.layer.resizeWorld();
                this.player = this.add.sprite(this.world.centerX, 8000, 'car');
                break;
            case 3:
                this.world.setBounds();
                this.background = this.add.tileSprite(0, 0, 1250, 8000, 'mountains');
                this.map = this.add.tilemap('road3');
                this.layerItems = this.map.addTilesetImage('tiles3');
                this.layer = this.map.createLayer('Tile Layer 1');
                this.layer.resizeWorld();
                this.player = this.add.sprite(this.world.centerX, 8000, 'car');
                break;
            case 4:
                this.world.setBounds();
                this.background = this.add.tileSprite(0, 0, 1250, 8000, 'ocean');
                this.map = this.add.tilemap('road4');
                this.layerItems = this.map.addTilesetImage('tiles4');
                this.layer = this.map.createLayer('Tile Layer 1');
                this.layer.resizeWorld();
                this.time.events.add(5000, this.addCop, this);
                this.player = this.add.sprite(this.world.centerX, 8000, 'car');
                break;
            default :
                break;
        }
        this.map.setTileIndexCallback(4, this.outOfTrack, this);
        this.map.setTileIndexCallback(3, this.finish, this);
        //add car
        this.player.anchor.setTo(0.5);
        this.player.STATUS = 'onmove';
        this.physics.arcade.enable(this.player);
        this.camera.follow(this.player);
        //add enemy
        switch (RoadRunner.level) {
            case 2:
                this.holes = this.add.group();
                this.holes.enableBody = true;
                this.game.time.events.loop(1200, this.addHole, this);
                break;
            case 3:
                this.holes = this.add.group();
                this.holes.enableBody = true;
                this.game.time.events.loop(1200, this.addHole, this);
                this.ice = this.add.group();
                this.ice.enableBody = true;
                this.game.time.events.loop(2200, this.addIce, this);
            default:
                break;
        }

        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        this.game.time.events.loop(1100, this.addEnemy, this);
        speedText = this.add.text(100, 100, "Speed: " + speed, {
            font: "25px Arial",
            fill: "#ff0044",
            align: "center"
        });
        speedText.anchor.setTo(0.5, 0.5);
        speedText.fixedToCamera = true;
    },
    update: function () {
        speedText.setText("Speed: " + speed);
        this.movePlayer();
        this.physics.arcade.collide(this.player, this.layer);
        this.physics.arcade.collide(this.player, this.enemies, this.crash, null, this);
        switch (RoadRunner.level) {
            case 2:
                this.physics.arcade.collide(this.player, this.holes, this.crash, null, this);
                break;
            case 3:
                this.physics.arcade.collide(this.player, this.holes, this.crash, null, this);
                this.physics.arcade.collide(this.player, this.ice, this.spin, null, this);
                break;
            default:
                break;
        }
        if (this.police) {
            this.police.body.velocity.y = this.player.body.velocity.y - 50;
            this.police.body.velocity.x = this.player.body.velocity.x;
        }
    },
    finish: function () {
        if (this.finished === false) {
            this.finished = true;
            var nameLabel = this.add.text(this.world.centerX, -50, 'Finish', {font: '50px Arial', fill: '#ffffff'});
            nameLabel.anchor.setTo(0.5);
            this.add.tween(nameLabel).to({y: HEIGHT / 2}, 1000).easing(Phaser.Easing.Bounce.Out).start();
            this.time.events.add(4000, this.newLevel, this);
            return;
        }
    },
    addCop: function () {
        this.police = this.add.sprite(this.world.centerX, this.camera.y + HEIGHT - 200, 'police');
        this.police.anchor.setTo(0.5);
        this.physics.arcade.enable(this.police);
    },
    outOfTrack: function () {
        this.player.body.velocity.y = 0;
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -5;
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 5;
        }
    },
    crash: function (player, e) {
        e.kill();
        if ((this.player.STATUS === 'onmove' || this.player.STATUS === 'crazy') && this.finished === false) {
            this.player.STATUS = 'crashed';
            this.crashed = this.add.text(this.world.centerX, this.camera.y + HEIGHT / 2, 'CRASHED', {font: '38px Arial', fill: '#ffffff'});
            this.crashed.anchor.setTo(0.5);
            this.player.body.velocity.y = 0;
            this.player.body.bounce.y = -1;
            if (this.cursor.left.isDown) {
                this.player.body.velocity.x = -5;
            }
            else if (this.cursor.right.isDown) {
                this.player.body.velocity.x = 5;
            }
            this.time.events.add(2000, function () {
                this.player.STATUS = 'onmove';
                this.world.remove(this.crashed);
            }, this);
        }
    },
    spin: function (player, e) {
        e.kill();
        tween = this.add.tween(player).to({angle: 360}, 2500, Phaser.Easing.linear).start();
        tween.onComplete.add(goCrazy, this);
        player.STATUS = 'crazy';
        function goCrazy() {
            if (this.player.STATUS !== 'crashed') {
                this.player.STATUS = 'onmove';
            }
        }
    },
    addEnemy: function () {
        var lastCar = null;
        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new RoadRunner.traffic(this.game, 0, 0, 'traffic');
            this.enemies.add(enemy);
        }
        switch (RoadRunner.level) {
            case 1:
                var randomValue = this.rnd.between(1, 5);
                if (lastCar === randomValue) {
                    this.addEnemy;
                }
                switch (randomValue) {
                    case 1:
                        enemy.reset(this.world.centerX - 50, this.camera.y, 350, 0, 1);
                        lastCar = 1;
                        break;
                    case 2:
                        enemy.reset(this.world.centerX - 25, this.camera.y, 250, 0, 1);
                        lastCar = 2;
                        break;
                    case 3:
                        enemy.reset(this.world.centerX, this.camera.y, 400, 0, 1);
                        lastCar = 3;
                        break;
                    case 4:
                        enemy.reset(this.world.centerX + 50, this.camera.y + HEIGHT, -500, 180, 2);
                        lastCar = 4;
                        break;
                    case 5:
                        enemy.reset(this.world.centerX + 25, this.camera.y + HEIGHT, -300, 180, 2);
                        lastCar = 5;
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                var randomValue = this.rnd.between(1, 5);
                if (lastCar === randomValue) {
                    this.addEnemy;
                }
                switch (randomValue) {
                    case 1:
                        enemy.reset(this.world.centerX - 60, this.camera.y, 350, 0, 1);
                        lastCar = 1;
                        break;
                    case 2:
                        enemy.reset(this.world.centerX - 30, this.camera.y, 250, 0, 1);
                        lastCar = 2;
                        break;
                    case 3:
                        enemy.reset(this.world.centerX, this.camera.y, 400, 0, 1);
                        lastCar = 3;
                        break;
                    case 4:
                        enemy.reset(this.world.centerX + 60, this.camera.y + HEIGHT, -500, 180, 2);
                        lastCar = 4;
                        break;
                    case 5:
                        enemy.reset(this.world.centerX + 30, this.camera.y + HEIGHT, -300, 180, 2);
                        lastCar = 5;
                        break;
                    default:
                        break;
                }
                break;
            case 3:
                var randomValue = this.rnd.between(1, 5);
                if (lastCar === randomValue) {
                    this.addEnemy;
                }
                switch (randomValue) {
                    case 1:
                        enemy.reset(this.world.centerX - 80, this.camera.y, 350, 0, 1);
                        lastCar = 1;
                        break;
                    case 2:
                        enemy.reset(this.world.centerX - 50, this.camera.y, 250, 0, 1);
                        lastCar = 2;
                        break;
                    case 3:
                        enemy.reset(this.world.centerX, this.camera.y, 400, 0, 1);
                        lastCar = 3;
                        break;
                    case 4:
                        enemy.reset(this.world.centerX + 80, this.camera.y + HEIGHT, -500, 180, 2);
                        lastCar = 4;
                        break;
                    case 5:
                        enemy.reset(this.world.centerX + 50, this.camera.y + HEIGHT, -300, 180, 2);
                        lastCar = 5;
                        break;
                    default:
                        break;
                }
                break;
        }
    },
    addHole: function () {
        switch (RoadRunner.level) {
            case 2:
                hurdle = 'hole';
                break;
            case 3:
                hurdle = 'stones';
        }
        var hole = this.holes.getFirstExists(false);
        if (!hole) {
            hole = new RoadRunner.traffic(this.game, 0, 0, hurdle);
            this.holes.add(hole);
        }
        var randomX = this.rnd.between(this.world.centerX - 50, this.world.centerX + 50);
        if (this.player.STATUS !== 'crashed' || this.player.STATUS !== 'crazy') {
            hole.reset(randomX, this.camera.y, 0, 0, 1);
        }
        hole.body.setSize(30, 16);
    },
    addIce: function () {
        var singleIce = this.ice.getFirstExists(false);
        if (!singleIce) {
            singleIce = new RoadRunner.traffic(this.game, 0, 0, 'ice');
            this.ice.add(singleIce);
        }
        var randomX = this.rnd.between(this.world.centerX - 50, this.world.centerX + 50);
        if (this.player.STATUS !== 'crashed' || this.player.STATUS !== 'crazy') {
            singleIce.reset(randomX, this.camera.y, 0, 0, 1);
        }
        singleIce.body.setSize(40, 40);
    },
    movePlayer: function () {
        if (this.cursor.left.isDown && this.player.STATUS === 'onmove') {
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.left.isDown && this.player.STATUS === 'crazy') {
            this.player.body.velocity.x = 200;
        }
        else if (this.cursor.right.isDown && this.player.STATUS === 'onmove') {
            this.player.body.velocity.x = 200;
        }
        else if (this.cursor.right.isDown && this.player.STATUS === 'crazy') {
            this.player.body.velocity.x = -200;
        }
        else {
            this.player.body.velocity.x = 0;
        }
        if (this.cursor.up.isDown && this.player.STATUS !== 'crashed') {

            if (speed >= 220 && speed <= 450) {
                speed += 3;
                this.player.body.velocity.y = -speed;
            }
        }
        else if (this.cursor.down.isDown && this.player.STATUS !== 'crashed') {

            if (speed > 0) {
                speed -= 3;
                this.player.body.velocity.y = -speed;
            } else {
                speed = 0;
                this.player.body.velocity.y = speed;
            }
        }
        else {
            if (this.player.STATUS !== 'crashed') {
                if (speed > 220) {
                    speed -= 5;
                    this.player.body.velocity.y = -speed;
                } else {
                    speed = 220;
                    this.player.body.velocity.y = -speed;
                }
            }
        }
    },
    newLevel: function () {
        RoadRunner.level++;
        this.state.start('currentlevel');
    }
};

