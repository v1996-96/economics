var foreignInvestments = new Graph();

foreignInvestments.id = "ForeignInvestments";

foreignInvestments.position.row = 1;
foreignInvestments.position.column = 0;

foreignInvestments.title.text = "Foreign Investments";
foreignInvestments.xAxis.title.text = "NFL";
foreignInvestments.yAxis.title.text = "r";

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


	/* Solution */
	var currency = ((c3-c1)*(a2-a1)/(a3-a1)-(c2-c1))/((b3-b1)*(a2-a1)/(a3-a1)+b1);
	var rate = (c2-c1+b1*currency)/(a2-a1);
	var income = c2-a2*rate;


var nfl = new Line();
	nfl.id = "nfl";
	var paramsNFL = {
		param1 : 1
	};
	nfl.defaultParams = paramsNFL;
	nfl.params = paramsNFL;
	nfl.equation = function(x, factors){
		var result = CalculateIntermediateVars(factors);

		return factors["rr"]-(factors["Ex"]-factors["Im0"]-factors["MPM"]*income-factors["k2"]*currency)/factors["m"];
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