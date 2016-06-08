var keynesCross = new Graph();

keynesCross.id = "keynesCross";

keynesCross.position.row = 2;
keynesCross.position.column = 1;

keynesCross.title.text = "Keynes Cross";
keynesCross.xAxis.title.text = "Y";
keynesCross.yAxis.title.text = "E";

keynesCross.resetAxisIntervals = function() {
	var factors = App.factors.getAll();
	var result = CalculateIntermediateVars(factors);
	var params = App.params.get();
	if (params.ecomonicsType == "opened") {
	   this.seriesSettings.max = 2* result.income;
	   this.yAxis.max = 2 * result.income;
    } else {
	   this.seriesSettings.max = 2* result.ClosedIncome;
	   this.yAxis.max = 2 * result.ClosedIncome;
    }

	this.seriesSettings.interval = 
		Math.abs(this.seriesSettings.max - this.seriesSettings.min) / this.defaultPointsCount;
}

var plannedExpenditure = new Line();
	plannedExpenditure.id = "plannedExpenditure";
	plannedExpenditure.equation = function(x, factors){
		return x;
	};
	plannedExpenditure.settings = {
		name: "Planned Expenditure",
		color: "red"
	};

	keynesCross.linesFactory.add( plannedExpenditure );


var factExpenditure = new Line();
	factExpenditure.id = "factExpenditure";
	factExpenditure.equation = function(x, factors, params){
		var result = CalculateIntermediateVars(factors);
		if (params.ecomonicsType == "opened") {
		   return (factors["C0"]+factors["MPC"]*(x*(1-factors["t"])-factors["T0"]))
		   +(factors["I0"]-factors["k1"]*result.rate)+factors["G"]+
		   (factors["Ex"]-factors["Im0"]-factors["MPM"]*x-factors["k2"]*result.currency);
	    } else {
	    	return (factors["C0"]+factors["MPC"]*(x*(1-factors["t"])-factors["T0"]))
		   +(factors["I0"]-factors["k1"]*result.ClosedRate)+factors["G"];
	    }
	};
	factExpenditure.settings = {
		name: "Fact Expenditure",
		color: "green"
	};

	keynesCross.linesFactory.add( factExpenditure );


// Only these lines will remain between module calls
keynesCross.defaultLines = ["factExpenditure", "plannedExpenditure"];

// Initialize graph
App.graph.add( keynesCross );