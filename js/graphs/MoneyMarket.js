var moneyMarket = new Graph();

moneyMarket.id = "moneyMarket";

moneyMarket.position.row = 1;
moneyMarket.position.column = 2;

moneyMarket.title.text = "Money Market";
moneyMarket.xAxis.title.text = "M/P";
moneyMarket.yAxis.title.text = "r";

var moneySupply = new Line();
	moneySupply.id = "Money Supply";
	var paramsMS = {
		multiplier : -10
	}
	moneySupply.defaultParams = paramsMS;
	moneySupply.params = paramsMS;
	moneySupply.equation = function(x, factors){
		return  factors["MP"]+(x-factors["MP"]*1000000000000);
	};
	moneySupply.settings = {
		name: "Money Supply",
		color: "green"
	};

	moneyMarket.linesFactory.add( moneySupply );


var moneyDemand = new Line();
	moneyDemand.id = "Money Demand";
	var paramsMD = {
		multiplier : -10
	}
	moneyDemand.defaultParams = paramsMD;
	moneyDemand.params = paramsMD;
	moneyDemand.equation = function(x, factors){
		return  x*factors["k1"]/factors["k2"]-factors["MP"]/factors["k2"];
	};
	moneyDemand.settings = {
		name: "Money Demand",
		color: "red"
	};

	moneyMarket.linesFactory.add( moneyDemand );
// Only these lines will remain between module calls
moneyMarket.defaultLines = ["money Demand","money Demand"];


// Initialize graph
moneyMarket.linesFactory.convertAll();
App.graph.add( moneyMarket );