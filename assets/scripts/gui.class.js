function GUIButton(options) {
	this.view = new PIXI.Sprite(options['default']);
	this.view.defaultCursor = CURSORS.POINTER;
	this.view.buttonMode = true;
	this.view.interactive = true;

	this.click = function(click) {
		options['onClick'] = click;
		this.view.click = options['onClick'];
	};
	this.setPosition = function(position) {
		this.view.position = position;
	}
	// Events
	var self = this;
	this.view.mouseover = function() {
		self.view.setTexture(options['over'] || options['default']);
	}
	this.view.mouseout = function() {
		self.view.setTexture(options['default']);
	}
}