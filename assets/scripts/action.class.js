// ACTION
function Action() { }

// When click on a rock
Action['1'] = function(event) {
	var tilePosition = PIXI.Point.toCoords(event.target.position);
	if(PIXI.Point.distance(Game.protagonist.position, tilePosition) < 5) {
		switch(event.originalEvent.button) {
			// Left button
			case 0:
				alert('Left click');
				break;
			// Scroll button
			case 1:
				alert('Scroll click');
				break;
			// Right button
			case 2:
				alert('Right click');
				break;
		}
	} else {
		alert('So far away!');
	}
}