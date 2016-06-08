

var g_equals_b = new Module();

g_equals_b.id = "delta_G_equals_delta_b";

g_equals_b.title = unescape("%u0394") + "G = "+ unescape("%u0394") +"b";
g_equals_b.description = "Sample description";

g_equals_b.action = function (graphs) {


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
	App.factors.current.set("G", currentG - 150);

}

App.module.add( g_equals_b );