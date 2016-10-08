isEditorMode = false;
tileWidthScaled = WORLD_W * PIXEL_SCALE_UP;
tileHeightScaled = WORLD_H * PIXEL_SCALE_UP;


var mouseX = 0;
var mouseY = 0;

// Get current mouse position on screen
function updateMousePos(evt)
{
	var rect = scaledCanvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft - 8; // ??-8 accounts for padding from edge of window to canvas
	mouseY = evt.clientY - rect.top - root.scrollTop - 10; // ??-10 accounts for padding from edge of window to canvas
}

// Round mouse position and return grid coordinate mouse cursor is currently hovering over. Draw rect around tile.
function levelGridCoordinate()
{
  levelCol = Math.floor(mouseX / tileWidthScaled);
  levelRow = Math.floor(mouseY / tileWidthScaled);

  gridX = (levelCol * tileWidthScaled);
  gridY = (levelRow * tileHeightScaled);

  // Display grid coordinate in UI
  displayUIText("Grid coordinate: "+levelCol+","+levelRow);

  // Draw outline around highlighted tile, snap to grid
  drawStrokeRect(scaledContext, gridX, gridY, tileWidthScaled, tileHeightScaled, 'red');
}
