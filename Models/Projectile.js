;"use strict";

/*
 * The projectile class
 */

function Projectile(data) {
	//Call the parent to construct.
	Model.call(this);

	this.debug = data.debug || false;

	this.x = data.x;
	this.y = data.y;

	this.width = data.roundWidth || 5;
	this.height = data.roundHeight || 5;

	//Speed is adjusted for angle fired
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

	this.moveType = data.moveType || "bouncy";

	this.color = data.color || 'black';
}

Projectile.prototype = Object.create(Model.prototype);

//Move projectile
Projectile.prototype.moveSpecial = function() {

	if (this.moveType == 'spin') {
		this.spin();
	}
}

//Deletes self from projectileList
Projectile.prototype.delete = function(entities) {

	if (this.distanceTraveled > this.range) {
		return true;
	}

	var that = this;

	if (this.moveType != 'bouncy') {
		//Can probably be pulled out of the projectile class to save memory.
		for (var i = 0; i < entities.length; i++) {
			if (toolbox.collision(that, entities[i])) {
				return true;
			}
		}
	}

	if (this.moveType == 'bouncy') {
		//Can probably be pulled out of the projectile class to save memory.
		for (var i = 0; i < entities.length; i++) {
			if (toolbox.collision(that, entities[i])) {
				that.bounce(entities[i]);
			}
		}
	}

	return false;
}

//Renders projectile to screen
Projectile.prototype.draw = function() {

	//Check if within player FOV
	if (this.getRight() < -player.FOV.x() || 
		this.getLeft() > -player.FOV.x() + canvas.width ||
		this.getBottom() < -player.FOV.y() ||
		this.getTop() > -player.FOV.y() + canvas.height) {
		return false;
	}

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

	if (this.debug) {
		this.drawDebug();
	}
};

Projectile.prototype.spin = function() {

	this.angle += 1 / (180 / Math.PI);

	//Reset to 0 every rotation
	if (this.angle >= Math.PI * 2) { 
		this.angle -= Math.PI * 2; 
	}
}

//Bouncy movement special
Projectile.prototype.bounce = function(entity) {

	//Collision with top of entity
	if (this.getTop() < entity.getTop() && this.speed.y > 0) {
		this.speed.y = -Math.abs(this.speed.y);
		this.angle = (Math.PI * 2) - this.angle;
		this.setTop(entity.getTop());
	}
	//Collision with left of entity
	if (this.getLeft() < entity.getLeft() && this.speed.x > 0) {
		this.speed.x = -Math.abs(this.speed.x);
		this.angle = (Math.PI * 2) - this.angle;
		this.setRight(entity.getLeft());
	}
	//Collision with bottom of entity
	if (this.getBottom() > entity.getBottom() && this.speed.y < 0) {
		this.speed.y = Math.abs(this.speed.y);
		this.angle = (Math.PI * 2) - this.angle;
		this.setTop(entity.getBottom());
	}
	//Collision with right of entity
	if (this.getRight() > entity.getRight() && this.speed.x < 0) {
		this.speed.x = Math.abs(this.speed.x);
		this.angle = (Math.PI * 2) - this.angle;
		//Why on earth do you need to add this.width for it to work?
		this.setLeft(entity.getRight() + this.width);
	}

	return true;
}

Projectile.prototype.update = function(data) {

	this.move();
	this.moveSpecial();

	//If the projectile self deletes
	if (this.delete(data.entities)) {
		return false;
	}

	return true;
}