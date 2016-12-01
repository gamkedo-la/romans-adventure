// enemy id numbers
const ENEMY_BAT = 0;
const ENEMY_GHOST = 1;
const ENEMY_SKULL = 2;
const ENEMY_SLIME = 3;
const ENEMY_ROMAN = 4;
const ENEMY_PUMKIN = 5;
const ENEMY_BOOK = 6;

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
	this.isFrozen = false;
	this.isRead = false;
	this.currentIndex;
	this.index = 0;

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
				} // end of enemy start if
			} // end of col for
		} // end of row for
		return false; // scanned whole room and no monster spawn tiles left here to account for
	}; // end of enemy reset func

	this.move = function()
	{
		if(roomCoordToIndex() != this.inRoomIndex) {
			return;
		}
		var nextX = this.x;
		var nextY = this.y;

		nextX += this.movingX;
		nextY += this.movingY;

        // Some enemies may want to go off the screen
		//if (nextY < WORLD_H)
		//{
		//	nextY = WORLD_H;
		//}
		//if (nextY > EDGE_OF_SCREEN_Y)
		//{
		//    nextY = EDGE_OF_SCREEN_Y;
		//}
		//if (nextX < WORLD_W)
		//{
		//    nextX = WORLD_W;
		//}
		//if (nextX > EDGE_OF_SCREEN_X)
		//{
		//    nextX = EDGE_OF_SCREEN_X;
		//}

		this.currentIndex = getTileIndexAtPixelCoord(this.x, this.y);
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
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

		if (this.myMonsterKindID == ENEMY_ROMAN)
		{
		    this.enemyRomanBehavior();
		}
		else if (this.myMonsterKindID == ENEMY_GHOST)
		{
		    this.enemyGhostBehavior();
		}
		else if (this.myMonsterKindID == ENEMY_BOOK)
		{
		    this.enemyBookBehavior();
		}
    };

	this.draw = function()
	{
	    if (roomCoordToIndex() != this.inRoomIndex)
	    {
	        return;
	    }
	    if (animationFrameDelay == 0)
	    {
	        this.animFrame++;
	    }
	    var frameCap = Math.floor(enemyArtStrips[this.myMonsterKindID].width / FRAME_DIM);
	    this.animFrame %= frameCap;
	    canvasContext.drawImage(enemyArtStrips[this.myMonsterKindID],
            this.animFrame * FRAME_DIM, 0,
            FRAME_DIM, FRAME_DIM,
            this.x - FRAME_DIM / 2,
            this.y - FRAME_DIM + 1,
            FRAME_DIM, FRAME_DIM);
	};

	this.enemyRomanBehavior = function ()
	{
	    var centerOfRoomCoordRoman = (WORLD_W * WORLD_COLS / 2 - WORLD_W / 2);
	    var centerOfRoomCoordEnemyRoman = (WORLD_W * WORLD_COLS / 2 + WORLD_W / 2)
	    if (stairsPuzzleSolved)
	    {
	        worldGrid[156] = TILE_GROUND;
	    }
	    else
	    {
	        if (roman.isMoving && this.isFrozen == false)
	        {
	            this.y = roman.y;
	            this.x = WORLD_W * WORLD_COLS - roman.x;
	        }

	        if (roman.x > centerOfRoomCoordRoman && worldGrid[24] != 21)
	        {
	            roman.x = centerOfRoomCoordRoman;
	            postMessage(dialogueGhostRoman);
	        }
	        else if (worldGrid[24] == 21)
	        {
	            this.isFrozen = true;
	            stairsPuzzleSolved = true;
	            worldGrid[24] = 20;
	            postMessage(dialogueStairsPuzzleSolved);
	        }
	    }
	};

    // @ashcat <------------
	var ghostSpeed = 1.5;
	this.enemyGhostBehavior = function(whichRoom)
	{

	    whichRoom = roomCoordToIndex();

        // Check behavior for basement garden exit
	    if (whichRoom == ROOM_ID_BASEMENT_GARDEN_EXIT)
	    {
	        this.x += ghostSpeed;

	        if (this.x > canvas.width - WORLD_W || this.x < 0 + WORLD_W)
	        {
	            ghostSpeed *= -1;
	        }

	    }
	    // Check if ghost enemy and roman are at the same worldGrid index
	    if (roman.currentIndex == this.currentIndex)
	    {
	        roman.x = 105;
	        roman.y = 20;
	    }
	}

	var bookSpeed = Math.floor(Math.random() * 2) + 1;

	this.enemyBookBehavior = function()
	{
	    var passage = "";
	    if (isFlashLightNeededButMissing())
	    {
	        return;
	    }
	    else
	    {
	        this.y += bookSpeed;

	        if (this.y > EDGE_OF_SCREEN_Y - WORLD_H || this.y < 0 + WORLD_H * 2)
	        {
	            bookSpeed *= -1;
	        }

	        if (roman.currentIndex == this.currentIndex && this.isRead == false)
	        {
	            this.isRead = true;
	            orderOfBooksRead.push(this.index);
	            postMessage(this.passage);
	        }
	    }

	}
}
