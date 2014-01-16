function GUIButton(texture) {
	PIXI.Sprite.apply(this, arguments);
}
new GUIButton(PIXI.Texture.fromImage("assets/grass.png"));
