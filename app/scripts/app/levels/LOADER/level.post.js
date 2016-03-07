var Follower = require('../../entities/behaviour/Follower');
var postCreation = function () {
	var app = this;
	console.info('After initialization', app);	
	var PG_GOAL = app.getWorld().getEntityById('PG_GOAL');
	var PG = app.getWorld().getEntityById('PG');
	PG.behaviours.push(new Follower(PG,PG_GOAL,{}));

}
var _conf = {
	"cb":postCreation
};

module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
