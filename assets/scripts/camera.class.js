// CAMERA
function Camera() {
	// Attributes
	this.position = new PIXI.Point(0, 0);

	// Functions
	this.centerAt = function(point) {
		this.position.x = (Game.stageWidth / 2) - point.x;
		this.position.y = (Game.stageHeight / 2) - point.y;
		return this;
	}
	this.focus = function() {
		Game.viewport.position.x = this.position.x;
		Game.viewport.position.y = this.position.y;
		return this;
	}
	this.smoothFocus = function() {
		// Camera bug on blur. Removed because I'm not understanding
		TweenLite.to(Game.viewport.position, 1, {
			x: this.position.x,
			y: this.position.y,
			ease: Power3.easeInOut
		});
		return this;
	}
};