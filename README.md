#jQuery Combobox Widget

A comobox widget based on the jQuery UI autocomplete demo
Original code can be found [here](http://jqueryui.com/autocomplete/#combobox).

##Features

* works with jQuery 1.8+
* requires jQuery UI 1.9+

##Usage

Basic usage:

    $('select').combobox( {options} );

##Parameters

###Options

####`forceUcase`

`forceUcase` will force any entered data to uppercase. Boolean value. Default = `false`

####`invalidAction`

`invalidAction` Dictates the action to perform if an item not already in the list of selectable items is entered. String value. Default = `remove`.  
Available values:

| invalidAction | Action Description                                        |
| ------------- | --------------------------------------------------------- |
| `add`         | New value is added to the bottom of the list.             |
| `remove`      | Value is removed (cleared out) and an error is displayed. |

####`classPrefix`

`classPrefix` The prefix used to apply to the classes of all elements involved. String value. Default = `ui`

The classes involved include:
* wrapper gets `prefix`-combobox
* input box gets `prefix`-combobox-input
* button gets `prefix`-combobox-toggle
	
###Methods

####`enable`

Will enable the combobox.

####`disable`

Will disable the combobox.

####`destroy`

Will destroy all combobox elements and restore the original select element.

####`select`

Will force the selection of given value

Code example:

	$("select").combobox("select", "Option 2");

####`option`

Get or Set options on-the-fly.

Code example:

	$("select").combobox("option", "forceUcase");			// getter
	$("select").combobox("option", "forceUcase", true);		// setter

