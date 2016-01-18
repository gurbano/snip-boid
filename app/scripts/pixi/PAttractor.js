var RED = 0xFF0000;
var WHITE = 0xFFFFFF;

var PAttractor = function (opts) {
	var self = this;
	if (!(this instanceof PAttractor)) return new PAttractor(opts);
	PIXI.Graphics.call(this); //extends pixi.container
    this.beginFill(WHITE);
    this.drawCircle(0,0, Math.abs(opts.radius || 10) );
    this.position.x = opts.x || 0;
    this.position.y = opts.y || 0; 
	this.endFill(); 

	this.radius = opts.radius || 10;
	this.force = opts.force || 10;
	this.distance = opts.distance || 1; //distance multip

    this.getPosition = function () {return this.position};


    return this;		
}



/*PROTO INHERITANCE*/
PAttractor.prototype = Object.create(PIXI.Graphics.prototype);
PAttractor.prototype.constructor = PIXI.Graphics;


module.exports = PAttractor;