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
	is.params = {
		param1 : 1
	};
	is.equation = function(x){
		return 10 * x;
	};
	is.settings = {
		name: "IS",
		type: "line",
		marker: {
			enabled: false
		},
		color: "red"
	};

	islmbp.linesFactory.add( is );


var lm = new Line();
	lm.id = "lm";
	lm.params = {
		multiplier : -10
	};
	lm.equation = function(x){
		return -8 * x + 100;
	};
	lm.settings = {
		name: "LM",
		type: "line",
		marker: {
			enabled: false
		},
		color: "green"
	};

	islmbp.linesFactory.add( lm );



// Initialize graph
islmbp.linesFactory.convertAll();
App.graph.add( islmbp );