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
        triggerTileUnderRoman(29, 1, 2, 24, 11, 0);
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
        triggerTileUnderRoman(86, 0, 1, 87, 0, 19, spawnKey, TILE_KEY_GARDEN, 88);
    }
}


romanIsOnTriggerTile = false;

function triggerTileUnderRoman(indexOfTriggerTile, tileTypeOff, tileTypeOn,
                                indexOfChangingTile, changingTileTypeOff, changingTileTypeOn,
                                functionToExecute, functionParam1, functionParam2, functionParam3)
{
    if (romanCurrentIndex == indexOfTriggerTile && romanIsOnTriggerTile == false)
    {
        romanIsOnTriggerTile = true;
        if (worldGrid[romanCurrentIndex] == tileTypeOff)
        {
            worldGrid[romanCurrentIndex] = tileTypeOn;
            worldGrid[indexOfChangingTile] = changingTileTypeOn;
            roomLayout[roomCoordToIndex()][indexOfChangingTile] = changingTileTypeOn;
        }
        else
        {
            worldGrid[romanCurrentIndex] = tileTypeOff;
            worldGrid[indexOfChangingTile] = changingTileTypeOff;
            roomLayout[roomCoordToIndex()][indexOfChangingTile] = changingTileTypeOff;
        }
        if (arguments.length > 6)
        {
            functionToExecute(functionParam1, functionParam2, functionParam3);
        } 
    }
    if (romanCurrentIndex != indexOfTriggerTile && romanIsOnTriggerTile == true)
    {
        romanIsOnTriggerTile = false
    }
}

function spawnKey(whichKey, whichTileIndex)
{
    worldGrid[whichTileIndex] = whichKey;
}