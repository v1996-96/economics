/**
 * AD-AS graph
 * 05/2016
 */

var adas = new Graph();

adas.id = "adas";

adas.position.row = 0;
adas.position.column = 1;

adas.title.text = "AD-AS";
adas.xAxis.title.text = "Y";
adas.yAxis.title.text = "P";


var ad = new Line();
	ad.id = "ad";
	var paramsAD = {
		multiplier : 10
	};
	ad.defaultParams = paramsAD;
	ad.params = paramsAD;
	ad.equation = function(x, factors){

		return this.multiplier * x + factors["G"];
	};
	ad.settings = {
		name: "AD",
		type: "line"
	};

	adas.linesFactory.add( ad );

// Only these lines will remain between module calls
adas.defaultLines = ["ad", "as"];

// Initialize graph
adas.linesFactory.convertAll();
App.graph.add( adas );