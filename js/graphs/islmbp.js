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

/*some additional calculations*/

	var MLR = 1 - (1-factors["t"]) *factors["MPC"] + factors["MPM"]; // usual MLR

	/*IS:   Y+a1*r+b1*e=c1	*/
	var a1 = factors["k1"]/MLR;
	var b1 = factors["k2"]/MLR;
	var c1 = (factors["C0"]-factors["MPC"]*factors["T0"]+factors["I0"]+factors["G"]+factors["Ex"]-factors["Im0"])/MLR; 

	/*LM:   Y+a2*r=c2	*/
	var a2 = -factors["k4"]/factors["k3"];
	var c2 = factors["MP"]/factors["k3"];

	/*BP:   Y+a3*r+b3*e=c3	*/
	var a3 = - factors["m"]/factors["MPM"];
	var b3 = factors["k2"]/factors["MPM"];
	var c3 = (factors["Ex"]-factors["Im0"]+factors["Ka0"]-factors["rr"]*factors["m"])/factors["MPM"]; 

	var currency = ((c3-c1)*(a2-a1)/(a3-a1)-(c2-c1))/((b3-b1)*(a2-a1)/(a3-a1)+b1);

var is = new Line();
	is.id = "is";
	var paramsIS = {
		param1 : 1
	};
	is.defaultParams = paramsIS;
	is.params = paramsIS;
	is.equation = function(x, factors){
		return -x/a1-b1*currency/a1+c1/a1;
	};
	is.settings = {
		name: "IS",
		color: "red"
	};

	islmbp.linesFactory.add( is );


var lm = new Line();
	lm.id = "lm";
	var paramsLM = {
		multiplier : -10
	}
	lm.defaultParams = paramsLM;
	lm.params = paramsLM;
	lm.equation = function(x, factors){
		return c2/a2-x/a2;
	};
	lm.settings = {
		name: "LM",
		color: "green"
	};

	islmbp.linesFactory.add( lm );


	var bp = new Line();
	bp.id = "bp";
	var paramsBP = {
		multiplier : -10
	}
	bp.defaultParams = paramsBP;
	bp.params = paramsBP;
	bp.equation = function(x, factors){
		return -x/a3-b3*currency/a3+c3/a3;
	};
	bp.settings = {
		name: "BP",
		color: "blue"
	};

	islmbp.linesFactory.add( bp );

// Only these lines will remain between module calls
islmbp.defaultLines = ["is", "lm", "bp"];

// Initialize graph
islmbp.linesFactory.convertAll();
App.graph.add( islmbp );