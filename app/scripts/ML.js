var MusicLand = require('./app/MusicLand');
var WorldLoader = require('./app/world/WorldLoader');



var loader = require('./app/levels/LOADER/level');



window.app = undefined;
var MusicLandStartupper = new function() {
	var conf = loader;
	window.app = new MusicLand({speed: conf.speed});
	console.info(app.info());
	window.app.pushLevel("LOADER", loader.CONF, WorldLoader.loadFromJSON(loader.CONF, loader.WORLD), loader.UI, loader.EVENTS.events, "LEVEL1");
	//app.pushLevel("LEVEL1", test1.CONF,  WorldLoader.loadFromJSON(test1.CONF, test1.WORLD), test1.UI);
	window.app.activateLevel("LOADER");
	window.app.start();	
	window.app.trigger('started');
	
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
