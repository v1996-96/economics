var moneyMarket = new Graph();

moneyMarket.id = "moneyMarket";

moneyMarket.position.row = 1;
moneyMarket.position.column = 2;

moneyMarket.title.text = "Money Market";
moneyMarket.xAxis.title.text = "M/P";
moneyMarket.yAxis.title.text = "r";

moneyMarket.resetAxisIntervals = function() {
	var factors = App.factors.getAll();
	var result = CalculateIntermediateVars(factors);
	this.seriesSettings.max = 2* (factors.M / factors.P);
	this.seriesSettings.min=0;
	this.yAxis.min=0;
	this.yAxis.max=(result.income*factors["k3"]/factors["k4"])*1.1; // 1.1 - coef for top of yMax 

	this.seriesSettings.interval = 
		Math.abs(this.seriesSettings.max - this.seriesSettings.min) / this.defaultPointsCount;
}


var moneySupply = new Line();
	moneySupply.id = "moneySupply";
	moneySupply.equation = function(x, factors){
		return  factors["M"]/factors["P"]+(x-factors["M"]/factors["P"])*1000000;
	};
	moneySupply.settings = {
		name: "Money Supply",
		color: "green"
	};

	moneyMarket.linesFactory.add( moneySupply );


var moneyDemand = new Line();
	moneyDemand.id = "moneyDemand";
	moneyDemand.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return  result.ClosedIncome*factors["k3"]/factors["k4"]-x/factors["k4"];
	};
	moneyDemand.settings = {
		name: "Money Demand",
		color: "red"
	};

	moneyMarket.linesFactory.add( moneyDemand );

// Only these lines will remain between module calls
moneyMarket.defaultLines = ["moneySupply","moneyDemand"];

// Initialize graph
App.graph.add( moneyMarket );