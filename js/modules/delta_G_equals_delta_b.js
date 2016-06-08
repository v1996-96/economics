

var g_equals_b = new Module();

g_equals_b.id = "delta_G_equals_delta_b";

g_equals_b.title = "&Delta;G = &Delta;b";
g_equals_b.description = "Sample description";

g_equals_b.action = function (graphs) {


	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG - 50);

}

App.module.add( g_equals_b );