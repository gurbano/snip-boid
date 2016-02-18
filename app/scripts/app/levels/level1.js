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
	//conf.WORLD.entities.push(bouncer);
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
	conf.WORLD.entities.push(wall);
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

/*PLAYBACK CONTROL*/
var pbControl = UIFactory.getBox('PB-CONTROLS');
var pbControls = UIFactory.getButtonGroup('playback-controls-group');
pbControl.append(pbControls);
pbControl.onBind = function (ui, app) {
	var bStop = UIFactory.getButton('STOP',function () {
		app.speed = 0;
	}); 
	var bStart= UIFactory.getButton('PLAY',function () {
		app.speed = 1;
	});	
	var bSlow= UIFactory.getButton('SLOW',function () {
		app.speed = 10;
	}); 
	pbControls.append(bStop);
	pbControls.append(bStart);
	pbControls.append(bSlow);
}





var level1JSON = require('./level1.JSON');
/*SAVE AND LOAD*/
var pbControl = UIFactory.getBox('FILE-CONTROLS');
var pbControls = UIFactory.getButtonGroup('file-controls-group');
pbControl.append(pbControls);
pbControl.onBind = function (ui, app) {
	var bSave = UIFactory.getButton('SAVE',function () {
		console.info('saving',WorldLoader.saveToJSON(app.world, {}));
		
	}); 
	var bLoad= UIFactory.getButton('LOAD',function () {
		var ret = WorldLoader.loadFromJSON(conf, level1JSON);
		//var ret = WorldLoader.loadFromJSON(WorldLoader.saveToJSON(app.world, {}),{});
		app.setWorld(ret);
		console.info('loading',ret);
	});	
	
	pbControls.append(bSave);
	pbControls.append(bLoad);
}


conf.UI = {
	controls:
	[
		pbControl
	]	
}


module.exports = conf;