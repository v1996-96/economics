/**
 * Application core
 * 04/2016
 */

var App = (function ($) {

	var parent = this;

	/* Useful JS stuff */
	/*-----------------------------------------------------------------*/
	this.useful = {
		getKeys : function(obj){
			var r = []
		    for (var k in obj) {
		        if (!obj.hasOwnProperty(k)) 
		            continue
		        r.push(k)
		    }
		    return r
		},

		inArray : function(needle, haystack, strict){
			var found = false, key, strict = !!strict;

			for (key in haystack) {
				if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
					found = true;
					break;
				}
			}

			return found;
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

		},


		/* List of actions */
		actions : {
			interface : null,

			/* Show sections */
			showSection : function(section){
				$(section).removeClass("hidden");
				TweenLite.fromTo(
					section, 1, 
					{ opacity: 0, y: 60 },
					{ opacity: 1, y: 0, ease: Power4.easeInOut }
				);
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

						TweenLite.delayedCall(0.28, function(){
							interface.actions.showSection( $("#graphsSection") );
							interface.actions.showSection( $("#historySection") );
						});

						TweenLite.delayedCall(1.3, function(){
							interface.actions.scrollTo( $("#graphsSection"), 15 );
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
		}
	};

})(jQuery);