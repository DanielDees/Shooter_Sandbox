;"use strict";

/*	
 * The Obstacle Class
*/

function Obstacle() {
	//Call the parent to construct.
	Model.call(this);
}

Obstacle.prototype = Object.create(Model.prototype);

Obstacle.prototype.getColor = function() {
	return this.color;
}

Obstacle.prototype.setColor = function(color) {
	this.color = color;
	return this;
}