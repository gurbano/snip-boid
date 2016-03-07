var util = require('../../../utils'); //util.randomUUID()

var templates = require('../../configurations/configurations');
var templateBirds=  templates.FLOCK.BIRDS_01;

var Helper = require('../../factories/EntityFactoryHelper');

var bouncers = Helper.generate(50,{"type":"Bouncer", draggable:true, "radius":20, "force": 10, "distance":10},
	function (entities) {});


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
	"entities":[
		$.extend(templateBirds, {"type":"Flock","position":{"x":100,"y":100}, "FLOCK": {"SIZE": 200, id: "PG_FLOCK"}  } ),
		{"type":"Bouncer", id: "PG_GOAL", draggable:false,"position":{"x":0,"y":0}, "radius":20, "force": -10, "distance":10},
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
