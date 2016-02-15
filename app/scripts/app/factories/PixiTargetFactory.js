var BaseTargetFactory = require('./BaseTargetFactory');
var PWorld = require('../targets/pixi/World.pixi');
var PBoid = require('../targets/pixi/Boid.pixi');
var PBouncer = require('../targets/pixi/Bouncer.pixi');
var PFlock = require('../targets/pixi/Flock.pixi');


var PixiTargetFactory = function(opts){
	var self = this;	
	if (!(this instanceof PixiTargetFactory)) return new PixiTargetFactory(this.opts);
	BaseTargetFactory.call(this); //extends pixi.container   
	this.opts = opts || {};
	this.name = 'PixiTargetFactory';
	this.description = 'Abstract Factory'	
}
PixiTargetFactory.prototype = Object.create(BaseTargetFactory.prototype);
PixiTargetFactory.prototype.constructor = BaseTargetFactory;
PixiTargetFactory.prototype.generate = function(entity) {
	console.info(this.name + ' - generating target for ' + entity.type );
	var ret = undefined;
	switch(entity.type){
		case 'World': 
			return new PWorld(entity);
			break;
		case 'Boid': 
			return new PBoid(entity);
			break;
		case 'Flock': 
			return new PFlock(entity);
			break;
		case 'Bouncer': 
			return new PBouncer(entity);
			break;
		default: 
			return BaseTargetFactory.prototype.generate.call(this,entity);
			break;
	}
	return {};
};

module.exports = PixiTargetFactory;