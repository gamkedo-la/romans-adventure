const WORLD_W = 14;
const WORLD_H = 14;
const WORLD_COLS = 16;
const WORLD_ROWS = 10;
const PIXEL_SCALE_UP = 4;
const TILE_ART_STUDY = 10;
const BUILDING_ROOMS_COLS = 3;
const BUILDING_ROOMS_ROWS = 4;
const BUILDING_FLOORS = 2;

var worldGrid = [];

// ******BEGIN MAP EDITOR******

// First Level Areas
var levelStudy =
	[ // Bookshelves, Desk, Table
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
         TILE_ART_STUDY
	];

var levelFoyerEntrance =
    [ // Tables, Wall lamps, Rug
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, // <--Reaching top row takes you to FoyerStairs level
		1, 0, 0, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 305, 0, 205, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 1,
		1, 0, 0, 0, 302, 0, 0, 100, 0, 0, 200, 0, 0, 0, 0, 1,
		200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 300, 0, 0, 207, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 201, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelDen =
	[ // Fireplace, Armchairs, Rug
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelFoyerStairs =
	[ // Tables
		 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, // <--Reaching bottom row takes you to FoyerEntrance level
	];

var levelDiningRoom =
	[ // Dining table, China cabinet
		 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelStairs =
	[ // Wall lamps
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1,
	];

var levelKitchen =
	[ // Cabinets, Counter-tops, Island
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelGardenLeft =
	[ // Plants, Fountain, Basement entrance
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelGardenMiddle =
	[ // Plants
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelGardenRight =
	[ // Plants
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

// Second Level Areas
var levelBedroomOne =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelBedroomTwo =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelBedroomThree =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelHallwayLeft =
	[ // Wall lamps, Tables
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelHallwayMiddle =
	[ // Wall lamps, Tables
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelHallwayRight =
	[ // Wall lamps, Tables
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelBedroomFour =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

// Basement and Attic Areas

var levelBasementFoyerEntrance =
	[ // Chests, Boxes, Shelves
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelBasementGardenExit =
	[ // Chests, Boxes, Shelves
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	];

var levelAttic =
	[ // Chests, Boxes, Shelves
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
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
        -1, -1, -1, //No rooms above the garden area
            //12        13          14
	    levelAttic, levelStairs, levelBedroomFour,
            //15                16                  17
        levelHallwayLeft, levelHallwayMiddle, levelHallwayRight,
            //18                19              20
        levelBedroomOne, levelBedroomTwo, levelBedroomThree	    
    ];

var roomNames =
    [
        "GardenLeft", "GardenMiddle", "GardenRight",
        "BasementGardenExit", "Stairs", "Kitchen",
        "BasementFoyerEntrance", "FoyerStairs", "DiningRoom",
        "Study", "FoyerEntrance", "Den",
        "Undefined Area", "Undefined Area", "Undefined Area",
        "Attic", "Stairs (duplicate)", "BedroomFour",
        "HallwayLeft", "HallwayMiddle", "HallwayRight",
        "BedroomOne", "BedroomTwo", "BedroomThree"
    ];

//const BUILDING_ROOMS_COLS = 3;
//const BUILDING_ROOMS_ROWS = 4;
//const BUILDING_FLOORS = 2;
var currentRoomRow = 3, currentRoomCol = 1, currentRoomFloor = 0; // Foyer entrance room
var currentRoomIndex = roomCoordToIndex();

function roomCoordToIndex()
{
    return currentRoomCol + BUILDING_ROOMS_COLS * currentRoomRow
        + (BUILDING_ROOMS_ROWS * BUILDING_ROOMS_COLS * currentRoomFloor);
}

// ******END MAP EDITOR******


// ******BEGIN TILE KEY******

// Environment
const TILE_GROUND = 0;
const TILE_WALL = 1;

// Player and pickups
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

// Doors
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

// Keys
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

//Study
const TILE_RUG_CENTER = 400;
const TILE_RUG_TOP_LEFT = 401;
const TILE_RUG_BOTTOM_LEFT = 402;
const TILE_RUG_TOP = 403;
const TILE_RUG_BOTTOM = 404;
const TILE_RUG_TOP_RIGHT = 405;
const TILE_RUG_BOTTOM_RIGHT = 406;
const TILE_BOOKSHELF_A = 407;
const TILE_BOOKSHELF_B = 408;
const TILE_BOOKSHELF_C = 409;
const TILE_BOOKSHELF_D = 410;
const TILE_BOOKSHELF_E = 411;
const TILE_BOOKSHELF_F = 412;
const TILE_BOOKSHELF_G = 413;
const TILE_BOOKSHELF_H = 414;
const TILE_BOOKSHELF_I = 415;
const TILE_BOOKSHELF_J = 416;
const TILE_STUDY_FIRST = TILE_RUG_CENTER;
const TILE_STUDY_LAST = TILE_BOOKSHELF_J;


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
    return (checkTileType >= TILE_DOOR_FIRST &&
		    checkTileType <= TILE_DOOR_LAST)
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
//			var useImg = worldPics[tileKindHere];
			var useImg = roomArtStrips[currentRoomArtIndex];

			if(tileTypeHasTransparency(currentRoomArtIndex))
			{
				canvasContext.drawImage(roomArtStrips[TILE_GROUND],drawTileX,drawTileY);
			}

			if(tileTypeIsKey(currentRoomArtIndex)) {
				var whichKey = tileTypeToIndexForKey(currentRoomArtIndex);
				canvasContext.drawImage(keyStrip,0,WORLD_H*whichKey,
										WORLD_W,WORLD_H,
										drawTileX,drawTileY,
										WORLD_W,WORLD_H);
			} else if(tileTypeIsDoor(currentRoomArtIndex)) {
				var whichDoor = tileTypeToIndexForDoor(currentRoomArtIndex);
				canvasContext.drawImage(doorStrip,0,WORLD_H*whichDoor,
										WORLD_W,WORLD_H,
										drawTileX,drawTileY,
										WORLD_W, WORLD_H);
			} else if (tileTypeIsStudy(currentRoomArtIndex)) {
			    var whichStudyTile = tileTypeToIndexForStudy(currentRoomArtIndex);
			    canvasContext.drawImage(studyStrip, 0, WORLD_H * whichStudyTile,
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
