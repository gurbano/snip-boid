var utils = require('../../utils');
var Victor = require('victor'); //http://victorjs.org/


//based on http://www.kfish.org/boids/pseudocode.html
var BoidImplementation3 = function BoidImplementation3(opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof BoidImplementation3)) return new BoidImplementation3(opts);
}
BoidImplementation3.prototype.info = function() {
	console.info('-- new boids impl - 10/02/2016 ');
	console.info(this);
	console.info('Info', 0.1);
};
BoidImplementation3.prototype.step = function(boid, neighbors, data) {
	var coh =  this.steerTo(V(boid), VV(boid.getSpeed()), this.coh(boid, neighbors, data), data).multiply(VV(data.cohW,data.cohW));//this.coh(boid, neighbors, data);
	var sep =  this.sep(boid, neighbors, data).multiply(VV(data.sepW,data.sepW));

	var forces = [
		coh,
		sep];
	this.applyForces(boid,
			forces,
			data);		
};
BoidImplementation3.prototype.applyForces = function (boid, forces, data) {
	var speed = VV(boid.getSpeed()); //residual speed
	var f = new Victor(0,0);
	for (var i = 0; i < forces.length; i++) {
		f = f.add(forces[i]); //array of vectors						
	};
	//f = limit(f, data.aLimit, data);
	speed = speed.add(f);

	boid.setSpeed(speed.x,speed.y,0);
	var pos = boid.getPositionV();
	pos = pos.add(boid.getSpeedV().multiply(1/data.sRatio ));
	boid.setPositionV(pos);
};

BoidImplementation3.prototype.coh = function(boid, neighbors, data) {
	var sum = new Victor(0,0);
	var count = 0;
	var location = V(boid);
	for (var i = neighbors.length - 1; i >= 0; i--) {
		var other = neighbors[i];
		if (other.id != boid.id){
			var nPos = V(other);
			var dist = location.distanceSq(nPos);
			if (Math.sqrt(dist) < data.cohD){//distance check
				sum = sum.add(nPos);
				count++;
			}
		}
	}
	 if (count > 0)
      {return sum.divide(new Victor(count,count))}
    else
      {return sum;}	
};
BoidImplementation3.prototype.sep = function(boid, neighbors, data) {
	var mean = new Victor(0,0);
	var count = 0;	
	for (var i = neighbors.length - 1; i >= 0; i--) {
		var location = V(boid);
		var other = neighbors[i];
		if (other.id != boid.id){
			var nPos = V(other);
			var dist = Math.sqrt(location.distanceSq(nPos));
			if (dist < data.sepD){//distance check
				//sum = sum.add(nPos);
				if (dist>0){
					mean.add(location.subtract(nPos).normalize().divide(new Victor(dist,dist)));					
				}else{
					mean.add(location.subtract(nPos).normalize());
				}
				count++;
			}
		}
	}
	 if (count > 0)
      {return mean.divide(new Victor(count,count));}
    else
      {return mean;}	
};
BoidImplementation3.prototype.steerTo = function(boidV, speedV, targetV, data) {
    var desired = targetV.subtract(boidV);
    var d = desired.magnitude();
    var steer = VVV(0,0);
    if (d > 0){
        desired.normalize();
        steer = desired.subtract(VV(speedV,speedV));
    }
    return steer;
};


var V = function (boid) {
	let pos = boid.getPosition();
	return  new Victor(pos.x,pos.y);
}
var VV = function (vec) {
	return new Victor(vec.x,vec.y);
}
var VVV = function (x,y) {
	return new Victor(x,y);
}
module.exports = BoidImplementation3;