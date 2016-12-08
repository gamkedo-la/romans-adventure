var denPuzzleSolved = false;
var atticPuzzleSolved = false;
var atticShowPath = false;
var atticValidPath = [];
var atticSafeZones = [];
var gardenMiddlePuzzleSolved = false;
var stairsPuzzleSolved = false;
var studyPuzzleSolved = false;
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
        -1, KEYDOOR_IDX_BEDROOMFOUR, -1,
        -1, -1, -1,
        -1, ITEM_IDX_FLASHLIGHT, -1,
        -1, -1, -1,
        KEYDOOR_IDX_HOUSEENTRANCE, -1, -1,
        -1, -1, -1,
        -1, -1, -1
    ];


function checkRoomLogic()
{
    checkDen();
    checkStairs();
    checkGardenMiddle();
    checkFoyerEntrance();
    checkAttic();
    //checkStudy();
}

function searchRoomLogic()
{
    searchAttic();
}

function enterAttic()
{
    atticValidPath = [133, 132, 116, 100, 99, 83, 67, 68, 69, 70, 71, 72, 73, 57, 41, 25,
                            26, 27, 43, 59, 75, 91, 107, 108, 124, 125, 126, 110, 94, 78, 62, 46];

	atticSafeZones = [29, 30, 45, 46, 102, 103, 104, 118, 119, 120, 134, 135, 136, 151];
}

function atticRoomArtIndexAlter(tileType, index)
{
    if (atticShowPath && atticValidPath.indexOf(index) >= 0) {
        tileType += 1;
    }
    return tileType;
}

function checkAttic()
{
    if (roomCoordToIndex() != ROOM_ID_ATTIC)
    {
        return;
    }

    if (roomCoordToIndex() == ROOM_ID_ATTIC)
    {
        searchableTileType = 9;
        var tileIndex = getTileIndexAtPixelCoord(roman.x, roman.y);
        // If the current index is not in the valid-path, reset Roman to the room-beginning.
        if (!atticPuzzleSolved && atticSafeZones.indexOf(tileIndex) < 0 && atticValidPath.indexOf(tileIndex) < 0)
        {
            postMessage(dialogueAtticPuzzleSteppedOffPath);
            roman.resetBeginningOfRoom();
        }
    }

}

function searchAttic()
{
    if (roomCoordToIndex() != ROOM_ID_ATTIC)
    {
        return;
    }

	var tileIndex = getTileIndexAtPixelCoord(roman.x, roman.y);
	if (!atticPuzzleSolved && tileIndex == 30)
	{
		atticPuzzleSolved = true;
		var whichItem = searchableTiles[ROOM_ID_ATTIC];
		postMessage("Roman found the " + idxToTextKey(whichItem) + ". " + dialogueAtticPuzzleSolved);
	}
}

function checkGardenMiddle()
{
    if (roomCoordToIndex() == ROOM_ID_GARDEN_MIDDLE && gardenMiddlePuzzleSolved == false)
    {
        searchableTileType = 7;
        triggerTile(1, 4, spawnTile, 0, 30);
        triggerTile(2, 4, spawnTile, 0, 26);
        triggerTile(3, 4, spawnTile, 0, 119);
        var skullOnPressurePlate = false;

        // Check if Roman is standing on pressure plate
        if (roman.currentIndex == 105 || roman.currentIndex == 49)
        {
            postMessage("I need to place something heavy here, it won't budge!");
        }

        // Check if skull is on pressure plate
        if (worldGrid[105] == 21)
        {
            if (worldGrid[119] == 10)
            {
                postMessage("Uh oh, looks like you got ahead of yourself! Guess you'll have to try again.");
                spawnTile(10, 56);
            }
            spawnTile(0, 56);
        }
        //else if (worldGrid[105] != 21 && worldGrid[49] != 21)
        //{
        //    skullOnPressurePlate == false;
        //}

        // Check if skull is on final pressure plate
        if (worldGrid[49] == 21)
        {
            gardenMiddlePuzzleSolved = true;
            spawnTile(7, 129); // Spawn chest containing crowbar
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
        searchableTileType = 6;
        roomLayout[roomCoordToIndex()][18] = 0; // Delete original mirror
        roomLayout[roomCoordToIndex()][24] = 20; // Move fixed mirror to middle
        roomLayout[roomCoordToIndex()][140] = 0; // Delete ghost roman
        canvasContext.globalAlpha = 1;
        if (worldGrid[29] == 5) // Check to see if Roman has opened the chest
        {
            roomLayout[ROOM_ID_STAIRS][29] = 5; // Replace roomlayout with opened chest art
        }
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
    if (roomCoordToIndex() == ROOM_ID_STUDY && studyPuzzleSolved == false)
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
                studyPuzzleSolved = true;
                spawnTile(308, 81);
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
        Sounds.unlock.play();
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
