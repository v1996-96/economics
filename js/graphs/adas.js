/**
 * AD-AS graph
 * 05/2016
 */

var adas = new Graph();

adas.id = "adas";

adas.position.row = 0;
adas.position.column = 1;

adas.title.text = "AD-AS";
adas.xAxis.title.text = "Y";
adas.yAxis.title.text = "P";


adas.resetAxisIntervals = function() {
	var factors = App.factors.getAll();
	var result = CalculateIntermediateVars(factors);
	this.seriesSettings.max = result.income * 2;
	this.yAxis.max = 0.5; 

	this.seriesSettings.interval = 
		Math.abs(this.seriesSettings.max - this.seriesSettings.min) / this.defaultPointsCount;
}

var ad = new Line();
	ad.id = "ad";
	ad.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return factors.M/((factors.k3*x - factors.k4 * ((x*result.MLR - result.c1*result.MLR + (-factors.k2* x + factors.Ex - factors.Im0+factors.Ka0 + factors.m*(result.rate - factors.rr)))/factors.k1))); 
		// не очень работает, но хоть что-то

		// Совсем не очень, хотя по идее должен лучше   //-(factors.M/((x*(result.MLR - factors.k2) - (result.c1 * result.MLR) + factors.Ex - factors.Im0 + factors.Ka0 - factors.m*factors.rr) * factors.k4 + factors.k3*x));
		// Изначальный код Олега   //factors["MP"]*factors["k3"]*result.a1 / ( (result.c1 - result.b1*result.currency)*result.a2 - x*(result.a2-result.a1);
	
	};
	ad.settings = {
		name: "AD",
		type: "line"
	};

	adas.linesFactory.add( ad );

// Only these lines will remain between module calls
adas.defaultLines = ["ad", "as"];

// Initialize graph
App.graph.add( adas );