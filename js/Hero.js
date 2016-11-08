const PLAYER_MOVE_SPEED = 2.0;

var keyStripLimit = 8; // Max number of keys displayed per line in the UI

function heroClass()
{


	this.x;
	this.y;
	this.myHeroPic; // which picture to use
	this.name = "Roman";
	this.doorKeyRing = [];
	this.currentLevel = levelFoyerEntrance;
	this.movingX = 0;
	this.movingY = 0;
	this.isSliding = false;
	this.isMoving = false;
	this.hasMirror = false;

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
		this.myHeroPic = heroPicLeft;
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

		if(this.isSliding == false) {
			this.movingX = 0;
			this.movingY = 0;

			if(this.keyHeld_North && !this.keyHeld_East
				&& !this.keyHeld_South && !this.keyHeld_West && !isEditorMode)
			{
				this.movingY = -PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_East && !this.keyHeld_North
				&& !this.keyHeld_South && !this.keyHeld_West && !isEditorMode)
			{
			    this.movingX = PLAYER_MOVE_SPEED;
			    this.myHeroPic = heroPicRight;
			}
			if(this.keyHeld_South && !this.keyHeld_East
				&& !this.keyHeld_North && !this.keyHeld_West && !isEditorMode)
			{
			    this.movingY = PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_West && !this.keyHeld_East
				&& !this.keyHeld_North && !this.keyHeld_South && !isEditorMode)
			{
			    this.movingX = -PLAYER_MOVE_SPEED;
			    this.myHeroPic = heroPicLeft;
			}
		}

		if(isFlashLightNeededButMissing()) {
			if(this.movingX < 0) { // disallow moving further into dark room
				this.movingX = 0; // (note: direction is hardcoded for now...)
			}
		}

		nextX += this.movingX;
		nextY += this.movingY;

	    // Load room when nearing edge of screen
		if (nextY < WORLD_H /2)
		{
			if (roomCoordToIndex() == ROOM_ID_UPSTAIRS_GOING_DOWN) {
				currentRoomFloor--;
			}
		    currentRoomRow--;
		    loadLevel(roomCoordToIndex());
		    nextY = EDGE_OF_SCREEN_Y;
		}
		if (nextY > EDGE_OF_SCREEN_Y)
		{
				if (roomCoordToIndex() == ROOM_ID_STAIRS && nextX > canvas.width / 2) {
					currentRoomFloor++;
				}
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

		//merging and unmerging rooms
		if(walkIntoTileType == TILE_MERGE_ROOMS){
			mergeRooms();
		}

		if(walkIntoTileType == TILE_UNMERGE_ROOMS){
			unmergeRooms();
		}

		this.isSliding = false; // assume traction unless ice proves otherwise

		// Check the tile you just collided with
		if (tileTypeIsKey(walkIntoTileType)) {
			var whichKey = tileTypeToIndexForKey(walkIntoTileType);

			this.doorKeyRing[whichKey] = true;
			worldGrid[walkIntoTileIndex] = TILE_GROUND;
			pickedUpItem(keyStrip, whichKey);
			roomLayout[currentRoomIndex][walkIntoTileIndex] = TILE_GROUND; // Remembers changed block
			postMessage("Picked up " + idxToTextKey(whichKey) + ".");
			Sounds.pick_up.play();

		} else if (tileTypeIsDoor(walkIntoTileType)) {
			var whichDoor = tileTypeToIndexForDoor(walkIntoTileType);

			if(walkIntoTileType == TILE_ALIAS_ICE) {
				if (this.doorKeyRing[whichDoor] == true) {
					this.isSliding = false;
				} else {
					this.isSliding = true;
				}
			} else { // generic key/door fallback, no special behavior defined

				if (this.doorKeyRing[whichDoor] == true) {
					this.doorKeyRing[whichDoor] = false;
					Sounds.unlock.play();
					postMessage("Used " + idxToTextKey(whichDoor) + " to open "+
											idxToTextDoor(whichDoor)+".");
					worldGrid[walkIntoTileIndex] = TILE_GROUND;
					roomLayout[currentRoomIndex][walkIntoTileIndex] = TILE_GROUND; // Remembers changed block
				} else {
					postMessage("Need something to open "+
											idxToTextDoor(whichDoor)+".");
				} 
			}


		}
		if (walkIntoTileType < 10 || walkIntoTileType == TILE_ALIAS_ICE)
		{
		    this.isMoving = (this.x != nextX || this.y != nextY);
		    this.x = nextX;
		    this.y = nextY;

		}
		else
		{
		    this.isMoving = false;
		}
	}

	this.draw = function()
	{
	    drawBitmapCenteredWithRotation(this.myHeroPic, this.x, this.y-this.myHeroPic.height/2+1, 0); // GraphicCommon.js
	}
}

function pickedUpItem(artStrip, itemIdx)
{
    var drawTileX = itemIdx * WORLD_W;
    var drawTileY = WORLD_H * WORLD_ROWS;
    var imageIdxY = itemIdx * WORLD_H;

    if (itemIdx >= keyStripLimit)
    {
        drawTileY = WORLD_H * WORLD_ROWS + WORLD_H;
        drawTileX = (itemIdx - keyStripLimit) * WORLD_W;
    }
    canvasContext.drawImage(artStrip, 0, imageIdxY, WORLD_W, WORLD_H,
                                  drawTileX, drawTileY, WORLD_W, WORLD_H);
}

function drawTextBoundingBox()
{
    var textBoxTopLeftX = keyStripLimit * WORLD_W;
    var textBoxTopLeftY = WORLD_H * WORLD_ROWS;
    var textBoxWidth = (WORLD_W * WORLD_COLS) - (keyStripLimit * WORLD_W);
    var textBoxHeight = (WORLD_H * UI_ROWS);
    //drawStrokeRect(canvasContext, textBoxTopLeftX, textBoxTopLeftY, textBoxWidth, textBoxHeight, 'white');
    colorRect(textBoxTopLeftX, textBoxTopLeftY, textBoxWidth, textBoxHeight, 'white');
}

