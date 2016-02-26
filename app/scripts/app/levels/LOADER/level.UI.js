var UIFactory = require('../../UI/UIFactory.js');


var fileControl = UIFactory.getBox('FILE-CONTROLS');


var fileControlGroup = UIFactory.getButtonGroup('file-controls-group');
fileControl.append(fileControlGroup);
fileControl.onBind = function (ui, app) {
	var bSave = UIFactory.getButton('NEXT',function () {
		var next = app.getNextLevel();
		if(next){
			console.info('loading stage', next);
			app.activateLevel(next);	
		}else{
			console.error('Cannot find next level');
		}
		
	}); 
	fileControlGroup.append(bSave);
	UIFactory.center(fileControl);
}
var _conf = {
	controls:[fileControl]	
};


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	
