var Victor = require('victor');
var AbstractPixiTarget = require('./AbstractPixiTarget');

var RED = 0xFF00FF;

var PixiBoid = function (source) {
	var self = this;	
	if (!(this instanceof PixiBoid)) return new PixiBoid(source);
	AbstractPixiTarget.call(this, source); //extends pixi.container    
	this.type = 'PixiBoid';
	this.position = {x:0, y:0};
	//this.body = new PixiBoidBody(source);
    this.body = this.addChild(new PIXI.Sprite.fromImage('/images/player.png'));
    this.body.anchor.set(0.5, 0.5)
    this.addChild(this.body);
    //this.render();
    return this;		
}
/*PROTO INHERITANCE*/
PixiBoid.prototype = Object.create(AbstractPixiTarget.prototype);
PixiBoid.prototype.constructor = AbstractPixiTarget;
PixiBoid.prototype.render = function () {
	//this.clear();
	if (this.debug){
        this.drawLine(0xFFFFFF, this.acc[0] ,this.acc[1], 100);
    	this.drawLine(RED, this.speed[0] ,this.speed[1], 10);
    }
}
PixiBoid.prototype.update = function (source) {
	//console.info(arg);
	this.debug = source.debug;
	this.position.x = source.getPosition().x;
	this.position.y = source.getPosition().y;
	this.speed = [source.getSpeed().x, source.getSpeed().y];
    this.acc = [source.getAcc().x, source.getAcc().y];
	this.render();
    if(this.body.update){this.body.update(source);}
    var speed = [source.getSpeed().x, source.getSpeed().y];
    var rad = Math.atan2(speed[1] ,speed[0]); //rotation: atan2(speedy , speedx)
    this.body.rotation = rad;
    
};
PixiBoid.prototype.drawLine = function (color, x,y, ratio) {
    this.lineStyle(1,color);
    this.fillAlpha = 0.06;
    this.beginFill();
    this.moveTo(0,0);
    var acc = new Victor(x,y);
    var m = (ratio || 30) * acc.magnitude();
    //s = new Victor(1, 0);
    acc.normalize().multiply(new Victor(m,m));
    //s = s.rotateBy(-rad);
    this.lineTo(acc.x,acc.y);
    this.lineTo(0,0);
    this.endFill();                         
}




/*-------------------------------------BODY */
var PixiBoidBody = function (source) {
	var self = this;
	if (!(this instanceof PixiBoidBody)) return new PixiBoidBody(source);
	AbstractPixiTarget.call(this, source); //extends pixi.container    
    this.update = function (boid) {
        //Update rotation of the pBoid accordin to the speed (direction) of the boid
        this.debug = boid.debug;
        this.render();
    }
    this.pivot.set(0,0);
    this.position.x = 0;
    this.position.y = 0;
    this.position.z = 0;
    

    
    
    return this;		
}

PixiBoidBody.prototype = Object.create(AbstractPixiTarget.prototype);
PixiBoidBody.prototype.constructor = AbstractPixiTarget;
PixiBoidBody.prototype.render = function() {
    this.clear();
	this.beginFill(RED);
    this.drawCircle(0,0, Math.abs(3) );
	this.endFill(); 

};


module.exports = PixiBoid;