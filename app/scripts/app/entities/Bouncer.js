var AbstractEntity = require('./AbstractEntity');

var V = require('victor');
var Bouncer = function(opts){
	var self = this;	
	if (!(this instanceof Bouncer)) return new Bouncer(opts);
	AbstractEntity.call(this, opts); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Bouncer;
	this.radius = opts.radius || 10;
	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip	
	this.setPosition = function (x,y) {this.position.x = x; this.position.y = y;};
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
Bouncer.prototype.serialize = function () {
	return $.extend(
			{},
			this._serialize(), // 'parent' serialize
			{
				radius: this.radius,
				force: this.force,
				distance: this.distance				
			}
		);
}

module.exports = Bouncer;