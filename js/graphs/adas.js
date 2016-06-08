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
	this.seriesSettings.max = result.ClosedIncome * 2;
	// this.yAxis.max = 0.5; 

	this.yAxis.min=0;
	this.yAxis.max=factors.P * 2.5; // 1.1 - coef for top of yMax 
	this.seriesSettings.interval = 
		Math.abs(this.seriesSettings.max - this.seriesSettings.min) / this.defaultPointsCount;
}

var ad = new Line();
	ad.id = "ad";
	ad.equation = function(x, factors, params){
		var result = CalculateIntermediateVars(factors);
		if (params.ecomonicsType == "opened") {
		    if (x <= -1* factors.k3*result.alpha*result.a2) 
		    {
		    	return null
		    }
		    else
		    {
		    	return factors.M / ( factors.k3 * (x + result.a2*result.alpha ) ); 
		    }
	    } 
	    else {
	    	console.log( (result.ClosedA * factors.k4)/(factors.k3*factors.k1+result.MLR*factors.k4));
			if (x <=   (result.ClosedA * factors.k4)/(factors.k3*factors.k1+result.MLR*factors.k4) )
		    {
		    	return null
		    }
		    else
		    {
		    	return factors.M * result.ClosedIr / (factors.k3 * x * result.ClosedIr - result.ClosedA* factors.k4 + result.ClosedMLR * x * factors.k4); 
		    }
	    }
		// не очень работает, но хоть что-то

		// Совсем не очень, хотя по идее должен лучше   //-(factors.M/((x*(result.MLR - factors.k2) - (result.c1 * result.MLR) + factors.Ex - factors.Im0 + factors.Ka0 - factors.m*factors.rr) * factors.k4 + factors.k3*x));
		// Изначальный код Олега   //factors["MP"]*factors["k3"]*result.a1 / ( (result.c1 - result.b1*result.currency)*result.a2 - x*(result.a2-result.a1); в топку
	
	};
	ad.settings = {
		name: "AD",
		type: "line",
		color: "red"
	};

	adas.linesFactory.add( ad );

var LRAS = new Line();
	LRAS.id = "LRAS";
	LRAS.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);
		return  result.income+(x-result.income)*1000000;
	};
	LRAS.settings = {
		name: "LRAS",
		color: "green"
	};
	adas.linesFactory.add( LRAS );

var SRAS = new Line();
	SRAS.id = "SRAS";
	SRAS.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);

		if (params.ecomonicsType == "opened") 
		{
			console.log(1);
			return  factors.SRAS * x + (factors.M / ( factors.k3 * (result.income + result.a2*result.alpha ) )) - factors.SRAS * result.income;
		} 
		else
		{
			console.log(2);
			return factors.SRAS * x + (factors.M * result.ClosedIr / (factors.k3 * result.income * result.ClosedIr - result.ClosedA* factors.k4 + result.ClosedMLR * result.income * factors.k4))
			 - factors.SRAS * result.income;

		}
	};
	SRAS.settings = {
		name: "SRAS",
		color: "blue"
	};
	adas.linesFactory.add( SRAS );


// Only these lines will remain between module calls
adas.defaultLines = ["ad", "LRAS", "SRAS"];

// Initialize graph
App.graph.add( adas );