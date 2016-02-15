var victor = require('victor');
var V = function (x,y) {
	return new victor(x,y);
}
var RED = 0xFF0000;
var PixiFlock = function (opts) {
	var self = this;	
	if (!(this instanceof PixiFlock)) return new PixiFlock(opts);
	PIXI.Graphics.call(this); //extends pixi.container    
	this.type = 'PixiFlock';
	this.position = {x:0, y:0};
	this.radius = 0;
    //this.render();
    return this;		
}
/*PROTO INHERITANCE*/
PixiFlock.prototype = Object.create(PIXI.Graphics.prototype);
PixiFlock.prototype.constructor = PIXI.Graphics;
PixiFlock.prototype.render = function () {
	this.clear();
	this.beginFill(0xffffff);
    this.fillAlpha = 0.06;
    this.drawCircle(0,0, Math.abs(this.radius) );
    this.endFill(); 
}
PixiFlock.prototype.update = function (source) {
	var boids = source.boids;
	var ret = V(0,0); var count = 0;
	var maxDistance = 10;
	for (var i = boids.length - 1; i >= 0; i--) {
		var b = V(boids[i].getPosition().x,boids[i].getPosition().y);
		ret = ret.add(b);
		maxDistance = Math.max(maxDistance, Math.sqrt(b.distanceSq(V(this.position.x, this.position.y))) );
		count++
	};
	ret = ret.divide(V(count,count));
	//console.info(arg);
	this.position.x = ret.x;
	this.position.y = ret.y;
	this.radius = maxDistance + 50;
	this.render();
};


module.exports = PixiFlock;