/**
 * Graphs base classes
 * 04/2016
 */


/* Graph line class */
function Line() {
	var parent = this;

	this.id = null;

	// In case of custom factors used in equation, specify new factors object
	this.customFactors = null;


	// Line static parameters
	this.defaultParams = {};
	this.params = {};


	// Hide line or not
	this.visible = true;


	// Draw callback
	this.beforeConvert = function() {}


	// Line equation
	this.equation = function (x, factors) { 
		// this keyword gives access to params property (when it is calling)

		// There we return value for y axis
		return x; 
	};


	// Plot settings (series options)
	this.settings = {};


	/**
	 * Make copy of that object
	 * @param  {Line} lineObj Other object. Defaults to that object.
	 * @return {Line}         Cloned object
	 */
	this.copy = function(lineObj) {
		var lineObj = lineObj || parent;

		if (lineObj instanceof Line) {
			var newLine = new Line();

			return $.extend(true, newLine, lineObj);
		} else return null;
	}


	/**
	 * Makes copy of current line and a snapshot of factors state
	 * @return {Line} 
	 */
	this.snapshot = function() {
		var copy = this.copy();
		copy.customFactors = App.factors.getAll();
		return copy;
	}

	
	/**
	 * Rollback parameters to initial state (defaultParams)
	 */
	this.rollback = function() {
		this.params = $.extend(true, {}, this.defaultParams);
	}
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
	this.xAxis.labels = {};
	this.xAxis.labels.enabled = true;
	this.xAxis.labels.formatter = function() { return Math.round( this.value * 100 ) / 100 }
	this.xAxis.lineWidth = 1;
	this.xAxis.tickLength = 0;

	/* Y axis */
	this.yAxis = {};
	this.yAxis.title = {};
	this.yAxis.title.text = "yAxis";
	this.yAxis.title.align = "high";
	this.yAxis.title.rotation = 0;
	this.yAxis.title.style = { "fontWeight" : "bold", "fontSize" : 16 };
	this.yAxis.crosshair = true;
	this.yAxis.labels = {};
	this.yAxis.labels.enabled = true;
	this.yAxis.labels.formatter = function() { return Math.round( this.value * 100 ) / 100 }
	this.yAxis.lineWidth = 1;
	this.yAxis.tickLength = 0;

	/* Legend */
	this.legend = {};
	this.legend.enabled = true;
	this.legend.margin = -5;
	this.legend.padding = 0;

	/* Series (graph data) */
	this.series = [];
	this.seriesSettings = {};
	this.seriesSettings.min = 0;
	this.seriesSettings.max = 10;
	this.seriesSettings.interval = 0.1;   // Default interval. Is suppused to be changed
	this.defaultPointsCount = 50;	// Is used for calculation of interval

	/* Link to plugin site */
	this.credits = {};
	this.credits.enabled = false;

	/* Plot options */
	this.plotOptions = {};
	this.plotOptions.line = {};
	this.plotOptions.line.marker = {};
	this.plotOptions.line.marker.enabled = false;
	this.plotOptions.line.lineWidth = 3;

	/* Tooltip options */
	this.tooltip = {};
	this.tooltip.formatter = function() { return this.series.name; }

	/* Chart options */
	this.chart = {};
	this.chart.type = "line";

	/* Lines (abstract) */
	this.lines = [];
	this.defaultLines = []; // List of string values

	/* Reset axis view intervals */
	this.resetAxisIntervals = function () {}




	/* Methods */
	/*-----------------------------------------------------------------*/
	var parent = this;

	/* Series data calculator */
	this.calculate = {

		/**
		 * Calculates dataset for x axis
		 * @param  {int} min      
		 * @param  {int} max      
		 * @param  {float} interval 
		 * @return {array}          
		 */
		axisData : function( min, max, interval ){
			var min = min || parent.seriesSettings.min;
			var max = max || parent.seriesSettings.max;
			var interval = interval || parent.seriesSettings.interval;

			var data = [];
			for (var i = min; i <= max; i += interval) 
				data.push(i);
			return data;
		},



		/**
		 * Calculates dataset for y axis
		 * @param  {function} equation    
		 * @param  {array} axisData    
		 * @param  {object} equationObj As this value for equation function
		 * @return {array}             
		 */
		dataset : function( equation, axisData, equationObj, factors ){
			var equationObj = equationObj || window;
			var factors = factors || App.factors.getAll();
			var params = App.params.get();

			var dataset = [];
			for (var i = 0; i < axisData.length; i++) {
				dataset.push( equation.call(equationObj, axisData[i], factors, params) );
			}
			return dataset;
		},



		/**
		 * Calculates series data (x combined with y)
		 * @param  {array} axisData 
		 * @param  {array} dataset  
		 * @return {array}          
		 */
		seriesData : function( axisData, dataset ){
			var series = Highcharts.map(dataset, function (val, j) {
                return [axisData[j], val];
            });

            return series;
		},



		/**
		 * Calculates all required info for graph
		 * @param  {function} equation    
		 * @param  {int} min         
		 * @param  {int} max         
		 * @param  {float} interval    
		 * @param  {object} equationObj 
		 * @return {array}             
		 */
		seriesFullData : function( equation, min, max, interval, equationObj, factors ){
			var equationObj = equationObj || window;
			var factors = factors || App.factors.getAll();
			var equation = equation || function(x){ return x; };
			var min = min || parent.seriesSettings.min;
			var max = max || parent.seriesSettings.max;
			var interval = interval || parent.seriesSettings.interval;

			var axisData = this.axisData( min, max, interval );
			var dataset = this.dataset( equation, axisData, equationObj, factors );
			var series = Highcharts.map(dataset, function (val, j) {
                return [axisData[j], val];
            });

            return series;
		},



		/**
		 * Calculates series for Line instance
		 * @param  {Line} line 
		 * @return {array}      
		 */
		seriesForLine : function( line ){
			var min = parent.seriesSettings.min;
			var max = parent.seriesSettings.max;
			var interval = parent.seriesSettings.interval;
			var factors = line.customFactors != null ? line.customFactors : App.factors.getAll();

			return this.seriesFullData( line.equation, min, max, interval, line.params, factors );
		}
	};


	/* Series methods */
	this.seriesFactory = {

		/**
		 * Add new series
		 * @param {array} seriesData 
		 */
		add : function( seriesData ){
			parent.series.push(seriesData);
		},



		/**
		 * Delete all series data
		 */
		empty : function(){
			parent.series = [];
		}
	};


	/* Lines methods */
	this.linesFactory = {

		/**
		 * Add new line
		 * @param {Line} lineData 
		 */
		add : function( lineData ){
			if (lineData instanceof Line) 
				parent.lines.push(lineData);
		},



		/**
		 * Remove specified line
		 * @param  {string} lineId Line id
		 */
		remove : function( lineId ){
			for (var i = 0; i < parent.lines.length; i++) {
				if (parent.lines[i].id == lineId) {
					parent.lines.splice(i, 1);
					break;
				}
			}
		},



		/**
		 * Delete all lines
		 */
		empty : function(){
			parent.lines = [];
		},



		/**
		 * Get line by id 
		 * @param  {strinf} lineId 
		 * @return {Line}|{null}
		 */
		get : function( lineId ){
			for (var i = 0; i < parent.lines.length; i++) {
				if (parent.lines[i].id == lineId) {
					return parent.lines[i]
				}
			}

			return null;
		},



		/**
		 * Convert line abstracts to series data and add data to series list
		 * @param  {Line} line Line object
		 */
		convert : function( line ){
			if (typeof line.beforeConvert == "function") 
				line.beforeConvert.call( line );

			var seriesData = parent.calculate.seriesForLine( line );

			var series = {};
			$.extend(series, line.settings);
			series.data = seriesData;
			series.id = line.id;
			series.visible = line.visible;

			parent.seriesFactory.add( series );
		},



		/**
		 * Convert Line by id
		 * @param  {string} lineId 
		 */
		convertById : function( lineId ){
			var line = this.get(lineId);
			if (line == null) return;

			this.convert( line );
		},



		/**
		 * Convert all lines to series
		 */
		convertAll : function(){
			parent.seriesFactory.empty();
			if (typeof parent.resetAxisIntervals == "function") {
				parent.resetAxisIntervals.call( parent );
			}

			for (var i = 0; i < parent.lines.length; i++) {
				this.convert( parent.lines[i] );
			}
		},



		/**
		 * Remove all supporting lines
		 */
		clearSupporting : function() {
			if (parent.defaultLines.length == 0) return;

			var newLinesList = [];

			for (var i = 0; i < parent.lines.length; i++) {
				var found = false;

				for (var j = 0; j < parent.defaultLines.length; j++) {
					if (parent.lines[i].id == parent.defaultLines[j]){
						found = true; break;
					}
				}

				if (found) newLinesList.push( parent.lines[i] );
			}

			parent.lines = newLinesList;
		},



		/**
		 * Rollback all lines on graph
		 */
		rollbackAll : function() {
			for (var i = 0; i < parent.lines.length; i++) {
				parent.lines[i].rollback();
			}
		}
	};
}