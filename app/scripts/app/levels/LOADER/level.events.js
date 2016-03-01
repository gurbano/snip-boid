var util = require('../../../utils'); //util.randomUUID()


var playMusicEvent = new AppEvent({
	start:0,
	end:-1,
	type: "music",
	onTrigger : function (ev, data) {
		console.info('event triggered',this, ev, data);	
	}
});

var _conf = {
	"type":"Events",
	"debug":false,
	"events":[playMusicEvent]
};


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
