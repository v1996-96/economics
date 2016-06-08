/**
 * Useful functions for modules
 */

function CapturePreviousLineState(graphsFactory, graphId, lineId, newLineId, settings) {
	var chart = graphsFactory.get( graphId );
	if (chart == null) {
		App.message.show("Error", "Ошибка работы модуля. График не найден.", "error");
		return;
	}
	var initialLine = chart.linesFactory.get( lineId );
	var newLine = initialLine.snapshot();
	newLine.id = newLineId;
	newLine.settings = $.extend({
		"color" : initialLine.settings.color,
		"lineWidth" : 1
	}, settings);
	chart.linesFactory.add( newLine );
}