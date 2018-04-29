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
}

Model.prototype.draw = function(){
	//implement me
};

Model.prototype.move = function(){
	//implement me
}

Model.prototype.getX = function(){
	return this.x;
};

Model.prototype.getY = function(){
	return this.y;
};

Model.prototype.setX = function(x){
	this.x = x;
};

Model.prototype.setY = function(y){
	this.y = y;
};