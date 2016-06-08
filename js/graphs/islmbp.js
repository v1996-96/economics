/**
 * IS-LM-BP graph
 * 04/2016
 */

var islmbp = new Graph();

islmbp.id = "islmbp";

islmbp.position.row = 1;
islmbp.position.column = 1;

islmbp.title.text = "IS-LM-BP";
islmbp.xAxis.title.text = "Y";
islmbp.yAxis.title.text = "r";

islmbp.yAxis.min = 0;
islmbp.seriesSettings.min = 0;
islmbp.seriesSettings.max = 1000;

islmbp.seriesSettings.interval = 10;	

islmbp.resetAxisIntervals = function() {
	var factors = App.factors.getAll();
	var result = CalculateIntermediateVars(factors);
	var params = App.params.get();
	if (params.ecomonicsType == "closed") {
			this.seriesSettings.max = 2* result.ClosedIncome;
			this.yAxis.max = (result.ClosedIncome*factors["k3"]/factors["k4"])*1.1;
		} else {
			this.seriesSettings.max = 2* result.income;
	        this.yAxis.max = (result.income*factors["k3"]/factors["k4"])*1.1; 
		}
	

	this.seriesSettings.interval = 
		Math.abs(this.seriesSettings.max - this.seriesSettings.min) / this.defaultPointsCount;
}


var is = new Line();
	is.id = "is";
	is.equation = function(x, factors, params){
		var result = CalculateIntermediateVars(factors);

		if (params.ecomonicsType == "opened") {
			return (-1*x) / result.a1 - result.b1*result.currency/result.a1 + result.c1/result.a1;
		} else {
			return (result.ClosedA - x * result.ClosedMLR)/ result.ClosedIr;
		}
		
	};
	is.settings = {
		name: "IS",
		color: "red"
	};

	islmbp.linesFactory.add( is );


var lm = new Line();
	lm.id = "lm";
	lm.equation = function(x, factors, params){
		var result = CalculateIntermediateVars(factors);

		if (params.ecomonicsType == "opened") {
		    return result.c2/result.a2-x/result.a2;
        } else {
		    return (factors.k3 * x - result.MsP)/factors.k4;
        }

	};
	lm.settings = {
		name: "LM",
		color: "green"
	};

	islmbp.linesFactory.add( lm );


var bp = new Line();
	bp.id = "bp";
	bp.equation = function(x, factors, params){
		var result = CalculateIntermediateVars(factors);

		if (params.ecomonicsType == "opened") {
			return -1*x/result.a3-result.b3*result.currency/result.a3+result.c3/result.a3;
		} else {
			return x; // Hide it!
		}

	};
	bp.settings = {
		name: "BP",
		color: "blue"
	};

	bp.beforeConvert = function(){
		var params = App.params.get();
		if (params.ecomonicsType == "closed") {
			this.visible = false;
		} else {
			this.visible = true;
		}
	}

	islmbp.linesFactory.add( bp );

// Only these lines will remain between module calls
islmbp.defaultLines = ["is", "lm", "bp"];

// Initialize graph
App.graph.add( islmbp );