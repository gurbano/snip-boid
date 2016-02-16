var AbstractEntity = require('./AbstractEntity');

var V = require('victor');
var Goal = function(opts){
	var self = this;	
	if (!(this instanceof Goal)) return new Goal(this.opts);
	AbstractEntity.call(this); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Goal;
	this.radius = opts.radius || 10;
	this.force = opts.force || 10;
	this.distance = opts.distance || 1000; //distance multip	
	this.position = {
		x:opts.x || 0,
		y: opts.y ||0
	};
	this.setPosition = function (x,y) {
		this.position.x = x; this.position.y = y;
	};
    this.getPosition = function () {return this.position};
	this.getDistanceFrom = function (x,y) {
    	return Math.sqrt(new V(this.position.x, this.position.y).distanceSq(new V(x,y)));
    }
}
Goal.prototype = Object.create(AbstractEntity.prototype);
Goal.prototype.constructor = AbstractEntity;
Goal.prototype.update = function(data) {
	this.updateTargets(data);
};

module.exports = Goal;