var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var w = $(document).width();
var h = $(document).height();

module.exports = BroidsApp;
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



function BroidsApp(opts, callback){
	if (!(this instanceof BroidsApp)) return new BroidsApp(opts, callback);
  	var self = this;
  	opts = opts || {};
  	callback = callback || function(){};

  	//Boids factory
  	this.factory = opts.factory;
  	this.boids = opts.adapters.boids;
  	this.attractors = opts.adapters.attractors;
  	this.foreach = opts.adapters.foreach;
  	this.step = opts.adapters.step;
    this.follow = opts.adapters.follow;
    this.addBoid = opts.adapters.addBoid;
    this.removeBoid = opts.adapters.removeBoid;
    this.setBoids = opts.adapters.setBoids;
    this.limitBoids = opts.adapters.limitBoids;
    this.addAttractor = opts.adapters.addAttractor;
    this.removeAttractor = opts.adapters.removeBoid;


    this.generators = opts.adapters.generators || [];
    this.addGenerator = function (generator) {
        generator.start();
        this.generators.push(generator);
    }

  	//Renderer target
  	this.renderer = opts.renderer;
    //ticker
    this.ticker = opts.ticker;
  	this.setup = function(){opts.setup(this.boids(), this.attractors());}
  	this.render = opts.render;
  	this.renderSingle = opts.renderSingle;


  	/*PUBLIC METHODS*/
  	this.start = function (argument) {
  		self.ticker(function tick() {
	  		self.onLoop(self);
        self._onLoop();
		  	self.ticker(tick);
		  });	
  	};
    /*GLUE RENDERER AND FACTORY*/
    this.limitBoids =  function (value) {
      var self = this;
      self.setBoids(value,
        function (pop) {
          self.renderer.removeBoid(pop);
        },
        function getPosition (argument) {
          return [random(0,w), random(0,h)]
        }); 
    },
    this.render = function(){ return this.renderer.render(this.boids(), this.attractors(), this.generators);};
    this.setup = function(boids, attractors){ 
      return this.renderer.setup(boids, attractors);};
    this.onLoop = opts.onLoop || function (self) {};

    /*INTERNAL LOOP*/
    this._onLoop =  function (argument) {
      var self = this;
      this.follow(document.pageX, document.pageY);
      this.step(); //boids movement step
      this.render(); //render step
    };
  	
    callback.bind(this)();
  	
  	return this;
}