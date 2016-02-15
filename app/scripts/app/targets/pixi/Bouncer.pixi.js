var RED = 0xFFFFFF;
var PixiBouncer = function (opts) {
	var self = this;	
	if (!(this instanceof PixiBouncer)) return new PixiBouncer(opts);
	PIXI.Graphics.call(this); //extends pixi.container    
	this.type = 'PixiBouncer';
	this.position = {x:0, y:0};
    //this.render();
    return this;		
}
/*PROTO INHERITANCE*/
PixiBouncer.prototype = Object.create(PIXI.Graphics.prototype);
PixiBouncer.prototype.constructor = PIXI.Graphics;
PixiBouncer.prototype.render = function () {
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
}
PixiBouncer.prototype.update = function (source) {
	//console.info(arg);
	this.radius = source.radius;
	this.position.x = source.getPosition().x;
	this.position.y = source.getPosition().y;
	this.render();
};


module.exports = PixiBouncer;