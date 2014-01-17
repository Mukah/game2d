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
		var blurFilter = new PIXI.BlurFilter();
		blurFilter.blur = 0;

		Game.viewport.filters = [blurFilter];

		var t1 = new TimelineLite({
			// options
		}).to(Game.viewport.position, 1, {
			x: this.position.x,
			y: this.position.y,
			ease: Power3.easeInOut
		});
		var t2 = new TimelineLite({
			// options
		}).to(blurFilter, 0.5, {
			blur: 50,
			ease: Power3.easeIn
		}).to(blurFilter, 0.5, {
			blur: 0,
			ease: Power3.easeOut
		});
		return this;
	}
};