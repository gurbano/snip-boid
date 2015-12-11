var factory = require('boids')({ //https://www.npmjs.com/package/boids
  //BOID [xPosition, yPosition, xSpeed, ySpeed, xAcceleration, yAcceleration]

  boids: 0,              // The amount of boids to use 
  speedLimit: 2.0,          // Max steps to take per tick 
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
    0 // x
  , 0 // y
  , 0 // dist 120
  , 0 // spd  -50
  ]]

});
var adapters = {
	boids: function(){ return this.generator.boids;},
	attractors: function () {return this.generator.attractors;},
	foreach: function (cb) {this.boids().forEach(function (boid) {cb(boid);})},
	step: function(){this.generator.tick();},
  follow: function (x,y) {
    this.generator.attractors[0][0] = x;
    this.generator.attractors[0][1] = y;
  },
  addBoid: function(x,y){
    console.info('ading boid');
    this.boids().push([x, y, 0, 0, 0, 0]);
  },
  removeBoid: function (index) {
    //TODO: remove by index
    return this.generator.boids.pop()
  },
  addAttractor: function(x,y,d,f){
    this.attractors().push([x, y, d, f]);
  },
  removeAttractor: function(x,y,d,f){
    return this.generator.attracotrs.pop();
  },


}

module.exports = [factory, adapters];
