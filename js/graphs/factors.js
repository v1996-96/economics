/**
 * Graph lines global factors
 * 05/2016
 */

App.onBuild(function (params) {
	
	console.log( params );

	// Define default values
	var factors = {
		C0 : 500, // автономные расходы
		MPC : 0.4, // предельная склонность к потреблению
		T0 : 100, // автономный налог
		I0 : 100, // автономные инвестиции
		k1 : 20, // чувствительность инвестиций к процентной ставке
		G : 40, // государственные расходы
		Ex : 500, // экспорт
		Im0 : 100, // автономный импорт
		k2 : 40, // чувствительность импорта к доходу
		t : 0, // налоговая ставка
		MPM : 0.2, // предельная склонность к импорту
		k3 : 0.5, // чувствительность спроса на деньги к доходу
		k4 : 100, // чувствительность спроса на деньги к ставке процента
		MP : 250, // предложение денежной массы 
		rr : 10, // мировая ставка процента
		Ka0 : 300, // автономный счет капитала
		m : 20 // мобильность капитала





		//
	}

	//There you change default values like this
	if(params.ecomonicsType == 'closed'){
		factors.Ex = 0;
		factors.Im0 =0;
		factors.MPM=0;
		factors.k2 = 0;
		factors.m=0;
		factors.Ka0 = 0;
	}

	// Then you save all at once
	for (var key in factors) {
		App.factors.setGlobal( key , factors[key] );
	}

	// Also I recommend you to write checks like this
	if (params.ecomonicsType == 'closed' &&
		params.prices == 'fixed' &&
		params.period == 'long_run') {}
	// Then it will be easier to maintain code in future
	
	// Also I recommend not to write additional tabs in new logic blocks,
	// because it seems distracting when there are a lot of tabs before code starts.
	// Write only one additional tab for nesting logic blocks :)



	// // Set default factors
	// App.factors.setGlobal("G", 50);
	// App.factors.setGlobal("T", 50);			
	// App.factors.setGlobal("MPC", 50);
	// App.factors.setGlobal("Ir", 50);
	// App.factors.setGlobal("Ia", 50);
	// App.factors.setGlobal("Ca", 50);
	// App.factors.setGlobal("M/Pd", 50);
	// App.factors.setGlobal("M/Ps", 50);
	// App.factors.setGlobal("my", 50);
	// App.factors.setGlobal("mr", 50);
	// App.factors.setGlobal("r", 10);
	
	// if(params.ecomonicsType == 'closed')
	// {
	// 			App.factors.setGlobal("Xn", 0);
	// 			App.factors.setGlobal("MPM", 0);
	// 			App.factors.setGlobal("k1", 0);
	// 			App.factors.setGlobal("k2", 0);
	// 			App.factors.setGlobal("rf", null);
	// 			App.factors.setGlobal("KA", 0);
				

			
	// }
	// else //open Econ
	// {
	// 		App.factors.setGlobal("Xn", 50);
	// 		App.factors.setGlobal("MPM", 2);
	// 		App.factors.setGlobal("rf", 10);	
	// 		App.factors.setGlobal("k1", 0.5);
	// 		App.factors.setGlobal("k2", 0.5);
	// 		App.factors.setGlobal("KAa", 30);
	// 			if (params.capitalMobility == 'absolute') {
	// 				App.factors.setGlobal('m', 100000000000);
	// 			} 
	// 			else 
	// 				if(params.capitalMobility == 'high') 
	// 				{
	// 					App.factors.setGlobal('m', 10);
	// 				}
	// 					else 
	// 						if( params.capitalMobility == 'low')
	// 						{
	// 							 App.factors.setGlobal('m', 0.8);
	// 						}
	// 						else // null
	// 						{
	// 							App.factors.setGlobal('m', 0.0);
	// 						}
			

	// }

});