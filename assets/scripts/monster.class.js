// PLAYER
function Monster(name, texture) {
	Creature.apply(this, arguments);

	setTimeout(seek, 1000);
	this.seek = function() {
		return 'method';
	}
}