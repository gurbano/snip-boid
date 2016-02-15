var AA = require('../entities/AbstractEntity');
var Wall = require('../entities/Wall');
var FlockFactory = require('../factories/FlockFactory');
var conf = require('./level1.config');

var flock = new FlockFactory(conf.FACTORY).generate(conf.FLOCK);

module.exports = {
	entities : [
		//new AA(),
		flock,
		new Wall()
	]
}