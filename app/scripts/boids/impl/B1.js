var sepD = 30;
var cohD = 500;
var aliD = 110;

var sepW = 35.0;
var cohW = 5.0;
var aliW = 10.5;

var aLimit = 1;
var sLimit = 3;




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
		var goal = [0,0];
		if (data.attractors){
			bounce = calculateBounce(boid,data.attractors);
		}
		if (data.goals){
			goal = calculateBounce(boid,data.goals);
		}

		var acc = calculateForces(boid,neighbors,data);
		
		applyForces(boid, {x: acc[0], y: acc[1]},  {x: bounce[0] + goal[0], y: bounce[1] + goal[1]});
		//console.info(boid);
	}
	/*private*/

	var calculateBounce = function (boid, attractors) {
		var ret = [0,0];
		for (var i = attractors.length - 1; i >= 0; i--) {
			var attractor = attractors[i];
			var dx =  boid.getPosition().x - attractor.getPosition().x;
			var dy =  boid.getPosition().y - attractor.getPosition().y;
			var dsquare = (dx*dx) + (dy*dy);
			if (dsquare < (attractor.radius  * attractor.radius) * (attractor.distance) ){
				var ratio = Math.sqrt(dx*dx+dy*dy);
		        ret[0] = ret[0] - (attractor.force * dx / ratio) || 0;
		        ret[1] = ret[1] - (attractor.force * dy / ratio) || 0;
			}

		};
		return ret;
	}

	/*Apply forces*/
	var applyForces = function (boid, acc, spd) {
		var accSq = acc.x*acc.x + acc.y*acc.y;
        if (accSq > aLimit) {
          var ratio = aLimit / Math.sqrt(accSq);
          acc.x =  acc.x * ratio;
          acc.y =  acc.y * ratio;
        }       

		var sx = boid.getSpeed().x + acc.x + spd.x;
		var sy = boid.getSpeed().y + acc.y + spd.y;		
		//todo: limit speed
		var speedSq = sx*sx + sy*sy;
        if (speedSq > sLimit) {
          var ratio = sLimit / Math.sqrt(speedSq);
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
			      		if (dsquare < sepD*sepD){
				      		sForce[0] +=dx;
				      		sForce[1] +=dy;
				      	}
				      	else{
				      		if (dsquare < cohD*cohD){
					      		cForce[0] +=dx;
			    	  			cForce[1] +=dy;	
			    	  		}
			    	  		if (dsquare < aliD*aliD){
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
		acc[0] += sepW * (sForce[0] / length) || 0;
		acc[1] += sepW * (sForce[1] / length) || 0;
		//cohesion
		length = Math.sqrt(cForce[0]*cForce[0] + cForce[1]*cForce[1]);		
		acc[0] -= cohW * (cForce[0] / length) || 0;
		acc[1] -= cohW * (cForce[1] / length) || 0;
		//align
		length = Math.sqrt(aForce.x*aForce.x + aForce.y*aForce.y);		
		acc[0] -= aliW * (aForce[0] / length) || 0;
		acc[1] -= aliW * (aForce[1] / length) || 0;

		return acc;
	};


	return this;
}

module.exports = BoidImplementation1;


