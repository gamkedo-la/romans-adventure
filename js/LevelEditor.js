var isEditorMode = false;
var tileWidthScaled = WORLD_W * PIXEL_SCALE_UP;
var tileHeightScaled = WORLD_H * PIXEL_SCALE_UP;

var mouseOverTileIdx = -1;

var mouseX = 0;
var mouseY = 0;

// Get current mouse position on screen
function updateMousePos(evt)
{
	var rect = scaledCanvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function editorKeyHandle(keyEvt)
{
	switch(keyEvt.keyCode)
	{
		case KEY_1:
			worldGrid[mouseOverTileIdx] = TILE_GROUND;
			break;
	    case KEY_2:
	        worldGrid[mouseOverTileIdx] = TILE_WALL;
	        break;
	    case KEY_LEFT_ARROW:
	        currentRoomCol--;
	        moveToNextRoom();
	        break;
	    case KEY_RIGHT_ARROW:
	        currentRoomCol++;
	        moveToNextRoom();
	        break;
	        currentRoomCol--;
	        break;
	    case KEY_DOWN_ARROW:
	        currentRoomRow++;
	        moveToNextRoom();
	        break;
	    case KEY_UP_ARROW:
	        currentRoomRow--;
	        moveToNextRoom();
	        break;
	    case KEY_SPACE:
	        currentRoomFloor++;
	        moveToNextRoom();
	        break;
		default:
			break;
	}
}

// Round mouse position and return grid coordinate mouse cursor is currently hovering over. Draw rect around tile.
function levelGridCoordinate()
{
    var levelCol = Math.floor(mouseX / tileWidthScaled);
    var levelRow = Math.floor(mouseY / tileHeightScaled);

    var gridX = (levelCol * tileWidthScaled);
    var gridY = (levelRow * tileHeightScaled);

    mouseOverTileIdx = rowColToArrayIndex(levelCol, levelRow);

    // Display grid coordinate in UI
    displayUIText("Grid coordinate: "+levelCol+","+levelRow + "  |  Index: " + mouseOverTileIdx + "  |  Room: " + roomNames[currentRoomIndex]);

    // Draw outline around highlighted tile, snap to grid
    drawStrokeRect(scaledContext, gridX, gridY, tileWidthScaled, tileHeightScaled, 'red');
}

//Checks if player is moving to a valid room and then loads the room
function moveToNextRoom()
{
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
