var AbstractEntity = require('./AbstractEntity');
var sqrt = Math.sqrt
  , _X = 1
  , _Y = 2
  , _Z = 3
  , px = 0
  , py = 1
  , pz = 2
  , sx = 3
  , sy = 4
  , sz = 5
  , fx = 6
  , fy = 7
  , fz = 8;

var Boid = function(opts){
	var self = this;	
	if (!(this instanceof Boid)) return new Boid(opts);
	AbstractEntity.call(this); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Boid;
	this.implementation =  this.opts.impl;
	var _ = [	
		opts.px || 0,
		opts.py || 0,
		opts.pz || 0,

		opts.sx || 0,
		opts.sy || 0,
		opts.sz || 0,

		opts.fx || 0,
		opts.fy || 0,
		opts.fz || 0
	];
	this.getPosition = function () {return  {x: _[px], y: _[py], z:_[pz]}};
	this.getSpeed = function () {return  {x: _[sx], y: _[sy], z:_[sz] }};
	this.getAcc = function () {return  {x: _[fx], y: _[fy], z:_[fz] }};

	this.setPosition = function (x,y,z) { _[px] = x; _[py] = y; _[pz] = z};
	this.setSpeed = function (x,y,z) { _[sx] = x; _[sy] = y; _[sz] = z};
	this.setAcc = function (x,y,z) { _[fx] = x; _[fy] = y; _[fz] = z};
}
Boid.prototype = Object.create(AbstractEntity.prototype);
Boid.prototype.constructor = AbstractEntity;
Boid.prototype.step = function (neighb, data) {
	//apply the rules
	this.implementation.step(this, neighb, data || {});
}

module.exports = Boid;