var RED = 0xFF0000;
var WHITE = 0xFFFFFF;
var GRAY = 0x323232;

var PBoid = function (opts) {
	var self = this;
    opts = opts || {};
	if (!(this instanceof PBoid)) return new PBoid(opts);
	PIXI.Graphics.call(this); //extends pixi.container    
    this.animate = opts.animate;
    this.render = opts.render || function () {
        this.beginFill(GRAY);
        this.moveTo(0,0);    
        this.lineTo(-10, 15);
        this.lineTo(10, 0);
        this.lineTo(-10, -15);
        this.endFill();
    };
    this.render();

    

    this.pivot.set(0,0);
    this.position.x = 0;
    this.position.y = 0;
    this.position.z = 0;
    
    return this;		
}

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

var maxz = 0.1; //todo: remove
var maxscale = 1.0; //todo: remove
var minscale = 1.0; //todo: remove

/*PROTO INHERITANCE*/
PBoid.prototype = Object.create(PIXI.Graphics.prototype);
PBoid.prototype.constructor = PIXI.Graphics;
PBoid.prototype.update = function (boid) {
    this.position.x = boid.getPosition().x;
    this.position.y = boid.getPosition().y;
    this.position.z = boid.getPosition().z;
    if (this.position.z){
        if (Math.abs(this.position.z)>maxz){
            if (this.position.z>0)this.position.z=maxz;
            else this.position.z=-maxz;
        }
        //update scale to reflect z
        var newScale = minscale +  (((this.position.z + maxz)/(maxz*2)) * (maxscale-minscale));
        this.scale = new PIXI.Point(newScale,newScale);
    }
    //Update rotation of the pBoid accordin to the speed (direction) of the boid
    var rad = Math.atan2(boid.getSpeed().y ,boid.getSpeed().x); //rotation: atan2(speedy , speedx)
    this.rotation = rad;    
   
    if (this.animate)this.animate(boid);
}


module.exports = PBoid;