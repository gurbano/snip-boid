var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var gu = require('../../utils');

var PAttractor = function (opts) {
	var self = this;
	this.type = 'attractor';
	if (!(this instanceof PAttractor)) return new PAttractor(opts);
	PIXI.Graphics.call(this); //extends pixi.container

    this.animate = opts.animate || function  (argument) {
        this.clear();
        this.lineStyle(0,0x000000);
        if (this.debug){
            this.beginFill(0x888888);
            this.fillAlpha = 0.06;
            this.drawCircle(0,0, Math.abs(this.radius + this.distance || 10) );
            this.endFill(); 
        }        
        this.beginFill(RED);
        this.lineStyle(1,0x000000);
        this.drawCircle(0,0, Math.abs(this.radius || 10) );
        this.endFill();   
    };
    this.render = opts.render || function () {      
        this.position.x = opts.x || 0;
        this.position.y = opts.y || 0; 
        this.position.z = opts.z || 0;         
    };
    this.render();
    

    
	this.radius = opts.radius || 10;
	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip

    this.getPosition = function () {return this.position};
    this.getPositionV = function () {return gu.v(this.position.x, this.position.y, this.position.z)};
	this.getDistanceFrom = function (x,y) {
    	return gu.distToPoint({x: x, y:y}, this.position);
    }
    return this;		
}



/*PROTO INHERITANCE*/
PAttractor.prototype = Object.create(PIXI.Graphics.prototype);
PAttractor.prototype.constructor = PIXI.Graphics;
PAttractor.prototype.update = function () {
    this.animate();
}

module.exports = PAttractor;