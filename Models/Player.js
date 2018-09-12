;"use strict";

/*
 * The player class.
 */

function Player() {
	//Call the parent to construct.
	Model.call(this);

	this.width = 30;
	this.height = 30;

	this.FOV = {
		x: () => {
			return this.getX() - (canvas.width / 2) + (this.getWidth() / 2);
		},
		y: () => {
			return this.getY() - (canvas.height / 2) + (this.getHeight() / 2);
		},
	};	

	this.speed = 8;

	this.weapon = new Weapon();

	this.weapons = [];
};

Player.prototype = Object.create(Model.prototype);

Player.prototype.draw = function() {
	ctx.fillStyle = this.getColor();
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};

Player.prototype.move = function(entity) {
	
	//!PROJECT_ISSUE
	//For some reason you have to have one pixel space between you and the entity.
	//Not sure why the collision is occuring when there isn't the extra pixel
	if (entity) {
		//Collision with top of entity
		if (this.getTop() < entity.getTop() && keyboard.keys.s) {
			this.setBottom(entity.getTop() - 1);
		}
		//Collision with left of entity
		else if (this.getLeft() < entity.getLeft() && keyboard.keys.d) {
			this.setRight(entity.getLeft() - 1);
		}
		//Collision with bottom of entity
		else if (this.getBottom() > entity.getBottom() && keyboard.keys.w) {
			this.setTop(entity.getBottom() + 1);
		}
		//Collision with right of entity
		else if (this.getRight() > entity.getRight() && keyboard.keys.a) {
			//Why on earth do you need to add this.width for it to work?
			this.setLeft(entity.getRight() + 1);
		}

		return true;
	}

	if (keyboard.keys.w) {
		this.setY(this.getY() - this.speed);
	}
	if (keyboard.keys.s) {
		this.setY(this.getY() + this.speed);
	}
	if (keyboard.keys.a) {
		this.setX(this.getX() - this.speed);
	}
	if (keyboard.keys.d) {
		this.setX(this.getX() + this.speed);
	}


};

Player.prototype.getWeapon = function() {
	return this.weapon;
};

Player.prototype.setWeapon = function(weapon) {
	this.weapon = weapon;
	return this;
};

Player.prototype.addWeapon = function(weapon) {
	this.weapons.push(weapon);
	return this;
};

Player.prototype.switchWeapon = function() {
	
	for (var i = 0; i < this.weapons.length; i++) {
		if (this.weapons[i].name == this.weapon.name) {
			//If using last weapon, switch to first one.
			if (i == this.weapons.length - 1) {
				this.setWeapon(this.weapons[0]);
				return true;
			}
			//Switch to next weapon in list if there is one
			if (i < this.weapons.length - 1) {
				this.setWeapon(this.weapons[i + 1]);
				return true;
			}
		}
	}

	return false;
};

Player.prototype.update = function() {

	//Default movement
	this.move();

	//Switch to correct zone for collisions
	this.updateZone();

	return true;
};
