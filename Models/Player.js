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
			return -(this.getX() - (canvas.width / 2) + (this.getWidth() / 2));
		},
		y: () => {
			return -(this.getY() - (canvas.height / 2) + (this.getHeight() / 2));
		},
	};	

	this.speed = 8;

	this.weapon = new Weapon();

	this.weapons = [];
}

Player.prototype = Object.create(Model.prototype);

Player.prototype.draw = function() {
	ctx.fillStyle = this.getColor();
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};

Player.prototype.move = function(keyboard) {
	//Collision with top of screen
	if (keyboard.keys.w) {
		this.y = this.getY() - this.speed;
	}
	//Collision with bottom of screen
	if (keyboard.keys.s) {
		this.y = this.getY() + this.speed;
	}
	//Collision with left of screen
	if (keyboard.keys.a) {
		this.x = this.getX() - this.speed;
	}
	//Collision with right of screen
	if (keyboard.keys.d) {
		this.x = this.getX() + this.speed;
	}
};

Player.prototype.getWeapon = function() {
	return this.weapon;
}

Player.prototype.setWeapon = function(weapon) {
	this.weapon = weapon;
	return this;
}

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


