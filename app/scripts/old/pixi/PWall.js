var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var BLACK = 0x000000;
var gu = require('../../utils');


var fixOpts = function (opts) {
	if ((opts.start.y)>(opts.end.y) ){
		var tmp = opts.end;
		opts.end = opts.start;
		opts.start = tmp;
	}
}
var PWall = function (opts) {	
	if (!(this instanceof PWall)) return new PWall(opts);
	PIXI.Graphics.call(this); //extends pixi.container
	var self = this;
	this.type = 'wall';
	fixOpts(opts);

	this.start = opts.start;
	this.end = opts.end;
	this.A = opts.end.y - opts.start.y;
	this.B = opts.start.x - opts.end.x;
	this.C = this.A * opts.start.x+this.B*opts.start.y;
	this.M = (opts.end.y - opts.start.y) / (opts.end.x - opts.start.x );		
	this.isVertical = Math.abs(this.end.x - this.start.x) < 0.00001 ;	
	this.isHorizontal = Math.abs(this.end.y - this.start.y) < 0.00001 ;
	
	
	this.Y = function (x) {
		return this.M * x;
	};

	this.animate = opts.animate || function () {
		this.clear();
		if (this.intersection&&this.debug){
			this.lineStyle(2,0xf05522);
			this.beginFill(0xf05522);
		    this.drawCircle(this.intersection.x,this.intersection.y,6);				    
		    this.endFill();
		    if (this.norm){
				this.moveTo(this.intersection.x,this.intersection.y);
				this.lineTo(this.intersection.x + this.norm.x, this.intersection.y + this.norm.y);
				this.moveTo(this.intersection.x,this.intersection.y);
			}
		}
		this.render();
	};
    this.render = opts.render || function () {
    	this.beginFill();
        this.lineStyle(3, WHITE);    
	    this.moveTo(opts.start.x,opts.start.y);
	    this.lineTo(opts.end.x,opts.end.y);	    
		

		this.lineStyle(3, WHITE);    
		this.drawCircle(opts.start.x,opts.start.y, 2 );
		this.lineStyle(3, RED);

	    this.drawCircle(opts.end.x,opts.end.y, 2 );

	    this.endFill(); 
    };
    this.render();
	
    function dd(P1, P2, P0) {
		var x1 = P1.x, x2=P2.x, y1 = P1.y, y2 = P2.y, x0 = P0.x, y0 = P0.y;
		return  Math.abs( ((y2-y1)*x0) - ((x2-x1)*y0) + x2*y1 - y2*x1 ) / Math.sqrt( ((y2-y1)*(y2-y1)) + ((x2-x1)*(x2-x1)) );
	}



	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip
	this.radius = opts.radius || 10;

    this.getPosition = function () {return this.position};
    this.getPositionV = function () {return gu.v(this.position.x, this.position.y, this.position.z)};
    this.getDistanceFrom = function (x,y) {
    	//return gu.distToSegment({x: x, y:y},this.start, this.end);
    	return dd(this.start, this.end,{x: x, y:y} );
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
  	this.isInside = function (p) {
  		var err = 2;
  		p.x = Math.floor(p.x);
  		p.y = Math.floor(p.y);
        return ((this.start.x -err <= p.x && this.end.x +err >= p.x) || (this.start.x +err >= p.x && this.end.x -err <= p.x  ) ) &&
        		((this.start.y -err <= p.y && this.end.y +err >= p.y) || (this.start.y +err >= p.y && this.end.y -err <= p.y));
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