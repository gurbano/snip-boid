var PixiTargetFactory = require('../../factories/PixiTargetFactory');


var _conf = {
	targetFactory: new PixiTargetFactory({}),
	width: $(window).width(),
	height: $(window).height()
};





module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
