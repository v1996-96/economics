

var g_equals_m_decr = new Module();

g_equals_m_decr.id = "delta_G_equals_delta_M(decr)";

g_equals_m_decr.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"M(decr)";
g_equals_m_decr.description = "Sample description";

g_equals_m_decr.action = function (graphs) {


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
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM - 200);

}

App.module.add( g_equals_m_decr );