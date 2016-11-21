var isEditorMode = false;
var tileWidthScaled = WORLD_W * PIXEL_SCALE_UP;
var tileHeightScaled = WORLD_H * PIXEL_SCALE_UP;

var mouseOverTileIdx = -1;
var copiedTile = 0; // Which editor tile you selected from below

var mouseX = 0;
var mouseY = 0;

var uiGrid = [];

var levelCol = 0;
var levelRow = 0;

const UI_ROWS = 2;
var artStripGroupLimit = 10; // Max tiles in the roomStrips that are grouped (walkable, not walkable)
var roomTileGroup = 0;




var editorTileSelected = false; // Check whether or not a tile from the editor has been selected

// Get current mouse position on screen
function updateMousePos(evt)
{
    var rect = scaledCanvas.getBoundingClientRect();
    var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

// Key commands when in Level Editor Mode
function editorKeyHandle(keyEvt)
{
	switch(keyEvt.keyCode)
	{
	    case KEY_1:
	        if (roomTileGroup == 0)
	        {
	            roomTileGroup = 20;
	            displayCurrentRoomTiles();
	        }
	        else
	        {
	            roomTileGroup = 0;
	            displayCurrentRoomTiles();
	        }
	        break;
	    case KEY_2:
	        outputWorldGrid();
	        break;
	    case KEY_3:
            break;
	    case KEY_LEFT_ARROW:
	        currentRoomCol--;
	        moveToNextRoom();
	        displayCurrentRoomTiles();
	        break;
	    case KEY_RIGHT_ARROW:
	        currentRoomCol++;
	        moveToNextRoom();
	        displayCurrentRoomTiles();
	        break;
	        currentRoomCol--;
	        break;
	    case KEY_DOWN_ARROW:
	        currentRoomRow++;
	        moveToNextRoom();
	        displayCurrentRoomTiles();
	        break;
	    case KEY_UP_ARROW:
	        currentRoomRow--;
	        moveToNextRoom();
	        displayCurrentRoomTiles();
	        break;
	    case KEY_SPACE:
	        currentRoomFloor++;
	        moveToNextRoom();
	        displayCurrentRoomTiles();
	        break;
		default:
			break;
	}
}

// Round mouse position and return grid coordinate mouse cursor is currently hovering over. Draw rect around tile.
function levelGridCoordinate()
{
    levelCol = Math.floor(mouseX / tileWidthScaled);
    levelRow = Math.floor(mouseY / tileHeightScaled);

    var gridX = (levelCol * tileWidthScaled);
    var gridY = (levelRow * tileHeightScaled);

    mouseOverTileIdx = rowColToArrayIndex(levelCol, levelRow);

    // Display grid coordinate in UI
    displayUIText("Grid coordinate: " + levelCol + "," + levelRow + "  |  Index: " + mouseOverTileIdx, 580, 590);
    displayUIText("Tile type: " + worldGrid[mouseOverTileIdx], 580, 610);
    displayUIText("Room: " + roomNames[roomCoordToIndex()], 580, 630);

    // Draw outline around highlighted tile, snap to grid
    drawStrokeRect(scaledContext, gridX, gridY, tileWidthScaled, tileHeightScaled, 'red');
}

// Checks if player is moving to a valid room and then loads the room
function moveToNextRoom()
{
    editorTileSelected = false; // Turn off the ability to place tile until the new room's tile has been selected
    if (currentRoomCol < 0)
    {
        currentRoomCol = 0;
        loadLevel(roomCoordToIndex());
        return;
    }
    if (currentRoomCol > 2)
    {
        currentRoomCol = 2;
        loadLevel(roomCoordToIndex());
        return;
    }
    if (currentRoomRow < 0)
    {
        currentRoomRow = 0;
        loadLevel(roomCoordToIndex());
        return;
    }
    if (currentRoomRow > 3)
    {
        currentRoomRow = 3;
        loadLevel(roomCoordToIndex());
        return;
    }
    if (currentRoomFloor > 1)
    {
        currentRoomFloor = 0;
        loadLevel(roomCoordToIndex());
        return;
    }
    loadLevel(roomCoordToIndex());
}


function displayCurrentRoomTiles()
{
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    var startY = WORLD_H * WORLD_ROWS;

    for (var eachRow = 0; eachRow < UI_ROWS; eachRow++)
    {
        for (var eachCol = 0; eachCol < artStripGroupLimit; eachCol++)
        {
            canvasContext.drawImage(roomStrips, WORLD_W * roomArtSet, drawTileY + roomTileGroup * WORLD_H, // 0 = Room specific ground under items
                                    WORLD_W, WORLD_H,
                                    drawTileX, startY,
                                    WORLD_W, WORLD_H);
            drawTileX += WORLD_W;
            arrayIndex++;
            drawTileY += WORLD_H;
        }
        startY += WORLD_H;
        drawTileX = 0;
    }


}

// Check if you  are clicking in the Editor Tiles area. If you are copy the tile. If not, place the tile that was copied.
function editTileUnderMousePos()
{
    if (mouseOverTileIdx > 159 && mouseOverTileIdx < 170)
    {
        editorTileSelected = true;
        copiedTile = levelCol + roomTileGroup;
    }
    else if (mouseOverTileIdx > 175 && mouseOverTileIdx < 186)
    {
        editorTileSelected = true;
        copiedTile = levelCol + 10 + roomTileGroup;
    }
    else if (editorTileSelected)
    {
        worldGrid[mouseOverTileIdx] = copiedTile;
        roomLayout[roomCoordToIndex()][mouseOverTileIdx] = copiedTile;
    }
}

// Outputs the current level's array to a text field under the UI
function outputWorldGrid()
{
    //TODO format the string a lil better.
    //console.log(worldGrid);
    /*
    var formattedWorldGrid = worldGrid;
    for(i = 0; i < worldGrid.length; i++){

    }
    */
    document.getElementById("levelEditorOutputText").innerHTML = "var " + roomNames[roomCoordToIndex()]
                                                                           + " = <br>[<br>" + worldGrid
                                                                           + "<br>]";
}
