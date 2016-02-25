var World = function(opts){	
	if (!(this instanceof World)) return new World(opts);	
	var self = this;
	this.opts = opts || {};
	this.entities = {}; // [type][id]
	this.type = 'World';
	this.targetFactory = opts.targetFactory;
	this.stage = undefined;
	this.debug = false;
}
World.prototype.init = function() {
	console.info('Init world', this.opts);

	this.stage = this.targetFactory.generate(this); //new PixiWorld
	console.info('Stage ready', this.stage.info);
};
World.prototype.addEntity = function(options, entity) {
	console.debug('adding ' + entity.type, entity,);
	if (entity.id){
		if (!this.entities[entity.type]){
			this.entities[entity.type] = [];
		}		
		this.entities[entity.type].push(entity);
		if (this.stage){
			this.stage.addEntity(entity);
		}
	}else{
		console.error('Entity id missing; check the entity.id field', entity);
	} 
};
World.prototype.getEntities = function() {
	var ret = [];
	for(var key in this.entities){
		ret = ret.concat(this.entities[key]);
	}
	return ret;
};
World.prototype.getEntitiesByType = function(key) {
	var ret = [];
	if (this.entities[key])
		ret = ret.concat(this.entities[key]);	
	return ret;
};
World.prototype.getEntityKeys = function(key) {
	return Object.keys(this.entities);
};

World.prototype.update = function(data) {
	var opts = {
		debug: this.debug,
		attractors: this.getEntitiesByType('Bouncer'),
		goals:  this.getEntitiesByType('Goal'), 
		walls:  this.getEntitiesByType('Wall')
	};
	this.forEachEntity(function (entity) {
		entity.update(opts);
	});
	/*
	for(var key in this.entities){
		for (var i = this.entities[key].length - 1; i >= 0; i--) {
			var ent = this.entities[key][i];			
		};	
	}*/

	this.stage.update();	
};
World.prototype.remove = function() {
	console.info('removing world');	
	if (this.stage){
		this.stage.destroy();
	}
	this.entities = {}; 
};
World.prototype.forEachEntity = function(cb) {
	for(var key in this.entities){
		for (var i = this.entities[key].length - 1; i >= 0; i--) {
			var ent = this.entities[key][i];
			cb.bind(this)(ent);
		};	
	}
	
}
World.prototype.serialize = function () {
	return{
		//opts: this.opts,
		type: this.type,
		id: this.id,
		debug: this.debug,
		entities: []
	}
};

module.exports = World;