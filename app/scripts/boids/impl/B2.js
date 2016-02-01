var utils = require('../../utils');


var arr = function (obj) {
	return [obj.x, obj.y, obj.z];
}

var V = function (obj) {
	return $V(arr(obj));
}

var BoidImplementation2 = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof BoidImplementation2)) return new BoidImplementation2(opts);
	this.info = function () {
		console.info('Boids Rule based Implementation: ');
		console.info(this);
		console.info('Info', 0.1);
	}
	this.step = function (boid, neighbors, data) {
		var coh = ruleCoh(boid, neighbors, data);
		var sep = ruleSep(boid, neighbors, data);
		var ali = ruleAli(boid, neighbors, data);
		var attr = data.attractors ? ruleAttractor(boid,data.attractors, data) : utils.v(0,0,0);
		var walls = data.walls ? ruleWalls(boid,data.walls, data) : utils.v(0,0,0);
		//console.info(walls.inspect());
		var forces = [];
		if (sep.distanceFrom(Vector.Zero(3))>0){
			forces.push(sep);		
		}else{
			forces.push(coh);
			forces.push(ali);		
		}
		forces.push(walls);		
		forces.push(attr);



		applyForces(boid,
			forces,
			data);		
		

	}
	/*private*/
	var ruleWalls = function (boid, walls, data) {
		var startPos = utils.v(boid.getPosition().x,boid.getPosition().y,0);
		var ret = Vector.Zero(3);
		var proj = utils.getLineEq(
						{x: boid.getPosition().x, y: boid.getPosition().y},
						{x: boid.getPosition().x + boid.getSpeed().x, y: boid.getPosition().y + boid.getSpeed().y},
			);
		for (var i = walls.length - 1; i >= 0; i--) {
			var wall = walls[i];
			var intersection = utils.lineInterception(proj, wall.getLineEq());
			if (intersection){
				wall.intersection = intersection;
				var distanceFromIntersection = utils.distToPoint(intersection, {x: boid.getPosition().x, y: boid.getPosition().y});
				var distanceCheck = wall.radius + wall.distance;
				if (distanceFromIntersection < distanceCheck){
					wall.intersection = intersection;
					var force = startPos.subtract(utils.v(intersection.x, intersection.y, 0)); 
					force = force.multiply((distanceCheck - distanceFromIntersection)/distanceCheck ); // linear decrease with distance
					force = force.multiply((distanceCheck - distanceFromIntersection)/distanceCheck ); // linear decrease with distance
					force = force.multiply(wall.force);					
					ret = ret.add(force);						
				}else{					
					wall.intersection = undefined;
					wall.norm = undefined;
				}				
			}else{				
				wall.intersection = undefined;
			}

		}
		return ret;
	}
	var applyForces = function (boid, forces, data) {
		var speed = boid.getSpeedV(); //residual speed
		var f = Vector.create([0,0,0]);
		for (var i = 0; i < forces.length; i++) {
			f = f.add(forces[i]); //array of vectors						
		};
		f = limit(f, data.aLimit, data);
		speed = speed.add(f);
		speed = limit(speed, data.sLimit, data);
		//todo:maybe scale

		boid.setSpeedV(speed);
		var pos = boid.getPositionV();
		pos = pos.add(boid.getSpeedV().multiply(1/data.sRatio ));
		boid.setPositionV(pos);

	}
	var limit = function (v, lim, data) {
		var sx =  v.e(1);
        var sy =  v.e(2);
        var sz =  v.e(3);
		var speedSq = v.e(1)*v.e(1) + v.e(2)*v.e(2) + v.e(3) * v.e(3);
        if ( speedSq > lim) {
          var ratio = lim / Math.sqrt(speedSq);
          sx =  v.e(1) * ratio;
          sy =  v.e(2) * ratio;
          sz =  v.e(3) * ratio;
        }
        return utils.v(sx,sy,sz);
	}
	var scale = function (v, min, max, data) {//todo:scale???
		var sx =  v.e(1);
        var sy =  v.e(2);
        var sz =  v.e(3);
		var speedSq = v.e(1)*v.e(1) + v.e(2)*v.e(2) + v.e(3) * v.e(3);
        if ( speedSq > lim) {
          var ratio = lim / Math.sqrt(speedSq);
          sx =  v.e(1) * ratio;
          sy =  v.e(2) * ratio;
          sz =  v.e(3) * ratio;
        }
        return utils.v(sx,sy,sz);
	}
	var ruleCoh = function (boid, neighbors, data) {
		var startPos = boid.getPositionV();
		var ret = Vector.Zero(3);
		var count = 0;
		for (var i = neighbors.length - 1; i >= 0; i--) {
			var other = neighbors[i];
			if (other.id != boid.id){
				var dist = startPos.distanceFrom(other.getPositionV());
				if (dist < data.cohD){//distance check
					ret = ret.add(other.getPositionV());
					count++;
				}
			}
		};
		if (count == 0){
			return ret;//[0,0,0]
		}else{
			//ret contains the sum of neighbours coordinates
			ret = ret.multiply(1/count);//now ret contains the percieved center (PC) coordinates
			ret = ret.subtract(boid.getPositionV()); //now ret contains the vector to the PC
		}
		return ret.multiply(data.cohW);
	} 
	var ruleSep = function (boid, neighbors, data) {
		var startPos = boid.getPositionV();
		var ret = Vector.Zero(3);
		var count = 0;
		for (var i = neighbors.length - 1; i >= 0; i--) {
			var other = neighbors[i];
			if (other.id != boid.id){
				var dist = startPos.distanceFrom(other.getPositionV());
				if (dist < data.sepD){//distance check
					if (dist>0){
						var force = startPos.subtract(other.getPositionV()); 
						force = force.multiply(1 - dist/data.sepD); // linear decrease with distance
						ret = ret.add(force);
					}else{
						console.info('boid collision', boid.id, other.id);
						return Vector.create([100,100,100]).multiply(data.sepW);
					}
				}
			}
		};
		return ret.multiply(data.sepW);
	} 
	var ruleAli = function (boid, neighbors, data) {
		var startPos = boid.getPositionV();
		var ret = Vector.Zero(3);
		var count = 0;
		for (var i = neighbors.length - 1; i >= 0; i--) {
			var other = neighbors[i];
			if (other.id != boid.id){
				var dist = startPos.distanceFrom(other.getPositionV());
				if (dist < data.aliD){//distance check
					ret = ret.add(other.getSpeedV());
					count++;
				}
			}
		};
		if (count == 0){
			return ret;//[0,0,0]
		}else{
			//ret contains the sum of neighbours coordinates
			ret = ret.multiply(1/count);//now ret contains the percieved center (PC) coordinates
			ret = ret.subtract(boid.getSpeedV()); //now ret contains the vector to the PC
		}
		return ret.multiply(data.aliW);
	} 
	var ruleAttractor = function (boid, attractors, data) {
		var startPos = utils.v(boid.getPosition().x,boid.getPosition().y,0);
		var ret = Vector.Zero(3);
		for (var i = attractors.length - 1; i >= 0; i--) {
			var attractor = attractors[i];
			var distanceLimit = attractor.distance + attractor.radius;
			if (Math.abs(attractor.force) > 0){
				var aPos = utils.v(attractor.getPosition().x, attractor.getPosition().y, attractor.getPosition().z);
				var dist = startPos.distanceFrom(aPos);
				//console.info(dist);
				if (dist < distanceLimit){//distance check
					var force = startPos.subtract(attractor.getPositionV()); 
					force = force.multiply((distanceLimit - dist)/distanceLimit ); // linear decrease with distance
					force = force.multiply((distanceLimit - dist)/distanceLimit ); // linear decrease with distance
					force = force.multiply(attractor.force);
					ret = ret.add(force);					
				}
			}	
		}
		return ret;
	}
	


	return this;
}

module.exports = BoidImplementation2;


