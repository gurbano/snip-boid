var Flock = require('../entities/Flock');
var Wall = require('../entities/Wall');
var Goal = require('../entities/Goal');
var PG = require('../entities/PG');
var Bouncer = require('../entities/Bouncer');
var FlockFactory = require('./FlockFactory');
var util = require('../../utils');


/*ENTITY FACTORY*/
var EntityFactoryHelper = function (opts) {
	var self = this;
	opts = opts || {};
	if (!(this instanceof EntityFactoryHelper)) return new EntityFactoryHelper(opts);
	this.opts = opts;
	this.limitX = opts.limitX || $(document).width();	
	this.limitY = opts.limitY || $(document).height();	
	this.name = 'EntityFactoryHelper';	
	this.info = function () {
		console.info(this);
	}
	return this;
}
EntityFactoryHelper.prototype.generate = function(number, base, cb) {
	var ret = [];
	while(ret.length < number){
		var _base = $.extend({}, base);
		_base.position = {};
		_base.position.x = util.random(0,this.limitX );
		_base.position.y = util.random(0, this.limitY );
		ret.push(_base);
	}
	if (cb){cb(ret);}
	return ret;
};







module.exports = EntityFactoryHelper;