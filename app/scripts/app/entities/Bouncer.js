var AbstractEntity = require('./AbstractEntity');

var V = require('victor');
var Bouncer = function(opts){
	var self = this;	
	if (!(this instanceof Bouncer)) return new Bouncer(this.opts);
	AbstractEntity.call(this); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Bouncer;
	this.radius = opts.radius || 10;
	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip	
	this.position = {
		x:opts.x || 0,
		y: opts.y ||0
	};
    this.getPosition = function () {return this.position};
	this.getDistanceFrom = function (x,y) {
    	return Math.sqrt(new V(this.position.x, this.position.y).distanceSq(new V(x,y)));
    }
}
Bouncer.prototype = Object.create(AbstractEntity.prototype);
Bouncer.prototype.constructor = AbstractEntity;
Bouncer.prototype.update = function(data) {
	this.updateTargets(data);
};

module.exports = Bouncer;