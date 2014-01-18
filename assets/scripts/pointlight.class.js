function PointLight(texture, color, intensity) {
	this.view = new PIXI.Sprite(texture);
	this.view.anchor = new PIXI.Point(0.5, 0.5);
	this.view.alpha = intensity || 1;
	this.view.tint = color || 0xFFFFFF;//0xFDE69A;
	this.view.blendMode = PIXI.blendModes.SCREEN;
	//this.view.scale = new PIXI.Point(2, 2);
	//this.view.filters = [new PIXI.InvertFilter()];
}