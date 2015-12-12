var random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var w = $(document).width();
var h = $(document).height();

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
    this.follow = opts.follow;
    this.addBoid = opts.addBoid;
    this.removeBoid = opts.removeBoid;
    this.setBoids = opts.setBoids;
    this.limitBoids = opts.limitBoids;
    this.addAttractor = opts.addAttractor;
    this.removeAttractor = opts.removeBoid;
  	//Renderer target
  	this.renderer = opts.renderer;
  	this.setup = function(){opts.setup(this.boids(), this.attractors());}
  	this.render = opts.render;
  	this.renderSingle = opts.renderSingle;


  	/*PUBLIC METHODS*/
  	this.start = function (argument) {
  		self.ticker(function tick() {
	  		self.onLoop();
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
    this.render = function(){ return this.renderer.render(this.boids(), this.attractors());};
    this.setup = function(boids, attractors){ 
      return this.renderer.setup(boids, attractors);};
    this.onLoop = opts.onLoop || function (argument) {
      var self = this;
      this.follow(document.pageX, document.pageY);
      this.step();
      this.render();
    };
  	
    callback.bind(this)();
  	
  	return this;
}