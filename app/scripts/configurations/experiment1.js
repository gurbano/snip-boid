module.exports = {
	BACKGROUND : 0x000000,
	FACTORY: {},
	FLOCK: {
		SIZE: 100,
		
		sepD: 100, //try to keep this distance
		cohD: 300, //try to stick with ppl inside this radius
		aliD: 150,

		sepW: 55,
		cohW: 75, //0 -> 100
		aliW: 50,

		aLimit: 0.3,
		sLimit: 4,
		sRatio: 1,
	}
}