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
		//console.info('boid', boid.id, 'neighbors', neighbors.length);
		

		
	}
	return this;
}

module.exports = BoidImplementation1;