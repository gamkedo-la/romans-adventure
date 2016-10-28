const WORLD_W = 14; // Original tile art width
const WORLD_H = 14; // Original tie art height
const WORLD_COLS = 16; // Number of columns in room
const WORLD_ROWS = 10; // Number of rows in room
const PIXEL_SCALE_UP = 4; // Number of times to scale up art tiles
//const TILE_ART_STUDY = 10;
const BUILDING_ROOMS_COLS = 3; // Number of columns of rooms in the house
const BUILDING_ROOMS_ROWS = 4; // Number of rows of rooms in the house
const BUILDING_FLOORS = 2; // Number of floors in the house

var worldGrid = [];
var roomArtSet = 0;
var rotDoor;

// ******BEGIN MAP EDITOR******

// First Level Areas
var levelStudy =
	[ // Bookshelves, Desk, Table
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelFoyerEntrance =
    [ // Tables, Wall lamps, Rug
 		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
 		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        10, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
        10, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 0, 15, 10,
		10, 10, 10, 10, 10, 10, 10, 201, 10, 10, 10, 10, 10, 10, 10, 10,
    ];

var levelDen =
	[ // Fireplace, Armchairs, Rug
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelFoyerStairs =
	[ // Tables
		 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	];

var levelDiningRoom =
	[ // Dining table, China cabinet
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelStairs =
	[ // Wall lamps
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10,
	];

var levelKitchen =
	[ // Cabinets, Counter-tops, Island
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelGardenLeft =
	[ // Plants, Fountain, Basement entrance
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelGardenMiddle =
	[ // Plants
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelGardenRight =
	[ // Plants
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

// Second Level Areas
var levelBedroomOne =
	[ // Bed, Rug, Nightstand
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
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
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
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
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelHallwayLeft =
	[ // Wall lamps, Tables
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelHallwayMiddle =
	[ // Wall lamps, Tables
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelHallwayRight =
	[ // Wall lamps, Tables
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelBedroomFour =
	[ // Bed, Rug, Nightstand
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelKitchenBedroomFourMerged =
	[
		10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10,
		10, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
	];

// Basement and Attic Areas

var levelBasementFoyerEntrance =
	[ // Chests, Boxes, Shelves
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
	];

var levelBasementGardenExit =
	[ // Chests, Boxes, Shelves
         10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
	];

var levelAttic =
	[ // Chests, Boxes, Shelves
		 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
		 10, 10, 10, 10, 10, 10, 10, 0, 10, 10, 10, 10, 10, 10, 10, 10,
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
	    levelAttic, levelFoyerEntrance /*Should never see this */, levelBedroomFour,
			      //18                19              20
        levelHallwayLeft, levelHallwayMiddle, levelHallwayRight,
				     //21                22             23                       24 - maybe merges shouldn't go here.
        levelBedroomOne, levelBedroomTwo, levelBedroomThree, levelKitchenBedroomFourMerged
    ];

const ROOM_ID_STAIRS = 4; // Based on room layout array ^^
const ROOM_ID_UPSTAIRS_GOING_DOWN = 19; // Based on room layout array ^^

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
const TILE_WALL = 1;
const TILE_BLANK = 2;

// Player And Pickup Tiles
const TILE_PLAYERSTART = 100;

// key and door tile consts share offsets to ensure they'll match up
// these also double as the index values into the keyring array
const KEYDOOR_IDX_DEBUG = 0;
const KEYDOOR_IDX_HOUSEENTRANCE = 1;
const KEYDOOR_IDX_STUDY = 2;
const KEYDOOR_IDX_DEN = 3;
const KEYDOOR_IDX_BASEMENT = 4;
const KEYDOOR_IDX_GARDEN = 5;
const KEYDOOR_IDX_GARDEN_BASEMENT = 6;
const KEYDOOR_IDX_STAIRS_SECONDFLOOR = 7;
const KEYDOOR_IDX_BEDROOMONE = 8;
const KEYDOOR_IDX_BEDROOMTWO = 9;
const KEYDOOR_IDX_BEDROOMTHREE = 10;
const KEYDOOR_IDX_BEDROOMFOUR = 11;
const KEYDOOR_IDX_ATTIC = 12;
const KEYDOOR_IDX_FIRST = KEYDOOR_IDX_DEBUG;
const KEYDOOR_IDX_LAST = KEYDOOR_IDX_ATTIC;

// Door Tiles
const TILE_DOOR = 200; // base door (only used for debug, otherwise basis for door #s)
const TILE_DOOR_HOUSEENTRANCE = TILE_DOOR+KEYDOOR_IDX_HOUSEENTRANCE; // Exit the house, this is the goal!
const TILE_DOOR_STUDY = TILE_DOOR+KEYDOOR_IDX_STUDY; // Door from FoyerEntrance to Study
const TILE_DOOR_DEN = TILE_DOOR+KEYDOOR_IDX_DEN; // Door from FoyerEntrance to Den
const TILE_DOOR_BASEMENT = TILE_DOOR+KEYDOOR_IDX_BASEMENT; // Door from FoyerStairs room to Basement
const TILE_DOOR_GARDEN = TILE_DOOR+KEYDOOR_IDX_GARDEN; // Door from Kitchen to Garden
const TILE_DOOR_GARDEN_BASEMENT = TILE_DOOR+KEYDOOR_IDX_GARDEN_BASEMENT; // Door from Garden into Basement
const TILE_DOOR_STAIRS_SECONDFLOOR = TILE_DOOR+KEYDOOR_IDX_STAIRS_SECONDFLOOR; // Door from Stairs to Hallway (2nd floor)
const TILE_DOOR_BEDROOMONE = TILE_DOOR+KEYDOOR_IDX_BEDROOMONE; // Door from Hallway to BedroomOne
const TILE_DOOR_BEDROOMTWO = TILE_DOOR+KEYDOOR_IDX_BEDROOMTWO; // Door from Hallway to BedroomTwo
const TILE_DOOR_BEDROOMTHREE = TILE_DOOR+KEYDOOR_IDX_BEDROOMTHREE; // Door from Hallway to BedroomThree
const TILE_DOOR_BEDROOMFOUR = TILE_DOOR+KEYDOOR_IDX_BEDROOMFOUR; // Door from Hallway to BedroomFour
const TILE_DOOR_ATTIC = TILE_DOOR+KEYDOOR_IDX_ATTIC; // Door from Hallway to Attic
const TILE_DOOR_FIRST = TILE_DOOR;
const TILE_DOOR_LAST = TILE_DOOR_ATTIC;

// Key Tiles
const TILE_KEY = 300; // base key
const TILE_KEY_HOUSEENTRANCE = TILE_KEY+KEYDOOR_IDX_HOUSEENTRANCE; // Exit the house, this is the goal!
const TILE_KEY_STUDY = TILE_KEY+KEYDOOR_IDX_STUDY; // Key for FoyerEntrance to Study
const TILE_KEY_DEN = TILE_KEY+KEYDOOR_IDX_DEN; // Key for FoyerEntrance to Den
const TILE_KEY_BASEMENT = TILE_KEY+KEYDOOR_IDX_BASEMENT; // Key for FoyerStairs room to Basement
const TILE_KEY_GARDEN = TILE_KEY+KEYDOOR_IDX_GARDEN; // Key for Kitchen to Garden
const TILE_KEY_GARDEN_BASEMENT = TILE_KEY+KEYDOOR_IDX_GARDEN_BASEMENT; // Key for Garden into Basement
const TILE_KEY_STAIRS_SECONDFLOOR = TILE_KEY+KEYDOOR_IDX_STAIRS_SECONDFLOOR; // Key for Stairs to Hallway (2nd floor)
const TILE_KEY_BEDROOMONE = TILE_KEY+KEYDOOR_IDX_BEDROOMONE; // Key for Hallway to BedroomOne
const TILE_KEY_BEDROOMTWO = TILE_KEY+KEYDOOR_IDX_BEDROOMTWO; // Key for Hallway to BedroomTwo
const TILE_KEY_BEDROOMTHREE = TILE_KEY+KEYDOOR_IDX_BEDROOMTHREE; // Key for Hallway to BedroomFour
const TILE_KEY_BEDROOMFOUR = TILE_KEY+KEYDOOR_IDX_BEDROOMFOUR; // Door from Hallway to BedroomFour
const TILE_KEY_ATTIC = TILE_KEY+KEYDOOR_IDX_ATTIC; // Key for Hallway to Attic
const TILE_KEY_FIRST = TILE_KEY;
const TILE_KEY_LAST = TILE_KEY_ATTIC;

// Study Tiles
const TILE_RUG_CENTER = 900;
const TILE_RUG_TOP_LEFT = 901;
const TILE_RUG_BOTTOM_LEFT = 902;
const TILE_RUG_TOP = 903;
const TILE_RUG_BOTTOM = 904;
const TILE_RUG_TOP_RIGHT = 905;
const TILE_RUG_BOTTOM_RIGHT = 906;
const TILE_BOOKSHELF_A = 910;
const TILE_BOOKSHELF_B = 911;
const TILE_BOOKSHELF_C = 912;
const TILE_BOOKSHELF_D = 913;
const TILE_BOOKSHELF_E = 914;
const TILE_BOOKSHELF_F = 915;
const TILE_BOOKSHELF_G = 916;
const TILE_BOOKSHELF_H = 917;
const TILE_BOOKSHELF_I = 918;
const TILE_BOOKSHELF_J = 919;
const TILE_STUDY_FIRST = TILE_RUG_CENTER;
const TILE_STUDY_LAST = TILE_BOOKSHELF_J;

const TILE_ANYROOM_FIRST = 0;
const TILE_ANYROOM_LAST = 20;

// Merge Tiles
//TODO these are only PLACEHOLDERS will likely become their own strip
const TILE_MERGE_ROOMS = 15; //a pink drawer
const TILE_UNMERGE_ROOMS  = 19 // a white drawer

var doorLabels = [];
var keyLabels = [];
doorLabels[KEYDOOR_IDX_STUDY] = "chained door";
keyLabels[KEYDOOR_IDX_STUDY] = "crowbar";

function idxToTextDoor(forIdx) {
	console.log(forIdx);
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
	return tileTypeIsKey(checkTileType) ||
			tileTypeIsDoor(checkTileType);
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


function drawWorld()
{
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow = 0;eachRow<WORLD_ROWS;eachRow++)
	{
		for(var eachCol = 0;eachCol<WORLD_COLS;eachCol++)
		{
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var currentRoomArtIndex = worldGrid[arrayIndex];
			var useImg = roomArtStrips[currentRoomArtIndex];

			if(tileTypeHasTransparency(currentRoomArtIndex))
			{
			     canvasContext.drawImage(roomStrips, WORLD_W * roomArtSet, 0, // 0 = Room specific ground under items
										WORLD_W, WORLD_H,
										drawTileX, drawTileY,
										WORLD_W, WORLD_H);
			}

			if(tileTypeIsKey(currentRoomArtIndex)) {
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
			    var whichRoomTile = currentRoomArtIndex;
			    canvasContext.drawImage(roomStrips, WORLD_W * roomArtSet, WORLD_H * whichRoomTile,
										WORLD_W, WORLD_H,
										drawTileX, drawTileY,
										WORLD_W, WORLD_H);
			} else {
				canvasContext.drawImage(useImg,drawTileX,drawTileY);
			}
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func
