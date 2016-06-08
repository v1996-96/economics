

var g_equals_b = new Module();

g_equals_b.id = "delta_G_equals_delta_b";

g_equals_b.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"b";
g_equals_b.description = "Sample description";

g_equals_b.action = function (graphs) {

/* IS copy
--------------------------------------------------------*/
		CapturePreviousLineState(
		graphs, "islmbp", "is", "prevIs",
		{ name : "Первоначальный IS" } );
		CapturePreviousLineState(
		graphs, "islmbp", "lm", "prevLm",
		{ name : "Первоначальный LM" } );

		CapturePreviousLineState(
		graphs, "islmbp", "bp", "prevBp",
		{ name : "Первоначальный Bp" } );
				CapturePreviousLineState(
		graphs, "adas", "ad", "prevAd",
		{ name : "Первоначальный AD" } );
		CapturePreviousLineState(
		graphs, "moneyMarket", "moneySupply", "prevMoneySupply",
		{ name : "Первоначальный moneySupply" } );
			CapturePreviousLineState(
		graphs, "moneyMarket", "moneyDemand", "prevMoneyDemand",
		{ name : "Первоначальный moneyDemand" } );
	
					CapturePreviousLineState(
		graphs, "keynesCross", "factExpenditure", "prevfactExpenditure",
		{ name : "Первоначальный factExpenditure" } );
					CapturePreviousLineState(
		graphs, "keynesCross", "plannedExpenditure", "prevplannedExpenditure",
		{ name : "Первоначальный plannedExpenditure" } );	

	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG - 200);

}

App.module.add( g_equals_b );