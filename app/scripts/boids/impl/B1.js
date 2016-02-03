var utils = require('../../utils');



 
var BoidImplementation1 = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof BoidImplementation1)) return new BoidImplementation1(opts);
	this.info = function () {
		console.info('Boids Implementation: ');
		console.info(this);
		console.info('Info', 0.1);
	}
	this.step = function (boid, neighbors, data) {
		var bounce = [0,0];
		var bounceWall = [0,0];
		var goal = [0,0];
		if (data.attractors){
			bounce = calculateBounce(boid,data.attractors);
		}
		if (data.walls){
			bounceWall = calculateBounceWall(boid,data.walls);
		}
		if (data.goals){
			goal = calculateBounce(boid,data.goals);
		}

		var acc = calculateForces(boid,neighbors,data);
		
		applyForces(
			boid,  
			{x: acc[0]  + bounceWall[0] + bounce[0] + goal[0], y: acc[1]  + bounceWall[1] + bounce[1] + goal[1]},
			data);
		//console.info(boid);
	}
	/*private*/

	var calculateBounce = function (boid, attractors) {
		var ret = [0,0];
		var startPos = utils.v(boid.getPosition().x,boid.getPosition().y,0);
		for (var i = attractors.length - 1; i >= 0; i--) {
			var attractor = attractors[i];
			var aPos = utils.v(attractor.getPosition().x, attractor.getPosition().y, 0);
			var dist = startPos.distanceFrom(aPos);
			var distanceLimit = attractor.distance + attractor.radius;
			if (dist < distanceLimit){//distance check
			var force = startPos.subtract(attractor.getPositionV()); 
				force = force.multiply((distanceLimit - dist)/distanceLimit ); // linear decrease with distance
				force = force.multiply((distanceLimit - dist)/distanceLimit ); // linear decrease with distance
				force = force.multiply(attractor.force);
				ret[0] = ret[0] + force.e(1);	
				ret[1] = ret[1] + force.e(2);	
			}
		};
		return ret;
	}
	var calculateBounceWall = function (boid, attractors) {
		var ret = [0,0];
		for (var i = attractors.length - 1; i >= 0; i--) {
			var attractor = attractors[i];
			var proj = utils.getLineEq(
						{x: boid.getPosition().x, y: boid.getPosition().y},
						{x: boid.getPosition().x + boid.getSpeed().x, y: boid.getPosition().y + boid.getSpeed().y},
			);
			var intersection = utils.lineInterception(proj, attractor.getLineEq());
			if (intersection){
				var distanceFromIntersection = utils.distToPoint(intersection, {x: boid.getPosition().x, y: boid.getPosition().y});
				var distanceCheck = (attractor.radius  * attractor.radius) * (attractor.distance);
				if ( distanceFromIntersection * distanceFromIntersection  < distanceCheck ){
					var dx =  boid.getPosition().x - intersection.x;
					var dy =  boid.getPosition().y - intersection.y;
			        ret[1] = ret[1] + (attractor.force * dx / Math.abs(distanceFromIntersection)) || 0;
			        ret[0] = ret[0] - (attractor.force * dy / Math.abs(distanceFromIntersection)) || 0;	
		        	console.info(dx, dy, ret);
				}
			}else{
				//boid is parallel
			}
		};
		return ret;
	}

	/*Apply forces*/
	var applyForces = function (boid, acc, data) {
		var accSq = acc.x*acc.x + acc.y*acc.y;
        if (accSq > data.aLimit) {
          var ratio = data.aLimit / Math.sqrt(accSq);
          acc.x =  acc.x * ratio;
          acc.y =  acc.y * ratio;
        }       

		var sx = boid.getSpeed().x + acc.x;
		var sy = boid.getSpeed().y + acc.y;		
		//todo: limit speed
		var speedSq = sx*sx + sy*sy;
        if (speedSq > data.sLimit) {
          var ratio = data.sLimit / Math.sqrt(speedSq);
          sx =  sx * ratio;
          sy =  sy * ratio;
        }
        boid.setSpeed(sx,sy);

		//apply speed
		var px = boid.getPosition().x + boid.getSpeed().x;
    	var py = boid.getPosition().y + boid.getSpeed().y;
    	boid.setPosition(px,py);
		
	}
	var calculateForces = function(boid, neighbors, data) {
		//console.info('boid', boid.id, 'neighbors', neighbors.length);	
		var length = 0;
		//var sForce = {x:0, y:0};
		//var cForce = {x:0, y:0};
		//var aForce = {x:0, y:0};		
		var sForce = [0,0]; 
		var cForce = [0,0];
		var aForce = [0,0];
		var px = boid.getPosition().x;
		var py = boid.getPosition().y;
		for (var i = neighbors.length - 1; i >= 0; i--) {
			var other = neighbors[i];			
			if (other.id != boid.id){
						/*calc distance*/
						var dx =  px - other.getPosition().x;
			      		var dy =  py - other.getPosition().y;
			      		var dsquare = (dx*dx) + (dy*dy);
			      		if (dsquare < data.sepD*data.sepD){
				      		sForce[0] +=dx;
				      		sForce[1] +=dy;
				      	}
				      	else{
				      		if (dsquare < data.cohD*data.cohD){
					      		cForce[0] +=dx;
			    	  			cForce[1] +=dy;	
			    	  		}
			    	  		if (dsquare < data.aliD*data.aliD){
			    	  			aForce[0] += other.getSpeed().x;
			      				aForce[1] += other.getSpeed().y;
			    	  		}      			
				      	}
			}
		};
		//console.info(sForce, cForce, aForce);
		var acc = [0,0];//;
		//separation
		length = Math.sqrt(sForce[0]*sForce[0] + sForce[1]*sForce[1]);		
		acc[0] += data.sepW * (sForce[0] / length) || 0;
		acc[1] += data.sepW * (sForce[1] / length) || 0;
		//cohesion
		length = Math.sqrt(cForce[0]*cForce[0] + cForce[1]*cForce[1]);		
		acc[0] -= data.cohW * (cForce[0] / length) || 0;
		acc[1] -= data.cohW * (cForce[1] / length) || 0;
		//align
		length = Math.sqrt(aForce[0]*aForce[0] + aForce[1]*aForce[1]);		
		acc[0] -= data.aliW * (aForce[0] / length) || 0;
		acc[1] -= data.aliW * (aForce[1] / length) || 0;

		return acc;
	};


	return this;
}

module.exports = BoidImplementation1;


