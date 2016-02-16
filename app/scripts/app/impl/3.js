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
	sca = limit(sca, maxforce * data.scaWP);	
	acc.add(sca.clone().multiply(VVV(data.scaWP,data.scaWP) ));

	/*attractors/bouncers*/
	var attractors = this.attractor(boid, data.attractors || []);
	attractors = limit(attractors, maxforce * data.attrWP);
	acc.add( attractors.clone().multiply(VVV(data.attrWP,data.attrWP)) );	
	
	/*goals*/
	var goals = this.goal(boid, data.goals || []);
	goals = limit(goals, maxforce * data.goalWP);
	acc.add( goals.clone().multiply(VVV(data.goalWP,data.goalWP)) );	
	/**/
	var walls = this.cwall(boid, data.walls || []);
	walls = limit(walls, maxforce*data.attrWP*10);
	acc.add( walls.clone().multiply(VVV(data.attrWP,data.attrWP)) );	

	

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
	var loc = V(boid).add(VV(boid.getSpeed()));
	for (var i = attractors.length - 1; i >= 0; i--) {
		var attractor = attractors[i];
		var otherloc = V(attractor);
		var distance = V(boid).subtract(otherloc).magnitude();
		var distanceLimit = attractor.distance + attractor.radius;
		if (distance > attractor.radius  && distance < distanceLimit){//distance check
			var force = loc.clone().subtract(otherloc);
			force.divide(VVV(distance - attractor.radius,distance - attractor.radius));
			force = force.multiply(VVV(attractor.force,attractor.force));
			ret.add(force);
		}else if(distance>0 && distance <= attractor.radius){
			var force = V(boid).subtract(otherloc);
			force = force.multiply(VVV(attractor.force * 5,attractor.force * 5));
			ret.add(force);
		}	
	};
	return ret;
}
function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

var isInside =  function (p, start, end) {
        return ((start.x <= p.x && end.x >= p.x) || (start.x >= p.x && end.x <= p.x) ) &&
        		((start.y <= p.y && end.y >= p.y) || (start.y >= p.y && end.y <= p.y));
    };
BoidImplementation3.prototype.cwall = function (boid, walls) {
	var ret = VVV(0,0);
	var loc = V(boid);
	
	for (var i = walls.length - 1; i >= 0; i--) {
		var wall = walls[i];

		var spd = VV(boid.getSpeed());
		var locSpeed = V(boid).add(spd.clone().multiply(VVV(wall.distance,wall.distance)));		
		var distance = wall.getDistanceFrom(loc.x+spd.x,loc.y+spd.y);
		var distanceCheck = wall.distance;
		var proj = utils.getLineEq(
			{x: boid.getPosition().x, y: boid.getPosition().y},
			{x: boid.getPosition().x + boid.getSpeed().x, y: boid.getPosition().y + boid.getSpeed().y},
		);
		var inter = utils.lineInterception(proj, wall.getLineEq());

		if (inter && wall.isInside(inter) && isInside(inter, loc, locSpeed) && distance<distanceCheck){			
			wall.intersection = inter;
			var norm;
			var norm0 = VVV((wall.end.y - wall.start.y), -(wall.end.x - wall.start.x)).normalize().multiply(VVV(100,100));
			var norm1 = VVV( - (wall.end.y - wall.start.y), (wall.end.x - wall.start.x)).normalize().multiply(VVV(100,100));
			var t0 = {x: inter.x + norm0.x, y: inter.y + norm0.y};
			var t1 = {x: inter.x + norm1.x, y: inter.y + norm1.y};
			if (utils.distToPoint(loc,t0)<utils.distToPoint(loc,t1)){
				norm = norm0;	
			}else{
				norm = norm1;
			}	
			wall.norm = norm.clone();
			var distanceFromIntersection = utils.distToPoint(inter, {x: boid.getPosition().x, y: boid.getPosition().y});

			var v = locSpeed.clone().subtract(loc).normalize();
			var n = norm.clone().normalize();
			var u1 = (v.clone().dot(n) / n.clone().dot(n)); //this should be 1 if normalized
			var u = n.clone().multiply(VVV(u1,u1)); //u = (v · n / n · n) n 
			var w = v.clone().subtract(u); //w = v − u			
			var ret0 = w.clone().subtract(u); //v′ = w − u
			ret = ret.add(ret0.clone().multiply( VVV(wall.force, wall.force) ).divide(VVV(distance,distance)));
		}else{
			wall.intersection = undefined;
			wall.norm = undefined;
		}
		
	};
	return ret;
}




var lineSegmentIntersection = function(r0,r1,a,b)
{
    var s1, s2;
    s1 = r1.clone().subtract(r0); 
    s2 = b.clone().subtract(a);

    var s, t;
    s = (-s1.y * (r0.x - a.x) + s1.x * (r0.x - a.x)) / (-s2.x * s1.y + s1.x * s2.y);
    t = (s2.y * (r0.y - a.y) - s2.y * (r0.x - a.x)) / (-s2.x * s1.y + s1.x * s2.y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        return VVV(r0.x + (t * s1.x), r0.y + (t * s1.y));
    }

    return null; // No collision
}




BoidImplementation3.prototype.goal = function (boid, attractors) {
	var ret = VVV(0,0);
	var loc = V(boid);
	for (var i = attractors.length - 1; i >= 0; i--) {
		var attractor = attractors[i];
		var otherloc = V(attractor);
		var distance = V(boid).subtract(otherloc).magnitude();
		var distanceLimit = attractor.distance + attractor.radius;		
		var force = loc.clone().subtract(otherloc);
		force.divide(VVV(distance - attractor.radius,distance - attractor.radius));
		force = force.multiply(VVV(attractor.force,attractor.force));
		ret.add(force);
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