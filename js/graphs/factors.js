/**
 * Graph lines global factors
 * 05/2016
 */

App.onBuild(function (params) {
	
	console.log( params );

	// Set default factors
	App.factors.setGlobal("G", 50);
	App.factors.setGlobal("T", 50);			
	App.factors.setGlobal("MPC", 50);
	App.factors.setGlobal("Ir", 50);
	App.factors.setGlobal("Ia", 50);
	App.factors.setGlobal("Ca", 50);
	App.factors.setGlobal("M/Pd", 50);
	App.factors.setGlobal("M/Ps", 50);
	App.factors.setGlobal("my", 50);
	App.factors.setGlobal("mr", 50);
	App.factors.setGlobal("r", 10);
	
	if(params.ecomonicsType == 'closed')
	{
				App.factors.setGlobal("Xn", 0);
				App.factors.setGlobal("MPM", 0);
				App.factors.setGlobal("k1", 0);
				App.factors.setGlobal("k2", 0);
				App.factors.setGlobal("rf", null);
				App.factors.setGlobal("KA", 0);
				

			
	}
	else //open Econ
	{
			App.factors.setGlobal("Xn", 50);
			App.factors.setGlobal("MPM", 2);
			App.factors.setGlobal("rf", 10);	
			App.factors.setGlobal("k1", 0.5);
			App.factors.setGlobal("k2", 0.5);
			App.factors.setGlobal("KAa", 30);
				if (params.capitalMobility == 'absolute') {
					App.factors.setGlobal('m', 100000000000);
				} 
				else 
					if(params.capitalMobility == 'high') 
					{
						App.factors.setGlobal('m', 10);
					}
						else 
							if( params.capitalMobility == 'low'
							{
								 App.factors.setGlobal('m', 0.8);
							}
							else // null
							{
								App.factors.setGlobal('m', 0.0);
							}
			

	}

});