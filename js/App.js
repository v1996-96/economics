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

	
	/* Application functions */
	/*-----------------------------------------------------------------*/
	this.interface = {
		/* Prepare window for first use */
		prepare : function(){
			this.actions.interface = this;
			this.actions.enableSorting();

			this.handlers.interface = this;
			this.handlers.modalHandler();
			this.handlers.parametersHandler();
		},


		/* Manipulation with DOM */
		dom : {

		},


		/* List of actions */
		actions : {
			interface : null,

			/* Enable sorting in history list */
			enableSorting : function(){
				$("#historyPanels").sortable({
	                handle: ".panel-sort-toggle"
	            });
	            $("#historyPanels").disableSelection();
			},

			/* Collapse list */
			collapseList : function(list, collapse){
				var collapse = collapse || false;
				var action = collapse ? "show" : "hide";
				$(list).collapse( action );
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