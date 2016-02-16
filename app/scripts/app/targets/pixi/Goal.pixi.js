var RED = 0xFF0000;
var gu = require('../../../utils');
var AbstractPixiTarget = require('./AbstractPixiTarget');

var PixiGoal = function (source) {
	var self = this;	
	if (!(this instanceof PixiGoal)) return new PixiGoal(source);
	AbstractPixiTarget.call(this, source); //extends pixi.container    
	this.type = 'PixiGoal';
	this.position = {x:0, y:0};
    this.color = gu.color();
    return this;		
}
/*PROTO INHERITANCE*/
PixiGoal.prototype = Object.create(AbstractPixiTarget.prototype);
PixiGoal.prototype.constructor = AbstractPixiTarget;
PixiGoal.prototype.render = function () {
	this.clear();
    this.lineStyle(0,0x000000);
    if (this.debug){
        this.beginFill(0x888888);
        this.fillAlpha = 0.5;// * this.force/500 ;
        this.drawCircle(0,0, Math.abs(this.radius + this.distance || 100) );
        this.endFill(); 
    }        
    this.beginFill(this.color);
    this.fillAlpha = 0.66;
    this.lineStyle(1,0xffffff);
    this.drawCircle(0,0, Math.abs(this.radius || 10) );
    this.endFill();   
    this.moveTo(- this.radius, 0);
    this.lineTo(this.radius, 0);
}
PixiGoal.prototype.update = function (source,data) {
    if (!this.dragging){
        this.radius = source.radius
        this.distance = source.distance;
        this.force = source.force;
        this.debug = data.debug;
        this.position.x = source.getPosition().x;
        this.position.y = source.getPosition().y;
    }
	this.render();
};


module.exports = PixiGoal;