var PBoid = require('./Pboid');


/*WRAPPER FOR PIXI STAGE
	- synchronizes flocks

*/
var Stage = function (opts) {
	var self = this;
	if (!(this instanceof Stage)) return new Stage(opts);
	PIXI.Container.call(this); //extends pixi.container

	this.synchronizeFlock = function (flock) {
		var boids = flock.list();
		console.info('displayin ', boids.length, ' boids');
		for (var i = 0; i < boids.length; i++) {
			if (!pBoids[i]){
				pBoids.push(new PBoid());
				this.addChild(pBoids[i]);
			}
			pBoids[i].position.x = boids[i].getPosition()[0];
			pBoids[i].position.y = boids[i].getPosition()[1];
		};
	}

	/*internal*/
	var pBoids = []; //array of PBoids
}


/*PROTO INHERITANCE*/
Stage.prototype = Object.create(PIXI.Container.prototype);
Stage.prototype.constructor = PIXI.Container;


module.exports = Stage;