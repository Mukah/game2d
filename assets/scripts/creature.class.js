// CREATURES
function Creature(name, texture) {
	this.name = name;
	this.position = new PIXI.Point(0, 0);
	this.healthNow = 0;
	this.healthMax = 0;
	this.walkSpeed = 0.1;

	this.sprite = new PIXI.Sprite(texture);
	this.sprite.scale = Map.tileScale;

	var timeline = new TimelineLite();

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

		timeline.to(this.sprite.position, this.walkSpeed, {
			x: toPosition.x * Map.tileWidth * Map.tileScale.x,
			y: toPosition.y * Map.tileHeight * Map.tileScale.y,
			ease: Linear.easeNone
		});
		this.position = toPosition;
		return this;
	}
}