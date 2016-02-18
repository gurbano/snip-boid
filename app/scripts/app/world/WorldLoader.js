var eFactory = require('../factories/EntityFactory')({});
var World = require('./World');
var WorldLoader = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof WorldLoader)) return new WorldLoader(this.opts);	

}
WorldLoader.prototype.load = function(opts, worldSpec) {
	var world = new World(opts);
	world.init();
	//var worldSpec = opts.WORLD;
	if (worldSpec.entities){//add entities
		for (var i = worldSpec.entities.length - 1; i >= 0; i--) {
			var entity = worldSpec.entities[i];
			world.addEntity({id: entity.id, type: entity.type}, entity);
		};
	}
	return world;
};

WorldLoader.prototype.loadFromJSON = function(opts, worldJSON) {
	console.info('imported object' ,worldJSON);	
	var world = new World(opts);
	world.init();
	if (worldJSON.entities){//add entities
		for (var i = worldJSON.entities.length - 1; i >= 0; i--) {
			var entity = worldJSON.entities[i];
			console.info(entity);
			eFactory.generate(entity, opts, function (e) {
				world.addEntity({id: e.id, type: e.type}, e);
			});
			
		};
	}
	console.info('cooked object', world);
	return world;
};

WorldLoader.prototype.saveToJSON = function(world, opts) {
	var entities = world.getEntities();
	var ret = world.serialize();
	for (var i = entities.length - 1; i >= 0; i--) {
		var entity = entities[i];
		ret.entities.push(entity.serialize());
	};
	return JSON.stringify(ret);
};



module.exports = new WorldLoader();