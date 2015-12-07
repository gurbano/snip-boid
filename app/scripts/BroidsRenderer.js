module.exports = BroidsRenderer;

function BroidsRenderer(opts, callback){
	if (!(this instanceof BroidsRenderer)) return new BroidsRenderer(opts, callback);
	var self = this;
	var boidObjects = {};
	opts = opts || {};
  	callback = callback || function(){};
  	this.canvas = new fabric.Canvas('canvas',{ width: $(window).width(), height: $(window).height() });
  	this.setup = function  () {
  		console.info('Setting up canvas painting with fabric');
  	};
 
  	this.render = function (boids) {
  	   for (var i = boids.length - 1; i >= 0; i--) {
        this.renderSingle(boids[i]);
       };
  	}
  	this.renderSingle = function (boid) {  		
  		console.info('Rendering boid', boid);
  	}


  	callback.bind(this)();
}