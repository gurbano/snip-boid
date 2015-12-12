var radiusAttractor = function (x,y,radius,force) {
      return [
        x // x
      , y // y
      , function  (_x,_y, ax, ay) {
          var spareX = _x - ax;
          var spareY = _y - ay;
          var distSquared = spareX*spareX + spareY*spareY;
          return (distSquared < radius*radius);
        } 
      , function  (_x,_y, ax, ay) {
          var spareX = _x - ax;
          var spareY = _y - ay;
          var distSquared = spareX*spareX + spareY*spareY;
          var length = Math.sqrt(spareX*spareX+spareY*spareY);
          return [force * spareX / length , force * spareY / length];
        } // spd  -50
      ];
};

var verticalWall = function (x,radius,force) {
      return [
        x // true/false
      , 0 // true/false
      , function  (_x,_y, ax, ay) {
          var spareX = _x - ax;
          var distSquared = spareX*spareX;
          return (distSquared < radius*radius);
        } 
      , function  (_x,_y, ax, ay) {
          if (_x < ax){
            return [-force, 0];
          }else{
            return [force, 0];
          }
        } // spd  -50
      ];
};
var horizontalWall = function (y,radius,force) {
      return [
        0 // true/false
      , y // true/false
      , function  (_x,_y, ax, ay) {
          var spareY = _y - ay;
          var distSquared = spareY*spareY;
          return (distSquared < radius*radius);
        } 
      , function  (_x,_y, ax, ay) {
          if (_y < ay){
            return [0, -force];
          }else{
            return [0, force];
          }
        } // spd  -50
      ];
};


var factory = require('../impl/broidsImpl')({ 
  //BOID [xPosition, yPosition, xSpeed, ySpeed, xAcceleration, yAcceleration]
  speedLimit: 2.0,          // Max steps to take per tick 
  accelerationLimit: 0.5,   // Max acceleration per tick   
  separationDistance: 80, // Radius at which boids avoid others 
  /*
  alignmentDistance: 180, // Radius at which boids align with others 
  choesionDistance: 180,  // Radius at which boids approach others 
  separationForce: 0.15,  // Speed to avoid at 
  alignmentForce: 0.25,   // Speed to align with other boids 
  choesionForce: 0.1,     // Speed to move towards other boids 
  */
  attractors: [
    radiusAttractor(0,0,120,-20),//pointer
    //
    verticalWall(0,5,-120),
    verticalWall($(document).width(),5,-120),
    horizontalWall(0,5,-120),
    horizontalWall($(document).height(),5,-120),
  ]
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
    this.boids().push([x, y, 0, 0, 0, 0]);
  },
  removeBoid: function (index) {
    //TODO: remove by index
    return this.generator.boids.pop()
  },
  setBoids: function (value, removeCb, getPosition) {
      if (value>this.boids().length){
        while (this.boids().length<value){
          var pos = getPosition ? getPosition() : [0,0];
          this.addBoid(pos[0],pos[1]);
        }
      }else{
        while (this.boids().length>=value){
          var pop = this.removeBoid();
          if (removeCb){
            removeCb(pop);
          }
        }
      }
  },
  addAttractor: function(x,y,d,f){
    this.attractors().push([x, y, d, f]);
  },
  removeAttractor: function(x,y,d,f){
    return this.generator.attracotrs.pop();
  },


}

module.exports = [factory, adapters];
