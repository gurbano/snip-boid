var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var GRAY = 0x323232;
var Victor = require('victor');

var PBoidW = function (opts) {
    var self = this;
    opts = opts || {};
    if (!(this instanceof PBoidW)) return new PBoidW(opts);
    PIXI.Graphics.call(this); //extends pixi.container   

    this.body = new Body(opts);
    this.addChild(this.body);
    this.render = function () {
        this.body.render();
    }
    this.animate = function (boid) {
        this.clear();
        this.drawLine(0xFFFFFF, this.acc[0] ,this.acc[1], 150);
        this.drawLine(RED, this.speed[0] ,this.speed[1], 10);
        this.body.animate(boid);
    }
    this.update = function  (boid) {
        this.position.x = boid.getPosition().x;
        this.position.y = boid.getPosition().y;
         //Update rotation of the pBoid accordin to the speed (direction) of the boid
        var speed = [boid.getSpeed().x, boid.getSpeed().y];
        this.speed = speed;
        this.acc = [boid.getAcc().x, boid.getAcc().y];
        this.body.update(boid);
        this.animate(boid);
    }
    this.render();

    return this; 
}
PBoidW.prototype = Object.create(PIXI.Graphics.prototype);
PBoidW.prototype.constructor = PIXI.Graphics;
PBoidW.prototype.drawLine = function (color, x,y, ratio) {
    this.lineStyle(2,color);
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

var Body = function (opts) {
	var self = this;
    opts = opts || {};
	if (!(this instanceof Body)) return new Body(opts);
	PIXI.Graphics.call(this); //extends pixi.container    
    this.animate = opts.animate || function (boid) {
        var speed = [boid.getSpeed().x, boid.getSpeed().y];
        var rad = Math.atan2(speed[1] ,speed[0]); //rotation: atan2(speedy , speedx)
        this.rotation = rad;
    };
    this.render = opts.render || function () {
        this.beginFill(GRAY);
        this.moveTo(0,0);    
        this.lineTo(-10, 15);
        this.lineTo(10, 0);
        this.lineTo(-10, -15);
        this.endFill();
    };
    this.update = function (boid) {
        //Update rotation of the pBoid accordin to the speed (direction) of the boid
        var speed = [boid.getSpeed().x, boid.getSpeed().y];
        this.speed = speed;
        this.acc = [boid.getAcc().x, boid.getAcc().y];
    }
    this.pivot.set(0,0);
    this.position.x = 0;
    this.position.y = 0;
    this.position.z = 0;

    this.speed = [];
    
    return this;		
}

Body.prototype = Object.create(PIXI.Graphics.prototype);
Body.prototype.constructor = PIXI.Graphics;



module.exports = PBoidW;















var Target = function () {
    PIXI.Graphics.call(this); //extends pixi.container
    this.beginFill(WHITE);
    this.drawCircle(0,0, Math.abs(5) );
    this.endFill();
    this.pivot.set(0,0);
    return this;
}
Target.prototype = Object.create(PIXI.Graphics.prototype);
Target.prototype.constructor = PIXI.Graphics;