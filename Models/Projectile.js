/*
 * The projectile class
 */

function Projectile(data) {
	//Call the parent to construct.
	Model.call(this);

	this.x = data.x;
	this.y = data.y;

	this.width = 20;
	this.height = 20;

	this.speed = 10;
	this.angle = data.angle;
}

Projectile.prototype = Object.create(Model.prototype);

Projectile.prototype.draw = function(ctx) {
	ctx.fillStyle = "green";
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};

Projectile.prototype.move = function() {
	//x and y speeds are adjusted for angle fired
	this.x += this.speed * Math.cos(this.angle);
	this.y += this.speed * Math.sin(this.angle);
};