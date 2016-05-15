var foreignInvestments = new Graph();

foreignInvestments.id = "ForeignInvestments";

foreignInvestments.position.row = 1;
foreignInvestments.position.column = 0;

foreignInvestments.title.text = "Foreign Investments";
foreignInvestments.xAxis.title.text = "NFL";
foreignInvestments.yAxis.title.text = "r";




var nfl = new Line();
	nfl.id = "nfl";
	var paramsNFL = {
		param1 : 1
	};
	nfl.defaultParams = paramsNFL;
	nfl.params = paramsNFL;
	nfl.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return factors["rr"]-(factors["Ex"]-factors["Im0"]-factors["MPM"]*result.income-factors["k2"]* result.currency)/factors["m"];
	};
	name.settings = {
		name: "Foreign Investments",
		color: "red"
	};

	foreignInvestments.linesFactory.add( nfl );

// Only these lines will remain between module calls
foreignInvestments.defaultLines = ["nfl"];

// Initialize graph
foreignInvestments.linesFactory.convertAll();
App.graph.add( foreignInvestments );