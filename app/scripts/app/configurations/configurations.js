var templates = {
	FLOCK: {}
};


var base_flock = require('./flock/base');
var birds01 = require('./flock/birds01');
var zombies01 = require('./flock/zombies01');
var humans01 = require('./flock/humans01');
templates.FLOCK.BIRDS_01 = $.extend({}, base_flock, birds01);
templates.FLOCK.ZOMBIES_01 = $.extend({}, base_flock, zombies01);
templates.FLOCK.HUMANS_01 = $.extend({}, base_flock, humans01);



module.exports = templates;