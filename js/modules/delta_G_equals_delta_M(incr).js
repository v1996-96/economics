

var g_equals_m_incr = new Module();

g_equals_m_incr.id = "delta_G_equals_delta_M(incr)";

g_equals_m_incr.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"M(incr)";
g_equals_m_incr.description = "Sample description";

g_equals_m_incr.action = function (graphs) {


/* IS copy
--------------------------------------------------------*/
	CapturePreviousLineState(
		graphs, "islmbp", "is", "prevIs",
		{ name : "Первоначальный IS" } );
	
	

	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG + 150);
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM + 150);

}

App.module.add( g_equals_m_incr );