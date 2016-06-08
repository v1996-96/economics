

var m_equals_b_incr = new Module();

m_equals_b_incr.id = "delta_M_equals_delta_b(incr)";

m_equals_b_incr.title = unescape("%u0394") + "M = "+ unescape("%u0394") +"b(incr)";
m_equals_b_incr.description = "Sample description";

m_equals_b_incr.action = function (graphs) {


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
	var currentM = App.factors.current.get("M");
	App.factors.current.set("M", currentM + 150);

}

App.module.add( m_equals_b_incr );