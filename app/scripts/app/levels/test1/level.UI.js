var UIFactory = require('../../UI/UIFactory.js');


var pbControl = UIFactory.getBox('PB-CONTROLS');
var pbControls = UIFactory.getButtonGroup('playback-controls-group');
pbControl.append(pbControls);
pbControl.onBind = function (ui, app) {
	var bStop = UIFactory.getButton('STOP',function () {
		app.speed = 0;
	}); 
	var bStart= UIFactory.getButton('PLAY',function () {
		app.speed = 1;
	});	
	var bSlow= UIFactory.getButton('SLOW',function () {
		app.speed = 10;
	}); 
	pbControls.append(bStop);
	pbControls.append(bStart);
	pbControls.append(bSlow);
	UIFactory.center(pbControl);
}
var _conf = {
	controls:[pbControl]	
};


module.exports = function (conf, key) {
	if (key){
		conf[key] = _conf;
		return conf;
	}else{
		return $.extend(conf, _conf);
	}
}	



/*PLAYBACK CONTROL*/


/*

var UIFactory = require('../../UI/UIFactory.js');
var conf = require('./level.config');
var WorldLoader = require('../../world/WorldLoader');










var level1JSON = require('./level.world');
var saveInterface = UIFactory.getBox('FILE-CONTROLS');
var saveInterfaces = UIFactory.getButtonGroup('file-controls-group');
var buffer = undefined;
saveInterface.append(saveInterfaces);
saveInterface.onBind = function (ui, app) {
	var bSave = UIFactory.getButton('SAVE',function () {
		console.info('saving', app.world);
		buffer = WorldLoader.saveToJSON(app.world, {});
	}); 
	var bLoad= UIFactory.getButton('LOAD',function () {
		var ret;
		if (buffer){
			ret = WorldLoader.loadFromJSON(conf, JSON.parse(buffer));
		}else{
			ret = WorldLoader.loadFromJSON(conf, level1JSON);
		} 
		//var ret = WorldLoader.loadFromJSON(WorldLoader.saveToJSON(app.world, {}),{});
		app.setWorld(ret);
		app.start();
		console.info('loading',ret);
	});	
	
	saveInterfaces.append(bSave);
	saveInterfaces.append(bLoad);
}


conf = {
	controls:
	[
		pbControl
	]	
}



module.exports = conf;
*/