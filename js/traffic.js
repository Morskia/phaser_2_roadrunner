RoadRunner.traffic = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;


}
RoadRunner.traffic.prototype = Object.create(Phaser.Sprite.prototype);
RoadRunner.traffic.prototype.constructor = RoadRunner.traffic;

RoadRunner.traffic.prototype.reset = function (x, y, speedY, angle, startPosition) {
    Phaser.Sprite.prototype.reset.call(this, x, y);
    this.body.velocity.y = speedY;
    this.angle = angle;
    this.startPosition = startPosition;
    

};
RoadRunner.traffic.prototype.update = function () {
    if (this.startPosition === 1 && this.body.position.y >= this.game.camera.y + HEIGHT) {
        this.kill();
    }

};