module.exports = {
	simRatio: 1,
	BACKGROUND : 0x0D0C0C,
	FACTORY: {
		sepD: 50, //try to keep this distance
		cohD: 600, //try to stick with ppl inside this radius
		aliD: 400,

		sepW: 100,
		cohW: 40, //0 -> 100
		aliW: 80,

		aLimit: 1.5,
		sLimit: 6,
		sRatio: 1,

		scaWP:  1,
		attrWP: 2,
		goalWP: 1
	},
	FLOCK: {
		SIZE: 3,
	}
}