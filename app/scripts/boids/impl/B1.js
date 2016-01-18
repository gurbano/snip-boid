var sepD = 100;
var cohD = 480;
var aliD = 300;

var sepW = 3.5;
var cohW = 5.0;
var aliW = 10.5;

var aLimit = 1;
var sLimit = 5;



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
		var acc = calculateForces(boid,neighbors,data);
		applyForces(boid, acc);
		//console.info(boid);
	}
	/*private*/
	var applyForces = function (boid, acc) {
		//todo: limit acceleration
		var accSq = acc.x*acc.x + acc.y*acc.y;
        if (accSq > aLimit) {
          var ratio = aLimit / Math.sqrt(accSq);
          acc.x =  acc.x * ratio;
          acc.y =  acc.y * ratio;
        }
        

		var sx = boid.getSpeed().x + acc.x;
		var sy = boid.getSpeed().y + acc.y;		
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
		var sForce = {x:0, y:0};
		var cForce = {x:0, y:0};
		var aForce = {x:0, y:0};		
		for (var i = neighbors.length - 1; i >= 0; i--) {
			var other = neighbors[i];			
			if (other.id != boid.id){
						/*calc distance*/
						var dx =  boid.getPosition().x - other.getPosition().x;
			      		var dy =  boid.getPosition().y - other.getPosition().y;
			      		var dsquare = (dx*dx) + (dy*dy);
			      		if (dsquare < sepD*sepD){
				      		sForce.x +=dx;
				      		sForce.y +=dy;
				      	}
				      	else{
				      		if (dsquare < cohD*cohD){
					      		cForce.x +=dx;
			    	  			cForce.y +=dy;	
			    	  		}
			    	  		if (dsquare < aliD*aliD){
			    	  			aForce.x += other.getSpeed().x;
			      				aForce.y += other.getSpeed().y;
			    	  		}      			
				      	}
			}
		};
		//console.info(sForce, cForce, aForce);
		var acc = {x:0, y:0};//boid.getForce();
		//separation
		length = Math.sqrt(sForce.x*sForce.x + sForce.y*sForce.y);		
		acc.x += sepW * (sForce.x / length) || 0;
		acc.y += sepW * (sForce.y / length) || 0;
		//cohesion
		length = Math.sqrt(cForce.x*cForce.x + cForce.y*cForce.y);		
		acc.x -= cohW * (cForce.x / length) || 0;
		acc.y -= cohW * (cForce.y / length) || 0;
		//align
		length = Math.sqrt(aForce.x*aForce.x + aForce.y*aForce.y);		
		acc.x -= aliW * (aForce.x / length) || 0;
		acc.y -= aliW * (aForce.y / length) || 0;

		return acc;
	};


	return this;
}

module.exports = BoidImplementation1;


