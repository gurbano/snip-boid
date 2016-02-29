Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
var randomcolor  = require('randomcolor');
var V = require('victor');

var Util = function () {
	var self = this;
	if (!(this instanceof Util)) return new Util(opts);
	this.name = 'Utility class';
	this.description = 'some method'
	this.info = function () {
		console.info(this);
	}

	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	this.random = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	/**
 	* Returns a random number between min (inclusive) and max (exclusive)
 	*/
	this.randomReal = function (min, max){
		return Math.random() * (max - min) + min;
	}
	this.distToSegment = function(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
	this.distToPoint = function(p, v) { return Math.sqrt(dist2(p, v)); }
	this.color = function() {
	  return randomcolor().replace('#','0x');
	}
	/*LINES*/
	this.getLineEq = function (start, end) {
		return{
			A : end.y - start.y,
			B : start.x - end.x,
			C : (/*A*/end.y - start.y) * start.x + (/*B*/start.x - end.x) * start.y,
			M : (end.y - start.y) / (end.x - start.x ),
			Y : function(x){ return ((end.y - start.y) / (end.x - start.x )) * x;},
			isVertical : Math.abs(end.x - start.x) < 0.00001 ,
			isHorizontal : Math.abs(end.y - start.y) < 0.00001 
		}
	}
	this.lineInterception = function (line1, line2) {
		var det = line1.A*line2.B - line2.A*line1.B;
		if(det == 0){
        	return undefined;
	    }else{
	        var x = (line2.B * line1.C - line1.B * line2.C)/det;
	        var y = (line1.A * line2.C - line2.A * line1.C)/det;
	    	return {x : x,y : y};
		}
	}
	this.randomUUID = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	}
	return this;
}



function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  if (t < 0) return dist2(p, v);
  if (t > 1) return dist2(p, w);
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}




module.exports = new Util();