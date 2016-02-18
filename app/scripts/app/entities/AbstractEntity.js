/**
	Base class for LOGICAL entities in the world.
	fields:
		type 
		id

	methods:
		update - 

*/

var AbstractEntity = function(opts){
	var self = this;
	this.opts = opts || {};
	if (!(this instanceof AbstractEntity)) return new AbstractEntity(this.opts);	
	this.type = this.opts.type || this.TYPES.AbstractEntity;
	this.id = this.opts.id || randomUUID();
	this.parent = undefined;
	this.renderTargets = undefined;
	return this;
}
AbstractEntity.prototype.update = function(data) {
	console.error(this.type + ' update not implemented', data);
	this.updateTargets(data);
};
AbstractEntity.prototype.addTarget = function(target) {
	this.renderTargets = target;//.push(target);
};
AbstractEntity.prototype.updateTargets = function(data) {
	/*for (var i = this.renderTargets.length - 1; i >= 0; i--) {
		var target = this.renderTargets[i];
		if (target.update){
			target.update(this, data);
		}else{
			//console.error(target.type + ' update not implemented', target);
		}
	};*/
	if (this.renderTargets && this.renderTargets.update){this.renderTargets.update(this, data);}else{
		console.error(this.type + ' target update not implemented');
	}
};
AbstractEntity.prototype.onTargetUpdate = function (target, data) {
	console.info(this.type + ' updated by its target ' + target.type);
	this.setPosition(target.position.x, target.position.y);
}

AbstractEntity.prototype.TYPES = {};
AbstractEntity.prototype.TYPES.AbstractEntity = 'AbstractEntity';
AbstractEntity.prototype.TYPES.Flock = 'Flock';
AbstractEntity.prototype.TYPES.Boid = 'Boid';
AbstractEntity.prototype.TYPES.Wall = 'Wall';
AbstractEntity.prototype.TYPES.Bouncer = 'Bouncer';
AbstractEntity.prototype.TYPES.Goal = 'Goal';

AbstractEntity.prototype.serialize = function () {
	return{
		//opts: this.opts,
		type: this.type,
		parent: this.parent,
		id: this.id,
		position: this.position,

	}
};

module.exports = AbstractEntity;


var randomUUID = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}