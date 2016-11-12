var denPuzzleSolved = false;

function checkRoomLogic()
{
    checkDen();
}

function checkDen()
{
    if (roomCoordToIndex() == ROOM_ID_DEN)
    {
        if (worldGrid[69] == 11 && worldGrid[70] == 12 && worldGrid[71] == 13 && worldGrid[72] == 14
                && worldGrid[85] == 15 && (worldGrid[86] == 16 || worldGrid[86] == 17) && (worldGrid[87] == 17 || worldGrid[87] == 16) && worldGrid[88] == 18
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