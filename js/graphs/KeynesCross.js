var keynesCross = new Graph();

keynesCross.id = "keynesCross";

keynesCross.position.row = 2;
keynesCross.position.column = 1;

keynesCross.title.text = "Keynes Cross";
keynesCross.xAxis.title.text = "Y";
keynesCross.yAxis.title.text = "E";

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
	var rate = (c2-c1+b1*currency)/(a2-a1);

var plannedExpenditure = new Line();
	plannedExpenditure.id = "Planned Expenditure";
	var paramsPE = {
		param1 : 1
	};
	plannedExpenditure.defaultParams = paramsPE;	
	plannedExpenditure.params = paramsPE;
	plannedExpenditure.equation = function(x, factors){
		return x;
	};
	plannedExpenditure.settings = {
		name: "Planned Expenditure",
		color: "red"
	};

	keynesCross.linesFactory.add( plannedExpenditure );


var factExpenditure = new Line();
	factExpenditure.id = "Fact Expenditure";
	var paramsFE = {
		multiplier : -10
	}
	factExpenditure.defaultParams = paramsFE;
	factExpenditure.params = paramsFE;
	factExpenditure.equation = function(x, factors){
		return (factors["C0"]+factors["MPC"]*(x*(1-factors["t"])-factors["T0"]))+(factors["I0"]-factors["k1"]*rate)+factors["G"]+(factors["Ex"]-factors["Im0"]-factors["MPM"]*x-factors["k2"]*currency);
	};
	factExpenditure.settings = {
		name: "Fact Expenditure",
		color: "green"
	};

	keynesCross.linesFactory.add( factExpenditure );


// Only these lines will remain between module calls
keynesCross.defaultLines = ["factExpenditure", "plannedExpenditure"];

// Initialize graph
keynesCross.linesFactory.convertAll();
App.graph.add( keynesCross );