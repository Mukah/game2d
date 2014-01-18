function GUIButton(options) {
	// Attributes
	this.view = new PIXI.Sprite(options['textures']['normal']);
	this.view.defaultCursor = options['cursor'] || CURSORS.POINTER;
	this.view.buttonMode = true;
	this.view.interactive = true;

	// Events
	var self = this;
	this.onClick = function(click) {
		this.view.click = click;
	};
	this.onClick(options['onClick'] || function() { });

	this.view.mouseover = function() {
		self.view.setTexture(options['textures']['over'] || options['textures']['normal']);
	}
	this.view.mouseout = function() {
		self.view.setTexture(options['textures']['normal']);
	}

	// Functions
	this.setPosition = function(position) {
		this.view.position = position;
	}
}