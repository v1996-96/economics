/**
 * Application core
 * 04/2016
 */

var App = (function ($) {

	var parent = this;

	/* Useful JS stuff */
	/*-----------------------------------------------------------------*/
	this.useful = {
		/* Get object keys */
		getKeys : function(obj){
			var r = []
		    for (var k in obj) {
		        if (!obj.hasOwnProperty(k)) 
		            continue
		        r.push(k)
		    }
		    return r
		},

		/* Check is needle in haystack or not */
		inArray : function(needle, haystack, strict){
			var found = false, key, strict = !!strict;

			for (key in haystack) {
				if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
					found = true;
					break;
				}
			}

			return found;
		},

		/* Check element existance */
		exists : function(selector){
			return !!$(selector).length;
		}
	};


	/* Plugins interface */
	/*-----------------------------------------------------------------*/
	this.message = {
		show : function (title, text, type) {
			var title = title || "Message";
			var text = text || "Message text";
			var type = type || "info"; // "warning", "error", "success" and "info". 

			swal({
				title: title,   
				text: text,   
				type: type,   
				confirmButtonText: "Закрыть" 
			});
		}
	};


	/* Application parameters */
	/*-----------------------------------------------------------------*/
	this.params = {
		ecomonicsType : null, 	// opened | closed
		exchangeRate : null,  	// fixed | fluid
		economicsSize : null, 	// small | big
		capitalMobility : null, // absolute | high | low | null
		prices : null, 			// fixed | fluid
		period : null  			// long_run | short_run
	};

	this.paramsFactory = {
		checkAbilityToBuild : function( params ){
			// Check object structure
			if (typeof params.ecomonicsType == 'undefined' &&
				typeof params.exchangeRate == 'undefined' &&
				typeof params.economicsSize == 'undefined' &&
				typeof params.capitalMobility == 'undefined' &&
				typeof params.prices == 'undefined' &&
				typeof params.period == 'undefined') 
				throw { message: "Непредвиденная ошибка" };

			// Check fields value
			if (params.ecomonicsType == null ||
				params.prices == null ||
				params.period == null) 
				throw { message: "Не все параметры определены. Не могу построить ((" };

			if (params.ecomonicsType == "opened") {
				if (params.exchangeRate == null ||
					params.economicsSize == null ||
					params.capitalMobility == null) 
					throw { message: "Не все параметры определены. Не могу построить ((" };

				if (!parent.useful.inArray(params.exchangeRate, ["fixed", "fluid"])) 
					throw { message: "Непредвиденная ошибка" };	

				if (!parent.useful.inArray(params.economicsSize, ["small", "big"])) 
					throw { message: "Непредвиденная ошибка" };	

				if (!parent.useful.inArray(params.capitalMobility, ["absolute", "high", "low", "null"])) 
					throw { message: "Непредвиденная ошибка" };	
			} else 
				if (params.ecomonicsType !== "closed") 
					throw { message: "Непредвиденная ошибка" };

			if (!parent.useful.inArray(params.prices, ["fixed", "fluid"])) 
				throw { message: "Непредвиденная ошибка" };

			if (!parent.useful.inArray(params.period, ["long_run", "short_run"])) 
				throw { message: "Непредвиденная ошибка" };

			return true;
		}
	},

	this.graphs = [];

	this.graphsFactory = {
		render : function () {
			// Get count of columns and rows to render
			var countRows = 0, countCols = 0;
			for (var i = 0; i < parent.graphs.length; i++) {
				if (countRows < parent.graphs[i].position.row+1) 
					countRows = parent.graphs[i].position.row+1;

				if (countCols < parent.graphs[i].position.column+1 && 
					parent.graphs[i].position.column+1 <= 4) 
					countCols = parent.graphs[i].position.column+1;
			}

			if(countRows < 0 || countCols < 0 || countCols > 4)
				parent.message.show("Ошибка", "При построении произошла ошибка", "error");
			
			// Render graph area grid			
			parent.interface.dom.renderGraphGrid( countRows, countCols );
			
			// Render graphs
			for (var i = 0; i < parent.graphs.length; i++) {
				parent.interface.dom.renderGraph( 
					parent.graphs[i].position.row,
					parent.graphs[i].position.column,
					parent.graphs[i].id
					);
			}

			// Run plugin for each graph
			for (var i = 0; i < parent.graphs.length; i++) {
				this.runPlugin( parent.graphs[i] );
			}
		},

		runPlugin : function (graph) {
			var selector = "#" + graph.id;

			if (!parent.useful.exists( selector )) 
				return false;

			$( selector ).highcharts({
		        title: {
		            text: 'Monthly Average Temperature',
		            x: -20 //center
		        },
		        subtitle: {
		            text: 'Source: WorldClimate.com',
		            x: -20
		        },
		        xAxis: {
		            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		        },
		        yAxis: {
		            title: {
		                text: 'Temperature (°C)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: '°C'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Tokyo',
		            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		        }, {
		            name: 'New York',
		            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
		        }, {
		            name: 'Berlin',
		            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
		        }, {
		            name: 'London',
		            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
		        }]
		    });
		}
	};

	
	/* Application functions */
	/*-----------------------------------------------------------------*/
	this.interface = {
		/* Prepare window for first use */
		prepare : function(){
			this.actions.interface = this;
			this.actions.showSection( $("#paramsSection") );
			this.actions.enableSorting();

			this.handlers.interface = this;
			this.handlers.modalHandler();
			this.handlers.parametersHandler();
			this.handlers.collapseParametersHandler();
			this.handlers.buildHandler();
		},


		/* Manipulation with DOM */
		dom : {
			graphHeight : 300,

			renderGraphGrid : function (rows, columns) {
				$("#graphsArea").html("");

				if (rows < columns) return false;
				var columnIndex = Math.floor( 12 / columns );

				// Create rows
				for (var i = 0; i < rows; i++) 
					$("<div></div>").addClass("row").appendTo("#graphsArea");
				
				// Create columns
				$("#graphsArea .row").each(function(n ,el){
					for (var i = 0; i < columns; i++) 
						$("<div></div>")
							.css("position", "relative")
							.addClass("col-lg-"+columnIndex+" col-md-"+columnIndex+" col-xs-12 column")
							.appendTo(el);
				});
			},

			renderGraph : function (row, column, id) {
				var that = this;
				var parent = $("#graphsArea .row").eq(row).find(".column").eq(column);

				$("<div></div>")
					.attr("id", id)
					.css({ width : parent.width(), height : that.graphHeight })
					.appendTo( parent );
			}
		},


		/* List of actions */
		actions : {
			interface : null,

			/* Show sections */
			showSection : function(section){
				if ($(section).hasClass("hidden")) {
					$(section).removeClass("hidden");
					TweenLite.fromTo(
						section, 1, 
						{ opacity: 0, y: 60 },
						{ opacity: 1, y: 0, ease: Power4.easeInOut }
					);
				}				
			},

			/* Enable sorting in history list */
			enableSorting : function(){
				$("#historyPanels").sortable({
	                handle: ".panel-sort-toggle"
	            });
	            $("#historyPanels").disableSelection();
			},

			/* Toggle parameter */
			toggleParam : function(current){
				var currentKey = $(current).attr("data-params") || "";
				var connected = $("[data-params='"+currentKey+"']");
				connected.each(function(n ,el){
					if (el !== current) {
						$(el).removeClass("btn-warning selected").addClass("btn-default");
						var details = $(el).attr("data-details") || null;
						if (details !== null) $(details).collapse("hide");
					}
				});
				$(current).removeClass("btn-default").addClass("btn-warning selected");

				var details = $(current).attr("data-details") || null;
				if (details !== null) $(details).collapse("show");
			},

			/* Scroll to element */
			scrollTo : function(element, topOffset){
				var offset = $(element).offset().top - topOffset;
				$('html, body').animate({
                    scrollTop: offset
                }, 160);
			}
		},


		/* Event handlers */
		handlers : {
			interface : null,

			/* Opens modal window when big red button is clicked */
			modalHandler : function(){
				$(".add-change").on("click", function(e){
	                e.preventDefault();
	                $("#addChangeModal").modal();

	                // There we shuld load modules
	            });
			},

			/* Handle click on parameters buttons */
			parametersHandler : function(){
				$("[data-params]").on("click", function(e){
					e.preventDefault();

					var keys = parent.useful.getKeys( parent.params );
					var currentKey = $(this).attr("data-params") || "";
					var value = $(this).attr("data-value") || null;

					if (!parent.useful.inArray(currentKey, keys)) {
						parent.message.show("Произошла ошибка", "Неопознанный параметр", "error");
						return;
					}

					if (parent.params[ currentKey ] !== value) {
						parent.params[ currentKey ] = value;
						interface.actions.toggleParam(this);
					}
				});
			},

			/* Change icon when collapse parameters section */
			collapseParametersHandler : function(){
				$('#paramsList').on("show.bs.collapse", function(){
					$('[data-toggle="collapse"][href="#paramsList"] i').html("keyboard_arrow_up");
				});
				$('#paramsList').on("hide.bs.collapse", function(){
					$('[data-toggle="collapse"][href="#paramsList"] i').html("keyboard_arrow_down");
				});
			},

			/* Handle click on build button */
			buildHandler : function(){
				$("#buildGraphsBtn").on("click", function(e){
					e.preventDefault();

					try{
						parent.paramsFactory.checkAbilityToBuild( parent.params );

						$("#paramsList").collapse("hide");

						var delay = 0;
						if ($("#graphsSection").hasClass("hidden")) {
							delay = 0.3;
							TweenLite.delayedCall(0.28, function(){
								interface.actions.showSection( $("#graphsSection") );
							});
						}

						TweenLite.delayedCall((1 + delay), function(){
							interface.actions.scrollTo( $("#graphsSection"), 15 );
							parent.graphsFactory.render();
						});

					} catch(e){
						parent.message.show("Ошибка", e.message, "error");
					}
				});
			}
		}
	};




	// App constructor
	this.initialize = function(){
		this.interface.prepare();
	};


	// Initialize when window is ready
	$(document).ready(function(){
		parent.initialize();
    });


	// Public API
	return {
		message : {
			show : function (title, text, type) {
				return parent.message.show(title, text, type);
			}
		},

		graph : {
			add : function(graph) {
				if (graph instanceof Graph)
					parent.graphs.push(graph);
			}
		}
	};

})(jQuery);