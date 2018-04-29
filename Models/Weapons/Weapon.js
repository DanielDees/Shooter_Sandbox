/*
 * The base weapon class.
 */
function Weapon()
{
	Model.call(this);

	/*
	 * Rounders per second.
	 * 0 = single action
	 */
	this.roundsPerSecond = 2;

	//Number of frames since firing last
	this.firingFrames = 0;

	//Automatic reloading
	this.automaticReloading = true;

	//Reload time
	this.reloadTime = 2.0;

	//Clip with ammo
	this.magazine = 10;

	//Clip size
	this.magazineSize = 10;

	//Specifies whether the trigger has been pulled
	this.triggerPulled = false;

	//Specifies whether we're in the process of reloading
	this.reloading = false;

	//Frames since we started last action
	this.reloadingFrames = 0;
}

Weapon.prototype = Object.create(Model.prototype);

/*
 * Lets the weapon know that we're attempting to fire.
 */
Weapon.prototype.pullTrigger = function(game){
	this.triggerPulled = true;

	if(this.magazine <= 0 || this.reloading) {
		return false;
	}

	var secondsSinceFiring = this.firingFrames / game.FPS;

	if(secondsSinceFiring * this.roundsPerSecond >= 1)
	{
		//Reset and return true
		this.firingFrames = 0;
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
 * Begin reloading.
 */
Weapon.prototype.beginReloading = function(){
	console.log("Begin reloading.");
	if(!this.reloading)
	{
		this.reloading = true;
		this.reloadingFrames = 0;
	}
};

/*
 * Reloads the weapon.
 */
Weapon.prototype.reload = function(){
	this.magazine = 0;
	this.magazine = this.magazineSize;
};

/*
 * Keeps track of timing for getting rounds and reloading
 */
Weapon.prototype.frame = function(game){
	this.firingFrames++;

	//Finish reloading
	if(this.reloading)
	{
		this.reloadingFrames++;

		var timeReloading = this.reloadingFrames / game.FPS;

		if(timeReloading > this.reloadTime)
		{
			console.log("Reloading");
			this.reloadingFrames = 0;
			this.reloading = false;
			this.reload();
		}
	}

	//Start reloading automatically
	if(!this.reloading && this.magazine == 0 && this.automaticReloading)
	{
		this.beginReloading();
	}
};