/*
Custom impl based on //https://www.npmjs.com/package/boids

added:

to_add: 
  different anchors:
    point - radius
    line - ordinated line (start, end) // walls
    poligons - (set of lines, internal, external)

*/

var Bro = require('./BroidImpl');

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , sqrt = Math.sqrt
  , POSITIONX = 0
  , POSITIONY = 1
  , SPEEDX = 2
  , SPEEDY = 3
  , ACCELERATIONX = 4
  , ACCELERATIONY = 5

module.exports = Boids

function Boids(opts, callback) {
  if (!(this instanceof Boids)) return new Boids(opts, callback)
  EventEmitter.call(this)

  opts = opts || {}
  callback = callback || function(){}

  this.speedLimitRoot = opts.speedLimit || 0
  this.accelerationLimitRoot = opts.accelerationLimit || 1
  this.speedLimit = Math.pow(this.speedLimitRoot, 2)
  this.accelerationLimit = Math.pow(this.accelerationLimitRoot, 2)
  this.separationDistance = Math.pow(opts.separationDistance || 60, 2)
  this.alignmentDistance = Math.pow(opts.alignmentDistance || 180, 2)
  this.cohesionDistance = Math.pow(opts.cohesionDistance || 180, 2)
  this.separationForce = opts.separationForce || 0.15
  this.cohesionForce = opts.cohesionForce || 0.01
  this.alignmentForce = opts.alignmentForce || opts.alignment || 0.25
  this.attractors = opts.attractors || []

  var boids = this.boids = [];
  var bRoids = this.bRoids = [];
  this.on('tick', function() {
    callback(boids)
  })
}
inherits(Boids, EventEmitter)

Boids.prototype.tick = function() {
  var self = this;
  var boids = this.boids
    , sepDist = this.separationDistance
    , sepForce = this.separationForce
    , cohDist = this.cohesionDistance
    , cohForce = this.cohesionForce
    , aliDist = this.alignmentDistance
    , aliForce = this.alignmentForce
    , speedLimitRoot = this.speedLimitRoot
    , speedLimit = Math.pow(this.speedLimitRoot, 2)    
    , accelerationLimitRoot = this.accelerationLimitRoot
    , accelerationLimit = Math.pow(this.accelerationLimitRoot, 2)
    , sforceX, sforceY
    , cforceX, cforceY
    , aforceX, aforceY
    , spareX, spareY
    , attractors = this.attractors
    , attractorCount = attractors.length
    , distSquared
    , currPos
    , targPos
    , length
    , target

    boids:[]

    var current = 0;
    while (current<boids.length) {
      sforceX = 0; sforceY = 0
      cforceX = 0; cforceY = 0
      aforceX = 0; aforceY = 0
      

      var theBro = boids[current];
      if (!theBro.data){
        console.log("creating boid data");
        theBro.data = new Bro({});
      } //init 
      var bro = theBro.data;
      theBro.data.opts = {
        sepDist : self.separationDistance,
        sepForce : self.separationForce,
        cohDist : self.cohesionDistance,
        cohForce : self.cohesionForce,
        aliDist : self.alignmentDistance,
        aliForce : self.alignmentForce,
      };
    

      target = attractorCount
      while (target--) {
          var attractor = attractors[target];
          var positionCheck = attractor[2](theBro[0],theBro[1],attractor[0],attractor[1]);
          if (positionCheck){
            var speedDelta = attractor[3](theBro[0],theBro[1],attractor[0],attractor[1]);
            var xmod = speedDelta[0];
            var ymod = speedDelta[1];
            boids[current][SPEEDX] -= (xmod) || 0;
            boids[current][SPEEDY] -= (ymod) || 0;
        }
      }


      var forceX = 0;
      var forceY = 0;
      for (var i = 0; i < bro.beh['boids'].length; i++) {//cycle 
            var beh = bro.beh['boids'][i];
            var result = beh(current,boids); //pass x,y of the boid and the 
            forceX += result[0]; //update forcex and forcey
            forceY += result[1];
      };
        
      boids[current][ACCELERATIONX] += forceX;
      boids[current][ACCELERATIONY] += forceY;

    // Attractors
    
      current++;
    }


    var current = 0;
    while (current<boids.length) {
      if (accelerationLimit) {
        distSquared = boids[current][ACCELERATIONX]*boids[current][ACCELERATIONX] + boids[current][ACCELERATIONY]*boids[current][ACCELERATIONY]
        if (distSquared > accelerationLimit) {
          var ratio = accelerationLimitRoot / sqrt(distSquared)
          boids[current][ACCELERATIONX] *= ratio
          boids[current][ACCELERATIONY] *= ratio
        }
      }

      boids[current][SPEEDX] += boids[current][ACCELERATIONX]
      boids[current][SPEEDY] += boids[current][ACCELERATIONY]

      if (speedLimit) {
        distSquared = boids[current][SPEEDX]*boids[current][SPEEDX] + boids[current][SPEEDY]*boids[current][SPEEDY]
        if (distSquared > speedLimit) {
          var ratio = speedLimitRoot / sqrt(distSquared)
          boids[current][SPEEDX] *= ratio;
          boids[current][SPEEDY] *= ratio;
        }
      }

      boids[current][POSITIONX] += boids[current][SPEEDX];
      boids[current][POSITIONY] += boids[current][SPEEDY];


      current++;
    };


  

  this.emit('tick', boids)
}
