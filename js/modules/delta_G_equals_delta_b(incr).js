

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


/* factExpenditure copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "keynesCross", "factExpenditure", "prevFactExpenditure",
		{ name : "Первоначальный factExpenditure" } );

	

	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG + 150);

}

App.module.add( g_equals_b_incr );