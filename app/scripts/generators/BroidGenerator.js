module.exports = BroidGenerator;



function BroidGenerator(opts) {
  if (!(this instanceof BroidGenerator)) return new BroidGenerator(opts);
  var self = this;
  this.opts = opts;
  var lastCall = 0;
  var started = false;
  var getRatePerSecond = opts.getRatePerSecond || function (time) {return 1;}


  this.emitBoid = opts.emitBoid;
  this.start = function(){ lastCall = Date.now();started = true; step();}
  this.stop = function(){ lastCall = Date.now();started = false;}
  

  var step = function(now){
  	this.emitBoid();
  	setTimeout(step(), 1000 / getRatePerSecond);
  }  
  return this;
}