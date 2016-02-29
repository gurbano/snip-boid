var AbstractApp = require('./AbstractApp');

var MusicLand = function(opts){
	var self = this;
	if (!(this instanceof MusicLand)) return new MusicLand(opts);
	AbstractApp.call(this, opts); //extends pixi.container   
	this.opts = opts || {};
	this.name = 'MusicLand'
}
MusicLand.prototype = Object.create(AbstractApp.prototype);
MusicLand.prototype.constructor = AbstractApp;
MusicLand.prototype.update = function(time) {
	/*1- Update controls*/

	/*2- Update world - cascading update all the entities*/
	if (this.world && this.world.update){this.world.update();}
};


module.exports = MusicLand;