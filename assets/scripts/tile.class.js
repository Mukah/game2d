// TILE
function Tile() {
	this.texture = undefined;
	this.properties = undefined;

	// Events
	this.onClick = undefined;
	// onStepIn, onStepOut

	this.collides = function() {
		if(this.properties != undefined && this.properties['collides'] == '1') {
			return true;
		}
		return false;
	};
}