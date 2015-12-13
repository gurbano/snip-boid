var radiusAttractor = function (x,y,radius,force) {
      var tmp = [
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
      tmp.type = 'radius';
      return tmp;
};

var verticalWall = function (x,radius,force) {
      var tmp =  [
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
      tmp.type = 'vert';
      return tmp;
};
var horizontalWall = function (y,radius,force) {
      var tmp =  [
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
      tmp.type = 'hori';
      return tmp;
};

var generator = require('../generators/BroidGenerator');

var factory = require('../impl/broidsImpl')({ 
//var factory = require('boids')({   
  //BOID [xPosition, yPosition, xSpeed, ySpeed, xAcceleration, yAcceleration]
  boids : 0,
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
    new radiusAttractor(0,0,0,-20),//pointer
    new verticalWall(10, 5,-120),
    new verticalWall($(document).width() -20, 5,-120),
    new horizontalWall(10, 5,-120),
    new horizontalWall($(document).height() -20 , 5,-120),
  ],
  generators:[
      [//[x,y,rateCb, onGenCb, boidFactory]
        30,30, //x,y
        function getRatePerSecond (time) {
          return 1;
        }, //control rate
        function onGenerate (boid) {

        }, //called for every boid generated
        function getBoidFactory(){return {

        };}, //return the options for creation of a new boid
      ]
  ]
});

var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var adapters = {
  boids: function(){ return this.factory.boids;},
  attractors: function () {return this.factory.attractors;},
  generators: function () {return this.factory.generators;},
  foreach: function (cb) {this.boids().forEach(function (boid) {cb(boid);})},
  step: function(){this.factory.tick();},
  follow: function (x,y) {
    this.factory.attractors[0][0] = x;
    this.factory.attractors[0][1] = y;
  },
  addBoid: function(x,y){
    this.boids().push([x, y, random(-2,2), random(-2,2), random(-2,2), random(-2,2)]);
  },
  removeBoid: function (index) {
    //TODO: remove by index
    return this.factory.boids.pop()
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

module.exports = {factory: factory, adapters: adapters};
