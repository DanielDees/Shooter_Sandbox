;"use strict";

/*	
 * The Game_Map Class
*/

function Game_Map() {
	//Call the parent to construct.
	Model.call(this);

	//Map Dimensions
	this.size = 1000;

	/*
		A zone is an object with lists of: 
			1: players
			2: projectiles
			3: obstacles

		this.zones is an array of rows.
		Each row is an array filled with zones.

		Each zone has the following layout:

		== Zone layout ==
		{ 
			projectiles: [],
			players: [], 
			objects: [],
		}, 
	*/

	//Zone settings
	this.zones = [];
	this.zoneSize = 500;
}

Game_Map.prototype = Object.create(Model.prototype);

Game_Map.prototype.init = function() {

	var zones = this.size / this.zoneSize;

	//Create all zones
	for (var row = 0; row < zones; row++) {

		this.zones[row] = [];

		for (var col = 0; col < zones; col++) {

			//A zone stores all entities within it's area
			var zone = {
				projectiles: [],
				players: [],
				obstacles: [],
			};

			this.zones[row][col] = zone;
		}
	}

}

Game_Map.prototype.debugZones = function() {
	for (var row = 0; row < this.zones.length; row++) {
		for (var col = 0; col < this.zones[row].length; col++) {
				
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'black';
			ctx.strokeRect(row * this.zoneSize, col * this.zoneSize, this.zoneSize, this.zoneSize);

		}
	}
}

Game_Map.prototype.getZoneCollisions = function() {

	for (var row = 0; row < this.zones.length; row++) {
		for (var col = 0; col < this.zones[row].length; col++) {
			
			//Check for collisions with each projectile and player in the zone with each object in the zone

		}
	}

}