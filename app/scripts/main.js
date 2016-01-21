var fps = require('fps')

var gu = document.gu = window.gu = require('./utils');
console.info('random' , gu.random(-100,100));




var conf = require('./configurations/experiment1');
var raf = require('raf');
var Stage = require('./pixi/Stage');
var stages = require('./stages/stages');


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

	var stats = new Stats();
	stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	document.body.appendChild( stats.domElement );

	/*public methods*/
	this.info = function () {
		console.info(this);
	}
	this.start = function () {
		//1- initialize stage && renderer		
		renderer = PIXI.autoDetectRenderer(this.width, this.height, {backgroundColor: conf.BACKGROUND});
		document.body.appendChild(renderer.view);
		//2- initialize world
		load.bind(this)(stages['EXP1'], 
			function (stage, aStage) {
				console.info(stage, aStage);
				//3- initialize simulation (boids)
				flock = stage.getFlocks()[0];			
				//4- start				
				animate();
		});			
	}



	/*private//internal*/
	function load (aStage, callback) {
		stage = new Stage();
		console.info('loading stage', aStage);
		aStage.populateWorld.bind(self)(stage);		
		if (callback)callback(stage, aStage);
	}	
	function animate(time) { 	
		stats.begin();
		var time = raf(animate);
		if (self.running)stage.update(time); //update the world - update all the other entities
		renderer.render(stage); //render
		stats.end();
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
  	document.mousedown = true;
});
$(window).mouseup(function (e) {
  	document.mousedown = false;
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
