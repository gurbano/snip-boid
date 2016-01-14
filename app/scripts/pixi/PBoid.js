var RED = 0xFF0000;
var WHITE = 0xFFFFFF;

var PBoid = function (opts) {
	var self = this;
	if (!(this instanceof PBoid)) return new PBoid(opts);
	PIXI.Graphics.call(this); //extends pixi.container
    this.beginFill(RED);
    this.moveTo(0,0);    
    this.lineTo(-5, 15);
    this.lineTo(5, 15);
    this.endFill();
    this.pivot.set(0,0);
    this.position.x = 0;
    this.position.y = 0;
    return this;		
}


/*PROTO INHERITANCE*/
PBoid.prototype = Object.create(PIXI.Graphics.prototype);
PBoid.prototype.constructor = PIXI.Graphics;


module.exports = PBoid;