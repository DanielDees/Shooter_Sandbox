/*
 * The player class.
 */

function Player() {
	//Call the parent to construct.
	Model.call(this);

	this.width = 20;
	this.height = 20;

	this.speed = 6;
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

//Fire single projectile
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

//Fire twin projectiles in V formation
Player.prototype.shoot2 = function(type) {
	if (mouse.clicked) {
		  //Get center of player.
		  var angle = toolbox.getAngleBetween(this, mouse, "radians") - 0.15;
		  var angle2 = angle + 0.3;

		  var data = {
		  	x: this.x,
		  	y: this.y,
		  	angle: angle
		  };
		  var data2 = {
		  	x: this.x,
		  	y: this.y,
		  	angle: angle2
		  };
		  
		  projectileList.push(new Projectile(data));
		  projectileList.push(new Projectile(data2));

		  //Debug. Remove later.
		  if (projectileList.length >= 400) { 
		  	projectileList.shift(); 
		  	projectileList.shift();
		  }
	}
}