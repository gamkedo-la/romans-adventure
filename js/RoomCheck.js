var denPuzzleSolved = false;
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
}

function checkGardenMiddle()
{
    if (roomCoordToIndex() == ROOM_ID_GARDEN_MIDDLE)
    {
        triggerTile(1, false, changeTile, 24, 11, 0);
    }
}

function checkDen()
{
    if (roomCoordToIndex() == ROOM_ID_DEN && denPuzzleSolved == false)
    {
        if (worldGrid[69] == 20 && worldGrid[70] == 21 && worldGrid[71] == 22
                && worldGrid[85] == 23 && worldGrid[86] == 24 && worldGrid[87] == 25
                && worldGrid[101] == 26 && worldGrid[102] == 27 && worldGrid[103] == 28
                && denPuzzleSolved == false) // Check if all table pieces are assembled in the correct order
        {
            denPuzzleSolved = true;
            spawnKey(TILE_KEY_GARDEN, 91);
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
    if (roomCoordToIndex() == ROOM_ID_FOYER_ENTRANCE)
    {
        triggerTile(3, false, spawnKey, TILE_KEY_GARDEN, 88);
    }
}


romanIsOnTriggerTile = false;

function triggerTile(tileType, isPermanent, funcToExecute, funcParam1, funcParam2, funcParam3)
{
    if (worldGrid[romanCurrentIndex] == tileType)
    {
        funcToExecute(funcParam1, funcParam2, funcParam3);
    }
    if (isPermanent == false) // Should the trigger tile disappear?
    {
        worldGrid[romanCurrentIndex] == TILE_GROUND; // Delete from scene being drawn
        roomLayout[roomCoordToIndex()][romanCurrentIndex] = TILE_GROUND; // Delete from scene in memory
    }
}

var romanIsOnTriggerTile = false;
var triggerTileType = -1;

function changeTile(indexOfChangingTile, changingTileTypeOff, changingTileTypeOn)
{
    if (romanIsOnTriggerTile == false)
    {
        triggerTileType = worldGrid[romanCurrentIndex];
        romanIsOnTriggerTile = true;
        if (worldGrid[indexOfChangingTile] == changingTileTypeOff)
        {
            worldGrid[indexOfChangingTile] = changingTileTypeOn;
            roomLayout[roomCoordToIndex()][indexOfChangingTile] = changingTileTypeOn;
        }
    }
}


function spawnKey(whichKey, whichTileIndex)
{
    worldGrid[whichTileIndex] = whichKey;
}