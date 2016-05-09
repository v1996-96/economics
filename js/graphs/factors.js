/**
 * Graph lines global factors
 * 05/2016
 */

App.onBuild(function (params) {
	
	console.log( params );

	// Set default factors
	
	App.factors.setGlobal("G", 50);
	App.factors.setGlobal("Xn", 0);
	App.factors.setGlobal("T", 50);
	App.factors.setGlobal("I", 50);
	App.factors.setGlobal("MPC", 50);
	App.factors.setGlobal("Ir", 50);
	App.factors.setGlobal("Ia", 50);
	App.factors.setGlobal("Ca", 50);

});