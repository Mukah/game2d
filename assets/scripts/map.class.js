// MAP
function Map() { }
Map.tilesets = undefined;
Map.tiles = undefined;
Map.tileWidth = undefined;
Map.tileHeight = undefined;
Map.tileScale = new PIXI.Point(2, 2);
Map.collision = undefined;

Map.load = function(url, onComplete) {
	Game.mapContainer.alpha = 0;
	Game.viewport.addChild(Game.mapContainer);

	console.log('Loading map \'' + url + '\'...');
	$.getJSON(url, function(map) {
		// Tilesets loading
		Map.tilesets = new Object();
		Map.tiles = new Object();
		Map.tileWidth = map.tilewidth;
		Map.tileHeight = map.tileheight;

		$.each(map.tilesets, function(i, tileset) {
			console.log('\'' + tileset.name + '\' loaded.')
			Map.tilesets[tileset.name] = new PIXI.BaseTexture.fromImage(tileset.image);
			
			var img_width = tileset.imagewidth + (tileset.margin * 2);
			var img_height = tileset.imageheight + (tileset.margin * 2);
			var tile_width = tileset.tilewidth + (tileset.spacing * 2);
			var tile_height = tileset.tileheight + (tileset.spacing * 2);
			var width = img_width / tile_width;
			var height = img_height / tile_height;
			var count = width * height;

			var x = 0, y = 0;
			var gid = tileset.firstgid;
			for (var i = 0; i < count; i++) {
				// Instantiate tiles
				var tile = new Tile();
				tile.texture = new PIXI.Texture(Map.tilesets[tileset.name], new PIXI.Rectangle(tileset.margin + (x * tileset.tilewidth), tileset.margin + (y * tileset.tileheight), tileset.tilewidth, tileset.tileheight));
				tile.properties = tileset.tileproperties[gid-1] || [];

				// Click event
				if('onClick' in tile.properties) {
					tile.onClick = Action[tile.properties['onClick']];
				}

				Map.tiles[gid] = tile;
				
				x++;
				if((i+1) % width == 0) {
					x = 0;
					y++;
				}
				gid++;
			};
		});

		// Drawing
		var collision_map = new Array(map.height);
		for (var i = 0; i < map.height; i++) {
			collision_map[i] = new Array(map.width);
		}

		$.each(map.layers, function(i, layer) {
			console.log('Drawing \'' + layer.name + '\'...')
			if(layer.visible == true) {
				switch(layer.type) {
					case 'tilelayer':
						var x = layer.x * Map.tileWidth * Map.tileScale.x, y = layer.y * Map.tileHeight * Map.tileScale.y;
						$.each(layer.data, function(i, tileID) {

							var tile = Map.tiles[tileID];

							if(tile != undefined) {
								var sprite = new PIXI.Sprite(tile.texture);
								sprite.scale = Map.tileScale;
								sprite.position = new PIXI.Point(x * Map.tileWidth * Map.tileScale.x, y * Map.tileHeight * Map.tileScale.y);

								// Click event
								if(tile.onClick != undefined) {
									sprite.interactive = true;
									sprite.buttonMode = true;
									sprite.defaultCursor = CURSORS.CUSTOM;
									sprite.click = tile.onClick;
								}

								Game.mapContainer.addChild(sprite);

								if(collision_map[y][x] != 1) {
									collision_map[y][x] = ((tile.collides()) ? 1 : 0);
								}

								// Highlight collision tiles
								if(collision_map[y][x] == 1) { sprite.tint = 0xFF0000; }
							}

							x++;
							if((i+1) % layer.width == 0) {
								y++;
								x = 0;
							}
						});
					break;
				}
			}
		});

		Map.collision = new PF.Grid(map.width, map.height, collision_map);

		console.log("Finished.");
	}).done(onComplete);
};

Map.clear = function() {
	if(Game.mapContainer != undefined) {
		Game.stage.removeChild(Game.mapContainer);
		Game.mapContainer = undefined;
		console.log("Map cleaned.");
	}
};