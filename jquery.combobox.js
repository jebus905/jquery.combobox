(function( $ ) {
	$.widget( "custom.combobox", {
		options: {
			forceUcase: false,
			invalidAction: "remove",
			classPrefix: "ui"
		},
		
		_create: function() {
			this.wrapper = $( "<span>" )
				.addClass( this.options.classPrefix + "-combobox" )
				.insertAfter( this.element );
			
			this.element.hide();
			this._createAutocomplete();
			this._createShowAllButton();
		},
	
		_createAutocomplete: function() {
			var selected = this.element.children( ":selected" ),
				value = selected.val() ? selected.text() : "";
			
			this.input = $( "<input>" )
				.appendTo( this.wrapper )
				.val( value )
				.attr( "title", "" )
				.addClass( this.options.classPrefix + "-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
				.autocomplete({
					delay: 0,
					minLength: 0,
					source: $.proxy( this, "_source" )
				})
				.tooltip({
					tooltipClass: "ui-state-highlight"
				});
			
			this._on( this.input, {
				autocompleteselect: function( event, ui ) {
					ui.item.option.selected = true;
					this._trigger( "select", event, {
						item: ui.item.option
					});
				},
		
				autocompletechange: "_removeIfInvalid"
			});
		},
	
		_createShowAllButton: function() {
			var input = this.input,
				wasOpen = false;
		
			$( "<a>" )
				.attr( "tabIndex", -1 )
				.attr( "title", "Show All Items" )
				.tooltip()
				.appendTo( this.wrapper )
				.button({
					icons: {
						primary: "ui-icon-triangle-1-s"
					},
					text: false
				})
				.removeClass( "ui-corner-all" )
				.addClass( this.options.classPrefix + "-combobox-toggle ui-corner-right" )
				.mousedown(function() {
					wasOpen = input.autocomplete( "widget" ).is( ":visible" );
				})
				.click(function() {
					input.focus();
		
					// Close if already visible
					if ( wasOpen ) {
						return;
					}
		
					// Pass empty string as value to search for, displaying all results
					input.autocomplete( "search", "" );
				});
		},
	
		_source: function( request, response ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			response( this.element.children( "option" ).map(function() {
				var text = $( this ).text();
				if ( this.value && ( !request.term || matcher.test(text) ) )
				return {
					label: text,
					value: text,
					option: this
				};
			}) );
		},
	
		_removeIfInvalid: function( event, ui ) {
			if(this.options.forceUcase) this.input.val(this.input.val().toUpperCase());
			
			// Selected an item, nothing to do
			if ( ui.item ) {
				return;
			}
		
			// Search for a match (case-insensitive)
			var value = this.input.val(),
				valueLowerCase = value.toLowerCase(),
				valid = false,
				option;
			this.element.children( "option" ).each(function() {
				if ( $( this ).text().toLowerCase() === valueLowerCase ) {
					this.selected = valid = true;
					return false;
				}
			});
		
			// Found a match, nothing to do
			if ( valid ) {
				return;
			}
			
			// So, no match was found.  What we do next depends on options.invalidAction.
			switch(this.options.invalidAction.toLowerCase()) {
				case "remove":
					// Remove invalid value
					this.input
						.val( "" )
						.attr( "title", value + " didn't match any item" )
						.tooltip( "open" );
					this.element.val( "" );
					this._delay(function() {
						this.input.tooltip( "close" ).attr( "title", "" );
					}, 2500 );
					this.input.data( "ui-autocomplete" ).term = "";
					break;
				
				case "add":
					// Add new (non blank) value to list if it hasn't been found
					if(value.replace(/\s/g, "") != "") {
						option = $("<option>")
								.html(value)
								.text(value)
								.val(value)
								.appendTo(this.element);
						this.element.children(option).prop("selected", true).change();
					}
					break;
			}
		},
		
		_destroy: function() {
			this.wrapper.remove();
			this.element.show();
		},
		
		select: function(value) {
			this.wrapper.children("input").val(value).change();
			this.wrapper.parent().children("select").val(value).change();
		},
		
		destroy: function() {
			this.wrapper.remove();
			this.element.show();
			//$.Widget.prototype.destroy.call( this );
		},
		
		disable: function() {
			this.input.autocomplete("disable");							// disable the autocomplete element
			this.input.prop("disabled", true);							// disable the input field
			this.element.prop("disabled", true);						// disable the original select element
			this.input.addClass("ui-state-disabled");					// add disabled state to input field
			this.wrapper.find("a").addClass("ui-state-disabled");		// add disabled state to show all indicator
		},
		
		enable: function() {
			this.input.autocomplete("enable");							// enable the autocomplete element
			this.input.prop("disabled", false);							// enable the input field
			this.element.prop("disabled", false);						// enable the original select element
			this.input.removeClass("ui-state-disabled");				// remove disabled state from input field
			this.wrapper.find("a").removeClass("ui-state-disabled");	// remove disabled state from show all indicator
		}
	});
})( jQuery );
