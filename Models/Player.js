/*
 * The player class.
 */
function Player() {
	Model.call(this);

	this.width = 20;
	this.height = 20;

	this.speed = 10;
}

Player.prototype = Object.create(Model.prototype);

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = "blue";
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};