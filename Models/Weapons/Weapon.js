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
	this.roundsPerSecond = 0.0;

	//Automatic reloading
	this.automaticReloading = false;

	//Reload time
	this.reloadTime = 0.0;

	//Clip with ammo
	this.magazine = [];

	//Clip size
	this.magazineSize = 0;

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
Weapon.prototype.pullTrigger = function(){
	this.triggerPulled = true;
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
	this.magazine = [];
	this.magazine.fill(true, 0, this.magazineSize);
};

/*
 * Keeps track of timing for getting rounds and reloading
 */
Weapon.prototype.frame = function(game){
	//Finish reloading
	if(this.reloading)
	{
		this.reloadingFrames++;

		var timeReloading = this.reloadingFrames / game.FPS;

		if(timeReloading > this.reloadTime)
		{
			this.reloadingFrames = 0;
			this.reload();
		}
	}

	//Start reloading automatically
	if(!this.reloading && this.magazine.length == 0 && this.automaticReloading)
	{
		this.beginReloading();
	}
};