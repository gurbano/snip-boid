
var raf = require('raf');
var generator = require('./configuration/boid2.js')[0];
var options = require('./configuration/boid2.js')[1];


//var impl2 = require('boid');	//https://www.npmjs.com/package/boid

var DGlue = require('./dancerGlue');
var renderer = require('./BroidsRenderer')();


var STARTING_BOIDS = 0;

var random = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
var w = $(document).width();
var h = $(document).height();

/**/
var Broids = require('./Broids')(
	{
		//Boid factory
		generator: generator,		
		boids: options.boids,
		attractors: options.attractors,
		foreach: options.foreach,
		step: options.step,
		setBoids: options.setBoids,
		follow: options.follow,
		addBoid: options.addBoid,
		removeBoid: options.removeBoid,
		addAttractor: options.addAttractor,
		removeAttractor: options.removeAttractor,
		//ticker
		ticker: raf,
		//renderer
		renderer: renderer,			
	}, //opts
	function(){
		var self = this;

		this.dancer = new DGlue({
			onKick: function (mag) {
				console.info('kick',mag);
			},
			offKick: function () {

			},
		},function () {
			console.info('Dancer initialized');
		});
		
		this.setup(); //setup renderer
		console.info('Broids started');
		this.start();
		for (var i = 0; i <STARTING_BOIDS; i++ ){
			self.addBoid(random(0,w),random(0,h));
		}

		
		var gui = new dat.GUI();		
		
		var f1 = gui.addFolder('Boids');
		f1.add(this.generator, 'speedLimitRoot',0.1,5.0);
		//gui.add(this.generator, 'accelerationLimitRoot',0,50);
		//gui.add(this.generator, 'separationDistance',0,5000);
		f1.add(this.generator, 'separationForce',0,5);
		f1.add(this.generator, 'cohesionForce',0,5);
		f1.add(this.generator, 'alignmentForce',0,5);

		var bn = {boids : this.boids().length};
		var f2 = gui.addFolder('Simulation');
		f2.add(bn, 'boids', 0, 1600)
			.step(1)
			.onFinishChange(
				function (value) {
					//console.info(bn.boids);
					self.limitBoids(value);
			}
		);
		f2.open();


		


	
		/*for (var i = 0; i <5; i++ ){
			self.addAttractor(random(0,w),random(0,h), 15, - 150);
		}*/
		
		//this.dancer.play();			


		/*BIND MOUSE*/
		document.oncontextmenu = function() {return false;};
		$(document).mousedown(function(e){ 
			//console.info(e.button);
			if( e.button == 0 ) { //left
		      	return false;
		    } 
		    if( e.button == 1 ) { //center
		      self.addAttractor(around(document.pageX),around(document.pageY), 100, -random(0,5));
		      return false; 
		    } 
		    if( e.button == 2 ) { //right		      
		      return false; 		      
		    } 
		    return true; 
		  }); 
		/*BIND END*/


	} //cb
);


var around = function (arg) {
	return arg + Math.floor(Math.random() * 2 * 50) - 50;
}
var random = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
}
