var BaseTargetFactory = require('./BaseTargetFactory');

var ThreeTargetFactory = function(opts){
	var self = this;	
	if (!(this instanceof ThreeTargetFactory)) return new ThreeTargetFactory(this.opts);
	BaseTargetFactory.call(this); //extends pixi.container   
	this.opts = opts || {};
	this.name = 'ThreeTargetFactory';
	this.description = 'Abstract Factory'	
}
ThreeTargetFactory.prototype = Object.create(BaseTargetFactory.prototype);
ThreeTargetFactory.prototype.constructor = BaseTargetFactory;
ThreeTargetFactory.prototype.generate = function(entity) {
	switch(entity.type){
		default: return BaseTargetFactory.prototype.generate.call(this,entity);
	}
	return {};
};

module.exports = ThreeTargetFactory;