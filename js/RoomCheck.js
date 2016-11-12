var diningRoomPuzzleSolved = false;

function checkRoomLogic()
{
    checkDiningRoom();
}

function checkDiningRoom()
{
    if (roomCoordToIndex() == ROOM_ID_DININGROOM)
    {
        if (worldGrid[69] == 11 && worldGrid[70] == 12 && worldGrid[71] == 13 && worldGrid[72] == 14
                && worldGrid[85] == 15 && worldGrid[86] == 16 && worldGrid[87] == 17 && worldGrid[88] == 18
                && diningRoomPuzzleSolved == false)
        {
            diningRoomPuzzleSolved = true;
            spawnKey(TILE_KEY_GARDEN, 91);
        }
    }
}

function spawnKey(whichKey, whichTileIndex)
{
    worldGrid[whichTileIndex] = whichKey;
}