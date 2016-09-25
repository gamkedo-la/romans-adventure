var warriorPic = document.createElement("img");
var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "img/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile: "avatar.png"},

		{worldType: TILE_GROUND, theFile: "world_ground.png"},
		{worldType: TILE_WALL, theFile: "world_wall.png"},
		{worldType: TILE_GOAL, theFile: "world_goal.png"},
		{worldType: TILE_KEY, theFile: "key.png"},
		{worldType: TILE_DOOR, theFile: "world_door.png"},
		{worldType: TILE_WALL_BOTTOM, theFile: "world_wall_bottom.png"},
		{worldType: TILE_WALL_TOP, theFile: "world_wall_top.png"},
		{worldType: TILE_WALL_LEFT, theFile: "world_wall_left.png"},
		{worldType: TILE_WALL_RIGHT, theFile: "world_wall_right.png"},
		{worldType: TILE_WALL_TOPLEFT, theFile: "world_wall_topleft.png"},
		{worldType: TILE_WALL_TOPRIGHT, theFile: "world_wall_topright.png"},
		{worldType: TILE_WALL_BOTTOMLEFT, theFile: "world_wall_bottomleft.png"},
		{worldType: TILE_WALL_BOTTOMRIGHT, theFile: "world_wall_bottomright.png"},
		{worldType: TILE_CROWBAR, theFile: "crowbar.png"},
		{worldType: TILE_CHAINED_DOOR, theFile: "chained_door.png"},
		{worldType: TILE_GHOST, theFile: "ghost.png"},
//		{worldType: TILE_STAIRSUP, theFile: "stairs_up.png"},
//		{worldType: TILE_STAIRSDOWN, theFile: "stairs_down.png"},
		{worldType: TILE_BOOKSHELF_COBWEB, theFile: "bookshelf_cobweb.png"},
		{worldType: TILE_BOOKSHELF_NOCOBWEB, theFile: "bookshelf_nocobweb.png"},
		{worldType: TILE_GROUND_HOLE, theFile: "world_ground_hole.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}
