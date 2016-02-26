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
	this.centerH = function (control) {
		control.offset({top: $(document.body).height()/2 - control.height()/2 });
	}
	this.centerW = function (control) {
		control.offset({left: $(document.body).width()/2 - control.width()/2 });
	}
	this.center = function (control) {
		this.centerW(control);
		this.centerH(control);
	}

};





module.exports = new UIFactory();