/**
 * IS-LM-BP graph
 * 04/2016
 */

var islmbp = new Graph();

islmbp.id = "islmbp";

islmbp.position.row = 1;
islmbp.position.column = 1;

islmbp.title.text = "IS-LM-BP";
islmbp.xAxis.title.text = "Y";
islmbp.yAxis.title.text = "r";
islmbp.yAxis.max = 30;
islmbp.yAxis.min = 0;


islmbp.seriesSettings.min = 0;

islmbp.seriesSettings.max = 100;

islmbp.yAxis.interval = 1;
islmbp.seriesSettings.interval = 5;	

islmbp.resetAxisIntervals = function() {
	var factors = App.factors.getAll();
	var result = CalculateIntermediateVars(factors);
	this.seriesSettings.max = 2* result.income;
}

// islmbp.yAxis.min = function(){ 
// 	var factors = App.factors.getAll();
// 	var result = CalculateIntermediateVars(factors); 
// 	console.log("hh");
// 	return -1000; }

// islmbp.yAxis.max = function(){ 
// 	var factors = App.factors.getAll();
// 	var result = CalculateIntermediateVars(factors); 
// 	console.log("hh");
// 	return  1000; }


var is = new Line();
	is.id = "is";
	var paramsIS = {
		param1 : 1
	};
	is.defaultParams = paramsIS;
	is.params = paramsIS;
	is.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return (-1*x) / result.a1 - result.b1*result.currency/result.a1 + result.c1/result.a1;
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
	lm.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return result.c2/result.a2-x/result.a2;
	};
	lm.settings = {
		name: "LM",
		color: "green"
	};

	islmbp.linesFactory.add( lm );


	var bp = new Line();
	bp.id = "bp";
	var paramsBP = {
		multiplier : -10
	}
	bp.defaultParams = paramsBP;
	bp.params = paramsBP;
	bp.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return -1*x/result.a3-result.b3*result.currency/result.a3+result.c3/result.a3;
	};
	bp.settings = {
		name: "BP",
		color: "blue"
	};

	islmbp.linesFactory.add( bp );

// Only these lines will remain between module calls
islmbp.defaultLines = ["is", "lm", "bp"];

// Initialize graph
islmbp.linesFactory.convertAll();
App.graph.add( islmbp );