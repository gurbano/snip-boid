var TargetFactory = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof TargetFactory)) return new TargetFactory(opts);
	this.name = 'BaseTargetFactory';
	this.description = 'Abstract Factory'	
	this.info = function () {
		console.info(this);
	}
	return this;
}
TargetFactory.prototype.generate = function (entity) {
	console.warn('cant generate a target for ' + entity.type, entity);
	return {};
};
TargetFactory.prototype.apply = function (entity) {
	entity.addTarget(this.generate(entity));
	return entity;
};
module.exports = TargetFactory;