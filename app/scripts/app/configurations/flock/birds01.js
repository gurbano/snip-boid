var PixiTargetFactory = require('../../factories/PixiTargetFactory');
var _conf = {	
	FLOCKFACTORY: {
		targetFactory: new PixiTargetFactory({}),
		sepD: 60, //try to keep this distance
		cohD: 600, //try to stick with ppl inside this radius
		aliD: 400,

		sepW: 500,
		cohW: 140, //0 -> 100
		aliW: 580,

		aLimit: 0.6,
		sLimit: 3,
		sRatio: 1,

		scaWP:  0.6,
		attrWP: 1.2,
		goalWP: 0.8,

		RANDOM: false
	}
}


module.exports = _conf;