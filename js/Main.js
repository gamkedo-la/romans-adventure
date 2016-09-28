var roman = new heroClass();

window.onload = function()
{
	scaledCanvas = document.getElementById('gameCanvas');
	canvas = document.createElement('canvas');
	canvas.width  = WORLD_W * WORLD_COLS;
	canvas.height = WORLD_H * WORLD_ROWS;

	scaledCanvas.width = PIXEL_SCALE_UP * canvas.width;
	scaledCanvas.height = PIXEL_SCALE_UP * canvas.height;
	console.log(scaledCanvas.width,scaledCanvas.height);
	canvasContext = canvas.getContext('2d');
	scaledContext = scaledCanvas.getContext('2d');

	// helps it not blur from the scaling:
	canvasContext.mozImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	scaledContext.mozImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;
	scaledContext.msImageSmoothingEnabled = false;
	scaledContext.imageSmoothingEnabled = false;

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');
	loadImages();
}

function imageLoadingDoneSoStartGame()
{
	var framesPerSecond = 30;

	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();
	loadLevel(levelOne);
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
	drawWorld();
	roman.draw();

	scaledContext.drawImage(canvas,0,0,canvas.width,canvas.height,
		0,0,scaledCanvas.width,scaledCanvas.height);
}
