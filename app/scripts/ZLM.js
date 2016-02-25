var ZombieLand = require('./app/ZombieLand');
var WorldLoader = require('./app/world/WorldLoader');
var UILoader = require('./app/UI/UILoader');
var level1 = require('./app/levels/level1');
var level1ui = require('./app/levels/level1.UI');
var conf = require('./app/levels/level1.config');

var level1JSON = require('./app/levels/level1.JSON');


var ZombieLandStartupper = new function() {
	var app = new ZombieLand({speed: conf.speed});
	console.info(app.info());
	
	app.setWorld(WorldLoader.load(level1, level1.WORLD)); //load from programmatic configuration
	//app.setWorld(WorldLoader.loadFromJSON(conf, level1JSON)); //load from serialized world

	app.start();
	
	app.ui = UILoader.load(level1ui);
	app.ui.bindToApp(app); 
	deb(app, app.getWorld(), app.getWorld().getEntitiesByType('Flock')[0]);
}


function deb (app, world, flock) {
	var gui = new dat.GUI();	
	gui.add(world, 'debug');
	gui.add(app, 'speed',0,20).step(1);
	var f1 = gui.addFolder('Distances');
	f1.add(flock, 'sepD',0,1000).step(10);
	f1.add(flock, 'cohD',0,1000).step(10);
	f1.add(flock, 'aliD',0,1000).step(10);
	var f2 = gui.addFolder('Forces');
	f2.add(flock, 'sepW',0,1000).step(10);
	f2.add(flock, 'cohW',0,1000).step(10);
	f2.add(flock, 'aliW',0,1000).step(10);
	var f3 = gui.addFolder('speed');
	f3.add(flock, 'sLimit',0.1,10).step(0.1);
	f3.add(flock, 'aLimit',0.00,2).step(0.1);	
	var f4 = gui.addFolder('WP');
	f4.add(flock, 'scaWP',0.1,2).step(0.1);
	f4.add(flock, 'attrWP',0.1,2).step(0.1);
	f4.add(flock, 'goalWP',0.1,2).step(0.1);
	gui.close();
}
