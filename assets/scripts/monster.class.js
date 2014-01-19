// PLAYER
function Monster(attrs) {
	Creature.apply(this, arguments);

	// Attributes
	this.fov = attrs['fov'];
	this.target = undefined;
	this.folowing = false;

	// Functions
	var self = this;
	this.seek = function() {
		if(self.target != undefined) {
			if(self.folowing == false) {
				self.follow();
				self.folowing = true;
			}
		} else {
			if(PIXI.Point.distance(self.position, Game.protagonist.position) <= self.fov) {
				self.target = Game.protagonist;
				console.log("fdp");
			}
		}
	}

	this.startSeek = function() {
		setInterval(this.seek, 1000);
	}
	this.follow = function() {
		var interval = setInterval(function() {
			if(self.target != undefined) {
				if(PIXI.Point.distance(self.position, Game.protagonist.position) > 1) {
					self.walkTowards(self.target.position);
				}
			} else {
				clearInterval(interval);
			}
		}, this.walkSpeed);
	}
}