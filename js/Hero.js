const PLAYER_MOVE_SPEED = 2.0;

function heroClass()
{
	this.x;
	this.y;
	this.myHeroPic; // which picture to use
	this.name = "Roman";
	this.doorKeyHeld = false;
	this.crowbarHeld = false;
	this.currentLevel = levelFoyerEntrance;

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey)
	{
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, heroName)
	{
		this.name = heroName;
		this.myHeroPic = whichImage;
		//this.keysHeld = 0;
		//this.updateKeyReadout();

		for(var eachRow = 0;eachRow<WORLD_ROWS;eachRow++)
		{
			for(var eachCol = 0;eachCol<WORLD_COLS;eachCol++)
			{
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(worldGrid[arrayIndex] == TILE_PLAYERSTART)
				{
					worldGrid[arrayIndex] = TILE_GROUND;
					this.x = eachCol * WORLD_W + WORLD_W/2;
					this.y = eachRow * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of heroReset func

	this.move = function()
	{
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_North && !this.keyHeld_East
			&& !this.keyHeld_South && !this.keyHeld_West)
		{
			nextY -= PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_East && !this.keyHeld_North
			&& !this.keyHeld_South && !this.keyHeld_West)
		{
			nextX += PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_South && !this.keyHeld_East
			&& !this.keyHeld_North && !this.keyHeld_West)
		{
			nextY += PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_West && !this.keyHeld_East
			&& !this.keyHeld_North && !this.keyHeld_South)
		{
			nextX -= PLAYER_MOVE_SPEED;
		}

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY); //World.js
		var walkIntoTileType = TILE_WALL;
		if(walkIntoTileIndex != undefined)
		{
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}

		// Check the tile you just collided with
		switch(walkIntoTileType)
		{
			case TILE_GROUND:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_DOOR:
				console.log("You do not have a key to the door.");
				break;
			case TILE_KEY:
				this.doorKeyHeld = true;
				console.log("Picked up the door key.");
				worldGrid[walkIntoTileIndex] = TILE_GROUND;
				break;
			case TILE_WALL:
			default:
				break;
		}
	}

	this.draw = function()
	{
		drawBitmapCenteredWithRotation(this.myHeroPic, this.x,this.y, 0); // GraphicCommon.js
	}
}
