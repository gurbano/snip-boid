var gu = require('./../../utils');
var Boid = require('./Boid');
var AbstractEntity = require('./AbstractEntity');
var defaultImpl = require('./../impl/beh')();

var Flock = function(opts){
	var self = this;
	if (!(this instanceof Flock)) return new Flock(this.opts);
	AbstractEntity.call(this, opts); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Flock;
	this.boids = [];
	this.init(opts);
}
Flock.prototype = Object.create(AbstractEntity.prototype);
Flock.prototype.constructor = AbstractEntity;
Flock.prototype.serialize = function () {
	return $.extend(
			{},
			this._serialize(), // 'parent' serialize
			{
				SIZE: this.boids.length,
				RANDOM: true,
				sepD   : this.sepD || 0,
				cohD   : this.cohD || 0,
				aliD   : this.aliD || 0,

				sepW   : this.sepW || 0,
				cohW   : this.cohW || 0,
				aliW   : this.aliW || 0,

				scaWP  : this.scaWP || 0,
				attrWP : this.attrWP || 0,
				goalWP : this.goalWP || 0,

				aLimit : this.aLimit || 0,
				sLimit : this.sLimit || 0,
				sRatio : this.sRatio || 0,
			}
		);
}
Flock.prototype.init = function(opts) {
	this.targetFactory = opts.targetFactory;

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

	
	generateInitialBoids.bind(this)(opts);

};
Flock.prototype.addBoid = function(opts) {
	var b = new Boid(
			$.extend({},opts,
			{	
				impl: this.impl,
				id: this.boids.length, 
				parent: this

			})
		);
	for (var i = 0; i < opts.behaviours.length; i++) {
		var beh = opts.behaviours[i];
		b.behaviours.push(beh);
	};

	this.boids.push(b);
	if (this.targetFactory){
		b.addTarget(this.targetFactory.generate(b));
	}
	return b;
};
Flock.prototype.onTargetUpdate = function (target, data) {
	this.setPosition(target.position.x, target.position.y);
	this.radius = target.radius || 0;
}
/*onUpdate, the Flock updates itself and then call the update, step and updateTarget on each boid*/
Flock.prototype.update = function(data) {
	//console.info("Flock (" + this.id + ") update");
	var self = this;
	var opts = $.extend({},data, {
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
		boid.debug = data.debug || false;
		boid.step(self.boids, opts); //move boids
		boid.updateTargets(data);  //update
	});
	this.updateTargets(data);
};


module.exports = Flock;


var generateInitialBoids = function  (opts) {
	var mx = this.width;
	var my = this.height;
	var MAX_FORCE = this.sLimit;
	if (opts.boids){
		for (var i = opts.boids.length - 1; i >= 0; i--) {
			var b = opts.boids[i];
			this.addBoid($.extend({},opts,{
				px: Math.floor(mx/2) + gu.random(-10,10), //gu.random(0,mx), 
				py: Math.floor(my/2) + gu.random(-10,10), //gu.random(0,my), 
				sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
				sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
				sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
			}));
		}
	}else if (opts.SIZE){
		for (var i = 0; i < opts.SIZE; i++) {
			if (opts.position){
				this.addBoid($.extend({},opts,{
					px: opts.position.x, 
					py: opts.position.y, 
					pz: 0, 
					sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
					sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
				}));
			}else if (opts.RANDOM){
				this.addBoid($.extend({},opts,{
					px: gu.random(0,mx), 
					py: gu.random(0,my), 
					pz: 0, 
					sx: gu.randomReal(-MAX_FORCE,MAX_FORCE), 
					sy: gu.randomReal(-MAX_FORCE,MAX_FORCE),
					sz: gu.randomReal(-MAX_FORCE,MAX_FORCE),
				}));
			}else{
				this.addBoid($.extend({},opts,{
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