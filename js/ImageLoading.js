var heroPicLeft = document.createElement("img");
var heroPicRight = document.createElement("img");
var doorStrip = document.createElement("img");
var keyStrip = document.createElement("img");
var keyStripEmpty = document.createElement("img");
var roomStrips = document.createElement("img");
var enemyArtStrips = [];
var picsToLoad = 0; // set automatically based on imageList in loadImages()
var artStripGroupLimit = 10;

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

function loadImageForEnemyCode(enemyCode, fileName)
{
	enemyArtStrips[enemyCode] = document.createElement("img");
	beginLoadingImage(enemyArtStrips[enemyCode], fileName);
}

function loadImages()
{
	var imageList =
	[
		// hero and pickup tiles
		{ varName: heroPicLeft, theFile: "roman_left.png" },
  		{ varName: heroPicRight, theFile: "roman_right.png" },

		// enemy graphics (many are strips, though not all)
		{ enemyType: ENEMY_BAT, theFile: "enemy_bat.png" },
		{ enemyType: ENEMY_GHOST, theFile: "enemy_ghost.png" },
		{ enemyType: ENEMY_SKULL, theFile: "enemy_skull01.png" },
		{ enemyType: ENEMY_SLIME, theFile: "enemy_slime.png" },
        { enemyType: ENEMY_ROMAN, theFile: "enemy_roman.png" },


		// door tiles
		{ varName: doorStrip, theFile: "door_strip.png"},

		// key tiles
		{ varName: keyStrip, theFile: "key_strip.png" },
        { varName: keyStripEmpty, theFile: "key_strip_empty.png" },


        // Room tiles
        { varName: roomStrips, theFile: "roomart.png" },

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
			loadImageForEnemyCode(imageList[i].enemyType, imageList[i].theFile);
		}
	}
}
