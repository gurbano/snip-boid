var Boid = require('./Boid');

/*A Flock is a collection of boids*/
var Flock = function (opts) {
	var self = this;

	this.sepD = 30;
	this.cohD = 500;
	this.aliD = 110;

	this.sepW = 35.0;
	this.cohW = 5.5;
	this.aliW = 10.5;

	this.aLimit = 1;
	this.sLimit = 3;


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
		return b;
	}
	//REMOVE A BOID
	this.removeBoid = function (boid) {
		_b.remove(boid);
		//__b[boid.getPosition().x][boid.getPosition().y].remove(boid);
	}
	this.removeBoidAt = function (x,y) {
		var boids = this.listAt(x,y);
		for (var i = boids.length - 1; i >= 0; i--) {
			_b.remove(boids[i]);
		};
	}
	//LIST BOIDS - as array
	this.list = function () {
		return _b;
	}

	/*STEP - advance the simulation one step*/
	this.step = function (data) {	
		for (var i = 0; i < _b.length; i++) {
			var boid = _b[i];
			var neigh = _b;// getNeighbous(i, 250);
			boid.step(neigh, $.extend(data, {
				sepD: this.sepD,
				cohD: this.cohD,
				aliD: this.aliD,
			
				sepW: this.sepW,
				cohW: this.cohW,
				aliW: this.aliW,

				aLimit: this.aLimit,
				sLimit: this.sLimit
			}));
		}
	}	




	
	/*INTERNAL*/
	var _b = []; //internal array representation

	var _init = function () {
		console.info('Creating flock', [mx,my]);
		//_init2dMap();
		console.info('Inited flock', [mx,my]);
		debugger;
		if (opts.SIZE){
			for (var i = 0; i < opts.SIZE; i++) {
				if (opts.RANDOM){
					self.addBoid({
						px: gu.random(0,mx), 
						py: gu.random(0,my), 
						sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
						sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					});
				}else{
					self.addBoid({
						px: Math.floor(mx/2), //gu.random(0,mx), 
						py: Math.floor(my/2), //gu.random(0,my), 
						sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
						sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					});
				}
				
			};
		}
		console.info('Added boids', self.list().length);
	}
	_init();
}


module.exports = Flock;