

var g_equals_t_decr = new Module();

g_equals_t_decr.id = "delta_G_equals_delta_T_decr";

g_equals_t_decr.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"T(decr)";
g_equals_t_decr.description = "Sample description";

g_equals_t_decr.action = function (graphs) {

/* IS copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "islmbp", "is", "prevIs",
		{ name : "Первоначальный IS" } );

	CapturePreviousLineState(
		graphs, "islmbp", "lm", "prevLm",
		{ name : "Первоначальный LM" } );


/* BP copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "islmbp", "bp", "prevBp",
		{ name : "Первоначальный BP" } );


/* AD copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "adas", "ad", "prevAd",
		{ name : "Первоначальный AD" } );


/* Md copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "moneyMarket", "moneyDemand", "prevMoneyDemand",
		{ name : "Первоначальный Md" } );

			CapturePreviousLineState(
		graphs, "moneyMarket", "moneySupply", "prevMoneySupply",
		{ name : "Первоначальный moneySupply" } );


/* factExpenditure copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "keynesCross", "factExpenditure", "prevFactExpenditure",
		{ name : "Первоначальный factExpenditure" } );

	// CapturePreviousLineState(
	// 	graphs, "exchangeMarket", "nfl", "prevNFL",
	// 	{ name : "Первоначальный NFL" } );

	// CapturePreviousLineState(
	// 	graphs, "exchangeMarket", "nx", "prevNX",
	// 	{ name : "Первоначальный NX" } );


	

	/* Move line to new position */
		var deltaG = -200;
		var deltaT = -200;

	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG + deltaG);
	var currentT = App.factors.current.get("T0");
	App.factors.current.set("T0", currentT + deltaT);


	var params = App.params.get();

	if (params.exchangeRate == 'fixed') {
		var factors = App.factors.getAll();
		var result = CalculateIntermediateVars(factors);
		App.factors.current.set("M", factors.P*(factors.k3*result.income - factors.k4* result.rate));
	}


}

App.module.add( g_equals_t_decr );