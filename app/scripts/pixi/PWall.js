var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var BLACK = 0x000000;
var gu = require('../utils');

var PWall = function (opts) {
	var self = this;
	this.type = 'wall';
	this.start = opts.start;
	this.end = opts.end;
	this.m = (opts.end.y - opts.start.y) / (opts.end.x - opts.start.x );
	this.Y = function (x) {
		return this.m * x;
	}()


	if (!(this instanceof PWall)) return new PWall(opts);
	PIXI.Graphics.call(this); //extends pixi.container
	this.lineStyle(3, BLACK);    
    this.moveTo(opts.start.x,opts.start.y);
    this.lineTo(opts.end.x,opts.end.y);
	this.endFill(); 


	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip
	this.radius = opts.radius || 10;

    this.getPosition = function () {return this.position};
    this.getDistanceFrom = function (x,y) {
    	return gu.distToSegment({x: x, y:y},this.start, this.end);
    }

    return this;		
}



/*PROTO INHERITANCE*/
PWall.prototype = Object.create(PIXI.Graphics.prototype);
PWall.prototype.constructor = PIXI.Graphics;


module.exports = PWall;