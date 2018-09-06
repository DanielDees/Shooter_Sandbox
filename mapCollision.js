
//Save for later if necessary
function mapCollision() {
	//Collision with top of screen
	if (this.getTop() < 0) {
		this.speed.y = Math.abs(this.speed.y);
		this.angle = flip_angle;
		this.setTop(1);
	}
	//Collision with bottom of screen
	else if (this.getBottom() > window.innerHeight) {
		this.speed.y = -Math.abs(this.speed.y);
		this.angle = flip_angle;
		this.setBottom(window.innerHeight - 1);
	}
	//Collision with left of screen
	if (this.getLeft() < 0) {
		this.speed.x = Math.abs(this.speed.x);
		this.angle = flip_angle;
		//Why on earth do you need to add this.width for it to work?
		this.setLeft(1 + this.width);
	}
	//Collision with right of screen
	else if (this.getRight() > window.innerWidth) {
		this.speed.x = -Math.abs(this.speed.x);
		this.angle = flip_angle;
		this.setRight(window.innerWidth - 1);
	}
}
