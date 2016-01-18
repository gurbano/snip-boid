var PBoid = require('./PBoid');



/*WRAPPER FOR PIXI STAGE
	- synchronizes flocks

*/
var Stage = function (opts) {
	var self = this;
	var flocks = []; //array of flocks 
	var pBoids = []; //array of array of entities
	var attractors = [];
	var goals = [];
	if (!(this instanceof Stage)) return new Stage(opts);
	PIXI.Container.call(this); //extends pixi.container
	this.addFlock = function (flock) {
		flocks.push(flock);	
		pBoids.push([]);
	}
	this.addEntity = function (ent, cb) {
		this.addChild(ent);
		if (ent.type === 'attractor')
			attractors.push(ent);
		if (ent.type === 'goal')
			goals.push(ent);		
		cb(ent);
	}
	/*internal*/
	var synchronizeFlock = function (p, f) {
		var boids = f.list();
		//console.info('displayin ', boids.length, ' boids');
		for (var i = 0; i < boids.length; i++) {
			if (!p[i]){
				p.push(new PBoid());
				self.addChild(p[i]);
			}			
	        p[i].update(boids[i]);
		};
	}

	this.update = function () {
		//update attractors
		attractors.forEach(function(attractor){
			if (attractor.update){
				attractor.update();
			}
		});
		goals.forEach(function(goal){
			if (goal.update){
				goal.update();
			}
		});		
		

		//Update flocks
		for (var i = 0; i < flocks.length; i++) {
			var f = flocks[i];
			var p = pBoids[i];
			f.step({attractors: attractors, goals: goals});
			synchronizeFlock(p,f);
		};
		
	}

	
}


/*PROTO INHERITANCE*/
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = PIXI.Container;


module.exports = Stage;