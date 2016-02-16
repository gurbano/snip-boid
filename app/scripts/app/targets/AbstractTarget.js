var AbstractTarget = function(opts){	
	if (!(this instanceof AbstractTarget)) return new AbstractTarget(opts);	
	var self = this;
	this.opts = opts || {};	
	this.type = 'AbstractTarget';
	return this;
}
AbstractTarget.prototype.update = function(data) {
	console.error(this.type + 'update not implemented', data);
};
module.exports = AbstractTarget;