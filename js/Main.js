var roman = new heroClass();
var enemyList = [];

var animationFrameDelay = 0; // cycles to slow down animation steps
const CYCLES_PER_ANIM_FRAME = 2;

var scaledCanvas, scaledContext;
var canvas, canvasContext;

var messageToShow = "";
var framesLeftForMessage = 0;
const FRAMES_TO_SHOW_MESSAGE = 150;
var framesPerSecond = 30;

var gamePaused = false;
var titleScreenActive = true;

var isShowingTitleScreen = false;
var isDebugMode = false;
var isGameOver = false;
var isAbleToRestartGame = false;
var backgroundMusic, bgMusicSlider;


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

	backgroundMusic = document.getElementById('backgroundMusic');
	bgMusicSlider = document.getElementById('bgMusicSlider');
	changeVolume();
};

function imageLoadingDoneSoStartGame()
{
    scaledContext.drawImage(titleScreen, 0, 0, canvas.width, canvas.height - WORLD_H * UI_ROWS,
                                0, 0, scaledCanvas.width, scaledCanvas.height - WORLD_H * PIXEL_SCALE_UP * UI_ROWS); // Show credits background

    scaledContext.font = "bold 20px Arial";
    scaledContext.fillStyle = "white";
    scaledContext.textAlign = "center";
    scaledContext.fillText("Press any key to start", scaledCanvas.width / 2, 600);

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
    scaledContext.textAlign = "left";

    var gameAreaCanvasW = canvas.width;
    var gameAreaCanvasH = canvas.height - WORLD_H * UI_ROWS;
    var gameAreaScaledCanvasW = scaledCanvas.width;
    var gameAreaScaledCanvasH = scaledCanvas.height - WORLD_H * PIXEL_SCALE_UP * UI_ROWS;

    scaledContext.drawImage(creditsScreen, 0, 0, canvas.width, canvas.height - WORLD_H * UI_ROWS,
                                0, 0, scaledCanvas.width, scaledCanvas.height - WORLD_H * PIXEL_SCALE_UP * UI_ROWS); // Show credits background

    var gameCredits =
        [
           "Oasis Rim - Lead, Programmer, Level Design, Art",
           "Matthew Ko - Environment Art, TitleScreen Art, Animated Character Art (Bat, Blob, Grey Skull)",
           "Chris DeLeon - Programmer, Level Design, Art",
           "Chris Markle - Writer",
           "Jessica Fichot - Music",
           "Micky Turner - Sound Effects",
           "Caspar Dunant - Programmer (Sound, Attic Puzzle), Attic Level Art and Design",
           "Paul Diaz - Programmer (Keys/Doors)",
           "Federico Leites - Environment Art (Study)",
           "April Blair - Animated Character Art (Pumpkin), Item Art (Flashlight)",
           "Ashleigh Morris - Programmer (Ghost, Kitchen Puzzle Alpha), Kitchen/Bedroom Level Design",
           "Nick Baker - Animated Environment Art (Clock, Sconces, Plants) ",
           "c: Games - Character Art (Ghost)"
        ];

    var xPosition = 70;
    var yPosition = 70;

    for (var i = 0; i < gameCredits.length; i++)
    {
        scaledContext.fillText(gameCredits[i], xPosition, yPosition);
        yPosition += 23;
    }
}

function changeVolume()
{
    backgroundMusic.volume = bgMusicSlider.value;
	Sounds.volume = bgMusicSlider.value;
}

function loadLevel(whichLevelIdx, preservePlayerStart)
{
    if (roomCoordToIndex() == ROOM_ID_STUDY && studyPuzzleSolved == false) {
    	resetBooks(); // ensure books are in valid state upon entering room
    }

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
	    case ROOM_ID_GARDEN_LEFT:
	        if (awardedBootYet == false)
	        {
	            postMessage(dialogueGardenLeftPuzzleNotSolved);
	        }
	        break;
	    case ROOM_ID_GARDEN_MIDDLE:
	        if (gardenMiddlePuzzleSolved == false)
	        {
	            postMessage(dialogueGardenMiddlePuzzleNotSolved);
	        }
	        break;
	    case ROOM_ID_BASEMENT_STATUE_AREA:
	        if (awardedBootYet == false)
	        {
	            postMessage(dialogueBasementPuzzleNotSolved);
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
	        }
	        break;
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
}

function endGame()
{
    isGameOver = true;
    backgroundMusic.pause();
    Sounds.ending.play();
    roman.myHeroPic = heroPicUp;
    tileAnimTick = 0;
    worldGrid[57] = -4;
    worldGrid[89] = -4;
    worldGrid[121] = -4;
    worldGrid[54] = -5;
    worldGrid[86] = -5;
    worldGrid[118] = -5;
}

function showEndGameScreen()
{
    scaledContext.drawImage(endGameScreen, 0, 0, canvas.width, canvas.height - WORLD_H * UI_ROWS,
                            0, 0, scaledCanvas.width, scaledCanvas.height - WORLD_H * PIXEL_SCALE_UP * UI_ROWS);

    displayUIText(dialogueEnding, 350, 590);
    isAbleToRestartGame = true;

    scaledContext.font = "bold 15px Arial";
    scaledContext.fillStyle = "white";
    scaledContext.textAlign = "center";

    scaledContext.fillText("Press any key to restart.", scaledCanvas.width / 2, 30);
}

function updateAll()
{
	moveAll();
	drawAll();
	checkRoomLogic();
	if (isGameOver)
	{
	    if (tileAnimTick > 200)
	    {
	        game = clearTimeout(game);
	        showEndGameScreen();
	    }
	}
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
        displayUIText(messageToShow, 350, 590);
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
