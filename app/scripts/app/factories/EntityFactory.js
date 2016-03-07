var Flock = require('../entities/Flock');
var Wall = require('../entities/Wall');
var Goal = require('../entities/Goal');
var PG = require('../entities/PG');
var Bouncer = require('../entities/Bouncer');
var FlockFactory = require('./FlockFactory');


/*ENTITY FACTORY*/
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
			case "Goal":
				ret = new Goal($.extend(opts,entityDesc));
				opts.targetFactory.apply(ret);	
				break;
			case "PG":
				ret = new PG($.extend(opts,entityDesc));
				opts.targetFactory.apply(ret);	
				break;
			case "Flock":
				//ret = new Flock($.extend(opts,entityDesc));  //new Goal($.extend(opts,entityDesc));
				opts = $.extend(opts,entityDesc);
				ret = new FlockFactory(opts.FLOCKFACTORY).generate(opts.FLOCK);
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