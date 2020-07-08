var RoadRunner = RoadRunner || {};
var bg, levelName, repeat;
RoadRunner.currentlevel = {
    create: function () {
        switch (RoadRunner.level) {
            case 1:
                levelName = 'The Meadow';
                bg = 'url(assets/mealdow.png)';
                repeat = 'forest_tiles';
                break;
            case 2:
                levelName = 'The Forest';
                bg = 'url(assets/forestbg.png)';
                repeat = 'forest';
                break;
            case 3:
                levelName = 'The Mountain';
                bg = 'url(assets/Mountain.png)';
                repeat = 'mountains';
                break;
            case 4:
                levelName = 'The Chase';
                bg = 'url(assets/riverbg.jpg)';
                repeat = 'ocean';
                break;
            default:
                break;
        }

        c = document.getElementsByTagName('html');
        c[0].style.background = bg;
        this.world.height = c[0].offsetHeight;
        console.log(12, this.world.centerX)
        this.background = this.add.tileSprite(0, 0, this.world.width, this.world.height, repeat);
        var nameLabel = this.add.text(375, -50, levelName, {font: '50px Arial', fill: '#ffffff'});
        this.add.tween(nameLabel).to({y: this.world.centerY}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        nameLabel.anchor.setTo(0.5);
        var startLabel = this.add.text(375, this.world.height + 80,
                'press the up arrow key to start',
                {font: '25px Arial', fill: '#ffffff', align: 'center'});
        startLabel.anchor.setTo(0.5);
        this.add.tween(startLabel).to({y: this.world.centerY + 100}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1000).start();

        this.muteButton = this.add.button(20, 20, 'mute', this.toggleSound, this);
// If the mouse is over the button, it becomes a hand cursor
        this.muteButton.input.useHandCursor = true;
        if (this.sound.mute) {
// Change the frame to display the speaker with no sound
            this.muteButton.frame = 1;
        }
        var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);
    },
    start: function () {
        this.state.start('playGame');
    },
    toggleSound: function () {
// Switch the Phaser sound variable from true to false, or false to true
// When 'this.sound.mute = true', Phaser will mute the game
        this.sound.mute = !this.sound.mute;
// Change the frame of the button
        this.muteButton.frame = this.sound.mute ? 1 : 0;
    },
    restart: function () {
        this.state.start('startscreen');
    }

}