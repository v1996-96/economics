/**
 * This file contains some good practices and a solution for some common problems
 */


/*------------------------ Graphs --------------------------*/

/** Vertical line **/
	/* graph_file.js: */
	var graph = new Graph();
	/* ... */

	/* Then you set parameters for series (x axis) */
	graph.seriesSettings.min = 0;
	graph.seriesSettings.max = 10;
	graph.seriesSettings.interval = 0.1;	

	/* Then you shall set limits for Y axis */
	graph.yAxis.min = 0;
	graph.yAxis.max = 10;

	/* Now if you will define equation in such a way, the line will become vertical */
	var lineObject = new Line();
	/* ... */
	lineObject.equation = function(x, factors){   return 100000*(x-5);   };
	/* ... */

	/*
	+: it will be easier to change the slop of the line
	-: modules can change some factors in such way, when some lines will stay out of the graph
	 */
	


/** How to hide line */
	var lineObject = new Line();
	/* ... */
	lineObject.beforeConvert = function(){
		var params = App.params.get();
		if (params.ecomonicsType == "closed") {
			this.visible = false;
		} else {
			this.visible = true;
		}
	}
	/* ... */