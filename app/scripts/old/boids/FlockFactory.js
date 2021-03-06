var Flock = require('./Flock');

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
		fopts = fopts || {};
		var f =  new Flock($.extend(opts, fopts));		
		if (cb){
			cb(f);
		}
		return f;
	}
	return this;
}






module.exports = FlockFactory;