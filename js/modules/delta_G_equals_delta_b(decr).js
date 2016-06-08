

var g_equals_b = new Module();

g_equals_b.id = "delta_G_equals_delta_b";

g_equals_b.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"b (decr)";
g_equals_b.description = "Sample description";

g_equals_b.action = function (graphs) {

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
	App.factors.current.set("G", currentG - 150);

}

App.module.add( g_equals_b );