/**
 * Sample
 * 05/2016
 */

var sample = new Module();

sample.id = "sample";

sample.title = "Sample";
sample.description = "Sample description";

sample.action = function (graphs) {

	/* Get islmbp graph */
	var islmbp = graphs.get("islmbp");
	if (islmbp == null) {
		App.message.show("Error", "graph not found", "error");
		return;
	}

	/* Get IS line */
	var is = islmbp.linesFactory.get("is");


	/* Define initial state */
	// var isPrev = is.copy();
	// isPrev.id = "isPrev";
	// isPrev.settings = {
	// 	"name" : "Первоначальный IS",
	// 	"color" : "blue",
	// 	"lineWidth" : 1
	// };
	// islmbp.linesFactory.add( isPrev );


	/* Move line to new position */
	var currentG = App.factors.current.get("G");
	App.factors.current.set("G", currentG - 50);
	// is.params.param1 += 50;

}

App.module.add( sample );