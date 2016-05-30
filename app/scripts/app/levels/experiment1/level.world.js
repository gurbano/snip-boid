var util = require('../../../utils'); //util.randomUUID()

var templates = require('../../configurations/configurations');


var HelperFactory = require('../../factories/EntityFactoryHelper');
var worldX = 2048;
var worldY = 2048;
var helper = new HelperFactory({limitX: worldX, limitY: worldY});


var bouncers = helper.generate(20,{"type":"Bouncer", draggable:true, "radius":20, "force": 10, "distance":10}, function (entities) {});
var hFlock = $.extend({}, templates.FLOCK.HUMANS_01, {"type":"Flock", "FLOCK": {"SIZE": 1, "RANDOM":false, id: "H_FLOCK", position:{x:50, y:0}}  } );
var zFlock = $.extend({}, templates.FLOCK.ZOMBIES_01, {"type":"Flock", "FLOCK": {"SIZE": 1, "RANDOM":false, id: "Z_FLOCK", position:{x:100, y:100} }  } );
var zFlockP = $.extend({}, templates.FLOCK.ZOMBIES_02, {"type":"Flock", "FLOCK": {"SIZE": 1, "RANDOM":false, id: "Z_FLOCK_P", position:{x:100, y:100}}  } );

var _conf = {
	"type":"World",
	"debug":false,
	"bg" : [ //background 
		{
			layer: 'back',  //name of the layer
			order: 0,  //z-index (0 bottom )
			type: 'repeat', //array 
			data: {src: '/images/grass.small.png', size:205, repeat:true, position:{x:0, y:0}}
		}		
	],
	world: {
	    x: 0,
	    y: 0,
	    width: worldX,//opts.width *10,
	    height: worldY,//opts.height *10
	},
	"entities":[
		//zFlock,	
		hFlock,
		//zFlockP,
/*
		{"type":"Wall", id: "WALL_1", draggable:false,"start":{"x":580,"y":100}, "end":{"x":920,"y":100}, "radius":100, "force": 1000, "distance":100},
		{"type":"Wall", id: "WALL_2", draggable:false,"start":{"x":580,"y":500}, "end":{"x":920,"y":500}, "radius":100, "force": 1000, "distance":100},
		{"type":"Bouncer", id: "WALL_B_1", draggable:false,"position":{"x":600,"y":100}, "radius":10, "force": 1000, "distance":10},
		{"type":"Bouncer", id: "WALL_B_12", draggable:false,"position":{"x":900,"y":100}, "radius":10, "force": 1000, "distance":10},

		{"type":"Wall", id: "WALL_3", draggable:false,"start":{"x":600,"y":80}, "end":{"x":600,"y":520}, "radius":100, "force": 1000, "distance":100},
		{"type":"Wall", id: "WALL_4", draggable:false,"start":{"x":900,"y":80}, "end":{"x":900,"y":520}, "radius":100, "force": 1000, "distance":100},
		{"type":"Bouncer", id: "WALL_B_3", draggable:false,"position":{"x":600,"y":500}, "radius":10, "force": 1000, "distance":10},
		{"type":"Bouncer", id: "WALL_B_3", draggable:false,"position":{"x":900,"y":500}, "radius":10, "force": 1000, "distance":10},

		{"type":"Goal", id: "PG_GOAL", draggable:false,"position":{"x":800,"y":800}, "radius":50, "force": -100, "distance":330},
	*/
		{"type":"PG", id: "PG", draggable:false,"position":{"x":800,"y":800}, "radius":20, "force": -1, "distance":1},
	]
};
for (var i = 0; i < bouncers.length; i++) {		
	//_conf.entities.push(bouncers[i]);
};

module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
