var fps = require('fps')

var gu = document.gu = window.gu = require('./utils');
console.info('random' , gu.random(-100,100));





var raf = require('raf');
var conf = require('./configurations/experiment1');
var Stage = require('./pixi/Stage');
var stages = require('./stages/stages');
var FlockFactory = require('./boids/FlockFactory')({});
var PAttractor = require('./pixi/PAttractor');
var PGoal = require('./pixi/PGoal');
var PWall = require('./pixi/PWall');

var experiment = new function () {
	var self = this;
	var stage, renderer;
	var flock;
	this.name = 'experiment 1';
	this.description = 'display flock of boids with pixi.js'
	this.width = $(document).width();
	this.height = $(document).height();

	this.running = true;
	this.pause = function () {
		this.running = !this.running;
	}

	/*public methods*/
	this.info = function () {
		console.info(this);
	}
	this.start = function () {
		//1- initialize stage && renderer
		stage = new Stage();
		renderer = PIXI.autoDetectRenderer(this.width, this.height, {backgroundColor: conf.BACKGROUND});
		//2- initialize world
		load(stages['LOADING'], function () {

		});
		var mouseBouncer = stage.addEntity(
			new PAttractor({radius:30, force: 100, distance:300}), 
			function (obj) {
				obj.update = function () {
					obj.position.x = document.pageX;
					obj.position.y = document.pageY;
					if (!mousedown){
						obj.force = 0;
					}else{
						obj.force = 100;
					}
				}
		});
		

		var pad = 10;
	/*
		var simpleGoal = stage.addEntity(
			new PGoal({x:gu.random(pad,pad), y:gu.random(pad,pad), radius:10, force: 10, distance:11500}), 
			function (obj) {
				obj.update = function () {
					//obj.position.x += gu.random(-10,10);
					//obj.position.y += gu.random(-10,10);
				}
		});
	
*/
		
		var walls = [];

/*
		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: pad },end: {x: 5*pad,y: this.height - pad }, force: 200, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
		
		walls.push(stage.addEntity(
					new PWall({start: {x: this.width - pad, y: pad },end: {x: this.width - pad, y: this.height -pad }, force: 100, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));



		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: pad },end: {x: this.width - pad, y: pad }, force: 200, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: this.height - pad },end: {x: this.width - pad, y: this.height - pad }, force: 100, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
*/
		for (var i = 0; i < 0; i++) {
			var rx = gu.random(pad, this.width - pad);
			var ry = gu.random(pad, this.height - pad);
			var dx = gu.random(- pad*10, pad*10);
			var dy = gu.random(- pad*10, pad*10);
			
			walls.push(
				stage.addEntity(				
					new PWall({start: {x: rx,y: ry },end: {x: rx + dx , y: ry + dy }, radius:gu.random(2,6), force: 100, distance:100}), 
				function (obj) {
					obj.update = function () {

					}
			}));
					
		};	

		for (var i = 0; i < 60; i++) {
			var rx = gu.random(pad, this.width - pad);
			var ry = gu.random(pad, this.height - pad);
			var dx = gu.random(- pad*10, pad*10);
			var dy = gu.random(- pad*10, pad*10);
			
		stage.addEntity(
			new PAttractor({x: rx, y: ry, radius:gu.random(1,10), force: -100, distance:60}), 
			function (obj) {
				obj.update = function () {
					
				}
			});					
		};			

		//3- initialize simulation (boids)
		flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					SIZE: 100,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false //generate boids at random position
				}),
				function(_flock){
					stage.addFlock(_flock);
				}
			);
		
		//4- start
		document.body.appendChild(renderer.view);
		animate();


		//5 dat.gui
		var gui = new dat.GUI();				
		var f1 = gui.addFolder('Distances');
		f1.add(flock, 'sepD',10,1000);
		f1.add(flock, 'cohD',10,1000);
		f1.add(flock, 'aliD',10,1000);
		var f2 = gui.addFolder('Forces');
		f2.add(flock, 'sepW',1,100);
		f2.add(flock, 'cohW',1,100);
		f2.add(flock, 'aliW',1,100);
	}
	/*private//internal*/
	function load (aStage, callback) {
		console.info('loading stage', aStage);
		if (callback)callback();
	}	
	function animate(time) { 	
		var time = raf(animate);
		//flock.step(time);//update the flock
		//stage.synchronizeFlock(flock); //synchronize the graphical representation of the boids
		if (self.running)
			stage.update(time); //update the world - update all the other entities
		renderer.render(stage); //render
	}
}();


experiment.info();
experiment.start();

var mousedown = false;
$(window).keypress(function (e) {
  if (e.keyCode === 0 || e.keyCode === 32) {
    e.preventDefault();
    experiment.pause();
    console.log('Space pressed');
	}
});

$(window).mousedown(function (e) {
  	mousedown = true;
});
$(window).mouseup(function (e) {
  	mousedown = false;
});

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
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
    //console.info(document.pageX,document.pageY,window.innerWidth);
}
