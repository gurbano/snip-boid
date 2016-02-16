var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var AbstractPixiTarget = require('./AbstractPixiTarget');
var PCircle = require('./components/Circle.pixi');

var PixiWall = function (source) {
	var self = this;	
	if (!(this instanceof PixiWall)) return new PixiWall(source);
	AbstractPixiTarget.call(this, source); //extends pixi.container    
	this.type = 'PixiWall';
	this.position = {x:0, y:0};
    this.pstart = new PCircle(source, {
        draggable: true,
        radius: 5,
        color: WHITE,
    });
    this.pend = new PCircle(source, {
        draggable: true,
        radius: 5,
        color: RED,
    });
    this.addChild(this.pstart);
    this.pstart.updateSource = function(data) {
        var new_position = this.position;
        if (this.source.onTargetUpdate){
            this.source.onTargetUpdate(this, {type:'start'});
        }
    };
    this.pend.updateSource = function(data) {
        var new_position = this.position;
        if (this.source.onTargetUpdate){
            this.source.onTargetUpdate(this, {type:'end'});
        }
    };
    this.addChild(this.pend);
    return this;		
}
/*PROTO INHERITANCE*/
PixiWall.prototype = Object.create(AbstractPixiTarget.prototype);
PixiWall.prototype.constructor = AbstractPixiTarget;
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
}
PixiWall.prototype.update = function (source, data) {
    this.debug  =data.debug;
	this.start = source.start;
	this.end = source.end;
    if (!this.dragging){    
        this.pstart.position.x = source.start.x;
        this.pstart.position.y = source.start.y;
        this.pend.position.x = source.end.x;
        this.pend.position.y = source.end.y;
        this.intersection = source.intersection;
        this.norm = source.norm;
    }
	this.render();
    this.pstart.render();
    this.pend.render();
};


module.exports = PixiWall;