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

	this.color = 'black';
}

/*
 * Called every frame of the game.
 */
Model.prototype.frame = function() {
	//implement me
};

Model.prototype.draw = function() {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
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

Model.prototype.getWidth = function() {
	return this.width;
};

Model.prototype.getHeight = function() {
	return this.height;
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

Model.prototype.setWidth = function(width) {
	this.width = width;
	return this;
};

Model.prototype.setHeight = function(height) {
	this.height = height;
	return this;
};

Model.prototype.setCollision = function(collidable) {
	this.collidable = collidable;
	return this;
}