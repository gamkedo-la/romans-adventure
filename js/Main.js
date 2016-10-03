var roman = new heroClass();

window.onload = function()
{
	// Get references for gameCanvas
	scaledCanvas = document.getElementById('gameCanvas');
	canvas = document.createElement('canvas');

	// Size gameCanvas
	canvas.width  = WORLD_W * WORLD_COLS;
	canvas.height = WORLD_H * WORLD_ROWS;
	scaledCanvas.width = PIXEL_SCALE_UP * canvas.width;
	scaledCanvas.height = PIXEL_SCALE_UP * canvas.height;

	canvasContext = canvas.getContext('2d');
	scaledContext = scaledCanvas.getContext('2d');


	// Get references for uiCanvas
	scaledUICanvas = document.getElementById('uiCanvas');
	uiCanvas = document.createElement('canvas');

	// Size uiCanvas
	uiCanvas.width = WORLD_W * WORLD_COLS;
	uiCanvas.height = WORLD_H * 2;
	scaledUICanvas.width = PIXEL_SCALE_UP * uiCanvas.width;
	scaledUICanvas.height = PIXEL_SCALE_UP * uiCanvas.height;

	canvasUIContext = uiCanvas.getContext('2d');
	scaledUIContext = scaledUICanvas.getContext('2d');
	scaledUIContext.fillStyle = "black";
	scaledUIContext.fillRect(0, 0, scaledUICanvas.width, scaledUICanvas.height);

	// Helps it not blur from the scaling:
	canvasContext.mozImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	scaledContext.mozImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;
	scaledContext.msImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;

	colorRect(0,0, canvas.width,canvas.height, 'black');
	//colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	loadImages();
}

function imageLoadingDoneSoStartGame()
{
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel(levelFoyerEntrance);
}

function loadLevel(whichLevel)
{
	worldGrid = whichLevel.slice();
	roman.reset(heroPic, "Roman");
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
	drawWorld(); // World.js
	roman.draw();

	scaledContext.drawImage(canvas,0,0,canvas.width,canvas.height,
		0,0,scaledCanvas.width,scaledCanvas.height);
}
