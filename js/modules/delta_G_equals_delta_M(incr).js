

var g_equals_m_incr = new Module();

g_equals_m_incr.id = "delta_G_equals_delta_M(incr)";

g_equals_m_incr.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"M(incr)";
g_equals_m_incr.description = "Sample description";

g_equals_m_incr.action = function (graphs) {


	/** Action sequence **/
	// 1. Get chart object
	var islmbp = graphs.get("islmbp");
	if (islmbp == null) {
		App.message.show("Error", "graph not found", "error");
		return;
	}

	// 2. Get necessary line
	var is = islmbp.linesFactory.get("is");

	// 3. Create snapshot of a line
	var isPrev = is.snapshot();

	// 4. Set new settings for copied line
	isPrev.id = "isPrev";
	isPrev.settings = {
		"name" : "Первоначальный IS",
		"color" : "blue",
		"lineWidth" : 1
	};

	// 5. Add line to chart
	islmbp.linesFactory.add( isPrev );
	

	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG + 150);
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM + 150);

}

App.module.add( g_equals_m_incr );