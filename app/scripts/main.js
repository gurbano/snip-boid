var gu = document.gu = window.gu = require('./utils');
console.info('random' , gu.random(-100,100));


var raf = require('raf');
var conf = require('./configurations/experiment1');
var Stage = require('./pixi/Stage');
var stages = require('./stages/stages');
var FlockFactory = require('./boids/FlockFactory')({});


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
		load(stages['LOADING'], function () {});
		//3- initialize simulation (boids)
		flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					N: 10,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: true //generate boids at random position
				})
			);
		stage.synchronizeFlock(flock);
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
		flock.step(time);	
		renderer.render(stage);			    
	}
}();


experiment.info();
experiment.start();
