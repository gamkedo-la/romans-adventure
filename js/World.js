const WORLD_W = 14;
const WORLD_H = 14;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
const PIXEL_SCALE_UP = 4;

var worldGrid = [];

// ******BEGIN MAP EDITOR******

var levelOne =
	[
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400,
		 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400,
	 ];

// ******END MAP EDITOR******


// ******BEGIN TILE KEY******

// environment
const TILE_GROUND = 0;
const TILE_WALL = 1;

// player and pickups
const TILE_PLAYERSTART = 100;

// doors
const TILE_DOOR = 200; //needs KEY @ 300
const TILE_DOOR_A = 201; //needs KEY_A @ 301

// keys
const TILE_KEY = 300; //unlocks DOOR @ 200
const TILE_KEY_A = 301; //unlocks DOOR_A @ 201

// misc
const TILE_UI_PLACEHOLDER = 400; //placeholder for incoming inventory UI

// ******END TILE KEY******


function returnTileTypeAtColRow(col, row)
{
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS)
	{
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	}
	else
	{
		return WORLD_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY)
{
	var heroWorldCol = Math.floor(atX / WORLD_W);
	var heroWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderhero = rowColToArrayIndex(heroWorldCol, heroWorldRow);

	if(heroWorldCol >= 0 && heroWorldCol < WORLD_COLS &&
		heroWorldRow >= 0 && heroWorldRow < WORLD_ROWS)
	{
		return worldIndexUnderhero;
	} // end of valid col and row
	return undefined;
} // end of getTileIndexAtPixelCoord func

function rowColToArrayIndex(col, row)
{
	return col + WORLD_COLS * row;
}

// all tiles with transparency must be listed below
function tileTypeHasTransparency(checkTileType)
{
	return (checkTileType == TILE_DOOR ||
			checkTileType == TILE_KEY );
}

function drawWorld()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow = 0;eachRow<WORLD_ROWS;eachRow++)
	{
		for(var eachCol = 0;eachCol<WORLD_COLS;eachCol++)
		{
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if(tileTypeHasTransparency(tileKindHere))
			{
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
