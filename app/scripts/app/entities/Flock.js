var gu = require('./../../utils');
var Boid = require('./Boid');
var AbstractEntity = require('./AbstractEntity');
var defaultImpl = require('./../impl/3')();

var Flock = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof Flock)) return new Flock(this.opts);
	AbstractEntity.call(this); //extends pixi.container   
	this.type = this.TYPES.Flock;
	this.init(opts);
}
Flock.prototype = Object.create(AbstractEntity.prototype);
Flock.prototype.constructor = AbstractEntity;
Flock.prototype.init = function(opts) {
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

	this.impl = opts.impl || defaultImpl;
	
	this.width = opts.width || $(window).width();
	this.height = opts.height || $(window).height();

	this.boids = [];
	generateInitialBoids.bind(this)(opts);

};
Flock.prototype.addBoid = function(opts) {
	var b = new Boid(
			$.extend(opts,
			{	
				impl: this.impl,
				id: this.boids.length
			})
		);
	this.boids.push(b);
	return b;
};

/*onUpdate, the Flock updates itself and then call the update, step and updateTarget on each boid*/
Flock.prototype.update = function(data) {
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
	this.boids.forEach(function (boid) {
		boid.debug = self.debug || false;
		boid.step(self.boids, opts); //move boids
		boid.updateTargets(data);  //update
	});

};


module.exports = Flock;


var generateInitialBoids = function  (opts) {
	var mx = this.width;
	var my = this.height;
	var MAX_FORCE = this.sLimit;
	if (opts.SIZE){
		for (var i = 0; i < opts.SIZE; i++) {
			if (opts.RANDOM){
				this.addBoid($.extend(opts,{
					px: gu.random(0,mx), 
					py: gu.random(0,my), 
					pz: 0, 
					sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
					sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
				}));
			}else{
				this.addBoid($.extend(opts,{
					px: Math.floor(mx/2) + gu.random(-10,10), //gu.random(0,mx), 
					py: Math.floor(my/2) + gu.random(-10,10), //gu.random(0,my), 
					sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
					sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
				}));
			}
			
		};
	}
}