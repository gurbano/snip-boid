var utils = require('../../../utils.js');
var templates = require('../../configurations/configurations');
var templateBirds=  templates.FLOCK.BIRDS_01;

var _conf = {
	"type":"World",
	"debug":false,
	"entities":[
		$.extend(templateBirds, {"type":"Flock","position":{"x":100,"y":100}, "FLOCK": {"SIZE": 100}  } ),
		//{"type":"Goal", draggable:true,"position":{"x":500,"y":500}, "radius":20, "force": -1, "distance":1}
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
