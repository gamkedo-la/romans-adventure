var roman = new heroClass();
var enemyList = [];

var animationFrameDelay = 0; // cycles to slow down animation steps
const CYCLES_PER_ANIM_FRAME = 2;

var scaledCanvas, scaledContext;
var canvas, canvasContext;

var messageToShow = "";
var framesLeftForMessage = 0;
const FRAMES_TO_SHOW_MESSAGE = 80;


function postMessage(str, showMessageDuration)
{
    clearMessage();
    if (!isEditorMode)
    {
        messageToShow = str;
        if (showMessageDuration == undefined || showMessageDuration < 0)
        {
            showMessageDuration = FRAMES_TO_SHOW_MESSAGE;
        }
        framesLeftForMessage = showMessageDuration;
    }

}

function clearMessage()
{
    framesLeftForMessage = 0;
}

window.onload = function()
{
	// Get references for gameCanvas
    scaledCanvas = document.getElementById('gameCanvas');
	canvas = document.createElement('canvas');
    // Size gameCanvas
	canvas.width = WORLD_W * WORLD_COLS;
	canvas.height = WORLD_H * WORLD_ROWS + WORLD_H * UI_ROWS;
	scaledCanvas.width = PIXEL_SCALE_UP * canvas.width;
	scaledCanvas.height = PIXEL_SCALE_UP * canvas.height;

	canvasContext = canvas.getContext('2d');
	scaledContext = scaledCanvas.getContext('2d');
	scaledContext.fillStyle = "black";

	// Helps it not blur from the scaling:
	canvasContext.mozImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	scaledContext.mozImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;
	scaledContext.msImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;

	colorRect(0,WORLD_H * WORLD_ROWS, canvas.width,canvas.height, '#444'); // Draws the UI box background
	//colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	Sounds.initialize(loadImages);

	scaledCanvas.addEventListener("mousemove", updateMousePos);
	scaledCanvas.addEventListener("mouseup", editTileUnderMousePos);

	backgroundMusic.volume = .4;
};

function imageLoadingDoneSoStartGame()
{
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel(currentRoomIndex, true);
	roman.reset("Roman");
}

function loadLevel(whichLevelIdx, preservePlayerStart)
{
	if (preservePlayerStart === undefined)
	{
		preservePlayerStart = false;
	}
    var currentRoomIndex = whichLevelIdx; // This is calculated in World.js
    worldGrid = roomLayout[currentRoomIndex].slice();
    roomArtSet = currentRoomIndex; // Not being used currently, may use later
	if (preservePlayerStart == false)
	{
		removePlayerStarts();
	}
	enemyList = [];
	var enemyOrder = 0;
	var tempEnemy = new EnemyClass();
	while (tempEnemy.reset())
	{
	    enemyList.push(tempEnemy);
	    enemyList[enemyOrder].index = enemyOrder;
	    enemyOrder++;
		tempEnemy = new EnemyClass();
	}
	switch (whichLevelIdx)
	{
	    case ROOM_ID_DEN:
	        if (denPuzzleSolved == false)
	        {
	            postMessage(dialogueDenPuzzleNotSolved);
	        }
	        break;
	    case ROOM_ID_ATTIC:
	        if (atticPuzzleSolved == false)
	        {
	            postMessage(dialogueAtticPuzzleNotSolved);
	        }
	        enterAttic();
	        break;
	    case ROOM_ID_GARDEN_MIDDLE:
	        if (gardenMiddlePuzzleSolved == false)
	        {
	            postMessage(dialogueGardenMiddlePuzzleNotSolved);
	        }
	        break;
      case ROOM_ID_DININGROOM:
          if (worldGrid[77] == TILE_KEY_DEN)
          {
            postMessage(dialogueDiningRoomEntered);
          }
	    default:
	        break;

	}
	if (isFlashLightNeededButMissing())
	{
	    postMessage("It's too dark...");
	}
	searchableTileType = -1; // Reset this variable when loading room
	originalRoomState = roomLayout[roomCoordToIndex()];
    //Sounds.enter_room.play();
}

function updateAll()
{
	moveAll();
	drawAll();
	checkRoomLogic();
}

function moveAll()
{
	for(var i=0;i<enemyList.length;i++) {
		enemyList[i].move();
	}
	roman.move();
}

function drawAll()
{
	animationFrameDelay++;
	if(animationFrameDelay >= CYCLES_PER_ANIM_FRAME) {
		animationFrameDelay = 0;
	}
    drawWorld();
	for(var i=0;i<enemyList.length;i++) {
	    enemyList[i].draw();
	}
    roman.draw();

	scaledContext.drawImage(canvas,0,0,canvas.width,canvas.height,
		0, 0, scaledCanvas.width, scaledCanvas.height);

	if (framesLeftForMessage > 0)
	{
	    displayUIText(messageToShow, 580, 590);
	    framesLeftForMessage--;
	}

	if (isEditorMode)
	{
	    levelGridCoordinate();
	}
}
