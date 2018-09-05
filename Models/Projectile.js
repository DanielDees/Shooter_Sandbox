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
				that.bouncy(entities[i]);
			}
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
Projectile.prototype.bouncy = function(entity) {

	//Rotating hitboxes based on angle of projectile 
	//will be needed for better accuracy
	//Collision has alreay been detected
	if (entity) {
		//Collision with top of entity
		if (this.getTop() < entity.getTop()) {
			// this.setBottom(entity.getTop());
			this.speed.y = -Math.abs(this.speed.y);
			console.log('top');
		}
		//Collision with bottom of entity
		else if (this.getBottom() > entity.getBottom()) {
			// this.setTop(entity.getBottom());
			this.speed.y = Math.abs(this.speed.y);
			console.log('bottom');
		}
		//Collision with left of entity
		else if (this.getLeft() < entity.getLeft()) {
			// this.setRight(entity.getLeft());
			this.speed.x = -Math.abs(this.speed.x);
			console.log('left');
		}
		//Collision with right of entity
		else if (this.getRight() > entity.getRight()) {
			// this.setLeft(entity.getRight());
			this.speed.x = Math.abs(this.speed.x);
			console.log('right');
		}

		this.angle = (Math.PI * 2) - this.angle;
		return true;
	}

	//x and y speeds are adjusted for angle fired
	this.x += this.speed.x;
	this.y += this.speed.y;

	//Collision with top of screen
	if (this.getTop() < 0) {

		//Adjust by amoun needed to have bottom where the top collided
		// this.x = 0;
		// this.y = 0;
		
		this.speed.y = Math.abs(this.speed.y);
		this.angle = (Math.PI * 2) - this.angle;
	}
	//Collision with bottom of screen
	if (this.getBottom() > window.innerHeight - this.height) {
		// this.y = window.innerHeight - this.height;
		this.speed.y = -Math.abs(this.speed.y);
		this.angle = (Math.PI * 2) - this.angle;
	}
	//Collision with left of screen
	if (this.getLeft() < 0) {
		// this.x = 0;
		this.speed.x = Math.abs(this.speed.x);
		this.angle = (Math.PI * 2) - this.angle;
	}
	//Collision with right of screen
	if (this.getRight() > window.innerWidth - this.width) {
		// this.x = window.innerWidth - this.width;
		this.speed.x = -Math.abs(this.speed.x);
		this.angle = (Math.PI * 2) - this.angle;
	}
}

Projectile.prototype.update = function(data) {

	this.move();
	this.draw(data.context);
	
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

