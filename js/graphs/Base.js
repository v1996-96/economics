/**
 * Graph class
 * 04/2016
 */

function Graph() {

	/* Fields */
	/*-----------------------------------------------------------------*/

	/* To get ability to connect modules to graphs */
	this.id = null;

	/* Options for drawing graph panel */
	this.position = {};
	this.position.row = 0;    // 0 to inf
	this.position.column = 0; // 0 to 3

	/* Options for plugin */
	this.title = {};
	this.title.text = "";
	this.subTitle = {};
	this.subTitle.text = "";

	/* X axis */
	this.xAxis = {};
	this.xAxis.title = {};
	this.xAxis.title.text = "xAxis";
	this.xAxis.crosshair = true;

	/* Y axis */
	this.yAxis = {};
	this.yAxis.title = {};
	this.yAxis.title.text = "yAxis";

	/* Series (graph data) */
	this.series = [];


	/* Methods */
	/*-----------------------------------------------------------------*/
	this.addLine = function( lineData ){
		this.series.push(lineData);
	}

	this.calculate = {
		axisData : function( min, max, interval ){
			var data = [];
			for (var i = min; i <= max; i += interval) 
				data.push(i);
			return data;
		},

		dataset : function( equation, axisData ){
			var dataset = [];
			for (var value in axisData) {
				dataset.push( equation(value) );
			}
			return dataset;
		},

		seriesData : function( axisData, dataset ){
			var series = Highcharts.map(dataset, function (val, j) {
                return [axisData[j], val];
            });

            return series;
		},

		seriesFullData : function( equation, min, max, interval ){
			var axisData = this.axisData( min, max, interval );
			var dataset = this.dataset( equation, axisData );
			var series = Highcharts.map(dataset, function (val, j) {
                return [axisData[j], val];
            });

            return series;
		}
	};
}