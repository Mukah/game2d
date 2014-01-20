function PointLight(options) {
	// Attributes
	this.view = new PIXI.Sprite(options['map'] || PIXI.Texture.fromImage('assets/point.png'));
	this.view.anchor = new PIXI.Point(options['anchorX'] || 0.5, options['anchorY'] || 0.5);
	this.view.alpha = options['intensity'] || 1;
	this.view.tint = options['color'] || 0xFFFFFF; // Wellow light 0xFDE69A;
	this.view.blendMode = options['blendMode'] || PIXI.blendModes.SCREEN;
	//this.view.filters = [new PIXI.InvertFilter()];

	// Functions
	this.setPosition = function(point) {
		this.view.position.x = (point.x * Map.tileWidth + Map.tileWidth / 2) * Map.tileScale.x;
		this.view.position.y = (point.y * Map.tileHeight + Map.tileHeight / 2) * Map.tileScale.y;
		return this;
	}

	this.turnOn = function(duration) {
		TweenLite.to(this.view, duration || 0, {
			alpha: options['intensity']
		});
	}
	this.turnOff = function(duration) {
		TweenLite.to(this.view, duration || 0, {
			alpha: 0
		});
	}
	this.colorize = function(color, duration) {
		TweenLite.to(this.view, duration || 0, {
			tint: color
		});
	}
}