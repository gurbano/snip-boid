var MusicFloor = require('./app/MusicFloor');
var WorldLoader = require('./app/world/WorldLoader');
var level1 = require('./app/levels/level1');




var experiment = new function() {
	var app = new MusicFloor({});
	console.info(app.info());
	app.setWorld(WorldLoader.load(level1));
	app.start();

}
