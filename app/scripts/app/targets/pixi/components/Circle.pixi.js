var RED = 0xFF0000;
var gu = require('../../../../utils');
var AbstractPixiTarget = require('./../AbstractPixiTarget');

var PixiCircle = function (source, opts) {
	var self = this;	
	if (!(this instanceof PixiCircle)) return new PixiCircle(source);
	AbstractPixiTarget.call(this, source); //extends pixi.container    
	this.type = 'PixiCircle';
	this.position = {x:0, y:0};
    this.color = opts.color || gu.color();
    return this;		
}
/*PROTO INHERITANCE*/
PixiCircle.prototype = Object.create(AbstractPixiTarget.prototype);
PixiCircle.prototype.constructor = AbstractPixiTarget;
PixiCircle.prototype.render = function () {
	this.clear();
    this.beginFill(this.color);
    this.fillAlpha = 0.66;
    this.lineStyle(1,0xffffff);
    this.drawCircle(0,0, Math.abs(this.radius || 10) );
    this.endFill();   
    this.moveTo(- this.radius,- this.radius);
    this.lineTo(this.radius, this.radius);
}
PixiCircle.prototype.update = function (source,data) {
	this.render();
};


module.exports = PixiCircle;