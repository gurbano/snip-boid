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


BoidImplementation3.prototype.step = function(boid, boids, data) {
	var loc = V(boid); //position
	var vel = VV(boid.getSpeed()); //velocity
	var acc = VVV(0,0);
	var maxspeed = data.sLimit;
	var maxforce = data.aLimit;
	
	/*Separation, Cohesion, Alignement*/
	var sca = this.sca(boid, boids, data);	
	acc.add(sca);	
	/*attractors/bouncers*/
	var attractors = this.attractor(boid, data.attractors || []);
	acc.add( attractors );	
	/*goals*/
	var goals = this.goal(boid, data.goals || []);
	acc.add( goals );	


	acc = limit(acc, maxforce);


	vel = vel.clone().add(acc);
    vel = limit(vel, maxspeed);
    loc = loc.clone().add(vel);
    boid.setPosition(loc.x, loc.y);
    boid.setSpeed(vel.x, vel.y);
    boid.setAcc(acc.x, acc.y);
};

BoidImplementation3.prototype.attractor = function (boid, attractors) {
	var ret = VVV(0,0);
	var startPos = utils.v(boid.getPosition().x,boid.getPosition().y,0);
	var loc = V(boid);
	for (var i = attractors.length - 1; i >= 0; i--) {
		var attractor = attractors[i];
		var aPos = utils.v(attractor.getPosition().x, attractor.getPosition().y, 0);
		var dist = startPos.distanceFrom(aPos);
		var otherloc = V(attractor);
		var distance = V(boid).subtract(otherloc).magnitude();
		var distanceLimit = attractor.distance + attractor.radius;
		if (distance > attractor.radius  && distance < distanceLimit){//distance check
			var force = loc.clone().subtract(otherloc);
			force.divide(VVV(distance - attractor.radius,distance - attractor.radius));
			force = force.multiply(VVV(attractor.force,attractor.force));
			ret.add(force);
		}else if(distance>0 && distance <= attractor.radius){
			var force = loc.clone().subtract(otherloc);
			force = force.multiply(VVV(attractor.force * 5,attractor.force * 5));
			ret.add(force);
		}	
	};
	return ret;
}

BoidImplementation3.prototype.goal = function (boid, attractors) {
	var ret = VVV(0,0);
	var startPos = utils.v(boid.getPosition().x,boid.getPosition().y,0);
	var loc = V(boid);
	for (var i = attractors.length - 1; i >= 0; i--) {
		var attractor = attractors[i];
		var aPos = utils.v(attractor.getPosition().x, attractor.getPosition().y, 0);
		var dist = startPos.distanceFrom(aPos);
		var otherloc = V(attractor);
		var distance = V(boid).subtract(otherloc).magnitude();
		var distanceLimit = attractor.distance + attractor.radius;		
		var force = loc.clone().subtract(otherloc);
		force.divide(VVV(distance - attractor.radius,distance - attractor.radius));
		force = force.multiply(VVV(attractor.force,attractor.force));
		ret.add(force.normalize());
	};
	return ret;
}

BoidImplementation3.prototype.sca = function (boid, boids, data) {
	var separation = VVV(0,0) ;
	var cohesion = VVV(0,0) ;
	var alignement = VVV(0,0) ;
	for (var i = boids.length - 1; i >= 0; i--) {
		var other = boids[i];
		if (other.id != boid.id){
      		var distance = V(boid).subtract(V(other)).magnitude();
      		if (distance < data.sepD){
      			separation.add(V(boid).subtract(V(other)));
      		}else{
	      		if (distance < data.cohD){cohesion.add(V(boid).subtract(V(other)));}
    	  		if (distance < data.aliD){alignement.add( VV(other.getSpeed()) );}      			
	      	}
		}
	};
	var force = VVV(0,0);
	if (separation.magnitude()>0){force = force.add(separation.normalize().multiply(VVV(data.sepW,data.sepW) ) );}
	if (cohesion.magnitude()>0){force = force.subtract(  cohesion.normalize().multiply(VVV(data.cohW,data.cohW))  );}
	if (alignement.magnitude()>0){	force = force.subtract( alignement.normalize().multiply(VVV(data.aliW,data.aliW)));}
	return force;
}

var limit = function (vector, max) {
	var ret = vector.clone();
	if (ret.magnitude() > max) {
      ret.normalize().multiply(VVV(max,max));
    }
    return ret;
}

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
var VVVV = function (arr) {
	return new Victor(arr[0],arr[1]);
}
module.exports = BoidImplementation3;