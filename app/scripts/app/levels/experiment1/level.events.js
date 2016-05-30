var util = require('../../../utils'); //util.randomUUID()
var AppEvent = require('../../events/AppEvent');

var cameraMover = new AppEvent({
	start:0,
	end:-1,
	type: "update",
	onTrigger : function (data) {
		//console.info('event triggered',this, data);	
		//this.app.trigger('started')
		var tresh = 0.1;
		if (document.pageX <= ($(document).width() *  tresh)   ){
			this.app.getWorld().stage.moveCam(-10,0);	
		}
		if (document.pageX >= ($(document).width()* (1-tresh) )   ){
			this.app.getWorld().stage.moveCam(10,0);
		}
		if (document.pageY <= ($(document).height() *  tresh)   ){
			this.app.getWorld().stage.moveCam(0,-10);
		}
		if (document.pageY >= ($(document).height()* (1-tresh) )   ){
			this.app.getWorld().stage.moveCam(0,10);
		}

	}
});

var _conf = {
	"type":"Events",
	"debug":false,
	"events":[cameraMover]
};


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
