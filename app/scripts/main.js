
var raf = require('raf');
var generator = require('./configuration/boid1.js')[0];
var options = require('./configuration/boid1.js')[1];


//var impl2 = require('boid');	//https://www.npmjs.com/package/boid

var renderer = require('./BroidsRenderer')();

/**/
var Broids = require('./Broids')(
	{
		//Boid factory
		generator: generator,		
		boids: options.boids,
		attractors: options.attractors,
		foreach: options.foreach,
		step: options.step,
		follow: options.follow,
		add: options.add,
		remove: options.remove,
		//ticker
		ticker: raf,
		//renderer
		renderer: renderer,		

		/*GLUE RENDERER AND FACTORY*/
		render: function(){ return this.renderer.render(this.boids());},
		setup: function(boids){ return this.renderer.setup(boids);},
		onLoop: function (argument) {
			var self = this;
			this.follow(document.pageX, document.pageY);
			this.step();
			this.render();
		}
		
	}, //opts
	function(){
		var self = this;
		//this.attractors().push();
		this.setup(); //setup renderer
		console.info('Broids started');
		this.start();
		var w = $(document).width();
		var h = $(document).height();
		var random = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		for (var i = 0; i <100; i++ ){
			self.add(random(0,w),random(0,h));
		}
		/*BIND MOUSE*/
		document.oncontextmenu = function() {return false;};
		$(document).mousedown(function(e){ 
			//console.info(e.button);
			if( e.button == 0 ) { //left
		      for (var i = 0; i <60; i++ ){self.add(around(document.pageX),around(document.pageY));}
		      return false; 
		    } 
		    if( e.button == 1 ) { //center
		      return false; 
		    } 
		    if( e.button == 2 ) { //right
		      var removed = self.remove();
		      if (removed)
		      	self.renderer.remove(removed);
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
