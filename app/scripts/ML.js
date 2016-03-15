var MusicLand = require('./app/MusicLand');
var WorldLoader = require('./app/world/WorldLoader');



var exp1 = require('./app/levels/experiment1/level');



window.app = undefined;
var MusicLandStartupper = new function() {
	var conf = exp1;
	window.app = new MusicLand({speed: conf.speed});
	console.info(app.info());
	window.app.pushLevel("LEVEL1", exp1.CONF, WorldLoader.loadFromJSON(exp1.CONF, exp1.WORLD), exp1.UI, exp1.EVENTS.events, exp1.POST.cb, "");
	window.app.activateLevel("LEVEL1");
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
