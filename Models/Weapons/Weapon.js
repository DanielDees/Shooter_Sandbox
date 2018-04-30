/*
 * The base weapon class.
 */
function Weapon()
{
	Model.call(this);

	/*
	 * Rounds fired per second.
	 * 0 = single action
	 */
	this.roundsPerSecond = 5;

	//Number of frames since firing last
	this.firingFrame = 0;

	//Automatic reloading
	this.autoReload = true;

	//Reload time
	this.reloadTime = 1;

	//Clip with ammo
	this.magazine = 10;

	//Clip size
	this.magazineSize = 10;

	//Specifies whether the trigger has been pulled
	this.triggerPulled = false;

	//Specifies whether we're in the process of reloading
	this.reloading = false;

	//Frames since we started last action
	this.reloadFrame = 0;

	//Distance projectile can travel before disappearing
	this.range = 600;

	//Speed projectile moves at
	this.projectileSpeed = 12;

	//Shot spread in Radians: degrees * (Math.PI / 180)
	this.spread = 0;

	//Projectiles weapon shoots with each round
	this.rounds = 1;
}

Weapon.prototype = Object.create(Model.prototype);

/*
 * Lets the weapon know that we're attempting to fire.
 */
Weapon.prototype.pullTrigger = function(game){

	this.triggerPulled = true;

	if (this.magazine <= 0 || this.reloading) {
		return false;
	}

	if (this.firingFrame > game.FPS / this.roundsPerSecond) {
		//Reset and return true
		this.firingFrame = 0;
		this.magazine--;

		return true;
	}

	return false;
};

/*
 * Lets the weapon know that the trigger has been released.
 */
Weapon.prototype.releaseTrigger = function(){
	this.triggerPulled = false;
};

/* 
 * Begin reloading the weapon.
 */
 Weapon.prototype.beginReloading = function() {
	if (!this.reloading) {
		this.reloading = true;
		this.reloadFrame = 0;
	}
 }

/*
 * Reloads the weapon.
 */
Weapon.prototype.reload = function() {
	this.magazine = this.magazineSize;
	this.reloadFrame = 0;
	this.reloading = false;
};

/*
 * Keeps track of timing for getting rounds and reloading
 */
Weapon.prototype.frame = function(game) {

	this.firingFrame++;

	//Start reloading automatically
	if (!this.reloading && this.magazine == 0 && this.autoReload) {
		this.beginReloading();
	}

	//Finish reloading
	if (this.reloading) {

		this.reloadFrame++;

		if (this.reloadFrame > this.reloadTime * game.FPS) {
			this.reload();
		}
	}
};

//Fire single projectile
Weapon.prototype.shoot = function(type) {
	if (mouse.clicked) {
		//Get center of player.
		var angle = toolbox.getAngleBetween(this, mouse, "radians");

		var data = {
			x: this.x,
			y: this.y,
			angle: angle,
			range: this.range,
			speed: this.projectileSpeed
		};
		  
		projectileList.push(new Projectile(data));
	}
}

//Fire any number of rounds in desired spread
//Spread is defined in degrees, not radians
Weapon.prototype.shoot2 = function() {
	if (mouse.clicked) {

		//Get center of player.
		var angle = toolbox.getAngleBetween(player, mouse, "radians");

		//Get difference in angle between any two shots
		var roundSpread = (this.spread / this.rounds);

		//Get angle to be subtracted to center shot spread on mouse
		var splitAt = 0;

		//Get spread for odd numbers
		if (this.rounds % 2 == 1) {
			splitAt = roundSpread * Math.floor((this.rounds / 2));
		}
		//Get spread for even numbers
		if (this.rounds % 2 == 0) {
			splitAt = roundSpread * ((this.rounds / 2) - 0.5);
		}

		//Fire all rounds
		for (var i = 0; i < this.rounds; i++) {
			
			var firingAngle = angle - splitAt + (roundSpread * i);

			var data = {
				x: player.x + (player.width / 2),
				y: player.y + (player.height / 2),
				angle: firingAngle,
				range: this.range,
				speed: this.projectileSpeed
			};

			projectileList.push(new Projectile(data));
		}
	}
}

Weapon.prototype.setRoundsPerSecond = function(x) {
	this.roundsPerSecond = x;
	return this;
};

Weapon.prototype.setAutoReload = function(x) {
	this.autoReload = x;
	return this;
};

Weapon.prototype.setMagazineSize = function(x) {
	this.magazineSize = x;
	this.magazine = x;
	return this;
};

Weapon.prototype.setReloadTime = function(x) {
	this.reloadTime = x;
	return this;
};

Weapon.prototype.setRange = function(x) {
	this.range = x;
	return this;
};

Weapon.prototype.setRounds = function(x) {
	this.rounds = x;
	return this;
};
	
//Accepts spread in degrees and converts to Radians
Weapon.prototype.setSpread = function(x) {
	this.spread = x * (Math.PI / 180);
	return this;
};

Weapon.prototype.setProjectileSpeed = function(x) {
	this.projectileSpeed = x;
	return this;
};
