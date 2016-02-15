var World = require('./World');
var WorldLoader = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof WorldLoader)) return new WorldLoader(this.opts);	

}
WorldLoader.prototype.load = function(worldSpec) {
	var world = new World(worldSpec);
	world.init();
	if (worldSpec.entities){//add entities
		for (var i = worldSpec.entities.length - 1; i >= 0; i--) {
			var entity = worldSpec.entities[i];
			world.addEntity({id: entity.id, type: entity.type}, entity);
		};
	}
	return world;
};

module.exports = new WorldLoader();