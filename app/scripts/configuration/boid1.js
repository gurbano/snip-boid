var factory = require('boids')({ //https://www.npmjs.com/package/boids
  boids: 1,              // The amount of boids to use 
  speedLimit: 2,          // Max steps to take per tick 
  accelerationLimit: 0.5,   // Max acceleration per tick 
  /*
  separationDistance: 60, // Radius at which boids avoid others 
  alignmentDistance: 180, // Radius at which boids align with others 
  choesionDistance: 180,  // Radius at which boids approach others 
  separationForce: 0.15,  // Speed to avoid at 
  alignmentForce: 0.25,   // Speed to align with other boids 
  choesionForce: 0.1,     // Speed to move towards other boids 
  */
  attractors: [[
    $(document).width()/2 // x
  , $(document).height()/2 // y
  , 150 // dist
  , 0.25 // spd
]]

});
var adapters = {
	boids: function(){ return this.generator.boids;},
	attractors: function () {return this.generator.attractors;},
	foreach: function (cb) {this.boids().forEach(function (boid) {cb(boid);})},
	step: function(){this.generator.tick();},
}

module.exports = [factory,adapters];