/*
 * The player class.
 */

function Player() {
	//Call the parent to construct.
	Model.call(this);

	this.width = 30;
	this.height = 30;

	this.speed = 8;

	this.weapon = new Weapon();

	this.weapons = [];
}

Player.prototype = Object.create(Model.prototype);

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = "blue";
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};

Player.prototype.move = function(keyboard) {
	//Collision with top of screen
	if (keyboard.keys.w) {
		this.y = Math.max(this.getY() - this.speed, 0);
	}
	//Collision with bottom of screen
	if (keyboard.keys.s) {
		this.y = Math.min(this.getY() + this.speed, window.innerHeight - this.height);
	}
	//Collision with left of screen
	if (keyboard.keys.a) {
		this.x = Math.max(this.getX() - this.speed, 0);
	}
	//Collision with right of screen
	if (keyboard.keys.d) {
		this.x = Math.min(this.getX() + this.speed, window.innerWidth - this.width);
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


