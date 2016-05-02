/**
 * IS-LM-BP graph
 * 04/2016
 */

var islmbp = new Graph();

islmbp.id = "islmbp";

islmbp.position.row = 0;
islmbp.position.column = 0;

islmbp.title.text = "IS-LM-BP";
islmbp.xAxis.title.text = "Y";
islmbp.yAxis.title.text = "r";


var is = new Line();
	is.id = "is";
	var paramsIS = {
		param1 : 1
	};
	is.defaultParams = paramsIS;
	is.params = paramsIS;
	is.equation = function(x){
		return 10 * x + this.param1;
	};
	is.settings = {
		name: "IS",
		color: "red"
	};

	islmbp.linesFactory.add( is );


var lm = new Line();
	lm.id = "lm";
	var paramsLM = {
		multiplier : -10
	}
	lm.defaultParams = paramsLM;
	lm.params = paramsLM;
	lm.equation = function(x){
		return -8 * x + 100;
	};
	lm.settings = {
		name: "LM",
		color: "green"
	};

	islmbp.linesFactory.add( lm );

// Only these lines will remain between module calls
islmbp.defaultLines = ["is", "lm", "bp"];

// Initialize graph
islmbp.linesFactory.convertAll();
App.graph.add( islmbp );