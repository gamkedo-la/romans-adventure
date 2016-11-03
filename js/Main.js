var roman = new heroClass();

var scaledCanvas, scaledContext;
var canvas, canvasContext;

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
};

function imageLoadingDoneSoStartGame()
{
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel(currentRoomIndex, true);
	roman.reset(heroPic, "Roman");
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
	Sounds.enter_room.play();
}

function updateAll()
{
	moveAll();
	drawAll();
}

function moveAll()
{
	roman.move();
}

function drawAll()
{
    drawWorld();
    roman.draw();

	scaledContext.drawImage(canvas,0,0,canvas.width,canvas.height,
		0, 0, scaledCanvas.width, scaledCanvas.height);

	if(isFlashLightNeededButMissing()) {
		displayUIText("it's too dark...",20,30);
	}

	if (isEditorMode)
	{
	    levelGridCoordinate();
	}
}
