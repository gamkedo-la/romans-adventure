const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;

const KEY_L = 76;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;
const KEY_0 = 48;

function setupInput()
{
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	roman.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function keySet(keyEvent, setTo)
{
	if(keyEvent.keyCode == roman.controlKeyLeft)
	{
		roman.keyHeld_West = setTo;
	}
	if(keyEvent.keyCode == roman.controlKeyRight)
	{
		roman.keyHeld_East = setTo;
	}
	if(keyEvent.keyCode == roman.controlKeyUp)
	{
		roman.keyHeld_North = setTo;
	}
	if(keyEvent.keyCode == roman.controlKeyDown)
	{
		roman.keyHeld_South = setTo;
	}
}

function keyPressed(evt)
{
	// console.log("Key pressed: "+evt.keyCode);
    if (evt.keyCode == KEY_L)
    {
        if (isEditorMode)
        {
            isEditorMode = false;
            editorTileSelected = false;
            colorRect(0, 0, canvas.width, canvas.height, 'black');
        }
        else
        {
            isEditorMode = true;
            editorTileSelected = true;
            displayCurrentRoomTiles();
        }


	}

    if (isEditorMode)
    {
		editorKeyHandle(evt);
	}

	keySet(evt, true);

	evt.preventDefault();
}

function keyReleased(evt)
{
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
}
