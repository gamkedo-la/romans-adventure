var denPuzzleSolved = false;
var bedroom1PuzzleSolved = false;
var bedroom1ShowPath = false;
var bedroom1ValidPath = [];
var gardenMiddlePuzzleSolved = false;
var stairsPuzzleSolved = false;
var correctOrderOfBooks = [0, 1, 2, 3, 4, 5];
var orderOfBooksRead = [];

var searchableTileType = -1;
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
        -1, KEYDOOR_IDX_GARDEN_BASEMENT, -1,
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
    checkStudy();
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
        searchableTileType = 6;
        triggerTile(1, 4, spawnTile, 0, 30);
        triggerTile(2, 4, spawnTile, 0, 26);
        triggerTile(3, 4, spawnTile, 0, 119);

        // Check if Roman is standing on pressure plate
        if (roman.currentIndex == 105 || roman.currentIndex == 49)
        {
            postMessage("Roman: I need to place something heavy here, it won't budge!");
        }

        // Check if skull is on pressure plate
        if (worldGrid[105] == 21)
        {
            spawnTile(0, 56);
            if (worldGrid[119] == 10)
            {
                postMessage("Uh oh, looks like you got ahead of yourself! Guess you'll have to try again.");
                spawnTile(10, 56);
            }
        }

        // Check if skull is on final pressure plate
        if (worldGrid[49] == 21)
        {
            gardenMiddlePuzzleSolved = true;
            spawnTile(6, 129);
            postMessage(dialogueGardenMiddlePuzzleSolved);
        }
    }

}

function checkDen()
{
    if (roomCoordToIndex() == ROOM_ID_DEN && denPuzzleSolved == false)
    {
        searchableTileType = 8;
        if (worldGrid[70] == 20 && worldGrid[71] == 21 && worldGrid[72] == 22
                && worldGrid[86] == 23 && worldGrid[87] == 24 && worldGrid[88] == 25
                && worldGrid[102] == 26 && worldGrid[103] == 27 && worldGrid[104] == 28
                && denPuzzleSolved == false) // Check if all table pieces are assembled in the correct order
        {
            denPuzzleSolved = true;
            spawnTile(TILE_KEY_GARDEN, 94);
            postMessage(dialogueDenPuzzleSolved);
            roomLayout[roomCoordToIndex()] = worldGrid; // Save state of the room
        }
    }
    else if (roomCoordToIndex() == ROOM_ID_DEN && denPuzzleSolved == true && roman.doorKeyRing[KEYDOOR_IDX_GARDEN] == true)
    {
        worldGrid[91] = originalRoomState[91]; // Delete key if roman already has it
    }
}

function checkStairs()
{
    if (roomCoordToIndex() == ROOM_ID_STAIRS && stairsPuzzleSolved)
    {
        roomLayout[roomCoordToIndex()][18] = 0; // Delete original mirror
        roomLayout[roomCoordToIndex()][24] = 20; // Move fixed mirror to midde
        roomLayout[roomCoordToIndex()][140] = 0; // Delete ghost roman
    }
}

function checkFoyerEntrance()
{
    if (roomCoordToIndex() == ROOM_ID_FOYER_ENTRANCE)
    {
        searchableTileType = 9;
    }
}

function checkStudy()
{
    if (roomCoordToIndex() == ROOM_ID_STUDY)
    {
        enemyList[0].passage = "We would be together forever, age and beauty.";
        enemyList[1].passage = "But her father would never understand.";
        enemyList[2].passage = "So I snuffed out his light, the deed was done.";
        enemyList[3].passage = "Then she left to secure land and title.";
        enemyList[4].passage = "I remained in the house, watching for her return.";
        enemyList[5].passage = "And still I wait, cursed and alone.";

        if (orderOfBooksRead.length == 6)
        {
            if (checkForCorrectBookOrder() == false)
            {
              postMessage("Uh oh, looks like you need to start over again.");
              roman.resetBeginningOfRoom();
              resetBooks();
            }
            else if (checkForCorrectBookOrder() == true)
            {
                postMessage("You read them in the correct order!");
                for (var i = 0; i < enemyList.length; i++) {
                  enemyList[i].isFrozen = true;
                }
                spawnTile(301, 81);
            }
        }


    }
}


// Checks if Roman is standing on a specific kind of tile, if so, call a function
var romanIsOnTriggerTile = false;

function triggerTile(tileType, activatedTileType, funcToExecute, funcParam1, funcParam2, funcParam3)
{
    if (worldGrid[roman.currentIndex] == tileType && romanIsOnTriggerTile == false)
    {
        romanIsOnTriggerTile = true;
        funcToExecute(funcParam1, funcParam2, funcParam3);
        worldGrid[roman.currentIndex] = activatedTileType;
        roomLayout[roomCoordToIndex()][roman.currentIndex] = activatedTileType;
    }
    if (worldGrid[roman.currentIndex] != tileType && romanIsOnTriggerTile == true)
    {
        romanIsOnTriggerTile = false;
    }
}


function spawnTile(whichTile, whichTileIndex)
{
    worldGrid[whichTileIndex] = whichTile;
    roomLayout[roomCoordToIndex()][whichTileIndex] = whichTile;
}

function checkForCorrectBookOrder()
{
    if (orderOfBooksRead.length != correctOrderOfBooks.length)
    {
      return false;
    }
    for (var i = 0, l = orderOfBooksRead.length; i < l; i++)
    {
        if (orderOfBooksRead[i] instanceof Array && correctOrderOfBooks[i] instanceof Array)
        {
            if (!orderOfBooksRead[i].equals(correctOrderOfBooks[i]))
            {
              return false;
            }
            else if (orderOfBooksRead[i] != correctOrderOfBooks[i])
            {
                return false;
            }
        }
        else if (orderOfBooksRead[i] != correctOrderOfBooks[i])
        {
            return false;
        }
        return true;
    }
}

function resetBooks()
{
    for (var i = 0; i < enemyList.length; i++)
    {
        enemyList[i].isRead = false;
    }
    orderOfBooksRead = [];
}
