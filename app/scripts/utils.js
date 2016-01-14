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
	return this;
}

module.exports = new Util();