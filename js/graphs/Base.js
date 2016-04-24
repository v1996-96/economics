/**
 * Graph class
 * 04/2016
 */

function Graph() {

	/* To get ability to connect modules to graphs */
	this.id = null;

	/* Options for drawing graph panel */
	this.position = {};
	this.position.row = 0;    // 0 to inf
	this.position.column = 0; // 0 to 3

	/* Options for plugin */
	this.title = "";
	this.subTitle = "";

	/* X axis */
	this.xAxis = {};
	this.xAxis.title = {};
	this.xAxis.title.text = "xAxis";

	/* Y axis */
	this.yAxis = {};
	this.yAxis.title = {};
	this.yAxis.title.text = "yAxis";

}