const WORLD_W = 14; // Original tile art width
const WORLD_H = 14; // Original tie art height
const WORLD_COLS = 16; // Number of columns in room
const WORLD_ROWS = 10; // Number of rows in room
const PIXEL_SCALE_UP = 4; // Number of times to scale up art tiles
//const TILE_ART_STUDY = 10;
const BUILDING_ROOMS_COLS = 3; // Number of columns of rooms in the house
const BUILDING_ROOMS_ROWS = 4; // Number of rows of rooms in the house
const BUILDING_FLOORS = 2; // Number of floors in the house
const TILES_SOLID_FIRST = 10;
const TILES_PUSHABLE_FIRST = 21;
const TILES_PUSHABLE_LAST = 29;

const EDGE_OF_SCREEN_X = ((WORLD_W * WORLD_COLS) - (WORLD_W / 2)); // Distance Roman can walk to the right edge before loading next room
const EDGE_OF_SCREEN_Y = ((WORLD_H * WORLD_ROWS) - (WORLD_H / 2)); // Distance Roman can walk to the top edge before loading next room

var worldGrid = [];
var roomArtSet = 0;
var rotDoor;
var tileAnimTick = 0;
var crackedFloorBroken = false;


// ******BEGIN MAP EDITOR******

// First Level Areas
var levelStudy =
[
35, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 36, 31, 0, 0, 0, 0, 0, 18, 308, 0, 18, 0, 0, 0, 0, 0, 32, 31, 0, 11, 12, 11, 11, 11, 12, 12, 11, 11, 11, 11, 12, 0, 32, 31, 0, 2, 5, 5, 13, 5, 5, 5, 5, 13, 5, 5, 7, 0, 32, 31, 0, 3, 1, 1, 14, 15, 16, 16, 17, 14, 1, 1, 8, 0, 32, 31, -1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0, 31, 0, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 0, 32, 31, 0, 11, 11, 11, 11, 11, 12, 12, 12, 11, 11, 12, 12, 0, 32, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 33, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 34
];

var levelFoyerEntrance = 
[
10,2,0,0,0,0,0,0,0,0,0,0,0,0,2,10,10,12,0,11,0,17,0,0,0,0,17,0,11,0,13,10,10,13,0,0,0,18,0,0,0,0,18,0,0,0,12,10,10,12,0,0,0,0,0,1,1,0,0,0,0,0,13,10,10,12,0,14,0,15,0,0,0,0,15,0,14,0,13,10,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,201,10,12,0,0,0,15,0,0,0,0,15,0,0,0,13,10,10,13,0,16,0,0,0,0,0,0,0,0,16,0,12,10,10,12,0,0,0,0,0,100,0,0,0,0,0,0,13,10,10,10,10,10,10,10,10,209,10,10,10,10,10,10,10,10
];

var levelDen =
[
16, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 17, 12, 33, 0, 38, 38, 0, 29, 30, 31, 32, 0, 38, 38, 0, 34, 13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 12, 0, 0, 0, 22, 0, 20, 0, 0, 0, 2, 5, 5, 5, 38, 13, 0, 0, 0, 0, 27, 0, 0, 23, 0, 0, 3, 1, 1, 1, 8, 13, 12, 0, 24, 0, 0, 26, 0, 0, 0, 0, 4, 6, 6, 6, 38, 13, 12, 0, 0, 0, 28, 0, 0, 21, 0, 25, 0, 0, 0, 0, 0, 13, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 14, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15
];

var levelFoyerStairs = 
[
10,10,10,0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,17,204,17,10,10,10,10,10,10,10,11,10,10,10,10,11,0,204,0,0,13,12,13,12,13,0,0,0,10,10,10,10,0,204,204,204,204,204,204,204,204,204,1,0,10,10,10,16,0,18,204,204,12,12,12,13,13,0,0,0,14,10,205,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,16,0,0,19,19,0,19,19,0,19,19,0,0,14,10,10,10,0,0,19,19,0,19,19,0,19,19,0,0,10,10,10,10,10,0,19,19,0,19,19,0,19,19,0,10,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10
];

var levelDiningRoom =
[
10,10,10,10,10,10,10,0,10,10,10,10,10,10,10,10,10,1,0,0,0,0,0,8,0,0,0,0,21,0,0,10,10,0,0,0,3,24,0,24,0,24,0,24,0,0,7,10,10,0,22,16,13,31,13,13,28,13,13,28,17,23,0,10,10,0,0,18,30,29,27,30,27,32,27,26,19,301,21,10,0,9,22,18,26,27,11,32,11,33,11,29,19,23,0,10,10,0,0,14,12,12,12,12,12,12,12,12,15,0,0,10,10,0,0,0,0,25,0,25,0,25,0,25,0,2,0,10,10,0,0,0,5,4,6,0,0,0,8,0,0,0,0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
];

var levelStairs =
    [
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10,
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10,
        10, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 10,
        10, 10, 10, 10, 10, 10, 0, 10, 10, 0, 10, 10, 10, 10, 10, 10,
        10, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 404, 0, 0, 10,
        10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10
    ];

var levelKitchen = 
[
10,10,10,10,10,10,10,202,10,10,10,10,10,10,10,10,10,19,18,19,19,18,18,0,19,19,18,19,18,19,18,10,10,0,4,11,11,11,2,0,0,0,0,0,0,0,0,10,10,307,4,11,11,11,2,0,0,0,16,13,17,0,16,10,10,0,4,11,11,11,2,0,0,0,13,13,13,0,13,10,10,3,5,11,11,11,2,0,0,0,13,13,13,0,13,10,10,11,11,11,11,11,2,0,0,0,14,12,15,0,14,10,10,1,1,1,1,1,6,0,0,0,0,0,0,0,0,10,10,19,18,18,18,19,18,0,18,19,18,19,19,18,18,10,10,10,10,10,10,10,10,0,10,10,10,10,10,10,10,10
];

var levelGardenLeft =
[
10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 405, 10, 402, 10, 400, 10, 403, 10, 401, 10, 0, 0, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 203, 10, 10, 10, 10, 10, 10, 10, 10
];

var levelGardenMiddle = 
[
10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,0,0,0,0,0,0,0,0,10,1,10,2,10,0,10,0,10,10,10,10,10,0,10,0,10,0,10,10,10,10,10,5,0,0,0,0,0,0,10,0,21,0,0,0,0,0,10,10,10,10,10,10,10,0,10,0,10,10,10,10,10,10,0,0,0,0,0,0,0,0,10,0,10,10,0,0,0,0,10,10,10,0,10,10,10,0,0,5,0,10,0,10,10,10,10,10,10,0,10,3,10,10,10,10,0,10,0,10,10,10,10,0,0,0,10,0,0,0,0,0,0,10,0,0,0,0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
];

var levelGardenRight =
[
10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10
];

var levelAttic =
[
10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 4, 0, 11, 11, 11, 0, 0, 0, 1, 1, 1, 0, 5, 9, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 10, 10, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 10, 10, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 10, 10, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 10, 10, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 10, 10, 6, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 7, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10
];

var levelBedroomOne =
	[ // Bed, Rug, Nightstand
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelBedroomTwo =
	[ // Bed, Rug, Nightstand
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelBedroomThree =
	[ // Bed, Rug, Nightstand
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelHallwayLeft = 
[
10,10,10,10,10,10,10,208,10,10,10,15,10,10,10,10,10,10,10,10,10,10,10,0,10,10,10,16,10,10,10,10,10,10,10,10,10,10,10,0,10,10,10,17,10,12,10,10,10,10,0,-1,11,11,-2,0,14,-2,11,11,-2,13,0,-2,10,10,1,4,4,4,4,4,4,4,4,4,4,4,4,4,10,10,2,8,6,6,8,6,6,7,6,6,7,6,8,6,10,10,3,5,5,5,5,5,5,5,5,5,5,5,5,5,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
];

var levelHallwayMiddle = 
[
10,10,10,10,10,10,15,8,10,10,10,10,0,10,10,10,10,10,10,10,10,10,16,9,10,10,10,10,0,10,10,10,10,10,10,10,10,10,17,18,10,10,10,12,0,12,10,10,0,14,-2,11,11,-2,11,11,-2,11,11,13,0,13,-2,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,6,7,6,7,6,6,7,6,7,6,7,6,6,7,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
];

var levelHallwayRight = 
[
10,10,10,10,15,10,10,206,10,10,10,10,10,10,10,10,10,10,10,10,16,10,10,0,10,10,10,10,10,10,10,10,10,10,12,10,17,10,10,0,10,10,10,10,10,10,10,10,-2,0,13,-2,11,11,-2,0,14,-2,11,11,-1,0,10,10,4,4,4,4,4,4,4,4,4,4,4,4,4,6,10,10,1,2,3,1,3,1,1,1,2,1,3,1,2,7,10,10,5,5,5,5,5,5,5,5,5,5,5,5,5,8,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10
];

var levelBedroomFour = 
[
10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,0,0,0,0,0,0,10,10,10,10,10,10,10,10,0,1,4,7,0,0,0,0,0,10,10,10,10,10,10,10,0,2,5,8,0,0,0,0,0,10,10,10,10,10,10,10,0,3,6,9,0,0,0,0,0,10,10,10,10,10,10,10,10,0,0,0,0,0,0,0,10,10,10,10,10,10,10,10,10,10,10,10,10,0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,0,10,10,10,10,10,10,10,10
];

var levelKitchenBedroomFourMerged =
[ // Cabinets, Counter-tops, Island
	 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	 10, 0, 0, 0, 11, 11, 8, 8, 8, 11, 11, 11, 0, 0, 0, 10,
	 10, 0, 0, 0, 11, 11, 8, 8, 8, 11, 11, 11, 0, 0, 0, 10,
	 10, 0, 0, 0, 11, 11, 8, 8, 8, 11, 11, 11, 0, 11, 0, 10,
	 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	 10, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
];

// Basement and Attic Areas

var levelBasementFoyerEntrance =
[
10, 0, 0, 0, 0, 0, 1, 4, 4, 6, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 2, 0, 0, 7, 0, 0, 0, 0, 1, 10, 10, 6, 0, 0, 9, 0, 3, 5, 5, 8, 0, 9, 0, 0, 3, 10, 10, 7, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 0, 10, 10, 8, 2, 24, 0, 21, 0, 23, 0, 22, 0, 25, 0, 7, 0, 10, 10, 0, 2, 11, 0, 11, 0, 11, 0, 11, 0, 11, 0, 7, 0, 205, 10, 0, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 0, 10, 10, 4, 4, 4, 6, 0, 0, 0, 0, 0, 0, 1, 4, 4, 4, 10, 10, 0, 9, 0, 7, 0, 1, 4, 4, 6, 0, 2, 0, 9, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
];

var levelBasementGardenExit =
	[ // Chests, Boxes, Shelves
         10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 401, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 401, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 401, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 401, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 401, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	];

var roomLayout =
    [       //0                 1                   2
	    levelGardenLeft, levelGardenMiddle, levelGardenRight,
            //3                     4               5
	    levelBasementGardenExit, levelStairs, levelKitchen,
            //6                            7                8
        levelBasementFoyerEntrance, levelFoyerStairs, levelDiningRoom,
            //9             10             11
	    levelStudy, levelFoyerEntrance, levelDen,

        //Second floor below
				//12        13          14
        -1, -1, -1, //No rooms above the garden area
				//15                16                  17
	    levelAttic, /*Should never see this */, levelBedroomFour,
			      //18                19              20
        levelHallwayLeft, levelHallwayMiddle, levelHallwayRight,
				     //21                22             23                       24 - maybe merges shouldn't go here.
        levelBedroomOne, levelBedroomTwo, levelBedroomThree, levelKitchenBedroomFourMerged
    ];

const ROOM_ID_STAIRS = 4; // Based on room layout array ^^
const ROOM_ID_DININGROOM = 8;
const ROOM_ID_DEN = 11;
const ROOM_ID_FOYER_ENTRANCE = 10;
const ROOM_ID_FOYER_STAIRS = 7;
const ROOM_ID_UPSTAIRS_GOING_DOWN = 19; // Based on room layout array ^^
const ROOM_ID_BASEMENT_STATUE_AREA = 6;
const ROOM_ID_DARKROOM_NEED_LIGHT = 9; // study for now (just a test)
const ROOM_ID_GARDEN_MIDDLE = 1;
const ROOM_ID_KITCHEN = 5;
const ROOM_ID_BASEMENT_GARDEN_EXIT = 3;
const ROOM_ID_BEDROOM1 = 21;
const ROOM_ID_BEDROOM4 = 17;
const ROOM_ID_CRACKS_ABOVE_KITCHEN = ROOM_ID_BEDROOM4;
const ROOM_ID_STUDY = 9;
const ROOM_ID_ATTIC = 15;


var roomNames =
    [
        "levelGardenLeft", "levelGardenMiddle", "levelGardenRight",
        "levelBasementGardenExit", "levelStairs", "levelKitchen",
        "levelBasementFoyerEntrance", "levelFoyerStairs", "levelDiningRoom",
        "levelStudy", "levelFoyerEntrance", "levelDen",
        "Undefined Area", "Undefined Area", "Undefined Area",
        "levelAttic", "levelStairs (duplicate)", "levelBedroomFour",
        "levelHallwayLeft", "levelHallwayMiddle", "levelHallwayRight",
        "levelBedroomOne", "levelBedroomTwo", "levelBedroomThree", "levelKitchenBedroomFourMerged"
    ];


var currentRoomRow = 3, currentRoomCol = 1, currentRoomFloor = 0;
var currentRoomIndex = roomCoordToIndex(); // Calculates starting room in Main.js

function roomCoordToIndex()
{
    return currentRoomCol + BUILDING_ROOMS_COLS * currentRoomRow
        + (BUILDING_ROOMS_ROWS * BUILDING_ROOMS_COLS * currentRoomFloor);
}

// ******END MAP EDITOR******


// ******BEGIN TILE KEY******

// Common Environment Tiles
// These are tiles that will be shared amongst most rooms
const TILE_GROUND = 0;
const TILE_WALKABLE_FIRST = 1;
const TILE_WALKABLE_LAST = 9;
const TILE_WALL = 10;
const TILE_TRANSPARENT_SOLID_FIRST = 2;
const TILE_TRANSPARENT_SOLID_LAST = 39;

// Player And Pickup Tiles
const TILE_PLAYERSTART = 100;
// these should stay in sync/order with enemy id numbers in Enemy.js:
const TILE_START_ENEMY_BAT = 400;
const TILE_START_ENEMY_GHOST = 401;
const TILE_START_ENEMY_SKULL = 402;
const TILE_START_ENEMY_SLIME = 403;
const TILE_START_ENEMY_ROMAN = 404;
const TILE_START_ENEMY_PUMKIN = 405;
const TILE_START_ENEMY_BOOK = 406;
const TILE_START_ENEMY_FIRST_ENUM = TILE_START_ENEMY_BAT;
const TILE_START_ENEMY_LAST_ENUM = TILE_START_ENEMY_BOOK;


// key and door tile consts share offsets to ensure they'll match up
// these also double as the index values into the keyring array
const KEYDOOR_IDX_DEBUG = 0;
const KEYDOOR_IDX_DEN = 1;
const KEYDOOR_IDX_GARDEN = 2;
const KEYDOOR_IDX_GARDEN_BASEMENT = 3;
const KEYDOOR_IDX_STAIRS_SECONDFLOOR = 4;
const KEYDOOR_IDX_BASEMENT = 5;
const KEYDOOR_IDX_BEDROOMFOUR = 6;
const KEYDOOR_IDX_STUDY = 7;
const KEYDOOR_IDX_ATTIC = 8;
const KEYDOOR_IDX_HOUSEENTRANCE = 9;
const KEYDOOR_IDX_BEDROOMONE = 10;
const KEYDOOR_IDX_BEDROOMTWO = 11;
const KEYDOOR_IDX_BEDROOMTHREE = 12;
const KEYDOOR_IDX_FIRST = KEYDOOR_IDX_DEBUG;
const KEYDOOR_IDX_LAST = KEYDOOR_IDX_BEDROOMTHREE;

const ITEM_IDX_FLASHLIGHT = KEYDOOR_IDX_ATTIC-1;
const ITEM_IDX_ICEBOOT = KEYDOOR_IDX_BASEMENT-1; // -1 offsets debug case of 0

// Door Tiles
const TILE_DOOR = 200; // base door (only used for debug, otherwise basis for door #s)
const TILE_DOOR_DEN = TILE_DOOR + KEYDOOR_IDX_DEN; // Door from FoyerEntrance to Den
const TILE_DOOR_GARDEN = TILE_DOOR + KEYDOOR_IDX_GARDEN; // Door from Kitchen to Garden
const TILE_DOOR_GARDEN_BASEMENT = TILE_DOOR + KEYDOOR_IDX_GARDEN_BASEMENT; // Door from Garden into Basement
const TILE_DOOR_STAIRS_SECONDFLOOR = TILE_DOOR + KEYDOOR_IDX_STAIRS_SECONDFLOOR; // Door from Stairs to Hallway (2nd floor)
const TILE_DOOR_BASEMENT = TILE_DOOR + KEYDOOR_IDX_BASEMENT; // Door from FoyerStairs room to Basement
const TILE_DOOR_BEDROOMFOUR = TILE_DOOR + KEYDOOR_IDX_BEDROOMFOUR; // Door from Hallway to BedroomFour
const TILE_DOOR_STUDY = TILE_DOOR + KEYDOOR_IDX_STUDY; // Door from FoyerEntrance to Study
const TILE_DOOR_ATTIC = TILE_DOOR + KEYDOOR_IDX_ATTIC; // Door from Hallway to Attic
const TILE_DOOR_HOUSEENTRANCE = TILE_DOOR+KEYDOOR_IDX_HOUSEENTRANCE; // Exit the house, this is the goal!
const TILE_DOOR_BEDROOMONE = TILE_DOOR+KEYDOOR_IDX_BEDROOMONE; // Door from Hallway to BedroomOne
const TILE_DOOR_BEDROOMTWO = TILE_DOOR+KEYDOOR_IDX_BEDROOMTWO; // Door from Hallway to BedroomTwo
const TILE_DOOR_BEDROOMTHREE = TILE_DOOR+KEYDOOR_IDX_BEDROOMTHREE; // Door from Hallway to BedroomThree
const TILE_DOOR_FIRST = TILE_DOOR;
const TILE_DOOR_LAST = TILE_DOOR_BEDROOMTHREE;

const TILE_ALIAS_ICE = TILE_DOOR+ITEM_IDX_ICEBOOT;

// Key Tiles
const TILE_KEY = 300; // base key
const TILE_KEY_DEN = TILE_KEY + KEYDOOR_IDX_DEN; // Key for FoyerEntrance to Den
const TILE_KEY_GARDEN = TILE_KEY + KEYDOOR_IDX_GARDEN; // Key for Kitchen to Garden
const TILE_KEY_GARDEN_BASEMENT = TILE_KEY + KEYDOOR_IDX_GARDEN_BASEMENT; // Key for Garden into Basement
const TILE_KEY_STAIRS_SECONDFLOOR = TILE_KEY + KEYDOOR_IDX_STAIRS_SECONDFLOOR; // Key for Stairs to Hallway (2nd floor)
const TILE_KEY_BASEMENT = TILE_KEY + KEYDOOR_IDX_BASEMENT; // Key for FoyerStairs room to Basement
const TILE_KEY_BEDROOMFOUR = TILE_KEY + KEYDOOR_IDX_BEDROOMFOUR; // Door from Hallway to BedroomFour
const TILE_KEY_STUDY = TILE_KEY + KEYDOOR_IDX_STUDY; // Key for FoyerEntrance to Study
const TILE_KEY_ATTIC = TILE_KEY + KEYDOOR_IDX_ATTIC; // Key for Hallway to Attic
const TILE_KEY_HOUSEENTRANCE = TILE_KEY+KEYDOOR_IDX_HOUSEENTRANCE; // Exit the house, this is the goal!
const TILE_KEY_BEDROOMONE = TILE_KEY+KEYDOOR_IDX_BEDROOMONE; // Key for Hallway to BedroomOne
const TILE_KEY_BEDROOMTWO = TILE_KEY+KEYDOOR_IDX_BEDROOMTWO; // Key for Hallway to BedroomTwo
const TILE_KEY_BEDROOMTHREE = TILE_KEY+KEYDOOR_IDX_BEDROOMTHREE; // Key for Hallway to BedroomFour
const TILE_KEY_FIRST = TILE_KEY;
const TILE_KEY_LAST = TILE_KEY_BEDROOMTHREE;
const TILE_KEY_ALIAS_SNOWBOOT = TILE_KEY+ITEM_IDX_ICEBOOT;

const TILE_ANYROOM_FIRST = 0;
const TILE_ANYROOM_LAST = 39;

// Merge Tiles
//TODO these are only PLACEHOLDERS will likely become their own strip
const TILE_MERGE_ROOMS = 15; //a pink drawer
const TILE_UNMERGE_ROOMS  = 19; // a white drawer

const TILE_SHOW_PATH = 3;

var doorLabels = [];
var keyLabels = [];
doorLabels[KEYDOOR_IDX_GARDEN_BASEMENT] = "chained door";
keyLabels[ITEM_IDX_FLASHLIGHT] = "flashlight";
keyLabels[ITEM_IDX_ICEBOOT] = "spike boot";
keyLabels[KEYDOOR_IDX_DEBUG] = "DEBUG MASTER KEY";
keyLabels[KEYDOOR_IDX_DEN] = "den key";
keyLabels[KEYDOOR_IDX_GARDEN] = "garden key";
keyLabels[KEYDOOR_IDX_GARDEN_BASEMENT] = "crowbar";
keyLabels[KEYDOOR_IDX_BASEMENT] = "basement key";
keyLabels[KEYDOOR_IDX_BEDROOMFOUR] = "bedroom key";
keyLabels[KEYDOOR_IDX_ATTIC] = "attic key";
keyLabels[KEYDOOR_IDX_HOUSEENTRANCE] = "house entrance key";

function idxToTextDoor(forIdx) {
	if(doorLabels[forIdx] !== undefined) {
		return doorLabels[forIdx];
	}
	return "door #"+forIdx;
}
function idxToTextKey(forIdx) {
	if(keyLabels[forIdx] !== undefined) {
		return keyLabels[forIdx];
	}
	return "key #"+forIdx;
}

// ******END TILE KEY******


function returnTileTypeAtColRow(col, row)
{
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS)
	{
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	}
	else
	{
		return WORLD_WALL;
	}
}

function getTileIndexAtPixelCoord(atX, atY)
{
	var heroWorldCol = Math.floor(atX / WORLD_W);
	var heroWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderhero = rowColToArrayIndex(heroWorldCol, heroWorldRow);

	if(heroWorldCol >= 0 && heroWorldCol < WORLD_COLS &&
		heroWorldRow >= 0 && heroWorldRow < WORLD_ROWS)
	{
	    return worldIndexUnderhero;
	} // end of valid col and row
	return undefined;
} // end of getTileIndexAtPixelCoord func

function rowColToArrayIndex(col, row)
{
	return col + WORLD_COLS * row;
}

function tileTypeIsKey(checkTileType) {
	return (checkTileType >= TILE_KEY_FIRST &&
		    checkTileType <= TILE_KEY_LAST)
}
function tileTypeToIndexForKey(checkTileType) {
	return checkTileType-TILE_KEY_FIRST;
}
function tileTypeIsDoor(checkTileType) {
	return (checkTileType >= TILE_DOOR_FIRST &&
		    checkTileType <= TILE_DOOR_LAST)
}
function tileTypeIsTransparent(checkTileType)
{
    return (checkTileType >= TILE_TRANSPARENT_SOLID_FIRST &&
		    checkTileType <= TILE_TRANSPARENT_SOLID_LAST)
}
function tileTypeIsEnemy(checkTileType)
{
    return (checkTileType >= TILE_START_ENEMY_FIRST_ENUM &&
		    checkTileType <= TILE_START_ENEMY_LAST_ENUM)
}
function tileTypeIsStudy(checkTileType) {
    return (checkTileType >= TILE_STUDY_FIRST &&
		    checkTileType <= TILE_STUDY_LAST)
}
function tileTypeIsRoom(checkTileType) {
    return (checkTileType >= TILE_ANYROOM_FIRST &&
		    checkTileType <= TILE_ANYROOM_LAST)
}
function tileTypeToIndexForDoor(checkTileType) {
	return checkTileType-TILE_DOOR_FIRST;
}
function tileTypeToIndexForStudy(checkTileType) {
    return checkTileType - TILE_STUDY_FIRST;
}

// all tiles with transparency must be listed below
function tileTypeHasTransparency(checkTileType)
{
	return checkTileType < 0 || // special animated tile
			tileTypeIsKey(checkTileType) ||
			tileTypeIsDoor(checkTileType) ||
	        tileTypeIsTransparent(checkTileType);
}

function removePlayerStarts()
{
	for(var eachRow = 0;eachRow<WORLD_ROWS;eachRow++)
	{
		for(var eachCol = 0;eachCol<WORLD_COLS;eachCol++)
		{
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			if(worldGrid[arrayIndex] == TILE_PLAYERSTART)
			{
				worldGrid[arrayIndex] = TILE_GROUND;
			} // end of player start if
		} // end of col for
	} // end of row for
}

var awardedBootYet = false;
function checkBootsStatuePuzzle() {
    var roomIdxHere = roomCoordToIndex();
	if( awardedBootYet == false &&
		roomIdxHere == ROOM_ID_BASEMENT_STATUE_AREA) {

		// pumpkin: 23
		// goblin: 22
		// bat: 25
		// slime: 21
		// ghost: 24

		if(worldGrid[67] == 23 &&
			worldGrid[69] == 22 &&
			worldGrid[71] == 25 &&
			worldGrid[73] == 21 &&
			worldGrid[75] == 24) {
			awardedBootYet = true;
			var spikeBootDestIdx = 23;
			var basementKeyDestIdx = 24;
			worldGrid[spikeBootDestIdx] =
				roomLayout[roomIdxHere][spikeBootDestIdx] =
				TILE_KEY_ALIAS_SNOWBOOT;
			worldGrid[basementKeyDestIdx] =
                roomLayout[roomIdxHere][basementKeyDestIdx] =
                TILE_KEY_BASEMENT;
			for(var i=0;i<WORLD_ROWS * WORLD_COLS;i++) {
				if(worldGrid[i] == 11) { // unlit box
					worldGrid[i] =
					roomLayout[roomIdxHere][i] =
						12; // lit box
				}
				if(worldGrid[i] >= 21 &&
					worldGrid[i] <= 25) {
					worldGrid[i] =
					roomLayout[roomIdxHere][i] =
						0; // remove rolling statues
				}
			}
		}
	}
}

function crashThroughCrackedFloor() {
	if(roomCoordToIndex() == ROOM_ID_CRACKS_ABOVE_KITCHEN) {
	    if(crackedFloorBroken == true) {
			console.log(worldGrid[roman.currentIndex]);
	    }

		if(crackedFloorBroken == false &&
			roman.currentIndex == 68) {
			crackedFloorBroken = true;
			Sounds.falling.play();

			var roomIdxHere = roomCoordToIndex();
			for(var i=0;i<WORLD_ROWS * WORLD_COLS;i++) {
				if(worldGrid[i] >= 1 && worldGrid[i] <=9) {
					worldGrid[i] += 10;
					roomLayout[roomIdxHere][i] = worldGrid[i];
				}
			}
			roomLayout[ROOM_ID_KITCHEN][50] = 7;
			roomLayout[ROOM_ID_KITCHEN][51] = 8;
			roomLayout[ROOM_ID_KITCHEN][52] = 8;
			roomLayout[ROOM_ID_KITCHEN][53] = 8;
			roomLayout[ROOM_ID_KITCHEN][66] = 7;
			roomLayout[ROOM_ID_KITCHEN][67] = 8;
			roomLayout[ROOM_ID_KITCHEN][68] = 8;
			roomLayout[ROOM_ID_KITCHEN][69] = 8;
			roomLayout[ROOM_ID_KITCHEN][70] = 9;
			roomLayout[ROOM_ID_KITCHEN][83] = 8;
			roomLayout[ROOM_ID_KITCHEN][84] = 8;
			roomLayout[ROOM_ID_KITCHEN][85] = 8;
			roomLayout[ROOM_ID_KITCHEN][86] = 9;

			currentRoomFloor--;
	        moveToNextRoom();
	        //displayCurrentRoomTiles();
	    }
	}
}

function isFlashLightNeededButMissing() {
    var hasFlashLight = roman.doorKeyRing[ITEM_IDX_FLASHLIGHT] || roman.doorKeyRing[KEYDOOR_IDX_DEBUG];
	return (hasFlashLight != true && roomCoordToIndex() == ROOM_ID_DARKROOM_NEED_LIGHT);
}

function drawWorld()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	tileAnimTick++;

	checkBootsStatuePuzzle();

	if(isFlashLightNeededButMissing()) {
		colorRect(0,0,canvas.width,WORLD_ROWS*WORLD_H,"black");
		return;
	}


	for(var eachRow = 0;eachRow<WORLD_ROWS;eachRow++)
	{
		for(var eachCol = 0;eachCol<WORLD_COLS;eachCol++)
		{
			arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var currentRoomArtIndex = worldGrid[arrayIndex];

			if(tileTypeHasTransparency(currentRoomArtIndex))
			{
			     canvasContext.drawImage(roomStrips, WORLD_W * roomArtSet, 0, // 0 = Room specific ground under items
										WORLD_W, WORLD_H,
										drawTileX, drawTileY,
										WORLD_W, WORLD_H);
			}

			if(currentRoomArtIndex < 0) // special animated tiles
			{
				var animIdx = -currentRoomArtIndex;
				var imgWidth = WORLD_W;
				var imgHeight = WORLD_H;
				var offsetY = -WORLD_H;
				var frameTotal = 3;
				if(currentRoomArtIndex == ANIM_TILE_CLOCK) {
					imgHeight = WORLD_H*2;
					offsetY = -WORLD_H+1;
					frameTotal = 6;
				}
			     canvasContext.drawImage(animTileStrips[animIdx],
			     						imgWidth*( (tileAnimTick>>4)%frameTotal ), 0,
										imgWidth, imgHeight,
										drawTileX, drawTileY+offsetY,
										imgWidth, imgHeight);
			} else if(tileTypeIsKey(currentRoomArtIndex)) {
				var whichKey = tileTypeToIndexForKey(currentRoomArtIndex);
				canvasContext.drawImage(keyStrip,0,WORLD_H*whichKey,
										WORLD_W,WORLD_H,
										drawTileX,drawTileY,
										WORLD_W,WORLD_H);
			} else if(tileTypeIsDoor(currentRoomArtIndex)) {
			    var whichDoor = tileTypeToIndexForDoor(currentRoomArtIndex);
			    var angleOfDoorRotation = 0;

                // Rotate doors according to their placement in the room
			    if (drawTileX == 0)
			    {
			        angleOfDoorRotation = 0;
			    }
			    else if (drawTileX == WORLD_COLS * WORLD_W  - WORLD_W)
                {
			        angleOfDoorRotation = 180;
			    }
			    else if (drawTileY == 0)
			    {
			        angleOfDoorRotation = 90;
			    }
			    else if (drawTileY == WORLD_ROWS * WORLD_H -WORLD_H)
			    {
			        angleOfDoorRotation = 270;
			    }
			    drawRotatedTile(doorStrip, 0, WORLD_H * whichDoor, // which image, start drawing image from X = 0, start drawing image from Y = WORLD_H * whichDoor
                                        WORLD_W, WORLD_H, // image width, image height
                                        drawTileX, drawTileY, // draw tile x coord at drawTileX, draw tile x coord at drawTileY
                                        WORLD_W, WORLD_H, angleOfDoorRotation); // tile width, tile height, angle of rotation
			} else if (tileTypeIsRoom(currentRoomArtIndex)) {
				currentRoomArtIndex = atticRoomArtIndexAlter(currentRoomArtIndex, arrayIndex);
			    canvasContext.drawImage(roomStrips, WORLD_W * roomArtSet, WORLD_H * currentRoomArtIndex,
										WORLD_W, WORLD_H,
										drawTileX, drawTileY,
										WORLD_W, WORLD_H, angleOfDoorRotation);
			} else {
				console.log("tried to draw a tile type ("+currentRoomArtIndex+
					") that has no defined draw behavior");
			}
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func
