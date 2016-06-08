

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
	
	

	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG - 150);
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM - 150);

}

App.module.add( g_equals_m_decr );