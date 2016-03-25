var PixiTargetFactory = require('../../factories/PixiTargetFactory');
var GREEN = 0x00fa9a;


var _conf = {
	targetFactory: new PixiTargetFactory({}),
	width: $(window).width(),
	height: $(window).height(),
	BACKGROUND : GREEN,
};





module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend({},conf, _conf);
	}
}	
