var AbstractApp = require('./AbstractApp');

var MusicFloor = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof MusicFloor)) return new MusicFloor(this.opts);
	AbstractApp.call(this); //extends pixi.container   
	this.name = 'Music Floor'
	this.renderer = undefined;

}
MusicFloor.prototype = Object.create(AbstractApp.prototype);
MusicFloor.prototype.constructor = AbstractApp;
MusicFloor.prototype.update = function(time) {
	/*1- Update controls*/

	/*2- Update world - cascading update all the entities*/
	if (this.world && this.world.update){this.world.update();}
	
	/*3- Update the renderer*/
	if (this.renderer && this.renderer.update){(this.renderer.update(world.getEntities()))}
};


module.exports = MusicFloor;