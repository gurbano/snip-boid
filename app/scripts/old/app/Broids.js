module.exports = BroidsWorld;

/*imports:
	flock - 
	structures - bouncers, 
 */

/**
	Main class
	 - initialize renderer
	 - manage flocks []
	 	- createFlock
	 	- updateFlock

*/


function BroidsWorld(opts, callback){
	if (!(this instanceof Broids)) return new BroidsWorld(opts, callback);
  	var self = this;
  	opts = opts || {};
  	callback = callback || function(){};

  	this.world = opts.world || {};



  	return this;
 }