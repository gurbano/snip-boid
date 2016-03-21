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
		sLimit: 1,
		sRatio: 1,

		scaWP:  0.5,
		attrWP: 5,
		goalWP: 0.5,

		RANDOM: true
	}
}


module.exports = _conf;