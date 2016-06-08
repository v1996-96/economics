

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
		graphs, "islmbp", "bp", "prevBp",
		{ name : "Первоначальный Bp" } );
	/* Move line to new position */
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM - 150);

}

App.module.add( m_equals_b_decr );