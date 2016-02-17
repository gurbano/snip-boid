var UI = require('./UI');
var UILoader = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof UILoader)) return new UILoader(this.opts);	

}
UILoader.prototype.load = function(opts) {
	var _ui = new UI(opts);
	_ui.init();
	var spec = opts.UI;
	if (spec.controls){//add controls
		for (var i = spec.controls.length - 1; i >= 0; i--) {
			var entity = spec.controls[i];
			_ui.addEntity({key: entity.key},entity);
		};
	}
	return _ui;
};

module.exports = new UILoader();