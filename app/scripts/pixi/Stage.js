var PBoid = require('./PBoid');



/*WRAPPER FOR PIXI STAGE
	- synchronizes flocks

*/
var Stage = function (opts) {
	var self = this;
	var flocks = []; //array of flocks 
	var pBoids = []; //array of array of entities
	var entities = [];
	if (!(this instanceof Stage)) return new Stage(opts);
	PIXI.Container.call(this); //extends pixi.container
	this.addFlock = function (flock) {
		flocks.push(flock);	
		pBoids.push([]);
	}
	this.addEntity = function (ent, cb) {
		this.addChild(ent);
		entities.push(ent);
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
			//console.info(boids[i].getPosition());
			//Update position of the pBoid according to the position of the boid
			p[i].position.x = boids[i].getPosition().x;
			p[i].position.y = boids[i].getPosition().y;
			//Update rotation of the pBoid accordin to the speed (direction) of the boid
	        var rad = Math.atan2(boids[i].getSpeed().y ,boids[i].getSpeed().x); //rotation: atan2(speedy , speedx)
	        p[i].rotation = rad + (Math.PI / 2);
		};
	}

	this.update = function () {
		//update entities
		for (var i = entities.length - 1; i >= 0; i--) {
			var ent = entities[i];
			if (ent.update){
				ent.update();
			}
		};		

		//Update flocks
		for (var i = 0; i < flocks.length; i++) {
			var f = flocks[i];
			var p = pBoids[i];
			f.step({attractors: entities});
			synchronizeFlock(p,f);
		};
		
	}

	
}


/*PROTO INHERITANCE*/
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = PIXI.Container;


module.exports = Stage;