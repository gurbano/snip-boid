var AbstractEntity = require('./AbstractEntity');
var sqrt = Math.sqrt
  , px = 0 //position
  , py = 1
  , pz = 2
  , sx = 3 //speed
  , sy = 4
  , sz = 5
  , fx = 6 //accell
  , fy = 7
  , fz = 8
  , hex = 9 //heading (normalized speed)
  , hey = 10
  , hez = 11
  , six = 12 //side
  , siy = 13
  , siz = 14
  , mass = 15 //mass
  , maxspeed = 16 //max speed
  , maxforce = 17 //max force
  , maxturn =18 //max turn
  ;



var Boid = function(opts){
	var self = this;	
	if (!(this instanceof Boid)) return new Boid(opts);
	AbstractEntity.call(this, opts); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Boid;
	this.implementation =  this.opts.impl;
	this.parent = opts.parent || undefined;
	var _ = [	
		opts.px || 0,
		opts.py || 0,
		opts.pz || 0,

		opts.sx || 0,
		opts.sy || 0,
		opts.sz || 0,

		opts.fx || 0,
		opts.fy || 0,
		opts.fz || 0,

		opts.hex || 0,
		opts.hey || 0,
		opts.hez || 0,

		opts.six || 0,
		opts.siy || 0,
		opts.siz || 0,

		opts.mass || 1,
		opts.maxspeed || 1,
		opts.maxforce || 1,
		opts.maxturn || 1,

	];
	this.getPosition = function () {return  {x: _[px], y: _[py], z:_[pz]}}; 
	this.setPosition = function (x,y,z) {  _[px] = x; _[py] = y; _[pz] = z}; 
	//speed or heading
	this.getSpeed = function () {return  {x: _[sx], y: _[sy], z:_[sz] }}; 
	this.setSpeed = function (x,y,z) { _[sx] = x; _[sy] = y; _[sz] = z}; 
	//acc or velocity
	this.getAcc = function () {return  {x: _[fx], y: _[fy], z:_[fz] }};
	this.setAcc = function (x,y,z) { _[fx] = x; _[fy] = y; _[fz] = z}; //Velocity
	this.getVelocity = function () {return  {x: _[fx], y: _[fy], z:_[fz] }};
	this.setVelocity = function (x,y,z) { _[fx] = x; _[fy] = y; _[fz] = z}; //Velocity
	//heading
	this.getHeading = function () {return  {x: _[hex], y: _[hey], z:_[hez]}}; 
	this.setHeading = function (x,y,z) {  _[hex] = x; _[hey] = y; _[hez] = z}; 
	//side	
	this.getSide = function () {return  {x: _[six], y: _[siy], z:_[siz] }}; 
	this.setSide = function (x,y,z) { _[six] = x; _[siy] = y; _[siz] = z}; 
	//mass
	this.getMass = function () {return  _[mass]}; 
	this.setMass = function (m) {_[mass] = m}; 
	//maxspeed
	this.getMaxSpeed = function () {return  _[maxspeed]}; 
	this.setMaxSpeed = function (m) {_[maxspeed] = m}; 

	this.getMaxForce = function () {return  _[maxforce]}; 
	this.setMaxForce = function (m) {_[maxforce] = m}; 

	this.getMaxTurn = function () {return  _[maxturn]}; 
	this.setMaxTurn = function (m) {_[maxturn] = m}; 



	
	
	

	this.getRawData = function () {
		return _;
	}
}
Boid.prototype = Object.create(AbstractEntity.prototype);
Boid.prototype.constructor = AbstractEntity;
Boid.prototype.step = function (neighb, data) {
	//apply the rules
	this.implementation.step(this, neighb, data || {});
	this.position = this.getPosition();
	this.speed = this.getSpeed();
}
module.exports = Boid;