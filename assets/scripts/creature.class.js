function STATUS() {}
STATUS.IDLE = 0;
STATUS.WALKING = 1;

// CREATURES
function Creature(name, texture) {
	this.name = name;
	this.position = new PIXI.Point(0, 0);
	this.healthNow = 0;
	this.healthMax = 0;
	this.walkSpeed = 1;
	this.status = STATUS.IDLE;

	this.sprite = new PIXI.Sprite(texture);
	this.sprite.scale = Map.tileScale;
	this.sprite.alpha = 1;

	var timeline = new TimelineLite({
		//paused: true,
		onComplete: function() {
			//this.pause();
			//console.log("pause");
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
	this.moveTo = function(toPosition, callback) {
		if(this.status == STATUS.IDLE) {
			this.status = STATUS.WALKING;
			if(PIXI.Point.distance(this.position, toPosition) <= 1) {
				//if(Map.collision[toPosition.y][toPosition.x] == 0) {
					//timeline.resume();
					TweenLite.to(this.sprite.position, this.walkSpeed, {
						x: toPosition.x * Map.tileWidth * Map.tileScale.x,
						y: toPosition.y * Map.tileHeight * Map.tileScale.y,
						ease: Linear.easeNone,
						onCompleteScope: this,
						onComplete: function() {
							this.position = toPosition;
							this.status = STATUS.IDLE;
							callback();
						}
					});
				//}
			}
		}
		return this;
	}
	this.move = function(direction, callback) {
		if(this.status == STATUS.IDLE) {
			var toPosition = this.position.clone();

			switch(direction){
				case DIRECTIONS.UP:		toPosition.y--;		break;
				case DIRECTIONS.RIGHT:	toPosition.x++;		break;
				case DIRECTIONS.DOWN:	toPosition.y++;		break;
				case DIRECTIONS.LEFT:	toPosition.x--;		break;
			}

			this.moveTo(toPosition, callback);
		}
		return this;
	}
	this.walkTo = function(toPosition, callback) {
		if(this.status == STATUS.IDLE) {
			var collisionBackup = Map.collision.clone();
			var finder = new PF.AStarFinder({
				heuristic: PF.Heuristic.manhattan,
				allowDiagonal: false
			});
			var path = finder.findPath(this.position.x, this.position.y, toPosition.x, toPosition.y, Map.collision);
			this.walkPath(path, callback);
			Map.collision = collisionBackup;
		}
	}
	this.walkPath = function(array, callback, i) {
		if(this.status == STATUS.IDLE) {
			var self = this;
			i = i | 0;
			if(i < array.length) {
				this.moveTo(((array[i] instanceof PIXI.Point) ? array[i] : new PIXI.Point(array[i][0], array[i][1])), function() {
					self.walkPath(array, callback, ++i);
				});
			} else {
				this.status = STATUS.IDLE;
				callback();
			}
		}
	}
	this.stop = function() {
		
	}
}