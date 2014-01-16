// GAME
function Game() { }
Game.stage = undefined;
Game.renderer = undefined;
Game.stageWidth = 900;
Game.stageHeight = 600;
Game.viewport = new PIXI.DisplayObjectContainer();
Game.mapContainer = new PIXI.DisplayObjectContainer();
Game.GUIContainer = new PIXI.DisplayObjectContainer();

Game.initialize = function() {
	Game.stage = new PIXI.Stage(0x5996FF);
	Game.renderer = PIXI.autoDetectRenderer(Game.stageWidth, Game.stageHeight);

	// Disable context menu on right click
	Game.renderer.view.oncontextmenu = function(e) {
		e.preventDefault();
		return false;
	}

	// Add view to document body
	document.body.appendChild(Game.renderer.view);

	// Some settings
	PIXI.Texture.SCALE_MODE.DEFAULT = PIXI.Texture.SCALE_MODE.NEAREST;
	TweenLite.ticker.fps(60);
	//TweenLite.ticker.useRAF(false);

	// Add viewport to stage
	Game.stage.addChild(Game.viewport);

	// Add map container to stage
	Game.viewport.addChild(Game.mapContainer);

	// Add GUI container to stage
	Game.stage.addChild(Game.GUIContainer);

	// Initialize RAF
	requestAnimFrame(Game.animate);
};

Game.animate = function() {
	stats.begin();
	requestAnimFrame(Game.animate);

	// Execute update block
	Game.onUpdate();

	// Render the stage   
	Game.renderer.render(Game.stage);
	stats.end();
};

Game.onUpdate = function() { };