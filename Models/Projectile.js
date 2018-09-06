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

	this.moveType = data.moveType || "bouncy";

	this.color = data.color || 'black';
}

Projectile.prototype = Object.create(Model.prototype);

//Move projectile
Projectile.prototype.moveSpecial = function() {

	if (this.moveType == 'bouncy') {
		this.bounce();
	}
	if (this.moveType == 'spin') {
		this.spin();
	}
}

//Deletes self from projectileList
Projectile.prototype.delete = function(toolbox, entities) {

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

	this.angle += 0.5 / (180 / Math.PI);

	//Reset to 0 every rotation
	if (this.angle >= Math.PI * 2) { 
		this.angle -= Math.PI * 2; 
	}
}

//Bouncy movement special
Projectile.prototype.bounce = function(entity) {

	var flip_angle = (Math.PI * 2) - this.angle;

	//Collision has already been detected
	//Therefore one of these WILL pass the test
	if (entity) {
		//Collision with top of entity
		if (this.getTop() < entity.getTop()) {
			this.speed.y = -Math.abs(this.speed.y);
			this.setTop(entity.getTop());
		}
		//Collision with bottom of entity
		if (this.getBottom() > entity.getBottom()) {
			this.speed.y = Math.abs(this.speed.y);
			this.setBottom(entity.getBottom());
		}
		//Collision with left of entity
		if (this.getLeft() < entity.getLeft()) {
			this.speed.x = -Math.abs(this.speed.x);
			this.setRight(entity.getLeft());
		}
		//Collision with right of entity
		if (this.getRight() > entity.getRight()) {
			this.speed.x = Math.abs(this.speed.x);
			//Why on earth do you need to add this.width for it to work?
			this.setLeft(entity.getRight() + this.width);
		}

		this.angle = flip_angle;
		return true;
	}

	//Collision with top of screen
	if (this.getTop() < 0) {
		this.speed.y = Math.abs(this.speed.y);
		this.angle = flip_angle;
		this.setTop(1);
	}
	//Collision with bottom of screen
	else if (this.getBottom() > window.innerHeight) {
		this.speed.y = -Math.abs(this.speed.y);
		this.angle = flip_angle;
		this.setBottom(window.innerHeight - 1);
	}
	//Collision with left of screen
	if (this.getLeft() < 0) {
		this.speed.x = Math.abs(this.speed.x);
		this.angle = flip_angle;
		this.setLeft(1);
	}
	//Collision with right of screen
	else if (this.getRight() > window.innerWidth) {
		this.speed.x = -Math.abs(this.speed.x);
		this.angle = flip_angle;
		this.setRight(window.innerWidth - 1);
	}
}

Projectile.prototype.update = function(data) {

	this.move();
	
	//If the projectile doesn't self delete
	if (!this.delete(data.toolbox, data.entities)) {
		
		this.moveSpecial();
		this.draw();

		return true;
	}

	return false;
}

//Color of the projectile
Projectile.prototype.getColor = function() {
	return this.color;
}

