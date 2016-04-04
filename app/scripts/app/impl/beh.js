var utils = require('../../utils');
var Victor = require('victor'); //http://victorjs.org/


var availableBehaviours = [
	'TEST',
	'SEEK', 
	'FLEE',
	'ARRIVE',
	'PURSUIT',
	'EVADE',
	'WANDER',
	'OBSTACLE',
	'WALL',
	'ITERPOSE',
	'HIDE',
	'PATH',
	'OFFSET',
	'FLOCK_SEPARATION',
	'FLOCK_COHESION',
	'FLOCK_ALIGNEMENT'
]




//based on http://www.kfish.org/boids/pseudocode.html
var BehaveBoids = function BehaveBoids(opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof BehaveBoids)) return new BehaveBoids(opts);
}
BehaveBoids.prototype.info = function() {
	console.info('-- new boids impl - 25/03/2016 ');
	console.info(this);
	console.info('Info', 0.1);
};

/*MAIN STEP*/
BehaveBoids.prototype.step = function(boid, boids, data) {
	/*CALCULATE BEHAVIOURS*/
	var behs = boid.behaviours;
	var force = ZERO();
	for (var i = behs.length - 1; i >= 0; i--) {
		var beh = behs[i];		
		var n_force = ZERO();
		var weight = VVV(beh.weight,beh.weight);
		switch(beh.name){
			case 'SEEK':
				n_force = this.seek(boid, data, beh).multiply(weight);	
				break;
			case 'FLEE':
				n_force = this.flee(boid, data, beh).multiply(weight);	
				break;
			case 'PURSUIT':
				n_force = this.pursuit(boid, data, beh).multiply(weight);	
				break;
			case 'EVADE':
				n_force = this.evade(boid, data, beh).multiply(weight);	
				break;
			case 'TEST':
				//n_force = VVV(0.01,0.01);	
				break;
			default: 
				//console.error('not implemented',beh.name, beh);
				break;
		}
		//console.debug(beh.name, n_force);
		var surplus = this.calculateSteering(
			boid, //the boid
			force, //force calculated so far
			n_force, //force to be added
			data, //contains various configuration parameters
			beh, //behaviour currently calculated
			);
		if(!surplus)//max force reached
			break;
	}
	this.updateBoid(boid, force);
}
BehaveBoids.prototype.calculateSteering = function(boid, accForce, newForce, data, beh) {	
	var maxForce = boid.getMaxForce();
	var maxTurn = boid.getMaxTurn();
	var magLeft = maxForce - accForce.clone().length() ;
	var newMag = newForce.clone().length() ;


	if (magLeft<0){
		return false;
	}else{
		if (magLeft >= newMag){
			accForce.add(newForce); //add the entire new force
			return true; //still mag left
		}else{
			accForce.add(newForce.clone().normalize().multiply(VVV(magLeft,magLeft)));
			return false;//
		}
	}

};


/*BEHAVIOUS*/
BehaveBoids.prototype.seek = function(boid, data, beh) { //SEEK
	var target = VV(beh.data.getGoal.bind(boid)().getPosition());
	var loc = V(boid); //position
	var ret = target.subtract(loc).normalize().multiply(VVV(boid.getMaxSpeed(),boid.getMaxSpeed() ));
	return ret;	
};
BehaveBoids.prototype.flee = function(boid, data, beh) { //SEEK
	var target = VV(beh.data.getGoal.bind(boid)().getPosition());
	var loc = V(boid); //position
	var vel = VV(boid.getSpeed()); //velocity
	var ret = loc.clone().subtract(target).normalize().multiply(VVV(boid.getMaxSpeed(),boid.getMaxSpeed() ));
	return ret;	
};
BehaveBoids.prototype.pursuit = function(boid, data, beh) { //SEEK
	//TARGET
	var tObj = beh.data.getGoal.bind(boid)();
	var tPos = VV(tObj.getPosition());
	var tSpeed = VV(tObj.getSpeed());
	//ENTITY
	var loc = V(boid); //position
	var vel = VV(boid.getSpeed()); //velocity

	var distance = tPos.clone().subtract(loc);
	var lookAheadTime = distance.clone().divide(VVV(boid.getMaxSpeed() * 4,boid.getMaxSpeed() *4 ))
	var target = tPos.clone().add( tSpeed.multiply(lookAheadTime) );


	var ret = target.subtract(loc).normalize().multiply(VVV(boid.getMaxSpeed(),boid.getMaxSpeed() ));
	return ret;	
};
BehaveBoids.prototype.evade = function(boid, data, beh) { //SEEK
	//TARGET
	var tObj = beh.data.getGoal.bind(boid)();
	var tPos = VV(tObj.getPosition());
	var tSpeed = VV(tObj.getSpeed());
	//ENTITY
	var loc = V(boid); //position
	var vel = VV(boid.getSpeed()); //velocity

	var distance = tPos.clone().subtract(loc);
	var lookAheadTime = distance.clone().divide(VVV(boid.getMaxSpeed() * 4,boid.getMaxSpeed() *4 ))
	var target = tPos.clone().add( tSpeed.multiply(lookAheadTime) );


	var ret = loc.subtract(target).normalize().multiply(VVV(boid.getMaxSpeed(),boid.getMaxSpeed() ));
	return ret;	
};


BehaveBoids.prototype.updateBoid = function(boid, force, delta) {
	var maxspeed = boid.getMaxSpeed();
	var maxforce = boid.getMaxForce();	
	var accelleration = limit (force.clone().divide(VVV(boid.getMass(),boid.getMass())) , maxforce); //todo add time elapsed
	var velocity = limit(VV(boid.getSpeed()).add(accelleration), maxspeed);  //final speed = current speed + accell --- limited
	var pos =  V(boid).add(velocity); //position = current pos + speed --- limited //todo add time elapsed
	var heading = velocity.clone().normalize();
	var side = heading.clone().rotate(-Math.PI);

	boid.setSpeed(velocity.x, velocity.y, velocity.z);
	boid.setPosition(pos.x, pos.y, pos.z);
	boid.setHeading(heading.x, heading.y, heading.z);
	boid.setSide(side.x, side.y, side.z);


}


var ZERO = function () {return new Victor(0,0)}
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

var limit = function (vector, max) {
	var ret = vector.clone();
	if (ret.magnitude() > max) {
      ret.normalize().multiply(VVV(max,max));
    }
    return ret;
}

module.exports = BehaveBoids;