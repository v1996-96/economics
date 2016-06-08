

var m_equals_b_incr = new Module();

m_equals_b_incr.id = "delta_M_equals_delta_b(incr)";

m_equals_b_incr.title = unescape("%u0394") + "M = "+ unescape("%u0394") +"b(incr)";
m_equals_b_incr.description = "Sample description";

m_equals_b_incr.action = function (graphs) {


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
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM + 150);

}

App.module.add( m_equals_b_incr );