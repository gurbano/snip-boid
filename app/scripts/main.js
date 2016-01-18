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

var experiment = new function () {
	var self = this;
	var stage, renderer;
	var flock;
	this.name = 'experiment 1';
	this.description = 'display flock of boids with pixi.js'
	this.width = $(document).width();
	this.height = $(document).height();
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
			new PAttractor({radius:30, force: -100, distance:30}), 
			function (obj) {
				obj.update = function () {
					obj.position.x = document.pageX;
					obj.position.y = document.pageY;
				}
		});
		var simpleGoal = stage.addEntity(
			new PGoal({x:30, y:50, radius:30, force: 100, distance:300}), 
			function (obj) {
				obj.update = function () {
					//obj.position.x += gu.random(-10,10);
					//obj.position.y += gu.random(-10,10);
				}
		});

		//3- initialize simulation (boids)
		flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					N: 4,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false //generate boids at random position
				})
			);
		stage.addFlock(flock);
		//4- start
		document.body.appendChild(renderer.view);
		animate();
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
		stage.update(time); //update the world - update all the other entities
		renderer.render(stage); //render
	}
}();


experiment.info();
experiment.start();




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
