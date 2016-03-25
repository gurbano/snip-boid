var Flock = require('../entities/Flock');

var FlockFactory = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof FlockFactory)) return new FlockFactory(opts);
	this.name = 'FlockFactory';
	this.description = 'create a flock'
	
	this.info = function () {
		console.info(this);
	}
	this.generate = function (fopts, cb) {
		var _opts = $.extend({},opts, fopts || {});
		var f =  new Flock(_opts);		
		if (opts.targetFactory){f.addTarget(opts.targetFactory.generate(f));}
		if (cb){
			cb(f);
		}
		return f;
	}
	return this;
}






module.exports = FlockFactory;