
var raf = require('raf');

var impl = require('./configuration/boid2.js');
var factory = impl.factory;
var adapters = impl.adapters;


//var impl2 = require('boid');	//https://www.npmjs.com/package/boid

var DGlue = require('./dancerGlue');
var renderer = require('./BroidsRenderer')();


var STARTING_BOIDS = 0;

var random = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
var w = $(document).width();
var h = $(document).height();

var Broids = require('./BroidsApp')(
	{
		//Boid factory
		factory: factory,		
		adapters: adapters,
		//ticker
		ticker: raf,
		//renderer
		renderer: renderer,			
	}, //opts
	function(){
		var self = this;
		this.setup(); //setup renderer
		console.info('Broids started');
		this.start();
		for (var i = 0; i <STARTING_BOIDS; i++ ){
			self.addBoid(random(0,w),random(0,h));
		}		
		var gui = new dat.GUI();				
		var f1 = gui.addFolder('Boids');
		f1.add(this.factory, 'speedLimitRoot',0.1,5.0);
		//gui.add(this.factory, 'accelerationLimitRoot',0,50);
		//gui.add(this.factory, 'separationDistance',0,5000);
		f1.add(this.factory, 'separationForce',0,5);
		f1.add(this.factory, 'cohesionForce',0,5);
		f1.add(this.factory, 'alignmentForce',0,5);
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
		    	for (var i = 60; i > 0; i--) {
		    		self.addBoid(around(document.pageX),around(document.pageY));	
		    	};
		    	bn.boids = self.boids().length;	    
		    	for (var i in f2.__controllers) {
				    f2.__controllers[i].updateDisplay();
				}  	
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
    //console.info(document.pageX,document.pageY,window.innerWidth);
}
