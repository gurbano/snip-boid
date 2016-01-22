var RED = 0xFF0000;
var LGRAY = 0x999999;
var gu = require('../utils');
var Flock = require('../boids/Flock');

var BoidGenerator = function (opts) {
	var self = this;
	this.type = 'generator';
	if (!(this instanceof BoidGenerator)) return new BoidGenerator(opts);


	/* DISPLAY PROP*/
	PIXI.Graphics.call(this); //extends pixi.container
    this.beginFill(LGRAY);
    this.drawCircle(0,0, Math.abs(opts.radius || 10) );
    this.position.x = opts.x || 0;
    this.position.y = opts.y || 0; 
	this.endFill(); 

	this.delay = opts.delay || 1000;
	this.flock = opts.flock;
	this.radius = opts.radius || 10;
	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip

    this.getPosition = function () {return this.position};
	this.getDistanceFrom = function (x,y) {
    	return gu.distToPoint({x: x, y:y}, this.position);
    }
    this.generate = function () {
    	this.flock.addBoid({
			px: this.position.x, 
			py: this.position.y, 
			sx: gu.randomReal(-10,10), 
			sy: gu.randomReal(-10,10),
    	});
    }

    return this;		
}



/*PROTO INHERITANCE*/
BoidGenerator.prototype = Object.create(PIXI.Graphics.prototype);
BoidGenerator.prototype.constructor = PIXI.Graphics;


module.exports = BoidGenerator;