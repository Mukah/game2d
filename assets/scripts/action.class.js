// ACTION
function Action() { }

// When click on a rock
Action["1"] = function(event) {
	console.log(event);
	switch(event.originalEvent.button) {
		// Left button
		case 0:
			alert("Left click");
			break;
		// Scroll button
		case 1:
			alert("Scroll click");
			break;
		// Right button
		case 2:
			alert("Right click");
			break;
	}
}