

var m_equals_b_decr = new Module();

 m_equals_b_decr.id = "delta_M_equals_delta_b(decr)";

 m_equals_b_decr.title = unescape("%u0394") + "M = "+ unescape("%u0394") +"b(decr)";
 m_equals_b_decr.description = "Sample description";

 m_equals_b_decr.action = function (graphs) {


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
	var deltaM = -150;

	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM + deltaM);

	var params = App.params.get();

	if (params.exchangeRate == 'fixed') {
		var factors = App.factors.getAll();
		var result = CalculateIntermediateVars(factors);
		App.factors.current.set("M", factors.P*(factors.k3*result.income - factors.k4* result.rate));
	}

}

App.module.add( m_equals_b_decr );