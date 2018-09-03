/*
 * The model class is the base class for all models which
 * can be drawn to the canvas.
 */
 
function Model()
{
	this.x = 0;
	this.y = 0;

	this.width = 0;
	this.height = 0;

	this.speed = 0;

	this.collidable = true;
}

/*
 * Called every frame of the game.
 */
Model.prototype.frame = function() {
	//implement me
};

Model.prototype.draw = function() {
	//implement me
};

Model.prototype.move = function() {
	//implement me
}

Model.prototype.getX = function() {
	return this.x;
};

Model.prototype.getY = function() {
	return this.y;
};

Model.prototype.getCollision = function() {
	return this.collidable;
}

Model.prototype.getTop = function() {
	return this.y;
};

Model.prototype.getBottom = function() {
	return this.y + this.height;
};

Model.prototype.getLeft = function() {
	return this.x;
};

Model.prototype.getRight = function() {
	return this.x + this.width;
};

Model.prototype.setX = function(x) {
	this.x = x;
	return this;
};

Model.prototype.setY = function(y) {
	this.y = y;
	return this;
};

Model.prototype.setCollision = function(collidable) {
	this.collidable = collidable;
	return this;
}