var Boid = require('./Boid');
//var Parallel = require('paralleljs');

/*A Flock is a collection of boids*/
var Flock = function (opts) {
	var self = this;

	this.name = opts.name || 'flock';

	this.sepD = opts.sepD || 0;
	this.cohD = opts.cohD || 0;
	this.aliD = opts.aliD || 0;

	this.sepW = opts.sepW || 0;
	this.cohW = opts.cohW || 0;
	this.aliW = opts.aliW || 0;

	this.scaWP = opts.scaWP || 0;
	this.attrWP = opts.attrWP || 0;
	this.goalWP = opts.goalWP || 0;

	this.aLimit = opts.aLimit || 0;
	this.sLimit = opts.sLimit || 0;
	this.sRatio = opts.sRatio || 0;

	this.opts = opts; //flock option. contains info about boids as well

	opts = opts || {};
	if (!(this instanceof Flock)) return new Flock(opts);	

	/*INTERNAL*/
	var _b = []; //array of boids 

	/*DEFAULT VALUES*/
	var mx = opts.WIDTH || 2000; 
	var my = opts.HEIGHT || 2000; // max width, max height
	var MAX_FORCE = opts.MAX_FORCE || this.sLimit;

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
		var self = this;
		var opts = $.extend(data, {
			sepD: this.sepD,
			cohD: this.cohD,
			aliD: this.aliD,
			
			sepW: this.sepW,
			cohW: this.cohW,
			aliW: this.aliW,

			scaWP: this.scaWP,
			attrWP: this.attrWP,
			goalWP: this.goalWP,

			aLimit: this.aLimit,
			sLimit: this.sLimit,
			sRatio: this.sRatio
		});
		_b.forEach(function (boid) {
			boid.debug = self.debug;
			boid.step(_b, opts);
		});
	}	
	

	
	var _init = function () {
		console.info('Creating flock', [mx,my]);
		//_init2dMap();
		console.info('Inited flock', [mx,my]);
		if(opts.IMPL)opts.IMPL.info();
		if (opts.SIZE){
			for (var i = 0; i < opts.SIZE; i++) {
				if (opts.RANDOM){
					self.addBoid($.extend(opts,{
						px: gu.random(0,mx), 
						py: gu.random(0,my), 
						pz: 0, 
						sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
						sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
						sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					}));
				}else{
					self.addBoid($.extend(opts,{
						px: Math.floor(mx/2) + gu.random(-10,10), //gu.random(0,mx), 
						py: Math.floor(my/2) + gu.random(-10,10), //gu.random(0,my), 
						sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
						sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
						sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					}));
				}
				
			};
		}
		console.info('Added boids', self.list().length);
	}
	_init();
}


module.exports = Flock;