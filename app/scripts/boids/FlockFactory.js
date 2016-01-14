

var FlockFactory = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof FlockFactory)) return new FlockFactory(opts);
	this.name = 'FlockFactory';
	this.description = 'create a flock'
	this.info = function () {
		console.info(this);
	}
	this.generate = function (opts) {
		opts = opts || {};
		var f =  new Flock(opts);

		return f;
	}
	return this;
}


/*A Flock is a collection of boids*/
var Flock = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof Flock)) return new Flock(opts);	
	var mx = opts.WIDTH || 2000; 
	var my = opts.HEIGHT || 2000; // max width, max height
	

	this.info = function () {
		console.info(this);
		console.info('size', [mx, my]);
		console.info('boids', _boids.length);
	}
	//ADD A BOID
	this.addBoid = function (opts) {
		var b = new Boid(opts);
		_b.push(b);
		__b[b.getPosition()[0]][b.getPosition()[1]].push(b);
		return b;
	}
	//REMOVE A BOID
	this.removeBoid = function (boid) {
		_b.remove(boid);
		__b[boid.getPosition()[0]][boid.getPosition()[1]].remove(boid);
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
					self.addBoid({px: gu.random(0,mx), py: gu.random(0,my)});
				}else{
					self.addBoid();	
				}
				
			};
		}
	}
	_init();
}

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
	if (!(this instanceof Boid)) return new Boid(opts);
	this.getPosition = function () {return [_[px], _[py] ];}
	this.getSpeed = function () {return [_[sx], _[sy] ];}
	this.getForce = function () {return [_[fx], _[fy] ];}
	/*INTERNAL*/
	var _ = [	opts.px || 0,
				opts.py || 0
				,0
				,0
				,0
				,0
			];
	return this;
}


module.exports = FlockFactory;