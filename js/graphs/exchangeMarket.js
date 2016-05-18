var exchangeMarket = new Graph();

exchangeMarket.id = "ExchangeMarket";

exchangeMarket.position.row = 2;
exchangeMarket.position.column = 0;

exchangeMarket.title.text = "Exchange Market";
exchangeMarket.xAxis.title.text = "Nx, NFL";
exchangeMarket.yAxis.title.text = "e";

exchangeMarket.resetAxisIntervals = function() {
	var factors = App.factors.getAll();
	var result = CalculateIntermediateVars(factors);
	var currentNFL = factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
							factors["k2"]*result.currency;

    console.log(currentNFL);

	this.seriesSettings.max = 2.5* Math.abs(currentNFL);
	this.seriesSettings.min= -2.5* Math.abs(currentNFL);
	this.yAxis.min = -1.5*Math.abs((factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
 		currentNFL)/factors["k2"]);
	this.yAxis.max = 1.5*Math.abs((factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
 		currentNFL)/factors["k2"]);
}



var nfl = new Line();
	nfl.id = "nfl";
	var paramsNFL = {
		param1 : 1
	};
	nfl.defaultParams = paramsNFL;
	nfl.params = paramsNFL;
	nfl.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		var currentNFL = factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
							factors["k2"]*result.currency;
		return currentNFL+(x-currentNFL)*10000000;
	};
	nfl.settings = {
		name: "Foreign Investments",
		color: "red"
	};

	exchangeMarket.linesFactory.add( nfl );


var nx = new Line();
	nx.id = "nx";
	var paramsNX = {
		param1 : 1
	};
	nx.defaultParams = paramsNX;
	nx.params = paramsNX;
	nx.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return (factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-x)/factors["k2"];
	};
	nx.settings = {
		name: "Net Export",
		color: "green"
	};

	exchangeMarket.linesFactory.add( nx );


// Only these lines will remain between module calls
exchangeMarket.defaultLines = ["nfl", "nx"];

// Initialize graph
exchangeMarket.linesFactory.convertAll();
App.graph.add( exchangeMarket );