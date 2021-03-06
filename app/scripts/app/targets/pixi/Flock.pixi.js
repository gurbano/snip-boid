var victor = require('victor');
var AbstractPixiTarget = require('./AbstractPixiTarget');
var V = function (x,y) {
	return new victor(x,y);
}



var RED = 0xFF0000;
var PixiFlock = function (source) {
	var self = this;	
	if (!(this instanceof PixiFlock)) return new PixiFlock(source);
	AbstractPixiTarget.call(this, source); //extends pixi.container    
	this.type = 'PixiFlock';
	this.position = {x:0, y:0};
	this.radius = 0;
    //this.render();
    return this;		
}
/*PROTO INHERITANCE*/
PixiFlock.prototype = Object.create(AbstractPixiTarget.prototype);
PixiFlock.prototype.constructor = AbstractPixiTarget;
PixiFlock.prototype.render = function () {
	this.clear();
	if (this.debug){		
		this.beginFill(0x000000);
	    this.fillAlpha = 0.2;
	    this.drawCircle(0,0, Math.abs(this.radius) );
	    this.endFill(); 
	}
}
PixiFlock.prototype.update = function (source, data) {
	var boids = source.boids;
	var ret = V(0,0); var count = 0;
	var maxDistance = 0;
	this.debug = data.debug;
	if (this.debug){	
		for (var i = boids.length - 1; i >= 0; i--) {
			var b = V(boids[i].getPosition().x,boids[i].getPosition().y);
			ret = ret.add(b);
			maxDistance = Math.max(maxDistance, Math.sqrt(b.distanceSq(V(this.position.x, this.position.y))) );
			count++
		};
		ret = ret.divide(V(count,count));		
		
	}
	this.radius = maxDistance * 1.1;
	//console.info(arg);
	this.position.x = ret.x;
	this.position.y = ret.y;
	this.render();
	this.updateSource();
};


module.exports = PixiFlock;