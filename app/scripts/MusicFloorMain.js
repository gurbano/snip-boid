var MusicFloor = require('./app/MusicFloor');
var WorldLoader = require('./app/world/WorldLoader');
var level1 = require('./app/levels/level1');




var experiment = new function() {
	var app = new MusicFloor({});
	console.info(app.info());
	app.setWorld(WorldLoader.load(level1));
	app.start();


	deb(app.getWorld(), app.getWorld().getEntitiesByType('Flock')[0]);

}

function deb (world, flock) {
	var gui = new dat.GUI();	
	gui.add(world, 'debug');			
	var f1 = gui.addFolder('Distances');
	f1.add(flock, 'sepD',10,1000);
	f1.add(flock, 'cohD',10,1000);
	f1.add(flock, 'aliD',10,1000);
	var f2 = gui.addFolder('Forces');
	f2.add(flock, 'sepW',1,100);
	f2.add(flock, 'cohW',1,100);
	f2.add(flock, 'aliW',1,100);
	var f3 = gui.addFolder('speed');
	f3.add(flock, 'sLimit',0.1,10).step(0.1);
	f3.add(flock, 'aLimit',0.00,2).step(0.1);	
	var f4 = gui.addFolder('WP');
	f4.add(flock, 'scaWP',0.1,2).step(0.1);
	f4.add(flock, 'attrWP',0.1,2).step(0.1);
	f4.add(flock, 'goalWP',0.1,2).step(0.1);
}
