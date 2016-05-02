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
		console.log("graph not found");
		return;
	}

	/* Get IS line */
	var is = islmbp.linesFactory.get("is");


	/* Define initial state */
	var isPrev = is.copy();
	isPrev.id = "isPrev";
	isPrev.settings = {
		"name" : "Первоначальный IS",
		"color" : "blue",
		"lineWidth" : 1
	};
	islmbp.linesFactory.add( isPrev );


	/* Move line to new position */
	is.params.param1 += 50;


	console.log(is);
	console.log(isPrev);


	/* Calculate new series */
	islmbp.linesFactory.convertAll();
}

App.module.add( sample );