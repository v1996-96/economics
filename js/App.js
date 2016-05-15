/**
 * Application core
 * 04/2016
 */

var App = (function ($) {

	var parent = this;

	/* Useful JS stuff */
	/*-----------------------------------------------------------------*/
	this.useful = {
		/**
		 * Get object keys
		 * @param  {object} obj 
		 * @return {array} 
		 */
		getKeys : function(obj){
			var r = [];
		    for (var k in obj) {
		        if (!obj.hasOwnProperty(k)) 
		            continue;
		        r.push(k);
		    }
		    return r;
		},

		/**
		 * Check is needle in haystack or not
		 * @param  {object} needle   
		 * @param  {array} haystack 
		 * @param  {bool} strict   
		 * @return {bool}          
		 */
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

		/**
		 * Check DOM element existance
		 * @param  {string} selector 
		 * @return {bool}          
		 */
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
	/* List of parameters */
	this.params = {
		ecomonicsType : null, 	// opened | closed
		exchangeRate : null,  	// fixed | fluid
		economicsSize : null, 	// small | big
		capitalMobility : null, // absolute | high | low | null
		prices : null 			// fixed | fluid
		//period : null  			// long_run | short_run
	};

	/* Parameters factory */
	this.paramsFactory = {

		/**
		 * Basic aplication parameter rules
		 * @param  {object} params Parameter list
		 * @return {bool}          true on success
		 */
		checkAbilityToBuild : function( params ){
			// Check object structure
			if (typeof params.ecomonicsType == 'undefined' &&
				typeof params.exchangeRate == 'undefined' &&
				typeof params.economicsSize == 'undefined' &&
				typeof params.capitalMobility == 'undefined' &&
				typeof params.prices == 'undefined' 
				/*&& typeof params.period == 'undefined'*/) 
				throw { message: "Непредвиденная ошибка" };

			// Check fields value
			if (params.ecomonicsType == null ||
				params.prices == null 
				/*|| params.period == null*/) 
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

			/*if (!parent.useful.inArray(params.period, ["long_run", "short_run"])) 
				throw { message: "Непредвиденная ошибка" };*/

			return true;
		}
	};

	/* Common equations coefficients */
	this.defaultFactors = {};
	this.factors = {};

	/* Factors factory */
	this.factorsFactory = {

		/* Default factors methods */
		defaultFactors : {

			/**
			 * Set default factor
			 * @param {string} key   
			 * @param {object} value 
			 */
			set : function(key, value) {
				parent.defaultFactors[ key ] = value;
			},

			/**
			 * Get default factor
			 * @param  {string} key 
			 * @return {object}     
			 */
			get : function(key) {
				return parent.defaultFactors[ key ] || null;
			}
		},

		/* Current factors methods */
		currentFactors : {

			/**
			 * Set current factor
			 * @param {string} key   
			 * @param {object} value 
			 */
			set : function(key, value) {
				parent.factors[ key ] = value;
			},

			/**
			 * Get current factor
			 * @param  {string} key 
			 * @return {object}     
			 */
			get : function(key) {
				return parent.factors[ key ] || null;
			}
		},

		/**
		 * Push factor to current and default lists
		 * @param {string} key   
		 * @param {object} value 
		 */
		setGlobal : function(key, value) {
			this.defaultFactors.set(key, value);
			this.currentFactors.set(key, value);
		},

		/**
		 * Resets current factors do default values
		 */
		rollback : function() {
			parent.factors = $.extend(true, {}, parent.defaultFactors);
		}
	};

	/* Graphs list (array of Graph objects) */
	this.graphs = [];

	/* Graphs factory */
	this.graphsFactory = {

		/**
		 * Renders graphs in browser
		 */
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

			// Run highcharts plugin
			this.run();
		},


		/**
		 * Runs highcharts plugin
		 */
		run : function() {
			this.refreshGraphs();

			// Run plugin for each graph
			for (var i = 0; i < parent.graphs.length; i++) {
				var selector = "#" + parent.graphs[i].id;

				// In case of chart block not found we can't initialize plugin
				if (!parent.useful.exists( selector )) continue;

				// Plugin initialization
				$( selector ).highcharts( parent.graphs[i] );
			}
		},


		/**
		 * Retrieves graph by it's id
		 * @param  {string} id Identificator specified in Graph class
		 * @return {Graph}|{null}    Graph object
		 */
		get : function(id) {
			for (var i = 0; i < parent.graphs.length; i++) {
				if (parent.graphs[i].id == id) {
					return parent.graphs[i];
				}
			}

			return null;
		},


		/**
		 * Retrieves full graph list
		 * @return {array} Graph list
		 */
		getAll : function() {
			return parent.graphs;
		},


		/**
		 * Rolls back all lines on all graphs (to default parameters)
		 */
		rollbackAll : function() {
			for (var i = 0; i < parent.graphs.length; i++) {
				parent.graphs[i].linesFactory.rollbackAll();
				parent.graphs[i].linesFactory.convertAll();
			}
		},


		/**
		 * Clears graph from all supporting lines (added by modules)
		 */
		clearSupportingOnAll : function() {
			for (var i = 0; i < parent.graphs.length; i++) {
				parent.graphs[i].linesFactory.clearSupporting();
				parent.graphs[i].linesFactory.convertAll();
			}
		},


		/**
		 * Refresh series data on all graphs
		 */
		refreshGraphs : function() {
			for (var i = 0; i < parent.graphs.length; i++) {
				parent.graphs[i].linesFactory.convertAll();
			}
		}
	};

	/* List of application modules */
	this.modules = [];

	/* Modules history (order of initialization) */
	this.modulesHistory = [];

	/* Modules factory */
	this.modulesFactory = {

		/**
		 * Render list of modules in DOM (modal window)
		 */
		renderList : function() {
			parent.interface.dom.renderModuleList();
		},


		/**
		 * Render list of modules, specified in history list (history block)
		 */
		renderHistory : function() {
			parent.interface.dom.renderHistory();
			this.activateByHistory();
		},


		/**
		 * Run modules one by one (concerning history list)
		 */
		activateByHistory : function() {
			// Reset current options to default values
			parent.graphsFactory.clearSupportingOnAll();
			parent.graphsFactory.rollbackAll();
			parent.factorsFactory.rollback();


			for (var i = 0; i < parent.modulesHistory.length; i++) {
				// Before running module we clear all intermediate lines on graphs
				parent.graphsFactory.clearSupportingOnAll();

				// Run module
				parent.modulesHistory[i].action.call( parent.modulesHistory[i], parent.graphsFactory );
			}

			// Rerender graphs
			parent.graphsFactory.run();
		},


		/**
		 * Add module to history list
		 * @param {[type]} id [description]
		 */
		addToHistory : function(id) {
			if ($("#graphsSection").hasClass("hidden")) {
				parent.message.show("Ошибка", "Графики не были построены", "error");
				return;
			}

			for (var i = 0; i < parent.modules.length; i++) {
				if (parent.modules[i].id == id) {
					parent.modulesHistory.push( parent.modules[i] );
				}
			}

			$("#addChangeModal").modal("hide");

			var that = this;
			if ($("#historySection").hasClass("hidden")) {
				parent.interface.actions.showSection( $("#historySection") );
				TweenLite.delayedCall(0.3, function(){
					that.renderHistory();
				});
			} else {
				this.renderHistory();
			}
		},

		/**
		 * Remove module from history
		 * @param  {string} id    Identificator, specified in Module class
		 * @param  {int}    order Index in history array
		 */
		removeFromHistory : function(id, order) {
			for (var i = 0; i < parent.modulesHistory.length; i++) {
				if (parent.modulesHistory[i].id == id && order == i) {
					parent.modulesHistory.splice(i, 1);
				}
			}

			this.renderHistory();
		},

		/**
		 * Apply sorting
		 * @param  {array} newOrder New order
		 */
		reorderHistory : function(newOrder) {
			var newHistory = [];

			for (var i = 0; i < newOrder.length; i++) {
				newHistory.push( parent.modulesHistory[ newOrder[i] ] );
			}

			parent.modulesHistory = newHistory;

			this.renderHistory();
		}
	};

	

	/* Application functions */
	/*-----------------------------------------------------------------*/
	/* Application interface */
	this.interface = {
		
		/**
		 * Prepare window for first use
		 */
		prepare : function(){
			parent.modulesFactory.renderList();

			/* Run initialization actions */
			this.actions.interface = this;
			this.actions.showSection( $("#paramsSection") );
			this.actions.enableSorting();

			/* Apply event handlers */
			this.handlers.interface = this;
			this.handlers.fullscreenHandler();
			this.handlers.rerenderGraphsHandler();
			this.handlers.modalHandler();
			this.handlers.parametersHandler();
			this.handlers.collapseParametersHandler();
			this.handlers.buildHandler();
		},


		/* Manipulation with DOM */
		dom : {
			graphHeight : function() {
				var cell = $("#graphsArea .row").eq(0).find(".column").eq(0);
				return cell.length == 0 ? 400 : cell.width();
			},

			/**
			 * Render grid for graphs area (bootstrap grid)
			 * @param  {int} rows    Rows count
			 * @param  {int} columns Comuns count
			 */
			renderGraphGrid : function (rows, columns) {
				$("#graphsArea").html("");

				if (columns <= 0) return false;
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

			/**
			 * Render graph blocks in a cell in grid
			 * @param  {int} row    Row id
			 * @param  {int} column Column id
			 * @param  {string} id  Graph id
			 */
			renderGraph : function (row, column, id) {
				var that = this;
				var parent = $("#graphsArea .row").eq(row).find(".column").eq(column);

				$("<div></div>")
					.attr("id", id)
					.css({ width : parent.width(), height : that.graphHeight })
					.appendTo( parent );
			},

			/**
			 * Render module history list
			 */
			renderHistory : function () {
				$("#historyPanels").html("");

				for (var i = 0; i < parent.modulesHistory.length; i++) {
					this.renderHistoryModule( parent.modulesHistory[i], i );
				}
			},

			/**
			 * Render module list (modal window)
			 */
			renderModuleList : function () {
				$("#modulesList").html("");

				for (var i = 0; i < parent.modules.length; i++) {
					this.renderModule( parent.modules[i] );
				}
			},

			/**
			 * Render unique history module
			 * @param  {object} module Module object
			 * @param  {int}    order  Index in history list
			 */
			renderHistoryModule : function (module, order) {
				var $panel = $("<div></div>")
								.attr({
									"data-id" : module.id,
									"data-order" : order
								})
								.addClass('panel panel-default panel-history');

				var $heading = $("<div></div>").addClass('panel-heading').appendTo( $panel );

				$("<span></span>")
					.addClass("panel-sort-toggle")
					.append('<i class="fa fa-ellipsis-v"></i>')
					.append('<i class="fa fa-ellipsis-v"></i>')
					.appendTo( $heading );

				var $title = $("<h4></h4>").addClass('panel-title').appendTo( $heading );
				$("<a></a>")
					.attr({
						"data-toggle" : "collapse",
						"href" : "#histDesc_" + module.id + "_" + order
					})
					.text( module.title )
					.appendTo( $title );

				var $control = $("<div></div>").addClass("panel-control").appendTo( $heading );
				$("<a></a>").addClass('action-delete').html('<i class="fa fa-trash"></i>')
					.attr({
						"href" : "#",
						"data-id" : module.id,
						"data-order" : order
					})
					.on("click", function(e){
						e.preventDefault();
						parent.modulesFactory.removeFromHistory( $(this).attr("data-id"), $(this).attr("data-order") );
					})
					.appendTo( $control );

				var $collapse = $("<div></div>")
									.attr("id", "histDesc_" + module.id + "_" + order)
									.addClass("panel-collapse collapse")
									.appendTo($panel);
				$("<div></div>")
					.addClass('panel-body')
					.html( module.description )
					.appendTo($collapse);

				$("#historyPanels").append( $panel );
			},

			/**
			 * Render unique module
			 * @param  {object} module Module object
			 */
			renderModule : function (module) {
				var $panel = $("<div></div>").addClass('panel panel-default panel-history');

				var $heading = $("<div></div>").addClass('panel-heading').appendTo( $panel );

				var $title = $("<h4></h4>").addClass('panel-title').appendTo( $heading );
				$("<a></a>")
					.attr({
						"data-toggle" : "collapse",
						"href" : "#moduleDesc_" + module.id
					})
					.text( module.title )
					.appendTo( $title );

				var $control = $("<div></div>").addClass("panel-control").appendTo( $heading );
				$("<a></a>").addClass('action-add').html('<i class="fa fa-plus"></i>')
					.attr({
						"href" : "#",
						"data-id" : module.id
					})
					.on("click", function(e){
						e.preventDefault();
						parent.modulesFactory.addToHistory( $(this).attr("data-id") );
					})
					.appendTo( $control );

				var $collapse = $("<div></div>")
									.attr("id", "moduleDesc_" + module.id)
									.addClass("panel-collapse collapse")
									.appendTo($panel);
				$("<div></div>")
					.addClass('panel-body')
					.html( module.description )
					.appendTo($collapse);

				$("#modulesList").append( $panel );
			}
		},


		/* List of actions */
		actions : {
			/* Link to parent object */
			interface : null,

			/**
			 * Show specified section
			 * @param  {string} section Section selector
			 */
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

			/**
			 * Enable sorting in history list (jQuery UI sortable plugin)
			 */
			enableSorting : function(){
				$("#historyPanels").sortable({
	                handle: ".panel-sort-toggle",
	                stop: function(event, ui) {
	                	var newOrder = [];
	                	$("#historyPanels .panel").each(function(n, el){
	                		newOrder.push( parseInt($(el).attr("data-order")) );
	                	});

	                	parent.modulesFactory.reorderHistory( newOrder );
	                }
	            });
	            $("#historyPanels").disableSelection();
			},

			/**
			 * Toggle parameter button in prams list
			 * @param  {object} current Button DOM object
			 */
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

			/**
			 * Scroll to element
			 * @param  {string} element   Selector
			 * @param  {int} 	topOffset Top padding
			 */
			scrollTo : function(element, topOffset){
				var offset = $(element).offset().top - topOffset;
				$('html, body').animate({
                    scrollTop: offset
                }, 160);
			}
		},


		/* Event handlers */
		handlers : {
			/* Link to parent object */
			interface : null,

			/**
			 * Rerender handler
			 */
			rerenderGraphsHandler : function() {
				$("#rerenderGraphsBtn").on("click", function(e){
					e.preventDefault();

					parent.graphsFactory.render();
				});
			},

			/**
			 * Fullscreen handler
			 */
			fullscreenHandler : function() {
				$("#fullscreenToggleBtn").on("click", function(e){
					e.preventDefault();

					if ($(this).find("i").text() == "fullscreen") {
						$(this).find("i").text("fullscreen_exit");
					} else {
						$(this).find("i").text("fullscreen");
					}
					$("#graphsSection").toggleClass("fullscreen");

					parent.graphsFactory.render();
				});
			},

			/**
			 * Modules modal window handler
			 */
			modalHandler : function(){
				$(".add-change").on("click", function(e){
	                e.preventDefault();
	                $("#addChangeModal").modal();
	            });
			},

			/**
			 * Set handler for parameters buttons
			 */
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

			/**
			 * Change icon when parameters section was collapsed
			 */
			collapseParametersHandler : function(){
				$('#paramsList').on("show.bs.collapse", function(){
					$('[data-toggle="collapse"][href="#paramsList"] i').html("keyboard_arrow_up");
				});
				$('#paramsList').on("hide.bs.collapse", function(){
					$('[data-toggle="collapse"][href="#paramsList"] i').html("keyboard_arrow_down");
				});
			},

			/**
			 * Handle click on build button
			 */
			buildHandler : function(){
				$("#buildGraphsBtn").on("click", function(e){
					e.preventDefault();

					try{
						// Check selected params
						parent.paramsFactory.checkAbilityToBuild( parent.params );

						// Run event handler
						parent.onBuild.call(window, parent.params);

						// Interface
						$("#paramsList").collapse("hide");
						var delay = 0;
						if ($("#graphsSection").hasClass("hidden")) {
							delay = 0.3;
							TweenLite.delayedCall(0.28, function(){
								interface.actions.showSection( $("#graphsSection") );
							});
						}

						// Run graphs plugins
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


	// Fires after params checking and before graphs initialization
	this.onBuild = function( params ) {
		/* Mainly for factors */
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
			},

			get : function(id) {
				for (var i = 0; i < parent.graphs.length; i++) {
					if (parent.graphs[i].id == id) {
						return parent.graphs[i];
					}
				}

				return null;
			},

			getAll : function() {
				return parent.graphs;
			}
		},

		module : {
			add : function(module) {
				if (module instanceof Module) 
					parent.modules.push(module);
			},

			get : function(id) {
				for (var i = 0; i < parent.modules.length; i++) {
					if (parent.modules[i].id == id) {
						return parent.modules[i];
					}
				}

				return null;
			},

			getAll : function() {
				return parent.modules;
			}
		},

		params : {
			get : function() {
				return $.extend(true, {}, parent.params);
			}
		},

		factors : {
			default : {
				set : function(key, value) {
					parent.factorsFactory.defaultFactors.set(key, value);
				},

				get : function(key) {
					return parent.factorsFactory.defaultFactors.get(key);
				}
			},

			current : {
				set : function(key, value) {
					parent.factorsFactory.currentFactors.set(key, value);
				},

				get : function(key) {
					return parent.factorsFactory.currentFactors.get(key);
				}
			},

			setGlobal : function(key, value) {
				parent.factorsFactory.setGlobal(key, value);
			},

			getAll : function() {
				return $.extend(true, {}, parent.factors);
			}
		},

		onBuild : function( fn ) {
			parent.onBuild = fn;
		}
	};

})(jQuery);