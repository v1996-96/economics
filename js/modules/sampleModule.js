/**
 * Sample
 * 05/2016
 */

var sample = new Module();

sample.id = "sample";

sample.title = "Sample";
sample.description = "Sample description";

sample.action = function () {
	console.log("Sample1 was executed");
}

App.module.add( sample );



var sample2 = new Module();

sample2.id = "sample2";

sample2.title = "Sample sample sample";
sample2.description = "Sample description";

sample2.action = function () {
	console.log("Sample2 was executed");
}

App.module.add( sample2 );