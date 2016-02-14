/*Utility class*/
var PWall = require('../pixi/PWall');
var PAttractor = require('../pixi/PAttractor');

var StageFactory = function(){
	if (!(this instanceof StageFactory)) return new StageFactory();
	return this;
}
StageFactory.prototype.getWalls = function(width, height, pad) {	
	var left = {start: {x: pad,y: pad },end: {x:  pad, y: height - pad }, force: 200, distance:100};
	var right = {start: {x: width - pad, y: pad },end: {x: width - pad, y: height -pad }, force: 200, distance:100};
	var up = {start: {x: pad,y: pad },end: {x: width - pad, y: pad }, force: 200, distance:100};
	var down ={start: {x: pad,y: height - pad },end: {x: width - pad, y: height - pad }, force: 200, distance:100};
	return [new PWall(left), new PWall(right), new PWall(up), new PWall(down)];
};
StageFactory.prototype.addMouseBouncer = function (stage, options) {
	stage.addEntity(
		new PAttractor(options), 
			function (obj) {
				obj.update = function () {
					obj.position.x = document.pageX;
					obj.position.y = document.pageY;
					if (!document.mousedown){
						obj.force = options.force_zero || 0;
					}else{
						obj.force = options.force;
					}
					obj.animate();
				};
		});
}
StageFactory.prototype.addBouncers = function(stage, width, height, options, number){
	for (var i = 0; i < number; i++) {
		var rx = gu.random(10, width - (10));
		var ry = gu.random(10, height - (10));			
		stage.addEntity(
			new PAttractor($.extend(options,{radius:gu.random(5,10), x: rx, y:ry}) ), 
			function (obj) {
				
			}
		);					
	};	
};
StageFactory.prototype.getGUI = function (stage) {
	var gui = new dat.GUI();	
	gui.add(stage, 'debug');		
	return gui;
}
module.exports = StageFactory;