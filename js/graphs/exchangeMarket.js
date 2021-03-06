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

	this.seriesSettings.max = 2.5* Math.abs(currentNFL);
	this.seriesSettings.min= -2.5* Math.abs(currentNFL);
	this.yAxis.min = -1.5*Math.abs((factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
 		currentNFL)/factors["k2"]);
	this.yAxis.max = 1.5*Math.abs((factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
 		currentNFL)/factors["k2"]);

	this.seriesSettings.interval = 
		Math.abs(this.seriesSettings.max - this.seriesSettings.min) / this.defaultPointsCount;

	// this.seriesSettings.interval = 0.5;
}



var nfl = new Line();
	nfl.id = "nfl";
	nfl.equation = function(x, factors, params){
		if (params.ecomonicsType == "opened") {
		    var result = CalculateIntermediateVars(factors);		
		    var currentNFL = factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-
							factors["k2"]*result.currency;
		    return currentNFL+(x-currentNFL)*10000000;
	    } else {
		return null;
	    }
	};
	nfl.settings = {
		name: "Foreign Investments",
		color: "red"
	};

	exchangeMarket.linesFactory.add( nfl );


var nx = new Line();
	nx.id = "nx";
	nx.equation = function(x, factors, params){
		if (params.ecomonicsType == "opened") {
			var result = CalculateIntermediateVars(factors);
			return (factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-x)/factors["k2"];
		} else {
			return null;
		}
	};
	nx.settings = {
		name: "Net Export",
		color: "green"
	};

	nx.beforeConvert = function(){
		var params = App.params.get();
		if (params.ecomonicsType == "closed") {
			this.visible = false;
		} else {
			this.visible = true;
		}
	}

	nfl.beforeConvert = function(){
		var params = App.params.get();
		if (params.ecomonicsType == "closed") {
			this.visible = false;
		} else {
			this.visible = true;
		}
	}

	exchangeMarket.linesFactory.add( nx );


// Only these lines will remain between module calls
exchangeMarket.defaultLines = ["nfl", "nx"];

// Initialize graph
App.graph.add( exchangeMarket );