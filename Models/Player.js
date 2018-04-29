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
		  if (projectileList.length >= 5000) { 
		  	projectileList.shift(); 
		  }
	}
}

//Fire twin projectiles in V formation
//Spread is defined in degrees, not radians
Player.prototype.shoot2 = function(rounds, spread) {
	if (mouse.clicked) {

		  //Get center of player.
		  var angle = toolbox.getAngleBetween(this, mouse, "radians");

		  //Convert to radians
		  spread *= (Math.PI / 180);

		  //Get difference in angle between any two rounds
		  var roundSpread = (spread / rounds);

		  //Get angle to be subtracted to center shot spread on mouse
		  var splitAt = 0;

		  //Get spread for odd numbers
		  if (rounds % 2 == 1) {
		  	splitAt = roundSpread * Math.floor((rounds / 2));
		  }
		  //Get spraed for even numbers
		  if (rounds % 2 == 0) {
			splitAt = roundSpread * ((rounds / 2) - 0.5);
		  }

		  for (var i = 0; i < rounds; i++) {
		  	
		  	var firingAngle = angle - splitAt + (roundSpread * i);

		  	var data = {
		  		x: this.x + (this.width / 2),
		  		y: this.y + (this.height / 2),
		  		angle: firingAngle
		  	};

		  	projectileList.push(new Projectile(data));

		  	//Debug. Remove later.
		  	if (projectileList.length >= 4000) { 
		  		projectileList.shift(); 
		  	}
		}
	}
}