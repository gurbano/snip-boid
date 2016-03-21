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
	this.world.display();
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
AbstractApp.prototype.pushLevel = function(name, conf, world, ui, events, postCb, next) {
	this.levels[name] = {
		conf: conf,
		world: world,
		ui: ui,
		events: events,
		cb: postCb,
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
	/*Set world*/
	this.setWorld(this.levels[name].world); 
	this.setUI(UILoader.load(this.levels[name].ui)); 
	this.setEvents(this.levels[name].events); 
	if (this.levels[name].cb){
		this.levels[name].cb.bind(this)();
	}
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
AbstractApp.prototype.setEvents = function(events) {
	for (var i = 0; i < events.length; i++) {
		var ev = events[i];
		this.register(ev);
	};
};


var mousedown = false;
$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    experiment.pause();
    console.log('Space pressed');
	}
});

$(window).mousedown(function (e) {
  	document.mousedown = true;
});
$(window).mouseup(function (e) {
  	document.mousedown = false;
});


function handleMouseMove(event) {
	//console.info( document.pageX,  document.pageY);
	var dot, eventDoc, doc, body, pageX, pageY;
    event = event || window.event; 
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    // Use event.pageX / event.pageY here
    document.pageX = event.pageX;
    document.pageY = event.pageY;
    //console.info(document.pageX,document.pageY);
}
document.onmousemove = handleMouseMove;


document.K_LEFT = 37;
document.K_UP = 38;
document.K_RIGHT = 39;
document.K_DOWN = 40;

document.K_A = 65;
document.K_D = 68;
document.K_W = 87;
document.K_S = 83;

document.keydown = false;
document.keypressed = {};
$(window).keydown(function( event ) {
	//console.info('down',event.which);
	//event.preventDefault();
	document.keydown = true;
	document.keypressed[event.which] = true;
});
$(window).keyup(function( event ) {
	//console.info('up', event.which);
	//event.preventDefault();
	document.keydown = false;
	document.keypressed[event.which] = false;
});

module.exports = AbstractApp;