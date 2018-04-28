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

Model.prototype.move = function(keyboard) {
	if (keyboard.keys.w) {
		this.y = Math.max(this.getY() - this.speed, 0);
	}
	if (keyboard.keys.s) {
		this.y = Math.min(this.getY() + this.speed, window.innerHeight - this.height);
	}
	if (keyboard.keys.a) {
		this.x = Math.max(this.getX() - this.speed, 0);
	}
	if (keyboard.keys.d) {
		this.x = Math.min(this.getX() + this.speed, window.innerWidth - this.width);
	}
};

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