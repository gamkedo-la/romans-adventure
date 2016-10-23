const PLAYER_MOVE_SPEED = 2.0;


function heroClass()
{


	this.x;
	this.y;
	this.myHeroPic; // which picture to use
	this.name = "Roman";
	this.doorKeyRing = [];
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
		this.doorKeyRing = [];

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
			&& !this.keyHeld_South && !this.keyHeld_West && !isEditorMode)
		{
			nextY -= PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_East && !this.keyHeld_North
			&& !this.keyHeld_South && !this.keyHeld_West && !isEditorMode)
		{
			nextX += PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_South && !this.keyHeld_East
			&& !this.keyHeld_North && !this.keyHeld_West && !isEditorMode)
		{
			nextY += PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_West && !this.keyHeld_East
			&& !this.keyHeld_North && !this.keyHeld_South && !isEditorMode)
		{
			nextX -= PLAYER_MOVE_SPEED;
		}


		const EDGE_OF_SCREEN_X = ((WORLD_W * WORLD_COLS) - (WORLD_W / 2)); // Distance Roman can walk to the right edge before loading next room
		const EDGE_OF_SCREEN_Y = ((WORLD_H * WORLD_ROWS) - (WORLD_H / 2)); // Distance Roman can walk to the top edge before loading next room

	    // Load room when nearing edge of screen
		if (nextY < WORLD_H /2)
		{
		    currentRoomRow--;
		    loadLevel(roomCoordToIndex());
		    nextY = EDGE_OF_SCREEN_Y;
		}
		if (nextY > EDGE_OF_SCREEN_Y)
		{
		    currentRoomRow++;
		    loadLevel(roomCoordToIndex());
		    nextY = WORLD_H;
		}
		if (nextX < WORLD_W / 2)
		{
		    currentRoomCol--;
		    loadLevel(roomCoordToIndex());
		    nextX = EDGE_OF_SCREEN_X;
		}
		if (nextX > EDGE_OF_SCREEN_X)
		{
		    currentRoomCol++;
		    loadLevel(roomCoordToIndex());
		    nextX = WORLD_W;
		}


		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY); //World.js
		var walkIntoTileType = TILE_WALL;
		if(walkIntoTileIndex != undefined)
		{
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}

		// Check the tile you just collided with
		if (tileTypeIsKey(walkIntoTileType)) {
			var whichKey = tileTypeToIndexForKey(walkIntoTileType);

			this.doorKeyRing[whichKey] = true;
			worldGrid[walkIntoTileIndex] = TILE_GROUND;
			roomLayout[currentRoomIndex][walkIntoTileIndex] = TILE_GROUND; // Remembers changed block
			displayUIText("Picked up " + idxToTextKey(whichKey) + ".");

		} else if (tileTypeIsDoor(walkIntoTileType)) {
			var whichDoor = tileTypeToIndexForDoor(walkIntoTileType);

			if (this.doorKeyRing[whichDoor] == true) {
				this.doorKeyRing[whichDoor] = false;
				displayUIText("Used " + idxToTextKey(whichDoor) + " to open "+
										idxToTextDoor(whichDoor)+".");
				worldGrid[walkIntoTileIndex] = TILE_GROUND;
				roomLayout[currentRoomIndex][walkIntoTileIndex] = TILE_GROUND; // Remembers changed block
			} else {
				displayUIText("Need something to open "+
										idxToTextDoor(whichDoor)+".");
			}

		}

		if (walkIntoTileType < 10)
		{
		    this.x = nextX;
		    this.y = nextY;
		}
	}

	this.draw = function()
	{
	    drawBitmapCenteredWithRotation(this.myHeroPic, this.x, this.y, 0); // GraphicCommon.js
	}
}
