function GUIButton(options) {
	this.view = new PIXI.Sprite(options['default']);
	this.view.interactive = true;

	// Events
	var self = this;
	this.view.mouse = function() {
		self.view.setTexture(options['hover']);
	}
}