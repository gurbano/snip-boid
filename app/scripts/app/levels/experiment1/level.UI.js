var UIFactory = require('../../UI/UIFactory.js');


var fileControl = UIFactory.getBox('FILE-CONTROLS');


var fileControlGroup = UIFactory.getButtonGroup('file-controls-group');
fileControl.append(fileControlGroup);
fileControl.onBind = function (ui, app) {

	/*---------------------------PLAY*/
	var bPlay = UIFactory.getButton('PLAY',function () {
		window.app.trigger('play_music');		
	}); 
	fileControlGroup.append(bPlay);
	/*------------------------STOP*/
	var bSave = UIFactory.getButton('PAUSE',function () {
		window.app.trigger('pause_music');		
	}); 
	fileControlGroup.append(bSave);
	/*------------------------ADD NOTE*/
	var bAdd = UIFactory.getButton('ADD_NOTE',function () {
		window.app.trigger('add_note',70);
	}); 
	fileControlGroup.append(bAdd);


	//UIFactory.center(fileControl);
	UIFactory.top(UIFactory.left(fileControl));
}





var _conf = {
	controls:[
		//fileControl
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
