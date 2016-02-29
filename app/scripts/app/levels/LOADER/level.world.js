var util = require('../../../utils');

var _conf = {
	"type":"World",
	"debug":false,
	"entities":[
		{"type":"Bouncer", draggable:true, "id":util.randomUUID(),"position":{"x":100,"y":100}},
		{"type":"Flock", "id":util.randomUUID(),"position":{"x":100,"y":100}},
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
