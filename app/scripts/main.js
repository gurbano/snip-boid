
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
		//ticker
		ticker: raf,
		//renderer
		renderer: renderer,
		render: function(){ return this.renderer.render(this.boids());},
		renderSingle: function(boid){ return this.renderer.renderSingle(boid);},
		setup: function(){ return this.renderer.setup();},


		onLoop: function (argument) {
			var self = this;
			this.step();
			this.render();
			//this.foreach(function (boid) {
			//	self.renderSingle(boid);
			//})
		}

	}, //opts
	function(){
		//this.attractors().push();
		this.setup(); //setup renderer
		console.info('Broids started');
		this.start();		
	} //cb
);


