var UI = function(opts){	
	if (!(this instanceof UI)) return new UI(opts);	
	var self = this;
	this.opts = opts || {};
	this.controls = {}; // [type][id]
	this.type = 'UI';
	this.debug = opts.debug || false;
}
UI.prototype.init = function() {
	console.info('Init UI', this.opts);
	this.stage = $('<div />', {
    	"class": 'ui-canvas',
    	text: "UI-CANVAS",
    	click: function(e){
        	e.preventDefault();
        	alert("test")
    	}
    });
	$(document.body).prepend(this.stage);
};
UI.prototype.addEntity = function(options, entity) {
	console.info('adding ' + entity.type, entity,);	
};

module.exports = UI;