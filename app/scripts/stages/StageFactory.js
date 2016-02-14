/*Utility class*/
var PWall = require('../pixi/PWall');
var PAttractor = require('../pixi/PAttractor');
var BoidGenerator = require('../pixi/BoidGenerator');

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
StageFactory.prototype.addWall = function(stage, start, end){
	stage.addEntity(
		new PWall({start: start,end: end, force: 200, distance:100}),
		function (obj) {}
	); 
};
StageFactory.prototype.addGenerator = function(stage, opts, self) {
	var generator = new BoidGenerator(opts);
	stage.addEntity(generator, function(obj){
		var gen = function() {
			if (self.running){
				obj.generate();
			}
			setTimeout(gen, obj.delay());	
		}
		setTimeout(gen, obj.delay());
	});
	
}
StageFactory.prototype.getGUI = function (stage, flock) {
	var gui = new dat.GUI();	
	gui.add(stage, 'debug');		
	var f1 = gui.addFolder('Distances');
	f1.add(flock, 'sepD',10,1000);
	f1.add(flock, 'cohD',10,1000);
	f1.add(flock, 'aliD',10,1000);
	var f2 = gui.addFolder('Forces');
	f2.add(flock, 'sepW',0,100);
	f2.add(flock, 'cohW',0,100);
	f2.add(flock, 'aliW',0,100);
	var f3 = gui.addFolder('speed');
	f3.add(flock, 'sLimit',0.1,10);
	f3.add(flock, 'aLimit',0.00,2).step(0.1);
	//f3.open();
	var f4 = gui.addFolder('WP');
	f4.add(flock, 'scaWP',0,2).step(0.1);
	f4.add(flock, 'attrWP',0,2).step(0.1);
	f4.add(flock, 'goalWP',0,2).step(0.1);
	//f4.open();		
	return gui;
}
module.exports = StageFactory;