/**
 * Graph lines global factors
 * 05/2016
 */

App.onBuild(function (params) {
	
	console.log( params );

	// Set default factors
	if(params.ecomonicsType == 'closed')
	{
		if(params.prices == 'fixed') 
		{
				App.factors.setGlobal("Xn", 0);
				App.factors.setGlobal("MPM", 0);	
				App.factors.setGlobal("G", 50);
				App.factors.setGlobal("T", 50);
				App.factors.setGlobal("I", 50);
				App.factors.setGlobal("MPC", 50);
				App.factors.setGlobal("Ir", 50);
				App.factors.setGlobal("Ia", 50);
				App.factors.setGlobal("Ca", 50);
				App.factors.setGlobal("M/Pd", 50);
				App.factors.setGlobal("M/Ps", 50);
				App.factors.setGlobal("my", 50);
				App.factors.setGlobal("mr", 50);
		}
		else 
		{
				App.factors.setGlobal("Xn", 0);	
				App.factors.setGlobal("G", 50);
				App.factors.setGlobal("T", 50);
				App.factors.setGlobal("I", 50);
				App.factors.setGlobal("MPC", 50);
				App.factors.setGlobal("Ir", 50);
				App.factors.setGlobal("Ia", 50);
				App.factors.setGlobal("Ca", 50);
				App.factors.setGlobal("M/Pd", 50);
				App.factors.setGlobal("M/Ps", 50);
				App.factors.setGlobal("my", 50);
				App.factors.setGlobal("mr", 50);
		}
			
	}
	else 
	{
			App.factors.setGlobal("Xn", 50);
				App.factors.setGlobal("MPM", 2);	
				App.factors.setGlobal("G", 50);
				App.factors.setGlobal("T", 50);
				App.factors.setGlobal("I", 50);
				App.factors.setGlobal("MPC", 50);
				App.factors.setGlobal("Ir", 50);
				App.factors.setGlobal("Ia", 50);
				App.factors.setGlobal("Ca", 50);
				App.factors.setGlobal("M/Pd", 50);
				App.factors.setGlobal("M/Ps", 50);
				App.factors.setGlobal("my", 50);
				App.factors.setGlobal("mr", 50);

	}

});