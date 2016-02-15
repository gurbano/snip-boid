var RED = 0xFF0000;
var PixiBoid = function (opts) {
	var self = this;	
	if (!(this instanceof PixiBoid)) return new PixiBoid(opts);
	PIXI.Graphics.call(this); //extends pixi.container    
	this.type = 'PixiBoid';
	this.position = {x:0, y:0};
    //this.render();
    return this;		
}
/*PROTO INHERITANCE*/
PixiBoid.prototype = Object.create(PIXI.Graphics.prototype);
PixiBoid.prototype.constructor = PIXI.Graphics;
PixiBoid.prototype.render = function () {
	this.clear();
	this.beginFill(RED);
    this.drawCircle(0,0, Math.abs(3) );
	this.endFill(); 
}
PixiBoid.prototype.update = function (source) {
	//console.info(arg);
	this.position.x = source.getPosition().x;
	this.position.y = source.getPosition().y;
	this.render();
};


module.exports = PixiBoid;