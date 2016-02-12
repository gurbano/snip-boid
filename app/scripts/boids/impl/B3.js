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
	/*calculate sep, coh and ali*/
	var newTargetVec = this.flockForce(boid,neighbors,data);
	var force = this.steerTo(boid, newTargetVec, data);
	this.applyForces(boid, force, data);
};

BoidImplementation3.prototype.steerTo = function(boid, targetVec, data) {
	var ret = VVV(0,0);
   	var desiredVelocity = targetVec.clone().subtract(V(boid));
    var force = desiredVelocity.subtract(VV(boid.getSpeed()));
    return force.normalize().multiply(VVV(data.aLimit,data.aLimit));;
};

BoidImplementation3.prototype.flockForce = function(boid, neighbors, data) {
	var separation = VVV(0,0); 
	var cohesion = VVV(0,0); 
	var alignement = VVV(0,0); 

	var sepW = VVV(data.sepW,data.sepW);
	var cohW = VVV(data.cohW,data.cohW);
	var aliW = VVV(data.aliW,data.aliW);


	var pos = V(boid);
	var spd = VV(boid.getSpeed());
	for (var i = neighbors.length - 1; i >= 0; i--) {
		var other = neighbors[i];			
		if (other.id != boid.id){
			var distance = Math.sqrt(pos.distanceSq(V(other)));			
			if (distance == 0){
				//TODO: 
			}else if (distance < data.sepD){
				separation = separation.add(pos.subtract(V(other)));	
			}else{
				if (distance < data.cohD){
					cohesion = cohesion.add(pos.subtract(V(other)));									
				}
				if (distance < data.aliD){
					alignement = alignement.add(spd.subtract(VV(other.getSpeed())));	
				}

				
			}
		}
	}
	/*Sum all contributions*/
	var ret = VVV(0,0,0);
	if (separation.length()>0) 
		separation.normalize().multiply(sepW);
	if (cohesion.length()>0) 
		cohesion.normalize().multiply(cohW);
	if (alignement.length()>0) 
		alignement.normalize().multiply(aliW);
	ret = ret.add(separation).subtract(cohesion).subtract(alignement);
	return ret;	
};




BoidImplementation3.prototype.applyForces = function (boid, force, data) {
	var speed = VV(boid.getSpeed()).add(force);
	var ret = V(boid).add(speed);
    boid.setPosition(ret.x,ret.y);
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