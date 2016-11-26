var denPuzzleSolved = false;
var bedroom1PuzzleSolved = false;
var bedroom1ShowPath = false;
var bedroom1ValidPath = [];
var gardenMiddlePuzzleSolved = false;

var stairsPuzzleSolved = false;

var searchableTiles =
    [
        //"levelGardenLeft", "levelGardenMiddle", "levelGardenRight",
        //"levelBasementGardenExit", "levelStairs", "levelKitchen",
        //"levelBasementFoyerEntrance", "levelFoyerStairs", "levelDiningRoom",
        //"levelStudy", "levelFoyerEntrance", "levelDen",
        //"Undefined Area", "Undefined Area", "Undefined Area",
        //"levelAttic", "levelStairs (duplicate)", "levelBedroomFour",
        //"levelHallwayLeft", "levelHallwayMiddle", "levelHallwayRight",
        //"levelBedroomOne", "levelBedroomTwo", "levelBedroomThree", "levelKitchenBedroomFourMerged"
        -1, -1, -1,
        -1, -1, -1,
        -1, -1, -1,
        -1, ITEM_IDX_FLASHLIGHT, -1,
        -1, -1, -1,
        -1, -1, -1,
        -1, -1, -1,
        -1, -1, -1
    ];


function checkRoomLogic()
{
    checkDen();
    checkStairs();
    checkGardenMiddle();
    checkFoyerEntrance();
    checkBedroom1();
}

function enterBedroom1()
{
    // @todo generate a valid path from id 55 to 123
    bedroom1ValidPath = [55, 71, 87, 103, 104, 105, 106, 107, 123];
}

function bedroom1RoomArtIndexAlter(tileType, index)
{
    if (bedroom1ShowPath && bedroom1ValidPath.indexOf(index) >= 0) {
        tileType += 2;
    }
    return tileType;
}

function checkBedroom1()
{
    if (roomCoordToIndex() != ROOM_ID_BEDROOM1)
    {
        return;
    }

    // @todo if walking on non-path tile, reset to room-start
    var tileIndex = getTileIndexAtPixelCoord(roman.x, roman.y);
    if ((worldGrid[tileIndex] == 1 || worldGrid[tileIndex] == 2) && bedroom1ValidPath.indexOf(tileIndex) < 0) {
        postMessage(dialogueBedroom1PuzzleSteppedOffPath);
        roman.x = 107;
        roman.y = 14;
    }
}

function checkGardenMiddle()
{
    if (roomCoordToIndex() == ROOM_ID_GARDEN_MIDDLE && gardenMiddlePuzzleSolved == false)
    {
        triggerTile(1, false, changeTile, 42, 10, 0);
        triggerTile(2, false, changeTile, 119, 10, 0);
        triggerTile(3, false, changeTile, 56, 10, 0);
        if (worldGrid[49] == 23)
        {
            gardenMiddlePuzzleSolved = true;
            console.log("skull is in the right place");
            roomLayout[roomCoordToIndex()][129] = TILE_KEY_GARDEN_BASEMENT;
        }
    }

}

function checkDen()
{
    if (roomCoordToIndex() == ROOM_ID_DEN && denPuzzleSolved == false)
    {
        if (worldGrid[70] == 20 && worldGrid[71] == 21 && worldGrid[72] == 22
                && worldGrid[86] == 23 && worldGrid[87] == 24 && worldGrid[88] == 25
                && worldGrid[102] == 26 && worldGrid[103] == 27 && worldGrid[104] == 28
                && denPuzzleSolved == false) // Check if all table pieces are assembled in the correct order
        {
            denPuzzleSolved = true;
            spawnTile(19, 70);
            spawnTile(TILE_KEY_GARDEN, 94);
            postMessage(dialogueDenPuzzleSolved);
            roomLayout[roomCoordToIndex()] = worldGrid; // Save state of the room
        }
    }
    else if (roomCoordToIndex() == ROOM_ID_DEN && denPuzzleSolved == true && roman.doorKeyRing[KEYDOOR_IDX_GARDEN] == true)
    {
        worldGrid[91] = TILE_GROUND; // Delete key if roman already has it
    }
}

function checkStairs()
{
    if (roomCoordToIndex() == ROOM_ID_STAIRS && stairsPuzzleSolved)
    {      
        roomLayout[roomCoordToIndex()][18] = 0; // Delete original mirror
        roomLayout[roomCoordToIndex()][24] = 19; // Move fixed mirror to midde
        roomLayout[roomCoordToIndex()][140] = 0; // Delete ghost roman
    }
}

function checkFoyerEntrance()
{

}


// Checks if Roman is standing on a specific kind of tile, if so, call a function
var romanIsOnTriggerTile = false;

function triggerTile(tileType, isPermanent, funcToExecute, funcParam1, funcParam2, funcParam3)
{
    if (worldGrid[roman.currentIndex] == tileType && romanIsOnTriggerTile == false)
    {
        romanIsOnTriggerTile = true;
        funcToExecute(funcParam1, funcParam2, funcParam3);
        if (isPermanent == false) // Should the trigger tile disappear?
        {
            worldGrid[roman.currentIndex] = TILE_GROUND; // Delete from scene being drawn
            roomLayout[roomCoordToIndex()][roman.currentIndex] = TILE_GROUND; // Delete from scene in memory
        }
    }
    if (worldGrid[roman.currentIndex] != tileType && romanIsOnTriggerTile == true)
    {
        romanIsOnTriggerTile = false;
    } 
}

// Toggles tile between two different types
function changeTile(indexOfChangingTile, changingTileTypeOff, changingTileTypeOn)
{
    if (worldGrid[indexOfChangingTile] == changingTileTypeOff)
    {
        worldGrid[indexOfChangingTile] = changingTileTypeOn;
        roomLayout[roomCoordToIndex()][indexOfChangingTile] = changingTileTypeOn;
    }
    else
    {
        worldGrid[indexOfChangingTile] = changingTileTypeOff;
        roomLayout[roomCoordToIndex()][indexOfChangingTile] = changingTileTypeOff;
    }
}


function spawnTile(whichKey, whichTileIndex)
{
    worldGrid[whichTileIndex] = whichKey;
}
