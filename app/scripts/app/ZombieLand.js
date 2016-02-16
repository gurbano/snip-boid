var AbstractApp = require('./AbstractApp');

var ZombieLand = function(opts){
	var self = this;
	if (!(this instanceof ZombieLand)) return new ZombieLand(opts);
	AbstractApp.call(this, opts); //extends pixi.container   
	this.opts = opts || {};
	this.name = 'Zombie Land'
}
ZombieLand.prototype = Object.create(AbstractApp.prototype);
ZombieLand.prototype.constructor = AbstractApp;
ZombieLand.prototype.update = function(time) {
	/*1- Update controls*/

	/*2- Update world - cascading update all the entities*/
	if (this.world && this.world.update){this.world.update();}
};


module.exports = ZombieLand;