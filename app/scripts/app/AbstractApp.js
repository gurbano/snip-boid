var fps = require('fps');
var raf = require('raf');
var UILoader = require('./UI/UILoader');
var BlackBoard = require('./events/BlackBoard');

var AbstractApp = function(opts){
	var self = this;
	this.opts = opts || {};
	this.currentLevel = undefined;
	this.levels = {};
	if (!(this instanceof AbstractApp)) return new AbstractApp(this.opts);	
	this.name = 'Abstract app';
	this.version = '0.0.1';
	this.blackboard = BlackBoard;
	this.speed = (opts.speed == undefined) ? 1 : opts.speed; // 0 = stop, 1 = speed 100%, 2 = 50%, 3 = 33%, .. ,n = 1/n%
}
AbstractApp.prototype.info = function() {
	return this.name + ' ' + this.version;
};
AbstractApp.prototype.setWorld = function(world) {
	if (this.world){
		this.world.remove();
	}
	this.world = world;
};
AbstractApp.prototype.setUI = function(ui) {
	if (this.ui){ //tear down the old ui
		this.ui.remove();
	}
	this.ui = ui;
	this.ui.bindToApp(this); 
};
AbstractApp.prototype.getWorld = function() {
	return this.world;
};
AbstractApp.prototype.update = function(data) {
	console.error('update not implemented');
	this.world.update(data);
};
AbstractApp.prototype.start = function() {
	var self = this;
	var tmp = function tmp() { 	
		var time = raf(tmp);
		if (self.speed>0 && (time%self.speed==0)){
			self.update(time);	
		}
	};
	tmp(); 	
 };
AbstractApp.prototype.pushLevel = function(name, conf, world, ui, next) {
	this.levels[name] = {
		conf: conf,
		world: world,
		ui: ui,
		next: next
	};
};
AbstractApp.prototype.getCurrentLevel = function() {
	if(this.currentLevel != undefined){
		return this.levels[this.currentLevel];
	}else{
		console.error('Currently no level loaded');
		return undefined;
	}
};
AbstractApp.prototype.getNextLevel = function() {
	var curr = this.getCurrentLevel();
	if (curr && curr.next){
		return curr.next;
	}else{
		return undefined;
	}
};
AbstractApp.prototype.getLevels = function() {
	return this.levels;
};
AbstractApp.prototype.activateLevel = function(name) {
	this.currentLevel = name;
	this.setWorld(this.levels[name].world); 
	this.getWorld().display();

	this.setUI(UILoader.load(this.levels[name].ui)); 
	this.getWorld().display();	
};
AbstractApp.prototype.subscribe = function(evName, target, cb) {
	this.blackboard.on(evName, cb.bind(target));
};
AbstractApp.prototype.trigger = function(evName, params) {
	this.blackboard.emit(evName, params || {});
};
AbstractApp.prototype.register = function(eventObj) {
	eventObj.app = this;
	this.blackboard.on(eventObj.type, eventObj.onTrigger.bind(eventObj));
};



module.exports = AbstractApp;