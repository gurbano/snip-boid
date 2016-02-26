var ZombieLand = require('./app/ZombieLand');
var WorldLoader = require('./app/world/WorldLoader');



var loader = require('./app/levels/LOADER/level');
var test1 = require('./app/levels/test1/level');



var ZombieLandStartupper = new function() {
	var conf = loader;


	var app = new ZombieLand({speed: conf.speed});
	console.info(app.info());
	app.pushLevel("LOADER", loader.CONF, WorldLoader.loadFromJSON(loader.CONF, loader.WORLD), loader.UI, "LEVEL1");
	app.pushLevel("LEVEL1", test1.CONF,  WorldLoader.loadFromJSON(test1.CONF, test1.WORLD), test1.UI);
	app.activateLevel("LOADER");

	app.start();
	
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
