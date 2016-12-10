var heroPicLeft = document.createElement("img");
var heroPicRight = document.createElement("img");
var heroPicUp = document.createElement("img");
var doorStrip = document.createElement("img");
var keyStrip = document.createElement("img");
var keyStripEmpty = document.createElement("img");
var roomStrips = document.createElement("img");
const ANIM_TILE_CLOCK = -1;
const ANIM_TILE_CANDLE = -2;
const ANIM_DOUBLE_HEIGHT_BLANK_BLOCKER = -3;
var animTileStrips = [];
var enemyArtStrips = [];
var picsToLoad = 0; // set automatically based on imageList in loadImages()
var artStripGroupLimit = 10;

var titleScreen = document.createElement("img");
var creditsScreen = document.createElement("img");

function countLoadedImagesAndLaunchIfReady()
{
    picsToLoad--;
    if (picsToLoad == 0)
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

function loadImageForAnimTileCode(animTileCodeNegative, fileName)
{
	var animTileCode = -animTileCodeNegative;
	animTileStrips[animTileCode] = document.createElement("img");
	beginLoadingImage(animTileStrips[animTileCode], fileName);
}

function loadImages()
{
	var imageList =
	[
    // title and menu screens
    { varName: titleScreen, theFile: "titlescreen.png" },
    { varName: creditsScreen, theFile: "creditsscreen.png" },


		// hero and pickup tiles
		{ varName: heroPicLeft, theFile: "roman_left.png" },
  	{ varName: heroPicRight, theFile: "roman_right.png" },
    { varName: heroPicUp, theFile: "roman_up.png" },

		// enemy graphics (many are strips, though not all)
		{ enemyType: ENEMY_BAT, theFile: "enemy_bat.png" },
		{ enemyType: ENEMY_GHOST, theFile: "enemy_ghost.png" },
		{ enemyType: ENEMY_SKULL, theFile: "enemy_skull01.png" },
		{ enemyType: ENEMY_SLIME, theFile: "enemy_slime.png" },
    { enemyType: ENEMY_ROMAN, theFile: "enemy_roman.png" },
    { enemyType: ENEMY_PUMKIN, theFile: "enemy_pumkin.png" },


		// door tiles
		{ varName: doorStrip, theFile: "door_strip.png"},

		// key tiles
		{ varName: keyStrip, theFile: "key_strip.png" },
    { varName: keyStripEmpty, theFile: "key_strip_empty.png" },

    // Animated tiles (special cased)
    { animTile: ANIM_TILE_CLOCK, theFile: "anim-grandfatherclock.png" },
    { animTile: ANIM_TILE_CANDLE, theFile: "anim-candlesconce.png" },
    { animTile: ANIM_DOUBLE_HEIGHT_BLANK_BLOCKER, theFile: "anim-blank.png" },

    // Room tiles
    { varName: roomStrips, theFile: "roomart.png" }

	];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++)
	{
		if(imageList[i].varName != undefined)
		{
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		else if(imageList[i].animTile != undefined)
		{
			loadImageForAnimTileCode(imageList[i].animTile, imageList[i].theFile);
		} else
		{
			loadImageForEnemyCode(imageList[i].enemyType, imageList[i].theFile);
		}
	}
}
