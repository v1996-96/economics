/**
*	Line Intermediate variables
*/

function CalculateIntermediateVars(factors) {

	var obj = {};

	obj.MLR = 1 - (1-factors["t"]) *factors["MPC"] + factors["MPM"]; // usual MLR

	/*IS:   Y+a1*r+b1*e=c1	*/
	obj.a1 = factors["k1"] / obj.MLR;
	obj.b1 = factors["k2"] / obj.MLR;
	obj.c1 = (factors["C0"]-factors["MPC"]*factors["T0"]+factors["I0"]+factors["G"]+factors["Ex"]-factors["Im0"]) / obj.MLR; 

	/*LM:   Y+a2*r=c2	*/
	obj.a2 = -1 * factors["k4"] / factors["k3"];
	obj.c2 = factors["MP"] / factors["k3"];

	/*BP:   Y+a3*r+b3*e=c3	*/
	obj.a3 = -1 * factors["m"] / factors["MPM"];
	obj.b3 = factors["k2"] / factors["MPM"];
	obj.c3 = (factors["Ex"]-factors["Im0"]+factors["Ka0"]-factors["rr"]*factors["m"]) / factors["MPM"]; 


	/* Solution */
	obj.currency = ( (obj.c3-obj.c1) * (obj.a2-obj.a1) / (obj.a3-obj.a1) - (obj.c2-obj.c1) ) / ( (obj.b3-obj.b1) * (obj.a2-obj.a1) / (obj.a3-obj.a1) + obj.b1 );
	obj.rate = ( obj.c2 - obj.c1 + obj.b1 * obj.currency ) / ( obj.a2 - obj.a1 );
	obj.income = obj.c2 - obj.a2 * obj.rate;

	return obj;
}