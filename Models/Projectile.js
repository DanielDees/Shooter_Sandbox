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
Projectile.prototype.moveSpecial = function(entities) {

	if (this.moveType == 'spin') {
		this.spin();
	}

	if (this.moveType == 'bouncy') {
		for (var i = 0; i < entities.length; i++) {
			if (toolbox.collision(this, entities[i])) {
				this.bounce(entities[i]);
			}
		}
	}
}

//Deletes self from projectileList
Projectile.prototype.delete = function(entities) {

	//Projectile range exceeded
	if (this.distanceTraveled > this.range) {
		return true;
	}

	//Outside of map boundaries
	if (this.getRight() < 0 || 
		this.getBottom() < 0 || 
		this.getTop() > GAME_MAP.size || 
		this.getLeft() > GAME_MAP.size) {
		return true;
	}

	//Collision with an entity
	if (this.moveType != 'bouncy') {
		for (var i = 0; i < entities.length; i++) {
			if (toolbox.collision(this, entities[i])) {
				return true;
			}
		}
	}

	return false;
}

//Renders projectile to screen
Projectile.prototype.draw = function() {

	//Check if within player FOV
	if (this.getRight() < player.FOV.x() || 
		this.getLeft() > player.FOV.x() + canvas.width ||
		this.getBottom() < player.FOV.y() ||
		this.getTop() > player.FOV.y() + canvas.height) {
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

	this.setHitboxBounds();
}

//Bouncy movement special
Projectile.prototype.bounce = function(entity) {

	var collision = {
		top: {
			detected: false, 
			degree: entity.getTop() - this.getTop(), 
		},
		left: {
			detected: false, 
			degree: entity.getLeft() - this.getLeft(),
		},
		bottom: {
			detected: false, 
			degree: this.getBottom() - entity.getBottom(),
		},
		right: {
			detected: false, 
			degree: this.getRight() - entity.getRight(),
		},
	};

	if (collision.top.degree > 0 && this.speed.y > 0) {
		collision.top.detected = true;
	}
	if (collision.left.degree > 0 && this.speed.x > 0) {
		collision.left.detected = true;
	}
	if (collision.bottom.degree > 0 && this.speed.y < 0) {
		collision.bottom.detected = true;
	}
	if (collision.right.degree > 0 && this.speed.x < 0) {
		collision.right.detected = true;
	}

	//Find side projectile hit the hardest
	var max = Math.max(collision.top.degree, 
					collision.bottom.degree, 
					collision.left.degree, 
					collision.right.degree);

	if (max > 0) {	
		if (collision.top.detected && collision.top.degree == max) {
			this.speed.y = -Math.abs(this.speed.y);
			this.angle = (Math.PI * 2) - this.angle;
			this.setHitboxBounds();
			this.setBottom(entity.getTop());
		}
		if (collision.bottom.detected && collision.bottom.degree == max) {
			this.speed.y = Math.abs(this.speed.y);
			this.angle = (Math.PI * 2) - this.angle;
			this.setHitboxBounds();
			this.setTop(entity.getBottom());
		}
		if (collision.left.detected && collision.left.degree == max) {
			this.speed.x = -Math.abs(this.speed.x);
			this.angle = (Math.PI * 2) - this.angle;
			this.setHitboxBounds();
			this.setRight(entity.getLeft());
		}
		if (collision.right.detected && collision.right.degree == max) {
			this.speed.x = Math.abs(this.speed.x);
			this.angle = (Math.PI * 2) - this.angle;
			this.setHitboxBounds();
			//Why on earth do you need to add this.width for it to work?
			this.setLeft(entity.getRight() + this.width);
		}
	}

	return true;
}

Projectile.prototype.updateZone = function() {

	//Zone projectile is in prior to move() call
	var newZone = this.getMapZone();

	//Update Zone
	this.setMapZone();

	//Zone projectile has moved to
	var oldZone = this.getMapZone();

	//If in or moving to an invalid zone
	if (!oldZone || !newZone) {
		return false;
	}

	//For the callback on findIndex
	var that = this;

	//Get index of current model
	var index = GAME_MAP.zones[oldZone[0]][oldZone[1]].projectiles.findIndex(function(i) {
		return i.id == that.id;
	});

	//Update model zone location
	if (oldZone != newZone) {
		GAME_MAP.zones[oldZone[0]][oldZone[1]].projectiles.splice(index, 1);
		GAME_MAP.zones[newZone[0]][newZone[1]].projectiles.push(this);
	}
}

Projectile.prototype.update = function(data) {

	//Default movement
	this.move();

	//Switch to correct zone for collisions
	this.updateZone();

	//Apply any special movements
	this.moveSpecial(data.entities);

	//If the projectile self deletes
	if (this.delete(data.entities)) {
		return false;
	}

	return true;
}