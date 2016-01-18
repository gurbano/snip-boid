var Boid = require('./Boid');

/*A Flock is a collection of boids*/
var Flock = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof Flock)) return new Flock(opts);	

	/*DEFAULT VALUES*/
	var mx = opts.WIDTH || 2000; 
	var my = opts.HEIGHT || 2000; // max width, max height
	var MAX_FORCE = opts.MAX_FORCE || 20;

	this.info = function () {
		console.info(this);
		console.info('size', [mx, my]);
		console.info('boids', _boids.length);
	}
	//ADD A BOID
	this.addBoid = function (opts) {
		var b = new Boid(
				$.extend(opts,{id: _b.length})
			);
		_b.push(b);
		__b[b.getPosition().x][b.getPosition().y].push(b);
		return b;
	}
	//REMOVE A BOID
	this.removeBoid = function (boid) {
		_b.remove(boid);
		__b[boid.getPosition().x][boid.getPosition().y].remove(boid);
	}
	this.removeBoidAt = function (x,y) {
		var boids = this.listAt(x,y);
		for (var i = boids.length - 1; i >= 0; i--) {
			_b.remove(boids[i]);
			__b[x,y].remove(b);
		};
	}
	//LIST BOIDS - as array
	this.list = function () {
		return _b;
	}
	this.listAt = function (x,y,radius) {
		return __b[x][y];
	}
	/*STEP - advance the simulation one step*/
	this.step = function (time) {
		for (var i = 0; i < _b.length; i++) {
			var boid = _b[i];
			boid.step(_b);
		};
	}	
	/*INTERNAL*/
	var _b = []; //internal array representation
	var __b = new Array(mx); //internal 2d spatial boid rappresentation

	var _init = function () {
		console.info('Creating flock', [mx,my]);
		for (var x = 0; x < mx;	 x++) {
			__b[x] = new Array(my);
			for (var y = 0; y < my;	 y++) {
				__b[x][y] = [];
			};	
		};
		if (opts.N){
			for (var i = 0; i < opts.N; i++) {
				if (opts.RANDOM){
					self.addBoid({
						px: gu.random(0,mx), 
						py: gu.random(0,my), 
						sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
						sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					});
				}else{
					self.addBoid();	
				}
				
			};
		}
	}
	_init();
}


module.exports = Flock;