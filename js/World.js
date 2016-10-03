const WORLD_W = 14;
const WORLD_H = 14;
const WORLD_COLS = 16;
const WORLD_ROWS = 10;
const PIXEL_SCALE_UP = 4;

var worldGrid = [];

// ******BEGIN MAP EDITOR******

// First Level Areas
var levelStudy =
	[ // Bookshelves, Desk, Table
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 200,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelFoyerEntrance =
	[ // Tables, Wall lamps, Rug
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, // <--Reaching top row takes you to FoyerStairs level
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 201, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelDen =
	[ // Fireplace, Armchairs, Rug
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 200, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, // <--Reaching bottom row takes you to FoyerEntrance level
	];

var levelDiningRoom =
	[ // Dining table, China cabinet
		 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 100, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1,
	];

var levelKitchen =
	[ // Cabinets, Counter-tops, Island
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelGardenLeft =
	[ // Plants, Fountain, Basement entrance
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelGardenRight =
	[ // Plants
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

// Second Level Areas
var levelBedroomOne =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelBedroomTwo =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelBedroomThree =
	[ // Bed, Rug, Nightstand
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

var levelHallwayMiddle =
	[ // Wall lamps, Tables
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
		 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

// Basement and Attic Areas

var levelBasementFoyerEntrace =
	[ // Chests, Boxes, Shelves
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 200,
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
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
	];

var levelAttic =
	[ // Chests, Boxes, Shelves
		 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 1, 1, 1, 1, 1, 1, 200, 1, 1, 1, 1, 1, 1, 1, 1,
	];

// ******END MAP EDITOR******


// ******BEGIN TILE KEY******

// Environment
const TILE_GROUND = 0;
const TILE_WALL = 1;

// Player and pickups
const TILE_PLAYERSTART = 100;

// Doors
const TILE_DOOR = 200; // Debug door
const TILE_DOOR_HOUSEENTRANCE = 201; // Exit the house, this is the goal!
const TILE_DOOR_STUDY = 202; // Door from FoyerEntrance to Study
const TILE_DOOR_DEN = 203; // Door from FoyerEntrance to Den
const TILE_DOOR_BASEMENT = 204; // Door from FoyerStairs room to Basement
const TILE_DOOR_GARDEN = 205; // Door from Kitchen to Garden
const TILE_DOOR_GARDEN_BASEMENT = 206; // Door from Garden into Basement
const TILE_DOOR_STAIRS_SECONDFLOOR = 207; // Door from Stairs to Hallway (2nd floor)
const TILE_DOOR_BEDROOMONE = 208; // Door from Hallway to BedroomOne
const TILE_DOOR_BEDROOMTWO = 209; // Door from Hallway to BedroomTwo
const TILE_DOOR_BEDROOMTHREE = 210; // Door from Hallway to BedroomThree
const TILE_DOOR_BEDROOMFOUR = 211; // Door from Hallway to BedroomFour
const TILE_DOOR_ATTIC = 212; // Door from Hallway to Attic


// Keys
const TILE_KEY = 300; //unlocks DOOR @ 200
const TILE_KEY_HOUSEENTRANCE = 201; // Exit the house, this is the goal!
const TILE_KEY_STUDY = 202; // Key for FoyerEntrance to Study
const TILE_KEY_DEN = 203; // Key for FoyerEntrance to Den
const TILE_KEY_BASEMENT = 204; // Key for FoyerStairs room to Basement
const TILE_KEY_GARDEN = 205; // Key for Kitchen to Garden
const TILE_KEY_GARDEN_BASEMENT = 206; // Key for Garden into Basement
const TILE_KEY_STAIRS_SECONDFLOOR = 207; // Key for Stairs to Hallway (2nd floor)
const TILE_KEY_BEDROOMONE = 208; // Key for Hallway to BedroomOne
const TILE_KEY_BEDROOMTWO = 209; // Key for Hallway to BedroomTwo
const TILE_KEY_BEDROOMTHREE = 210; // Key for Hallway to BedroomThree
const TILE_KEY_BEDROOMFOUR = 211; // Key for Hallway to BedroomFour
const TILE_KEY_ATTIC = 212; // Key for Hallway to Attic


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

// all tiles with transparency must be listed below
function tileTypeHasTransparency(checkTileType)
{
	return (checkTileType == TILE_DOOR ||
			checkTileType == TILE_KEY );
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
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if(tileTypeHasTransparency(tileKindHere))
			{
				canvasContext.drawImage(worldPics[TILE_GROUND],drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func
