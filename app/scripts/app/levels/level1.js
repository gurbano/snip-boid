var AA = require('../entities/AbstractEntity');
var Bouncer = require('../entities/Bouncer');
var FlockFactory = require('../factories/FlockFactory');
var conf = require('./level1.config');
var PixiTargetFactory = require('../factories/PixiTargetFactory');
var gu = require('../../utils.js');


var targetFactory = conf.FLOCKFACTORY.targetFactory = conf.targetFactory = new PixiTargetFactory({});
var flock = new FlockFactory(conf.FLOCKFACTORY).generate(conf.FLOCK);

conf.WORLD = {};
conf.WORLD.entities = [flock];


for (var i = 0; i < 40; i++) {
		var bouncer = new Bouncer({
		x: gu.random(0, conf.width),
		y: gu.random(0, conf.height),
		radius: gu.random(10, 20),
		force: gu.random(100, 800)
	});
	targetFactory.apply(bouncer);	
	conf.WORLD.entities.push(bouncer);
};

module.exports = conf;
