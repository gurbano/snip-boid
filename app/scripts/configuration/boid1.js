var factory = require('boids')({ //https://www.npmjs.com/package/boids
  //BOID [xPosition, yPosition, xSpeed, ySpeed, xAcceleration, yAcceleration]

  boids: 0,              // The amount of boids to use 
  speedLimit: 5,          // Max steps to take per tick 
  accelerationLimit: 2,   // Max acceleration per tick 
  
  separationDistance: 60, // Radius at which boids avoid others 
  alignmentDistance: 180, // Radius at which boids align with others 
  choesionDistance: 180,  // Radius at which boids approach others 
  separationForce: 0.15,  // Speed to avoid at 
  alignmentForce: 0.25,   // Speed to align with other boids 
  choesionForce: 0.1,     // Speed to move towards other boids 
  
  attractors: [[
    0 // x
  , 0 // y
  , 80 // dist
  , 10.25 // spd
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
  add: function(x,y){
    this.boids().push([x, y, 0, 0, 0, 0]);
  },
  remove: function (index) {
    /*
    if (this.boids().length == 0 || index >= this.boids().length){
      console.error('Error removing boids', this.boids());
      return undefined;
    }
    var element = this.boids()[index];
    this.generator.boids = this.boids().splice(index, 1);
    return element;
    */
    return this.generator.boids.pop()
  }
}

module.exports = [factory, adapters];


/*

function (xPosition, yPosition) {
    //this.boids().push([xPosition, yPosition, xSpeed, ySpeed, xAcceleration, yAcceleration]);
    
  }

*/