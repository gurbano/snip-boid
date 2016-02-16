var RED = 0xFF0000;
var WHITE = 0xFFFFFF;


var PixiWall = function (opts) {
	var self = this;	
	if (!(this instanceof PixiWall)) return new PixiWall(opts);
	PIXI.Graphics.call(this); //extends pixi.container    
	this.type = 'PixiWall';
	this.position = {x:0, y:0};
    return this;		
}
/*PROTO INHERITANCE*/
PixiWall.prototype = Object.create(PIXI.Graphics.prototype);
PixiWall.prototype.constructor = PIXI.Graphics;
PixiWall.prototype.render = function () {
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
    this.beginFill();
    this.lineStyle(3, WHITE);    
    this.moveTo(this.start.x,this.start.y);
    this.lineTo(this.end.x,this.end.y);     
    this.endFill();

    this.beginFill(0xf05522);
    this.lineStyle(4, WHITE);   
    this.drawCircle(this.start.x,this.start.y, 2 );//start edge 
    this.lineStyle(4, RED);
    this.drawCircle(this.end.x,this.end.y, 2 );//end edge 

    this.endFill();  
}
PixiWall.prototype.update = function (source, data) {
    this.debug  =data.debug;
	this.start = source.start;
	this.end = source.end;
    this.intersection = source.intersection;
    this.norm = source.norm;
	this.render();
};


module.exports = PixiWall;