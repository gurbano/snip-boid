var AA = require('../entities/AbstractEntity');
var Bouncer = require('../entities/Bouncer');
var Wall = require('../entities/Wall');
var Goal = require('../entities/Goal');
var FlockFactory = require('../factories/FlockFactory');
var conf = require('./level1.config');
var PixiTargetFactory = require('../factories/PixiTargetFactory');
var gu = require('../../utils.js');
var UIFactory = require('../UI/UIFactory.js');
var WorldLoader = require('../world/WorldLoader');



var targetFactory = conf.FLOCKFACTORY.targetFactory = conf.targetFactory = new PixiTargetFactory({});
var flock = new FlockFactory(conf.FLOCKFACTORY).generate(conf.FLOCK);



conf.WORLD = {};
conf.WORLD.entities = [flock];


for (var i = 0; i < 40; i++) {
	var bouncer = new Bouncer({
		draggable: true,
		x: gu.random(0, conf.width),
		y: gu.random(0, conf.height),
		radius: gu.random(10, 20),
		force: gu.random(100, 500),
		distance: gu.random(10, 50)
	});
	targetFactory.apply(bouncer);	
	conf.WORLD.entities.push(bouncer);
};


for (var i = 0; i < 5; i++) {
		var wall = new Wall({
			draggable: true,
			start: {x: gu.random(0, conf.width),
					y: gu.random(0, conf.height)},
			end: {x: gu.random(0, conf.width),
					y: gu.random(0, conf.height)},
			force: 500,
			distance: 100
		});
	targetFactory.apply(wall);	
	//conf.WORLD.entities.push(wall);
};

var goal = new Goal({
	draggable: true,
	x: 100,
	y: 100,
	radius: 20,
	force: -1,
	distance: 1
});
targetFactory.apply(goal);	
conf.WORLD.entities.push(goal);


module.exports = conf;