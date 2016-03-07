var util = require('../../../utils'); //util.randomUUID()

var templates = require('../../configurations/configurations');
var templateBirds=  templates.FLOCK.BIRDS_01;

var HelperFactory = require('../../factories/EntityFactoryHelper');
var worldX = 5000;
var worldY = 5000;
var helper = new HelperFactory({limitX: worldX, limitY: worldY});




var bouncers = helper.generate(20,{"type":"Bouncer", draggable:true, "radius":20, "force": 10, "distance":10}, function (entities) {});
var _conf = {
	"type":"World",
	"debug":false,
	/*"bg" : [ //background 
		{
			layer: 'back',  //name of the layer
			order: 0,  //z-index (0 bottom )
			type: 'repeat', //array 
			data: {src: '/images/sky.jpg', size:512, repeat:true, position:{x:0, y:0}}
		}		
	],*/
	world: {
	    x: 0,
	    y: 0,
	    width: worldX,//opts.width *10,
	    height: worldY,//opts.height *10
	},
	"entities":[
		$.extend(templateBirds, {"type":"Flock", "FLOCK": {"position":{"x":800,"y":800}, "SIZE": 50, id: "PG_FLOCK"}  } ),
		{"type":"Goal", id: "PG_GOAL", draggable:false,"position":{"x":800,"y":800}, "radius":50, "force": -100, "distance":230},
		{"type":"PG", id: "PG", draggable:false,"position":{"x":800,"y":800}, "radius":20, "force": -1, "distance":1},
		//{"type":"Bouncer", draggable:true,"position":{"x":300,"y":300}, "radius":20, "force": 10, "distance":10},
		//{"type":"Bouncer", draggable:true,"position":{"x":400,"y":400}, "radius":20, "force": 10, "distance":10},
		//{"type":"Bouncer", draggable:true,"position":{"x":500,"y":500}, "radius":20, "force": 10, "distance":10},
	]
};
for (var i = 0; i < bouncers.length; i++) {		
	_conf.entities.push(bouncers[i]);
};

module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
