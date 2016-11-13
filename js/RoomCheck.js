var denPuzzleSolved = false;

function checkRoomLogic()
{
    checkDen();
}

function checkDen()
{
    if (roomCoordToIndex() == ROOM_ID_DEN)
    {
        if (worldGrid[69] == 20 && worldGrid[70] == 21 && worldGrid[71] == 22 && worldGrid[72] == 23
                && worldGrid[85] == 24 && (worldGrid[86] == 25 || worldGrid[86] == 26) && (worldGrid[87] == 26 || worldGrid[87] == 25) && worldGrid[88] == 27
                && denPuzzleSolved == false) // Check if all table pieces are assembled in the correct order. Bottom middle pieces are interchangeable
        {
            denPuzzleSolved = true;
            spawnKey(TILE_KEY_GARDEN, 91);
            postMessage("Dialogue bark for den puzzle solved.");
        }
    }
}

function spawnKey(whichKey, whichTileIndex)
{
    worldGrid[whichTileIndex] = whichKey;
}