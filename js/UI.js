const UI_W = 14;
const UI_H = 14;
const UI_COLS = 16;
const UI_ROWS = 2;

var uiGrid = [];


function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < UI_COLS &&
		row >= 0 && row < UI_ROWS) {
        var worldIndexUnderCoord = rowColToArrayIndex(col, row);
        return uiGrid[worldIndexUnderCoord];
    }
    else {
        return WORLD_WALL;
    }
}

function getTileIndexAtPixelCoord(atX, atY) {
    var heroWorldCol = Math.floor(atX / UI_W);
    var heroWorldRow = Math.floor(atY / UI_H);
    var worldIndexUnderhero = rowColToArrayIndex(heroWorldCol, heroWorldRow);

    if (heroWorldCol >= 0 && heroWorldCol < UI_COLS &&
		heroWorldRow >= 0 && heroWorldRow < UI_ROWS) {
        return worldIndexUnderhero;
    } // end of valid col and row
    return undefined;
} // end of getTileIndexAtPixelCoord func

function rowColToArrayIndex(col, row) {
    return col + UI_COLS * row;
}

function drawUI() 
{
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < UI_ROWS; eachRow++) 
    {
        for (var eachCol = 0; eachCol < UI_COLS; eachCol++) 
        {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            var currentRoomArtIndex = uiGrid[arrayIndex];
            var useImg = roomArtStrips[currentRoomArtIndex];
            scaledUIContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += UI_W;
            arrayIndex++;
        } // end of for each col
        drawTileY += UI_H;
        drawTileX = 0;
    } // end of for each row
} // end of drawUI func
