var factory = require('boids')({ //https://www.npmjs.com/package/boids
  boids: 2,              // The amount of boids to use 
  speedLimit: 0,          // Max steps to take per tick 
  accelerationLimit: 1,   // Max acceleration per tick 
  separationDistance: 60, // Radius at which boids avoid others 
  alignmentDistance: 180, // Radius at which boids align with others 
  choesionDistance: 180,  // Radius at which boids approach others 
  separationForce: 0.15,  // Speed to avoid at 
  alignmentForce: 0.25,   // Speed to align with other boids 
  choesionForce: 0.1,     // Speed to move towards other boids 
  attractors: []
});
var adapters = {
	boids: function(){ return this.generator.boids;},
	attractors: function () {return this.generator.attractors;},
	foreach: function (cb) {this.boids().forEach(function (boid) {cb(boid);})},
	step: function(){this.generator.tick();},
}

module.exports = [factory,adapters];