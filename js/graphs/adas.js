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
adas.yAxis.title.text = "r";


var ad = new Line();
	ad.id = "ad";
	ad.params = {
		multiplier : 10
	};
	ad.equation = function(x){
		return this.multiplier * x;
	};
	ad.settings = {
		name: "AD",
		type: "line",
		marker: {
			enabled: false
		}
	};

	adas.linesFactory.add( ad );



// Initialize graph
adas.linesFactory.convertAll();
App.graph.add( adas );