function STATUS() { }
STATUS.IDLE = 0;
STATUS.WALKING = 1;

// CREATURES
function Creature(name, texture) {
	this.name = name;
	this.position = new PIXI.Point(0, 0);
	this.healthNow = 0;
	this.healthMax = 0;
	this.walkSpeed = 0.2;
	this.status = STATUS.IDLE;

	this.view = new PIXI.Sprite(texture);
	this.view.scale = Map.tileScale;
	this.view.alpha = 1;

	this.setPosition = function(x, y) {
		this.position.x = x;
		this.position.y = y;

		this.view.position.x = x * Map.tileWidth * Map.tileScale.x;
		this.view.position.y = y * Map.tileHeight * Map.tileScale.y;
		return this;
	};
	this.moveTo = function(toPosition, callback) {
		callback = callback || function() { };

		if(this.status == STATUS.IDLE) {
			if(PIXI.Point.distance(this.position, toPosition) <= 1) {
				if(Map.collision.isWalkableAt(toPosition.x, toPosition.y)) {
					this.status = STATUS.WALKING;
					TweenLite.to(this.view.position, this.walkSpeed, {
						x: toPosition.x * Map.tileWidth * Map.tileScale.x,
						y: toPosition.y * Map.tileHeight * Map.tileScale.y,
						ease: Linear.easeNone,
						onUpdateScope: this,
						onUpdate: this.onMove,
						onCompleteScope: this,
						onComplete: function() {
							this.status = STATUS.IDLE;
							this.position = toPosition;
							callback();
						}
					});
				}
			}
		}
		return this;
	};
	this.move = function(direction, callback) {
		callback = callback || function() { };

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
	};
	// Checar se o toPosition é valido
	this.walkTowards = function(toPosition, callback) {
		callback = callback || function() { };

		if(this.status == STATUS.IDLE) {
			var collisionBackup = Map.collision.clone();
			var finder = new PF.AStarFinder({
				heuristic: PF.Heuristic.manhattan,
				allowDiagonal: false
			});
			var path = finder.findPath(this.position.x, this.position.y, toPosition.x, toPosition.y, Map.collision);
			if(path.length > 1) {
				this.moveTo(new PIXI.Point(path[1][0], path[1][1]), callback);
			}
			Map.collision = collisionBackup;
		}
		return this;
	};
	// Essa função está calculando o pathfinder a cada passo.
	// Checar se o toPosition é valido
	this.walkTo = function(toPosition, callback) {
		callback = callback || function() { };

		if(this.status == STATUS.IDLE) {
			if(PIXI.Point.distance(this.position, toPosition) > 0) {
				var self = this;
				setTimeout(function() {
					self.walkTowards(toPosition, function() {
						self.walkTo(toPosition, callback);
					});
				}, 0)
			}
		}
	};
	this.onMove = function() { };
}