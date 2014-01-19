// PLAYER
function Monster(attrs) {
	Creature.apply(this, arguments);

	// Attributes
	this.fov = attrs['fov'];

	// Functions
	var self = this;
	this.seek = function() {
		if(PIXI.Point.distance(self.position, Game.protagonist.position) <= self.fov) {
			console.log("fdp");
		}
	}

	this.startSeek = function() {
		setInterval(this.seek, 1000);
	}
}