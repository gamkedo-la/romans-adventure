const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
var levelOne =
				[10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11,
		     8, 0, 19, 20, 20, 20, 19, 20, 19, 20, 20, 20, 20, 19, 0, 9,
				 8, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 9,
				 12, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 13];

var levelOne_B =
				[10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11,
				 8, 0, 19, 20, 20, 20, 19, 20, 19, 20, 20, 20, 20, 19, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 9,
				 12, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 13];

var levelTwo =
				[10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 4, 21, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 21, 21, 21, 21, 21, 0, 21, 9,
				 8, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 21, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21, 21, 21, 21, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 21, 0, 21, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 9,
				 12, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 13];

var levelGameOver =
				[10, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 9,
				 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
				 12, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 13];

var worldGrid = [];

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_WALL_TOP= 6;
const TILE_WALL_BOTTOM = 7;
const TILE_WALL_LEFT = 8;
const TILE_WALL_RIGHT = 9;
const TILE_WALL_TOPLEFT = 10;
const TILE_WALL_TOPRIGHT = 11;
const TILE_WALL_BOTTOMLEFT = 12;
const TILE_WALL_BOTTOMRIGHT = 13;
const TILE_CROWBAR = 14;
const TILE_CHAINED_DOOR = 15;
const TILE_GHOST = 16;
//const TILE_STAIRSUP = 17;
//const TILE_STAIRSDOWN = 18;
const TILE_BOOKSHELF_COBWEB = 19;
const TILE_BOOKSHELF_NOCOBWEB = 20;
const TILE_GROUND_HOLE = 21;


function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		return worldIndexUnderWarrior;
	} // end of valid col and row

	return undefined;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_GOAL ||
			checkTileType == TILE_KEY ||
			checkTileType == TILE_CROWBAR ||
			checkTileType == TILE_GHOST ||
			checkTileType == TILE_DOOR) ;
//			checkTileType == TILE_STAIRSUP) ||
//			checkTileType == TILE_STAIRSDOWN);

}

function drawWorld() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_GROUND],drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row

} // end of drawWorld func
