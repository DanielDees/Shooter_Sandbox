/*
 * The projectile class
 */

function Projectile(data) {
	//Call the parent to construct.
	Model.call(this);

	this.x = data.x;
	this.y = data.y;

	this.width = data.roundWidth || 5;
	this.height = data.roundHeight || 5;

	//x and y speeds are adjusted for angle fired
	this.speed = {
		x: (data.speed * Math.cos(data.angle)), 
		y: (data.speed * Math.sin(data.angle))
	};

	//Angle fired at
	this.angle = data.angle;

	//Distance projectile can travel before disappearing
	this.range = data.range || 300;

	//Base projectile damage
	this.damage = data.damage || 0;

	//Distance projectile has moved since creation
	this.rangeTraveled = 0;

	this.moveType = data.moveType || "bouncy";

	this.color = data.color || 'black';
}

Projectile.prototype = Object.create(Model.prototype);

//Move projectile
Projectile.prototype.move = function() {
	//Call appropriate move function
	switch(this.moveType) {
		case "normal":
			this.normal();
			break;
		case "bouncy":
			this.bouncy();
			break;
		default:
			this.normal();
	}

	//Distance formula = sqrt(x^2 + y^2)
	var x = Math.pow(this.speed.x, 2);
	var y = Math.pow(this.speed.y, 2);
	var distance = Math.sqrt(x + y);

	this.rangeTraveled += distance;
}

//Deletes self from projectileList
Projectile.prototype.delete = function(toolbox, entities) {

	if (this.rangeTraveled > this.range) {
		return true;
	}

	var that = this;

	//Can probably be pulled out of the projectile class to save memory.
	for (var i = 0; i < entities.length; i++) {
		if (toolbox.collision(that, entities[i])) {
			return true;
		}
	}

	return false;
}

//Renders projectile to screen
Projectile.prototype.draw = function(ctx) {

	//Set color
	ctx.fillStyle = this.getColor();

	//Save current angle of canvas
	ctx.save();

	//Center canvas on projectile
	ctx.translate(this.getX(), this.getY());

	//Rotate canvas to match angle fired at
	ctx.rotate(this.angle);

	//Draw projectile
	ctx.fillRect(0, 0, this.width, this.height);

	//Restore original angle of canvas
	ctx.restore();
};

//Linear movement
Projectile.prototype.normal = function() {
	this.x += this.speed.x;
	this.y += this.speed.y;
};

//Bouncy movement
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

Projectile.prototype.update = function(data) {

	//If the projectile doesn't self delete
	if (!this.delete(data.toolbox, data.entities)) {

		this.move();
		this.draw(data.context);

		return true;
	}

	return false;
}

//Color of the projectile
Projectile.prototype.getColor = function() {
	return this.color;
}

