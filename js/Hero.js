const PLAYER_MOVE_SPEED = 2.0;

var keyStripLimit = 5; // Max number of keys displayed per line in the UI
var tileUnderPushable = 0;
var originalRoomState = [];
var retriesLeft = 3;

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

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;
	this.currentIndex;
	this.roomLoadedX = 105; // Roman's X position when the room was loaded
	this.roomLoadedY = 119; // Romans Y position when the room was loaded

	this.setupInput = function(upKey, rightKey, downKey, leftKey)
	{
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	};

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
	}; // end of heroReset func

	this.move = function()
	{
		var nextX = this.x;
		var nextY = this.y;

		for(var i=0;i<enemyList.length;i++) {
			enemyList[i].move();
		}

		if(this.isSliding == false) {
			this.movingX = 0;
			this.movingY = 0;

			if(this.keyHeld_North && !this.keyHeld_East
				&& !this.keyHeld_South && !this.keyHeld_West && !isEditorMode)
			{
				this.movingY = -PLAYER_MOVE_SPEED;
				this.myHeroPic = heroPicUp;
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
					this.myHeroPic = heroPicLeft;
			}
			if(this.keyHeld_West && !this.keyHeld_East
				&& !this.keyHeld_North && !this.keyHeld_South && !isEditorMode)
			{
			    this.movingX = -PLAYER_MOVE_SPEED;
			    this.myHeroPic = heroPicLeft;
			}
		}

		crashThroughCrackedFloor();

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
		    roman.roomLoadedX = roman.x;
		    roman.roomLoadedY = EDGE_OF_SCREEN_Y;
		}
		if (nextY > EDGE_OF_SCREEN_Y)
		{
				if (roomCoordToIndex() == ROOM_ID_STAIRS && nextX > canvas.width / 2) {
					currentRoomFloor++;
				}
				else if (roomCoordToIndex() == ROOM_ID_FOYER_ENTRANCE)
				{
				    backgroundMusic.pause();
				    Sounds.victory.play();
					postMessage("Make a game over screen you lazy bum!");
					return;
				}
		    currentRoomRow++;
		    loadLevel(roomCoordToIndex());
		    nextY = WORLD_H / 2;
		    roman.roomLoadedX = roman.x;
		    roman.roomLoadedY = WORLD_W;
		}
		if (nextX < WORLD_W / 2)
		{
			if (roomCoordToIndex() == ROOM_ID_FOYER_STAIRS)
			{
				roomLayout[ROOM_ID_BASEMENT_STATUE_AREA][95] = TILE_GROUND; // Remove the basement door from the basement level in the unlikely event player backtracks
			}
		    currentRoomCol--;
		    loadLevel(roomCoordToIndex());
		    nextX = EDGE_OF_SCREEN_X;
		    roman.roomLoadedX = EDGE_OF_SCREEN_X;
		    roman.roomLoadedY = roman.y;
		}
		if (nextX > EDGE_OF_SCREEN_X)
		{
			if (roomCoordToIndex() == ROOM_ID_BASEMENT_STATUE_AREA)
			{
				roomLayout[ROOM_ID_FOYER_STAIRS][80] = TILE_GROUND; // Remove the basement door from the foyer stairs level
			}
		    currentRoomCol++;
		    loadLevel(roomCoordToIndex());
		    nextX = WORLD_W;
		    roman.roomLoadedX = WORLD_W;
		    roman.roomLoadedY = roman.y;
		}

		this.currentIndex = getTileIndexAtPixelCoord(this.x, this.y);
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY); //World.js
		var walkIntoTileType = TILE_WALL;
		if(walkIntoTileIndex != undefined)
		{
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}

		var roomIndex = roomCoordToIndex();
		if (roomIndex == ROOM_ID_ATTIC) {
			atticShowPath = (walkIntoTileType == TILE_SHOW_PATH);

			if (!atticPuzzleSolved && atticShowPath) {
				postMessage(dialogueAtticPuzzleShowPath);
			}
		}


		this.isSliding = false; // assume traction unless ice proves otherwise

	    // Check the tile you just collided with
		if (walkIntoTileType >= TILES_PUSHABLE_FIRST && walkIntoTileType <= TILES_PUSHABLE_LAST)
		{
		    var bumpToTileIndex = walkIntoTileIndex;
		    var tileTypeBeingBumped = walkIntoTileType;
		    if (this.movingX > 0) // Moving right
		    {
		        bumpToTileIndex++;
		    }
		    if (this.movingX < 0) // Moving left
		    {
		        bumpToTileIndex--;
		    }
		    if (this.movingY > 0) // Moving down
		    {
		        bumpToTileIndex += WORLD_COLS;
		    }
		    if (this.movingY < 0) // Moving up
		    {
		        bumpToTileIndex -= WORLD_COLS;
		    }
		    var bumpIntoRow;
		    var bumpIntoCol;
		    bumpIntoRow = Math.floor(bumpToTileIndex / WORLD_COLS);
		    bumpIntoCol = bumpToTileIndex % WORLD_COLS;
		    if ((roomCoordToIndex() == ROOM_ID_GARDEN_MIDDLE) && (worldGrid[bumpToTileIndex] <= TILE_WALKABLE_LAST
                    && bumpIntoRow > 0
                    && bumpIntoRow < WORLD_ROWS - 1
                    && bumpIntoCol > 0
                    && bumpIntoCol < WORLD_COLS - 1))
		    {
		        if (originalRoomState[walkIntoTileIndex] <= TILE_WALKABLE_LAST)
		        {
		            worldGrid[walkIntoTileIndex] = originalRoomState[walkIntoTileIndex]; // Replace ground with what was originally there
		        }
		        else
		        {
		            worldGrid[walkIntoTileIndex] = TILE_GROUND; // Replace ground with default ground tile if nothing was there originally
		        }
                worldGrid[bumpToTileIndex] = tileTypeBeingBumped;
            }
		    else if (worldGrid[bumpToTileIndex] == TILE_GROUND
                    && bumpIntoRow > 0
                    && bumpIntoRow < WORLD_ROWS - 1
                    && bumpIntoCol > 0
                    && bumpIntoCol < WORLD_COLS - 1)
		    {
		        worldGrid[walkIntoTileIndex] = TILE_GROUND;
		        worldGrid[bumpToTileIndex] = tileTypeBeingBumped;
		        Sounds.tile_moved.play();
		    }
		}

		if (tileTypeIsKey(walkIntoTileType)) {
			var whichKey = tileTypeToIndexForKey(walkIntoTileType);

			this.doorKeyRing[whichKey] = true;
			worldGrid[walkIntoTileIndex] = TILE_GROUND;
			pickedUpItem(keyStrip, whichKey);
			roomLayout[roomCoordToIndex()][walkIntoTileIndex] = TILE_GROUND; // Remembers changed block
			postMessage("Picked up the " + idxToTextKey(whichKey) + ".");
			Sounds.pick_up.play();

		} else if (tileTypeIsDoor(walkIntoTileType)) {
			var whichDoor = tileTypeToIndexForDoor(walkIntoTileType);

			if(walkIntoTileType == TILE_ALIAS_ICE) {
			    if (this.doorKeyRing[whichDoor] == true || this.doorKeyRing[KEYDOOR_IDX_DEBUG] == true)
			    {
					this.isSliding = false;
				} else {
					this.isSliding = true;
				}
			} else { // generic key/door fallback, no special behavior defined

			    if (this.doorKeyRing[whichDoor] == true || this.doorKeyRing[KEYDOOR_IDX_DEBUG] == true)
			    {
					//this.doorKeyRing[whichDoor] = false; // Removes key from inventory
					Sounds.unlock.play();
					worldGrid[walkIntoTileIndex] = TILE_GROUND;
					roomLayout[roomCoordToIndex()][walkIntoTileIndex] = TILE_GROUND; // Remembers changed block
			    }
			    else
			    {
					postMessage("The door is locked, I need a key.");
				}
			}


		}
		if (walkIntoTileType != ANIM_TILE_CLOCK &&
			(walkIntoTileType < TILES_SOLID_FIRST || walkIntoTileType == TILE_ALIAS_ICE))
		{
		    this.isMoving = (this.x != nextX || this.y != nextY);
		    this.x = nextX;
		    this.y = nextY;

		}
		else
		{
		    this.isMoving = false;
		}
	};

	this.draw = function()
	{
	    drawBitmapCenteredWithRotation(this.myHeroPic, this.x, this.y-this.myHeroPic.height/2+1, 0); // GraphicCommon.js
	};

	this.search = function(whichRoom)
	{
	    var whichItem = searchableTiles[whichRoom];
	    if (roomCoordToIndex() == ROOM_ID_STUDY)
	    {
	        if (roman.currentIndex == 50 && !bookOne.isRead)
	        {
	            bookOne.readPassage();
	        }
	        else if (roman.currentIndex == 106 || roman.currentIndex == 107 && !bookTwo.isRead)
	        {
	            bookTwo.readPassage();
	        }
	        else if (roman.currentIndex == 52 && !bookThree.isRead)
	        {
	            bookThree.readPassage();
	        }
	        else if (roman.currentIndex == 59 || roman.currentIndex == 60 && !bookFour.isRead)
	        {
	            bookFour.readPassage();
	        }
	        else if (roman.currentIndex == 98 || roman.currentIndex == 99 || roman.currentIndex == 100
                       || roman.currentIndex == 101 || roman.currentIndex == 102 && !bookFive.isRead)
	        {
	            bookFive.readPassage();
	        }
	    }
	    else if (roomCoordToIndex() != ROOM_ID_STUDY)
	    {
	        if (worldGrid[roman.currentIndex] == searchableTileType)
	        {
	            postMessage("Roman found the " + idxToTextKey(whichItem) + ".");
	            this.doorKeyRing[whichItem] = true;
	            pickedUpItem(keyStrip, whichItem);
	            Sounds.pick_up.play();
	            worldGrid[roman.currentIndex] = --searchableTileType;
	            roomLayout[roomCoordToIndex()][roman.currentIndex] = --searchableTileType;

	            // Let the rooms handle some stuff as well!
	            searchRoomLogic();
	        }
	        else
	        {
	            postMessage("You didn't find anything.");
	        }
	    }

	};

	this.resetBeginningOfRoom = function()
	{
		this.x = this.roomLoadedX;
		this.y = this.roomLoadedY;
		roman.currentIndex = getTileIndexAtPixelCoord(this.roomLoadedX, this.roomLoadedY);
	}
}

function pickedUpItem(whichArtStrip, itemIdx)
{
    var drawTileX = itemIdx * WORLD_W - WORLD_W; // -WORLD_W offsets debug key 300, starts row at 301
    var drawTileY = WORLD_H * WORLD_ROWS;
    var imageIdxY = itemIdx * WORLD_H;

    if (itemIdx >= keyStripLimit)
    {
        drawTileY = WORLD_H * WORLD_ROWS + WORLD_H;
        drawTileX = (itemIdx - keyStripLimit) * WORLD_W;
    }
    canvasContext.drawImage(whichArtStrip, 0, imageIdxY, WORLD_W, WORLD_H,
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
