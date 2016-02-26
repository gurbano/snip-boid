var _conf = {
	"type":"World",
	"debug":false,
	"entities":[{"type":"Bouncer", draggable:true, "id":"4e85a629-06f9-4789-97c6-eec5ba75b5cc","position":{"x":100,"y":100}}]
};


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
