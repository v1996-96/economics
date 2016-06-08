/**
*	Line Intermediate variables
*/

var globalCurrency = null;

function CalculateIntermediateVars(factors) {

	var params = App.params.get();

	var obj = {};

	obj.MLR = 1 - (1-factors["t"]) *factors["MPC"] + factors["MPM"]; // usual MLR

	/*IS:   Y+a1*r+b1*e=c1	*/
	obj.a1 = factors["k1"] / obj.MLR;
	obj.b1 = factors["k2"] / obj.MLR;
	obj.c1 = (factors["C0"]-factors["MPC"]*factors["T0"]+factors["I0"]+factors["G"]+factors["Ex"]-factors["Im0"]) / obj.MLR; 

	/*LM:   Y+a2*r=c2	*/
	obj.a2 = -1 * factors["k4"] / factors["k3"];
	obj.c2 = ( factors["M"] / factors["P"])  / (factors["k3"]);

	/*BP:   Y+a3*r+b3*e=c3	*/
	obj.a3 = -1 * factors["m"] / factors["MPM"];
	obj.b3 = factors["k2"] / factors["MPM"];
	obj.c3 = (factors["Ex"]-factors["Im0"]+factors["Ka0"]-factors["rr"]*factors["m"]) / factors["MPM"]; 


	/* Solution */
	obj.currency = ( (obj.c3-obj.c1) * (obj.a2-obj.a1) / (obj.a3-obj.a1) - (obj.c2-obj.c1) ) / ( (obj.b3-obj.b1) * (obj.a2-obj.a1) / (obj.a3-obj.a1) + obj.b1 );
	obj.rate = ( obj.c2 - obj.c1 + obj.b1 * obj.currency ) / ( obj.a2 - obj.a1 );
	obj.income = obj.c2 - obj.a2 * obj.rate;

	if (params !== null) {
		if (params.exchangeRate == "fixed") {
			if (globalCurrency == null) {
				console.log("action:  set new currency");
				globalCurrency = obj.currency;
			} else {
				console.log("action: return saved currency");
				obj.currency = globalCurrency;
			}
		} else {
			console.log("action: reset currency");
			globalCurrency = null;
		}
	}




	/* Closed economics */
	/* IS for Closed  Y = (A -Ir*r)/MLR or r = (A - Y * MLR)/ Ir */
	obj.ClosedMLR = 1 - (1-factors["t"]) *factors["MPC"]; // MLR for Closed economies
	obj.ClosedA =  factors["C0"]-factors["MPC"]*factors["T0"]+factors["I0"]+factors["G"]; // Autonomous expenditures for Closed Economies
	obj.ClosedIr = factors.k1; //???

	/* LM for Closed   Y = (MsP + k4 * r)/ k3  or r = (k3 * Y - MsP)/k4   */
	obj.MsP = factors.M/factors.P; //  (Ms/P)


	/* Closed solution */
	obj.ClosedRate = (obj.ClosedA * factors.k3 - obj.ClosedMLR * obj.MsP)/(factors.k4*obj.ClosedMLR + obj.ClosedIr*factors.k3);
	obj.ClosedIncome = (obj.ClosedA - obj.ClosedIr* obj.ClosedRate)/obj.ClosedMLR;
	
	obj.alpha = ( (obj.b3-obj.b1)*(obj.a2-obj.a1)*(obj.c2-obj.c1) + obj.b1*(obj.c3-obj.c1)*(obj.a2-obj.a1) ) / 
	( (obj.a2-obj.a1) * ( (obj.b3-obj.b1)*(obj.a2-obj.a1) + obj.b1*(obj.a3-obj.a1) ) );


	return obj;
}