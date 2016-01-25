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
	var walls = [];
	if (!(this instanceof Stage)) return new Stage(opts);
	PIXI.Container.call(this); //extends pixi.container
	this.addFlock = function (flock) {
		flocks.push(flock);	
		pBoids.push([]);
	}
	this.getFlocks = function () {
		return flocks;
	}
	this.addEntity = function (ent, cb) {
		this.addChild(ent);
		if (ent.type === 'attractor')
			attractors.push(ent);
		if (ent.type === 'goal')
			goals.push(ent);		
		if (ent.type === 'wall')
			walls.push(ent);
		cb(ent);
	}
	/*internal*/
	var synchronizeFlock = function (p, f) {
		var boids = f.list();
		//console.info('displayin ', boids.length, ' boids');
		for (var i = 0; i < boids.length; i++) {
			if (!p[i]){
				p.push(new PBoid(f.opts.boids || {}));
				self.addChild(p[i]);
				self.addChild(p[i].target);
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
		walls.forEach(function(wall){
			if (wall.update){
				wall.update();
			}
		});			

		//Update flocks
		for (var i = 0; i < flocks.length; i++) {
			var f = flocks[i];
			var p = pBoids[i];
			f.step({attractors: attractors, goals: goals, walls: walls});
			synchronizeFlock(p,f);
		};
		
	}

	
}


/*PROTO INHERITANCE*/
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = PIXI.Container;


module.exports = Stage;