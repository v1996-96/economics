

var g_equals_b_incr = new Module();

g_equals_b_incr.id = "delta_G_equals_delta_b_incr";

g_equals_b_incr.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"b (incr)";
g_equals_b_incr.description = "Sample description";

g_equals_b_incr.action = function (graphs) {

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

	

	/* Move line to new position */
	var deltaG = 150;

	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG + deltaG);

	var params = App.params.get();

	if (params.exchangeRate == 'fixed') {
		var factors = App.factors.getAll();
		var result = CalculateIntermediateVars(factors);
		App.factors.current.set("M", factors.P*(factors.k3*result.income - factors.k4* result.rate));
	}
}

App.module.add( g_equals_b_incr );