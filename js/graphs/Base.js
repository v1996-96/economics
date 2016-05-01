/**
 * Graph class
 * 04/2016
 */


/* Graph line class */
function Line() {
	this.id = null;

	// Line static parameters
	this.params = {};

	// Line equation
	this.equation = function (x) { 
		// this keyword gives access to params property (when it is calling)

		// There we return value for y axis
		return x; 
	};

	// Plot settings
	this.settings = {
		type: "line",
		marker: {
			enabled: false
		}
	};
}


/* Graph base class */
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
	this.xAxis.title.align = "high";
	this.xAxis.title.style = { "fontWeight" : "bold", "fontSize" : 16 };
	this.xAxis.crosshair = true;

	/* Y axis */
	this.yAxis = {};
	this.yAxis.title = {};
	this.yAxis.title.text = "yAxis";
	this.yAxis.title.align = "high";
	this.yAxis.title.rotation = 0;
	this.yAxis.title.style = { "fontWeight" : "bold", "fontSize" : 16 };

	/* Legend */
	this.legend = {};
	this.legend.enabled = false;

	/* Series (graph data) */
	this.series = [];
	this.seriesSettings = {};
	this.seriesSettings.min = 0;
	this.seriesSettings.max = 10;
	this.seriesSettings.interval = 0.1;	

	/* Lines (abstract) */
	this.lines = [];


	/* Methods */
	/*-----------------------------------------------------------------*/
	var parent = this;

	this.calculate = {
		/* Calculates dataset for x axis */
		axisData : function( min, max, interval ){
			var min = min || parent.seriesSettings.min;
			var max = max || parent.seriesSettings.max;
			var interval = interval || parent.seriesSettings.interval;

			var data = [];
			for (var i = min; i <= max; i += interval) 
				data.push(i);
			return data;
		},

		/* Calculates dataset for y axis */
		dataset : function( equation, axisData, equationObj ){
			var equationObj = equationObj || window;

			var dataset = [];
			for (var i = 0; i < axisData.length; i++) {
				dataset.push( equation.call(equationObj, axisData[i]) );
			}
			return dataset;
		},

		/* Calculates series data (x combined with y) */
		seriesData : function( axisData, dataset ){
			var series = Highcharts.map(dataset, function (val, j) {
                return [axisData[j], val];
            });

            return series;
		},

		/* Calculates all required info for graph */
		seriesFullData : function( equation, min, max, interval, equationObj ){
			var equationObj = equationObj || window;
			var equation = equation || function(x){ return x; };
			var min = min || parent.seriesSettings.min;
			var max = max || parent.seriesSettings.max;
			var interval = interval || parent.seriesSettings.interval;

			var axisData = this.axisData( min, max, interval );
			var dataset = this.dataset( equation, axisData, equationObj );
			var series = Highcharts.map(dataset, function (val, j) {
                return [axisData[j], val];
            });

            return series;
		},

		/* Clculates series for Line instance */
		seriesForLine : function( line ){
			var min = parent.seriesSettings.min;
			var max = parent.seriesSettings.max;
			var interval = parent.seriesSettings.interval;

			return this.seriesFullData( line.equation, min, max, interval, line.params );
		}
	};


	this.seriesFactory = {
		add : function( seriesData ){
			parent.series.push(seriesData);
		},

		empty : function(){
			parent.series = [];
		}
	};


	this.linesFactory = {
		add : function( lineData ){
			if (lineData instanceof Line) 
				parent.lines.push(lineData);
		},

		remove : function( lineId ){
			for (var i = 0; i < parent.lines.length; i++) {
				if (parent.lines[i].id == lineId) {
					parent.lines.splice(i, 1);
					break;
				}
			}
		},

		empty : function(){
			parent.lines = [];
		},

		get : function( lineId ){
			for (var i = 0; i < parent.lines.length; i++) {
				if (parent.lines[i].id == lineId) {
					return parent.lines[i]
				}
			}

			return null;
		},

		convert : function( line ){
			var seriesData = parent.calculate.seriesForLine( line );

			var series = {};
			$.extend(series, line.settings);
			series.data = seriesData;

			parent.seriesFactory.add( series );
		},

		convertById : function( lineId ){
			var line = this.get(lineId);
			if (line == null) return;

			this.convert( line );
		},

		convertAll : function(){
			parent.seriesFactory.empty();

			for (var i = 0; i < parent.lines.length; i++) {
				this.convert( parent.lines[i] );
			}
		}
	};
}