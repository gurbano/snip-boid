var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var BLACK = 0x000000;
var gu = require('../utils');

var PWall = function (opts) {	
	if (!(this instanceof PWall)) return new PWall(opts);
	PIXI.Graphics.call(this); //extends pixi.container
	var self = this;
	this.type = 'wall';
	this.start = opts.start;
	this.end = opts.end;
	
	this.A = opts.end.y - opts.start.y;
	this.B = opts.start.x - opts.end.x;
	this.C = this.A * opts.start.x+this.B*opts.start.y;
	this.M = (opts.end.y - opts.start.y) / (opts.end.x - opts.start.x );		
	this.isVertical = Math.abs(this.end.x - this.start.x) < 0.00001 ;	
	this.isHorizontal = Math.abs(this.end.y - this.start.y) < 0.00001 ;
	
	this.line = Line.create([opts.start.x,opts.start.y], [opts.end.x,opts.end.y]);

	this.Y = function (x) {
		return this.M * x;
	};

	this.animate = opts.animate;
    this.render = opts.render || function () {
    	this.beginFill();
        this.lineStyle(3, WHITE);    
	    this.moveTo(opts.start.x,opts.start.y);
	    this.lineTo(opts.end.x,opts.end.y);
		this.endFill(); 
    };
    this.render();
	


	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip
	this.radius = opts.radius || 10;

    this.getPosition = function () {return this.position};
    this.getPositionV = function () {return gu.v(this.position.x, this.position.y, this.position.z)};
    this.getDistanceFrom = function (x,y) {
    	return gu.distToSegment({x: x, y:y},this.start, this.end);
    }
    this.getLineEq = function  () {
    	return{
			A : this.A,
			B : this.B,
			C : this.C,
			M : this.M,
			isVertical : this.isVertical,
			isHorizontal : this.isHorizontal 
		}
    }

    return this;		
}



/*PROTO INHERITANCE*/
PWall.prototype = Object.create(PIXI.Graphics.prototype);
PWall.prototype.constructor = PIXI.Graphics;
PWall.prototype.update = function (boid) {
    if (this.animate)this.animate();
}


module.exports = PWall;