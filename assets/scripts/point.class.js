// POINT
PIXI.Point.distance = function(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};
PIXI.Point.toCoords = function(position) {
	var coords = position.clone();
	coords.x /= Map.tileWidth * Map.tileScale.x;
	coords.y /= Map.tileHeight * Map.tileScale.y;
	return coords;
}