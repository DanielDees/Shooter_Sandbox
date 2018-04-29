/*
 * The projectile class
 */

function Projectile(data) {
	//Call the parent to construct.
	Model.call(this);

	this.x = data.x;
	this.y = data.y;

	this.width = 5;
	this.height = 5;

	//x and y speeds are adjusted for angle fired
	this.speed = {
		x: (3 * Math.cos(data.angle)), 
		y: (3 * Math.sin(data.angle))
	};

	this.angle = data.angle;
}

Projectile.prototype = Object.create(Model.prototype);

Projectile.prototype.draw = function(ctx) {
	ctx.fillStyle = "green";
	ctx.fillRect(this.getX() - (this.width / 2), this.getY() - (this.height / 2), this.width, this.height);
};

Projectile.prototype.normal = function() {
	this.x += this.speed.x;
	this.y += this.speed.y;
};

Projectile.prototype.bouncy = function() {

	//x and y speeds are adjusted for angle fired
	this.x += this.speed.x;
	this.y += this.speed.y;

	//Collision with top of screen
	if (Math.max(this.getY() + this.speed.y, 0) == 0) {
		this.y = 0;
		this.speed.y = -this.speed.y;
	}
	//Collision with bottom of screen
	if (Math.min(this.getY() + this.speed.y, window.innerHeight - this.height) == window.innerHeight - this.height) {
		this.y = window.innerHeight - this.height;
		this.speed.y = -this.speed.y;
	}
	//Collision with left of screen
	if (Math.max(this.getX() + this.speed.x, 0) == 0) {
		this.x = 0;
		this.speed.x = -this.speed.x;
	}
	//Collision with right of screen
	if (Math.min(this.getX() + this.speed.x, window.innerWidth - this.width) == window.innerWidth - this.width) {
		this.x = window.innerWidth - this.width;
		this.speed.x = -this.speed.x;
	}
}