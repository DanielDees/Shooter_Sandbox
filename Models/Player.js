/*
 * The player class.
 */
function Player() {

}

Player.prototype = Model.prototype;

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = "blue";
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};