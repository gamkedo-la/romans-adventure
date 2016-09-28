var heroPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady()
{
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0)
	{
		imageLoadingDoneSoStartGame(); // Main.js
	}
}

function beginLoadingImage(imgVar, fileName)
{
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "img/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName)
{
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages()
{
	var imageList =
	[
		// hero and pickup tiles
		{varName: heroPic, theFile: "roman.png"},

		// environmental tiles
		{worldType: TILE_GROUND, theFile: "world_ground.png"},
		{worldType: TILE_WALL, theFile: "world_wall.png"},

		// door tiles
		{worldType: TILE_DOOR, theFile: "world_door.png"},
		{worldType: TILE_DOOR_A, theFile: "world_door.png"},

		// key tiles
		{worldType: TILE_KEY, theFile: "key.png"},
		{worldType: TILE_KEY_A, theFile: "key.png"},

		// misc tiles
		{worldType: TILE_UI_PLACEHOLDER, theFile: "ui.png"}
	];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++)
	{
		if(imageList[i].varName != undefined)
		{
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		else
		{
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}
