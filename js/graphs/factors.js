/**
 * Graph lines global factors
 * 05/2016
 */

App.onBuild(function (params) {
	
	console.log( params );

	// Set default factors
	App.factors.setGlobal("G", 50);
	App.factors.setGlobal("Xn", 5);

});