/*
 * The player class.
 */

function Player() {
	//Call the parent to construct.
	Model.call(this);

	this.width = 20;
	this.height = 20;

	this.speed = 10;
}

Player.prototype = Object.create(Model.prototype);

Player.prototype.draw = function(ctx) {
	ctx.fillStyle = "blue";
	ctx.fillRect(this.getX(), this.getY(), this.width, this.height);
};

Player.prototype.move = function(keyboard) {
	if (keyboard.keys.w) {
		this.y = Math.max(this.getY() - this.speed, 0);
	}
	if (keyboard.keys.s) {
		this.y = Math.min(this.getY() + this.speed, window.innerHeight - this.height);
	}
	if (keyboard.keys.a) {
		this.x = Math.max(this.getX() - this.speed, 0);
	}
	if (keyboard.keys.d) {
		this.x = Math.min(this.getX() + this.speed, window.innerWidth - this.width);
	}
};

Player.prototype.shoot = function(type) {
	if (mouse.clicked) {
		  //Get center of player.
		  var angle = toolbox.getAngleBetween(this, mouse, "radians");

		  var data = {
		  	x: this.x,
		  	y: this.y,
		  	angle: angle
		  };
		  
		  projectileList.push(new Projectile(data));

		  //Debug. Remove later.
		  if (projectileList.length >= 500) { 
		  	projectileList.shift(); 
		  }
	}
}