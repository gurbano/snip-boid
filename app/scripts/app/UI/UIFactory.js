var UIFactory = function () {
	this.getBox = function(key) {
		var div = $('<div />', {"class": 'row panel panel-default ui-box'});
		div.key = key;
		div.draggable();
		return div;
	};

	this.getButton = function (key, cb) {
		var button = $('<button type="button" class="btn btn-primary">' + key + '</button>');
		button
		.button()
		.click(function( event ) {
	    	event.preventDefault();
	    	cb(event);
	    });
		return button;
	};
	this.getButtonGroup = function (key, cb) {
		var buttonGroup = $('<div class="btn-group"></div>');
		return buttonGroup;
	}

};





module.exports = new UIFactory();