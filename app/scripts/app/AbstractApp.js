var fps = require('fps');
var raf = require('raf');

var AbstractApp = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof AbstractApp)) return new AbstractApp(this.opts);	
	this.name = 'Abstract app';
	this.version = '0.0.1';
	this.speed = (opts.speed == undefined) ? 1 : opts.speed; // 0 = stop, 1 = speed 100%, 2 = 50%, 3 = 33%, .. ,n = 1/n%
}
AbstractApp.prototype.info = function() {
	return this.name + ' ' + this.version;
};
AbstractApp.prototype.setWorld = function(world) {
	this.world = world;
};
AbstractApp.prototype.getWorld = function() {
	return this.world;
};
AbstractApp.prototype.update = function(data) {
	console.error('update not implemented');
	this.world.update(data);
};
AbstractApp.prototype.start = function() {
	var self = this;
	var tmp = function tmp() { 	
		var time = raf(tmp);
		if (self.speed>0 && (time%self.speed==0)){
			self.update(time);	
		}
	};
	tmp(); 	
 };


module.exports = AbstractApp;