var AbstractEntity = require('./AbstractEntity');

var Wall = function(opts){
	var self = this;	
	if (!(this instanceof Wall)) return new Wall(this.opts);
	AbstractEntity.call(this); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.Wall;
}
Wall.prototype = Object.create(AbstractEntity.prototype);
Wall.prototype.constructor = AbstractEntity;
Wall.prototype.update = function(data) {
	
};

module.exports = Wall;