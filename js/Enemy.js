// enemy id numbers
const ENEMY_BAT = 0;
const ENEMY_GHOST = 1;
const ENEMY_SKULL = 2;
const ENEMY_SLIME = 3;

const FRAME_DIM = 14; // pixel dimensions of each frame square

function EnemyClass()
{
	this.x;
	this.y;
	this.myMonsterKindID = 0; // which picture to use, can also switch on for behaviors
	this.inRoomIndex = 0; // which room is this monster in? otherwise skip its behavior & draw
	this.movingX = 0;
	this.movingY = 0;
	this.animFrame = 0;

	this.reset = function()
	{
		for(var eachRow = 0;eachRow<WORLD_ROWS;eachRow++)
		{
			for(var eachCol = 0;eachCol<WORLD_COLS;eachCol++)
			{
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

				if(worldGrid[arrayIndex] >= TILE_START_ENEMY_FIRST_ENUM &&
					worldGrid[arrayIndex] <= TILE_START_ENEMY_LAST_ENUM)
				{
					this.myMonsterKindID = worldGrid[arrayIndex] - TILE_START_ENEMY_FIRST_ENUM;
					worldGrid[arrayIndex] = TILE_GROUND;
					this.x = eachCol * WORLD_W + WORLD_W/2;
					this.y = eachRow * WORLD_H + WORLD_H/2;
					this.inRoomIndex = roomCoordToIndex();
					return true; // found a monster to spawn
				} // end of player start if
			} // end of col for
		} // end of row for
		return false; // scanned whole room and no monster spawn tiles left here to account for
	} // end of heroReset func

	this.move = function()
	{
		if(roomCoordToIndex() != this.inRoomIndex) {
			return;
		}
		var nextX = this.x;
		var nextY = this.y;

		nextX += this.movingX;
		nextY += this.movingY;

		if (nextY < WORLD_H)
		{
			nextY = WORLD_H;
		}
		if (nextY > EDGE_OF_SCREEN_Y)
		{
		    nextY = EDGE_OF_SCREEN_Y;
		}
		if (nextX < WORLD_W)
		{
		    nextX = WORLD_W;
		}
		if (nextX > EDGE_OF_SCREEN_X)
		{
		    nextX = EDGE_OF_SCREEN_X;
		}

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY); //World.js
		var walkIntoTileType = TILE_WALL;
		if(walkIntoTileIndex != undefined)
		{
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}

		if (walkIntoTileType < 10 || walkIntoTileType == TILE_ALIAS_ICE)
		{
		    this.x = nextX;
		    this.y = nextY;
		}
	}

	this.draw = function()
	{
		if(roomCoordToIndex() != this.inRoomIndex) {
			return;
		}
		this.animFrame++;
		var frameCap = Math.floor(enemyArtStrips[this.myMonsterKindID].width / FRAME_DIM);
		this.animFrame %= frameCap;
	    canvasContext.drawImage(enemyArtStrips[this.myMonsterKindID],
	    	this.animFrame*FRAME_DIM,0,
	    	FRAME_DIM,FRAME_DIM,
	    	this.x-FRAME_DIM/2,
	    	this.y-FRAME_DIM+1,
	    	FRAME_DIM, FRAME_DIM);
	}
}

