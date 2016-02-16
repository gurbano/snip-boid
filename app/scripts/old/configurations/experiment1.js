
module.exports = {
	simRatio: 4,
	BACKGROUND : 0x0D0C0C,
	FACTORY: {},
	FLOCK: {//impl3
		SIZE: 100,
		
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
	FLOCKold: {
		SIZE: 100,
		
		sepD: 100, //try to keep this distance
		cohD: 300, //try to stick with ppl inside this radius
		aliD: 150,

		sepW: 55,
		cohW: 75, //0 -> 100
		aliW: 50,

		aLimit: 0.5,
		sLimit: 3,
		sRatio: 1,

		scaWP:  1,
		attrWP: 1,
		goalWP: 1
	}
}