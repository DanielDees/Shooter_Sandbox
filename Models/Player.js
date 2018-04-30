/*
 * The player class.
 */

function Player() {
	//Call the parent to construct.
	Model.call(this);

	this.width = 20;
	this.height = 20;

	this.speed = 6;

	this.weapon = new Weapon();
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

Player.prototype.setWeapon = function(weapon) {
	this.weapon = weapon;
}

Player.prototype.getWeapon = function() {
	return this.weapon;
}