var util = require('../../../utils'); //util.randomUUID()

var templates = require('../../configurations/configurations');
var templateBirds=  templates.FLOCK.BIRDS_01;
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
		$.extend(templateBirds, {"type":"Flock","position":{"x":100,"y":100}, "FLOCK": {"SIZE": 2}  } ),
		//{"type":"Goal", draggable:true,"position":{"x":500,"y":500}, "radius":20, "force": -1, "distance":1}
		{"type":"PG", draggable:false,"position":{"x":500,"y":500}, "radius":20, "force": -1, "distance":1}
	]
};


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
