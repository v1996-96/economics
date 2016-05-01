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
		multiplier : 10
	};
	is.equation = function(x){
		return this.multiplier * x;
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



// Initialize graph
islmbp.linesFactory.convertAll();
App.graph.add( islmbp );