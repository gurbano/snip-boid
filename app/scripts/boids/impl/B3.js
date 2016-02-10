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
	var coh = this.coh(boid, neighbors, data);
	//console.info(coh);
};

BoidImplementation3.prototype.coh = function(boid, neighbors, data) {
	var sum = new Victor(0,0);
	var count = 0;
	var location = V(boid);
	for (var i = neighbors.length - 1; i >= 0; i--) {
		var other = neighbors[i];
		if (other.id != boid.id){
			sum.add(V(other));
			count++;
		}
	}
	 if (count > 0)
      {return sum.divide(new Victor(count,count))}
    else
      {return sum;}
	
};


var V = function (boid) {
	let pos = boid.getPosition();
	return  new Victor(pos.x,pos.y);
}
module.exports = BoidImplementation3;