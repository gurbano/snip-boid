var fps = require('fps');
var raf = require('raf');

var AbstractApp = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof AbstractApp)) return new AbstractApp(this.opts);	
	this.name = 'Abstract app';
	this.version = '0.0.1';
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
		self.update(time);		
	};
	tmp(); 	
 };


module.exports = AbstractApp;