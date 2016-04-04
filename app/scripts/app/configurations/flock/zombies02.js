var PixiTargetFactory = require('../../factories/PixiTargetFactory');
var _conf = {	
	FLOCKFACTORY: {
		targetFactory: new PixiTargetFactory({}),
		sepD: 40, //try to keep this distance
		cohD: 600, //try to stick with ppl inside this radius
		aliD: 200,

		sepW: 500,
		cohW: 550, //0 -> 100
		aliW: 180,

		aLimit: 0.6,
		sLimit: 0.6,
		sRatio: 1,

		scaWP:  0.5,
		attrWP: 5,
		goalWP: 0.5,

		RANDOM: true,
		behaviours: [
			{name: 'EVADE', priority:1, weight: 1, data: { 
				getGoal: function () {
					var world = this.parent.parent;
					var target = world.getEntityById('H_FLOCK').boids[0];
					return target;
					}
				} 
			}
		]
	}
}


module.exports = _conf;

