var roman = new heroClass();
var enemyList = [];

var animationFrameDelay = 0; // cycles to slow down animation steps
const CYCLES_PER_ANIM_FRAME = 2;

var scaledCanvas, scaledContext;
var canvas, canvasContext;

var messageToShow = "";
var framesLeftForMessage = 0;
const FRAMES_TO_SHOW_MESSAGE = 90;
var framesPerSecond = 30;

var gamePaused = false;
var titleScreenActive = true;

var isShowingTitleScreen = false;
var isDebugMode = false;


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
    menuCanvas = document.getElementById('menuCanvas');

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

	backgroundMusic.volume = bgMusicSlider.value;
};

function imageLoadingDoneSoStartGame()
{
    scaledContext.drawImage(titleScreen, 0, 0, canvas.width, canvas.height,
                        0, 0, scaledCanvas.width, scaledCanvas.height); // Show title screen

    isShowingTitleScreen = true;
	setupInput();
	loadLevel(currentRoomIndex, true);
	roman.reset("Roman");
}

function setGameInterval()
{
    game = setInterval(updateAll, 1000 / framesPerSecond); // Pressing enter or space during the title screen sets setInterval rate and starts drawing world
}

function pauseGame()
{
    if (!gamePaused)
    {
        game = clearTimeout(game);
        showCredits();
        gamePaused = true;
    }
    else if (gamePaused)
    {
        setGameInterval();
        gamePaused = false;
    }
}

function showCredits()
{
    scaledContext.font = "bold 15px Arial";
    scaledContext.fillStyle = "black";
    scaledContext.textAlign = "center";

    scaledContext.drawImage(creditsScreen, 0, 0, canvas.width, canvas.height,
                            0, 0, scaledCanvas.width, scaledCanvas.height); // Show credits background

    scaledContext.fillText("Oasis Rim - Project Lead / Programmer", scaledCanvas.width / 2, 120);
    scaledContext.fillText("Oasis Rim - Project Lead / Programmer", scaledCanvas.width / 2, 140);

}

function changeVolume()
{
    backgroundMusic.volume = bgMusicSlider.value;
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
	        break;
	    case ROOM_ID_STAIRS:
	        if (stairsPuzzleSolved == false)
	        {
	            postMessage(dialogueStairsPuzzleNotSolved);
	            canvasContext.globalAlpha = .3;
	            break;
	        }
	    case ROOM_ID_STUDY:
	        if (studyPuzzleSolved == false)
	        {
	            postMessage(dialogueStudyPuzzleNotSolved);
	        }
	        break;
	    case ROOM_ID_BEDROOM4:
	        {
	            postMessage(dialogueBedroomPuzzleNotSolved);
	        }
	        break;
	    default:
	        canvasContext.globalAlpha = 1;
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
    if (animationFrameDelay >= CYCLES_PER_ANIM_FRAME)
    {
        animationFrameDelay = 0;
    }
    drawWorld();
    for (var i = 0; i < enemyList.length; i++)
    {
        enemyList[i].draw();
    }
    roman.draw();

    scaledContext.drawImage(canvas, 0, 0, canvas.width, canvas.height,
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
    if (isDebugMode)
    {
        scaledContext.font = "bold 12px Arial";
        scaledContext.fillStyle = "red";
        scaledContext.fillText("DEBUG MODE", 30, 30);
        scaledContext.fillText("Press L to enable editor", 30, 50);
    }

}
