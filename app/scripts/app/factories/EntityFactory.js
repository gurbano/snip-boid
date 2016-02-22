var Flock = require('../entities/Flock');
var Wall = require('../entities/Wall');
var Bouncer = require('../entities/Bouncer');

var EntityFactory = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof EntityFactory)) return new EntityFactory(opts);
	this.name = 'EntityFactory';
	
	this.info = function () {
		console.info(this);
	}
	this.generate = function (entityDesc, opts , cb) {
		var ret = undefined;

		switch(entityDesc.type){
			case "Wall":
				ret = new Wall($.extend(opts,entityDesc));
				opts.targetFactory.apply(ret);	
				break;
			case "Bouncer":
				ret = new Bouncer($.extend(opts,entityDesc));
				opts.targetFactory.apply(ret);	
				break;
			default: 
				console.error('Error factoring entity ' + entityDesc.type + ' no converter found');
				break;
		}

		if (cb)
			cb(ret);
		return ret;
		

	}
	return this;
}







module.exports = EntityFactory;