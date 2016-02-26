var PixiTargetFactory = require('../../factories/PixiTargetFactory');
var GREEN = 0x00fa9a;


var _conf = {
	targetFactory: new PixiTargetFactory({}),
	speed: 1,
	width: $(window).width(),
	height: $(window).height(),
	BACKGROUND : GREEN,
	FLOCKFACTORY: {
		sepD: 70, //try to keep this distance
		cohD: 600, //try to stick with ppl inside this radius
		aliD: 400,

		sepW: 500,
		cohW: 140, //0 -> 100
		aliW: 180,

		aLimit: 0.8,
		sLimit: 3,
		sRatio: 1,

		scaWP:  0.6,
		attrWP: 1.2,
		goalWP: 0.8,

		RANDOM: false
	},
	FLOCK: {
		SIZE: 100,
	}
}


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
