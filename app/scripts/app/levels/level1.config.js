

module.exports = {
	simRatio: 1,
	width: $(window).width(),
	height: $(window).height(),
	BACKGROUND : 0x0D0C0C,
	FLOCKFACTORY: {
		sepD: 150, //try to keep this distance
		cohD: 600, //try to stick with ppl inside this radius
		aliD: 400,

		sepW: 100,
		cohW: 140, //0 -> 100
		aliW: 80,

		aLimit: 0.5,
		sLimit: 3,
		sRatio: 1,

		scaWP:  0.5,
		attrWP: 2,
		goalWP: 1,
		RANDOM: false
	},
	FLOCK: {
		SIZE: 30,
	}
}