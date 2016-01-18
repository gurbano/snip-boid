var IMPL = require('./impl/B1')({});
IMPL.info();

var sqrt = Math.sqrt
  , px = 0
  , py = 1
  , sx = 2
  , sy = 3
  , fx = 4
  , fy = 5
/*the single boid, part of the flock*/
var Boid = function (opts) {
	var self = this;
	opts = opts || {};
	this.id = opts.id || 0;
	if (!(this instanceof Boid)) return new Boid(opts);
	this.implementation =  IMPL;
	this.getPosition = function () {return  {x: _[px], y: _[py]}};
	this.getSpeed = function () {return  {x: _[sx], y: _[sy]}};
	this.getForce = function () {return  {x: _[fx], y: _[fy]}};
	
	this.setPosition = function (x,y) { _[px] = x; _[py] = y};
	this.setSpeed = function (x,y) { _[sx] = x; _[sy] = y};
	this.setForce = function (x,y) { _[fx] = x; _[fy] = y};

	this.step = function (neighb) {
		//apply the rules
		this.implementation.step(this, neighb,{});
	}

	/*INTERNAL*/
	var _ = [	opts.px || 0,
				opts.py || 0,
				opts.sx || 0,
				opts.sy || 0,
				opts.fx || 0,
				opts.fy || 0
			];
	return this;
}

module.exports = Boid;