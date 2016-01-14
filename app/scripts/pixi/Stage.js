var PBoid = require('./Pboid');


/*WRAPPER FOR PIXI STAGE
	- synchronizes flocks

*/
var Stage = function (opts) {
	var self = this;
	if (!(this instanceof Stage)) return new Stage(opts);
	PIXI.Container.call(this); //extends pixi.container
	this.update = function () {
		// body...
	}
	this.synchronizeFlock = function (flock) {
		var boids = flock.list();
		//console.info('displayin ', boids.length, ' boids');
		for (var i = 0; i < boids.length; i++) {
			if (!pBoids[i]){
				pBoids.push(new PBoid());
				this.addChild(pBoids[i]);
			}
			//Update position of the pBoid according to the position of the boid
			pBoids[i].position.x = boids[i].getPosition()[0];
			pBoids[i].position.y = boids[i].getPosition()[1];
			//Update rotation of the pBoid accordin to the speed (direction) of the boid
	        var rad = Math.atan2(boids[i].getSpeed()[1],boids[i].getSpeed()[0]); //rotation: atan2(speedy , speedx)
	        pBoids[i].rotation = rad + (Math.PI / 2);
		};
	}

	/*internal*/
	var pBoids = []; //array of PBoids
}


/*PROTO INHERITANCE*/
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = PIXI.Container;


module.exports = Stage;