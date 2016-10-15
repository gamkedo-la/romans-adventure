var heroPic = document.createElement("img");
var doorStrip = document.createElement("img");
var keyStrip = document.createElement("img");
var studyStrip = document.createElement("img");
var worldPics = [];
var roomArtStrips = []; //Need to implement <<< also on World.js
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
	roomArtStrips[worldCode] = document.createElement("img");
	beginLoadingImage(roomArtStrips[worldCode], fileName);
}

function loadImages()
{
	var imageList =
	[
		// hero and pickup tiles
		{ varName: heroPic, theFile: "roman.png" },

		// environmental tiles
		{ worldType: TILE_GROUND, theFile: "world_ground.png" },
		{ worldType: TILE_WALL, theFile: "world_wall.png" },

		// door tiles
		{ varName: doorStrip, theFile: "door_strip.png"},

		// key tiles
		{ varName: keyStrip, theFile: "key_strip.png" },

        // Room tiles
        { varName: studyStrip, theFile: "study_strip.png" },

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
