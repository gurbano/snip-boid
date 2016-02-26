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
    	click: function(e){
        	//e.preventDefault();
        	//alert("test")
    	}
    });
	$(document.body).prepend(this.stage);
};
UI.prototype.remove = function() {
	this.stage.remove();	
	this.stage = undefined;
};
UI.prototype.addEntity = function(options, entity) {
	console.info('adding ' + entity.key, entity);	
	this.stage.prepend(entity);
	this.controls[entity.key]= entity;
};
UI.prototype.getEntity = function(key) {
	if(this.controls[key]){
		return this.controls[key];
	}else{
		//return UIFactory.getErrorComponent('get entity ' + key);
		console.error(key + ' component not registered');
		return $("<div />");
	}
};
UI.prototype.bindToApp = function(app) {
	for (var k in this.controls) {
		if(this.controls[k].onBind){
			this.controls[k].onBind(this,app);
		}
	};	
}
module.exports = UI;