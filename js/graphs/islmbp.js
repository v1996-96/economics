/**
 * IS-LM-BP graph
 * 04/2016
 */

// Create graph
var islmbp = new Graph();

islmbp.id = "islmbp";

islmbp.position.row = 0;
islmbp.position.column = 0;

var axisData = islmbp.calculate.axisData( 0, 10, 0.1 );


var dataset1 = islmbp.calculate.dataset( function(x){ return 40*x - 800; }, axisData );
var seriesData1 = islmbp.calculate.seriesData( axisData, dataset1 );
islmbp.addLine( {
	name: "my_line",
	type: "line",
	marker: {
		enabled: false
	},
	data: seriesData1
} );

var dataset2 = islmbp.calculate.dataset( function(x){ return -40*x + 250; }, axisData );
var seriesData2 = islmbp.calculate.seriesData( axisData, dataset2 );
islmbp.addLine( {
	name: "my_line",
	type: "line",
	marker: {
		enabled: false
	},
	data: seriesData2
} );


// Add graph to graph list
App.graph.add( islmbp );