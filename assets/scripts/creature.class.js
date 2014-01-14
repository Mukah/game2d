// CREATURES
function Creature(name, texture) {
	this.name = name;
	this.position = new PIXI.Point(0, 0);
	this.healthNow = 0;
	this.healthMax = 0;
	this.walkSpeed = 0.1;

	this.sprite = new PIXI.Sprite(texture);
	this.sprite.scale = Map.tileScale;
	this.sprite.alpha = 1;

	var timeline = new TimelineLite({
		paused: true,
		onComplete: function() {
			this.pause();
			console.log("pause");
		}
	});
	//timeline.from(this.sprite, 0, { alpha: 0});

	this.setPosition = function(x, y) {
		this.position.x = x;
		this.position.y = y;

		this.sprite.position.x = x * Map.tileWidth * Map.tileScale.x;
		this.sprite.position.y = y * Map.tileHeight * Map.tileScale.y;
		return this;
	}
	this.walk = function(direction) {
		var toPosition = this.position.clone();

		switch(direction){
			case DIRECTIONS.UP:
				toPosition.y--;
				break;
			case DIRECTIONS.RIGHT:
				toPosition.x++;
				break;
			case DIRECTIONS.DOWN:
				toPosition.y++;
				break;
			case DIRECTIONS.LEFT:
				toPosition.x--;
				break;
		}

		this.moveTo(toPosition);
		return this;
	}
	this.moveTo = function(toPosition) {
		if(timeline.paused) {
			timeline.resume();
			timeline.add(TweenLite.to(this.sprite.position, this.walkSpeed, {
				x: toPosition.x * Map.tileWidth * Map.tileScale.x,
				y: toPosition.y * Map.tileHeight * Map.tileScale.y,
				ease: Linear.easeNone,
				onCompleteScope: this,
				onComplete: function() {
					this.position = toPosition;
				}
			}));
		}
		return this;
	}
	this.walkTo = function(toPosition) {
		var collisionBackup = Map.collision.clone();
		var finder = new PF.AStarFinder({
			heuristic: PF.Heuristic.manhattan,
			allowDiagonal: false
		});
		var path = finder.findPath(this.position.x, this.position.y, toPosition.x, toPosition.y, Map.collision);
		for (var i = 0; i < path.length; i++) {
			this.moveTo(new PIXI.Point(path[i][0], path[i][1]));
		};
		Map.collision = collisionBackup;
	}
	this.stop = function() {

	}
}