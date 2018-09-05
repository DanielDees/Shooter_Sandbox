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

	//Collision has already been detected
	if (entity) {
		//Collision with top of entity
		if (this.getTop() < entity.getTop()) {
			// console.log('top');
			// this.setBottom(entity.getTop());
			this.speed.y = -Math.abs(this.speed.y);
		}
		//Collision with bottom of entity
		else if (this.getBottom() > entity.getBottom()) {
			// console.log('bottom');
			// this.setTop(entity.getBottom());
			this.speed.y = Math.abs(this.speed.y);
		}
		//Collision with left of entity
		else if (this.getLeft() < entity.getLeft()) {
			// console.log('left');
			// this.setRight(entity.getLeft());
			this.speed.x = -Math.abs(this.speed.x);
		}
		//Collision with right of entity
		else if (this.getRight() > entity.getRight()) {
			// console.log('right');
			// this.setLeft(entity.getRight());
			this.speed.x = Math.abs(this.speed.x);
		}

		this.angle = (Math.PI * 2) - this.angle;
		return true;
	}

	//Collision with top of screen
	if (this.getTop() < 0) {

		//Adjust by amoun needed to have bottom where the top collided
		// this.x = 0;
		// this.y = 0;

		this.speed.y = Math.abs(this.speed.y);
		this.angle = (Math.PI * 2) - this.angle;
		this.setTop(1);
	}
	//Collision with bottom of screen
	else if (this.getBottom() > window.innerHeight) {
		this.speed.y = -Math.abs(this.speed.y);
		this.angle = (Math.PI * 2) - this.angle;
		this.setBottom(window.innerHeight - 1);
	}
	//Collision with left of screen
	if (this.getLeft() < 0) {
		this.speed.x = Math.abs(this.speed.x);
		this.angle = (Math.PI * 2) - this.angle;
		this.setLeft(1);
	}
	//Collision with right of screen
	else if (this.getRight() > window.innerWidth) {
		this.speed.x = -Math.abs(this.speed.x);
		this.angle = (Math.PI * 2) - this.angle;
		this.setRight(window.innerWidth - 1);
	}

	// this.angle = (Math.PI * 2) - this.angle;
}

Projectile.prototype.update = function(data) {

	this.move();
	this.moveSpecial();
	this.draw();
	
	//If the projectile doesn't self delete
	if (!this.delete(data.toolbox, data.entities)) {
		return true;
	}

	return false;
}

//Color of the projectile
Projectile.prototype.getColor = function() {
	return this.color;
}

