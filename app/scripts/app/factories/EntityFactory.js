var Flock = require('../entities/Flock');

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


			default: 
				console.error('Error factoring entity ' + entityDesc.type + ' no converter found');
		}


		if (cb && ret){cb(ret);}
	}
	return this;
}






module.exports = EntityFactory;