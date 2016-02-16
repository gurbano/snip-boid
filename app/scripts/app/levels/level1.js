var AA = require('../entities/AbstractEntity');
var Bouncer = require('../entities/Bouncer');
var Wall = require('../entities/Wall');
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
		force: gu.random(100, 500),
		distance: gu.random(10, 50)
	});
	//targetFactory.apply(bouncer);	
	//conf.WORLD.entities.push(bouncer);
};

for (var i = 0; i < 1; i++) {
		var wall = new Wall({
		start: {x: gu.random(0, conf.width),
				y: gu.random(0, conf.height)},
		end: {x: gu.random(0, conf.width),
				y: gu.random(0, conf.height)},
		force: gu.random(100, 500),
		distance: 100
	});
	targetFactory.apply(wall);	
	conf.WORLD.entities.push(wall);
};




module.exports = conf;
