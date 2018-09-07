;"use strict";

/*
 * The Toolbox contains misc. functions that can be used for
 * calculations.
*/

function Toolbox() {}

Toolbox.prototype.getAngleBetween = function(entityFrom, entityTo, radians) {
	
	//Calculate center of player.
	var dx = entityFrom.getX() + (entityFrom.width / 2) - entityTo.getX();
	var dy = entityFrom.getY() + (entityFrom.height / 2) - entityTo.getY();

	//Find angle in Rad
	var angle = Math.atan2(dy, dx);

	//Convert from Rad to Degrees
	angle *= (180 / Math.PI);

	//Make angle positive on 360 degree values
	angle += 180;

	//Convert from degrees to Radians if necessary
	if (radians) { angle *= (Math.PI / 180); }

	//Return angle in Degrees
	return angle;
}

//Shows debug information on the game screen.
Toolbox.prototype.drawDebug = function() {

	ctx.fillStyle = "blue";
	ctx.font = "24px Courier New";

	var x = -player.FOV.x() + 30;
	var y = -player.FOV.y() + 40;
	var rowHeight = parseInt(ctx.font);

	var debugInfo = [
		//["Mouse X", mouse.x],
		//["Mouse Y", mouse.y],
		//["Clicked", mouse.clicked],
		// ["Degrees", toolbox.getAngleBetween(player, mouse).toFixed(1)],
		// ["Radians", toolbox.getAngleBetween(player, mouse, "radians").toFixed(1)],
		//["Reloading", player.weapon.reloading],
		["Weapon", player.weapon.name],
		["Damage", player.weapon.damage],
		["Reload", (player.weapon.reloadFrame / game.FPS).toFixed(1) + "s / " + player.weapon.reloadTime + "s"],
		["Clip  ", player.weapon.magazine + " / " + player.weapon.magazineSize],
		//["Firing", player.weapon.firingFrame]
		['Entities', projectileList.length],
	];
	
	for (var i = 0; i < debugInfo.length; i++) {
		ctx.fillText(debugInfo[i][0] + ": " + debugInfo[i][1], x, y + (rowHeight * i));
	}	
}

Toolbox.prototype.collision = function (a, b) {

	if (!a.getCollision() || !b.getCollision()) {
		return false;
	}

	if (b.getRight() < a.getLeft() ||
		a.getRight() < b.getLeft() || 
		b.getBottom() < a.getTop() ||
		a.getBottom() < b.getTop()) {
		return false;
	}

	//Perhaps return object with collision info?
	//X/Y of collision, which side, etc?
	return true;
}