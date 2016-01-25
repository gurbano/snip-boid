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
  , fy = 7;

 /*Utils - to sylvester vectors - http://sylvester.jcoglan.com/api/vector.html#create*/
var arr = function (obj) {
	return [obj.x, obj.y, obj.z];
}

var V = function (obj) {
	return $V(arr(obj));
}
/*the single boid, part of the flock*/
var Boid = function (opts) {
	var self = this;
	this.opts = opts || {};
	this.id = opts.id || 0;
	if (!(this instanceof Boid)) return new Boid(this.opts);
	this.implementation =  opts.IMPL;
	this.getPosition = function () {return  {x: _[px], y: _[py], z:_[pz]}};
	this.getSpeed = function () {return  {x: _[sx], y: _[sy], z:_[sz] }};
	this.getPositionV = function () {return  V(this.getPosition());};
	this.getSpeedV = function () {return  V(this.getSpeed());};
	
	this.setPosition = function (x,y,z) { _[px] = x; _[py] = y; _[pz] = z};
	this.setSpeed = function (x,y,z) { _[sx] = x; _[sy] = y; _[sz] = z};
	this.setPositionV = function (pos) { _[px] = pos.e(_X); _[py] = pos.e(_Y); _[pz] = pos.e(_Z)};
	this.setSpeedV = function (spd) { _[sx] = spd.e(_X); _[sy] = spd.e(_Y); _[sz] = spd.e(_Z)};
	



	this.step = function (neighb, data) {
		//apply the rules
		this.implementation.step(this, neighb, data || {});
	}

	/*INTERNAL*/
	var _ = [	opts.px || 0,
				opts.py || 0,
				opts.pz || 0,
				opts.sx || 0,
				opts.sy || 0,
				opts.sz || 0,
				opts.fx || 0,
				opts.fy || 0,
				opts.fz || 0
			];
	return this;
}

module.exports = Boid;