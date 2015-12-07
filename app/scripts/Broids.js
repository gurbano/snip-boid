module.exports = Broids;

/*
	Configuration:
		//Boids factory
		generator 
		//ADAPTERS (glue the boid factory)
  		boids - return array of boids [xPosition, yPosition, xSpeed, ySpeed, xAcceleration, yAcceleration]
  		attractors - return array of attractors [xPosition, yPosition, radius, force]
  		foreach(cb) - excecute callback on every boid
  		step - advance the simulation 
*/



function Broids(opts, callback){
	if (!(this instanceof Broids)) return new Broids(opts, callback);
	var self = this;
	opts = opts || {};
  	callback = callback || function(){};

  	//Boids factory
  	this.generator = opts.generator;
  	this.boids = opts.boids;
  	this.attractors = opts.attractors;
  	this.foreach = opts.foreach;
  	this.step = opts.step;
  	this.ticker = opts.ticker;

  	//Renderer target
  	this.renderer = opts.renderer;
  	this.setup = opts.setup;
  	this.render = opts.render;
  	this.renderSingle = opts.renderSingle;

  	//EVENTS
  	this.onLoop = opts.onLoop || function (argument) {}; //loop cycle


  	/*PUBLIC METHODS*/
  	this.start = function (argument) {
  		self.ticker(function tick() {
	  		self.onLoop();
		  	self.ticker(tick);
		});	
  	};
  	
    callback.bind(this)();
  	
  	return this;
}