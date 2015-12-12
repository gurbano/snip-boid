module.exports = BroidImpl;

function BroidImpl(opts) {
  if (!(this instanceof BroidImpl)) return new BroidImpl(opts);
  var self = this;
  this.opts = opts;
  this.beh = {
  	boids:[
  		function sca (i, boids) {
  			var target = boids.length;
      		var forceX = [0,0,0];
      		var forceY = [0,0,0];
		    while (target--) { //Cycle throug the other boids
		    	if (target === i) continue
		      	var spareX = boids[i][0] - boids[target][0];
      			var spareY = boids[i][1] - boids[target][1];
      			var distSquared = spareX * spareX + spareY*spareY;
      			if (distSquared < self.opts.sepDist) { //distance check
      				forceX[0] += spareX;
      				forceY[0] += spareY;
	      		}else {
	      			if (distSquared < self.opts.cohDist){
	      				forceX[1] += spareX;
      					forceY[1] += spareY;
	      			}
	      			if (distSquared < self.opts.aliDist){
	      				forceX[2] += boids[target][2];
      					forceY[2] += boids[target][3];
	      			}
	      		}
		    }
		    var separation = [
		    	self.opts.sepForce * forceX[0] / Math.sqrt(forceX[0] * forceX[0] + forceY[0]*forceY[0]),
		    	self.opts.sepForce * forceY[0] / Math.sqrt(forceX[0] * forceX[0] + forceY[0]*forceY[0]),
		    ];
		    var coherence = [
		    	self.opts.cohForce * forceX[1] / Math.sqrt(forceX[1] * forceX[1] + forceY[1]*forceY[1]),
		    	self.opts.cohForce * forceY[1] / Math.sqrt(forceX[1] * forceX[1] + forceY[1]*forceY[1]),
		    ];
		    var alignement = [
		    	self.opts.aliForce * forceX[2] / Math.sqrt(forceX[2] * forceX[2] + forceY[2]*forceY[2]),
		    	self.opts.aliForce * forceY[2] / Math.sqrt(forceX[2] * forceX[2] + forceY[2]*forceY[2]),
		    ];
		    
		    var retX = 0 + (separation[0] || 0) - (coherence[0] || 0) - (alignement[0] || 0);
		    var retY = 0 + (separation[1] || 0) - (coherence[1] || 0) - (alignement[1] || 0);
      		return [retX, retY];
  		},
  	]
  }
  this.checkOpt = function (required) {
  	if (!self.opts[required]){
  		//console.error("!!! '"+required+"' configuration missing");
  	}
  }
  return this;
}