var AbstractEntity = require('./AbstractEntity');



var fixOpts = function (opts) {
	if ((opts.start.y)>(opts.end.y) ){
		var tmp = opts.end;
		opts.end = opts.start;
		opts.start = tmp;
	}
	return opts;
}
var Wall = function(opts){
	var self = this;	
	if (!(this instanceof Wall)) return new Wall(this.opts);
	AbstractEntity.call(this); //extends pixi.container   
	this.type = this.TYPES.Wall;
	this.opts = opts || {};
	this.opts  =fixOpts(this.opts);
	this.type = this.TYPES.Wall;

	this.start = this.opts.start;
	this.end = this.opts.end;
	var _init = function () {
		this.A = this.end.y - this.start.y;
		this.B = this.start.x - this.end.x;
		this.C = this.A * this.start.x+this.B*this.start.y;
		this.M = (this.end.y - this.start.y) / (this.end.x - this.start.x );		
		this.isVertical = Math.abs(this.end.x - this.start.x) < 0.00001 ;	
		this.isHorizontal = Math.abs(this.end.y - this.start.y) < 0.00001 ;
	}
	_init.bind(this)();

	function dd(P1, P2, P0) {
		var x1 = P1.x, x2=P2.x, y1 = P1.y, y2 = P2.y, x0 = P0.x, y0 = P0.y;
		return  Math.abs( ((y2-y1)*x0) - ((x2-x1)*y0) + x2*y1 - y2*x1 ) / Math.sqrt( ((y2-y1)*(y2-y1)) + ((x2-x1)*(x2-x1)) );
	}
	this.force = opts.force || 100;
	this.distance = opts.distance || 1; 

    this.getPosition = function () {return this.position};
    this.getDistanceFrom = function (x,y) {
    	return dd(this.start, this.end,{x: x, y:y} );
    };
    this.getLineEq = function  () {
    	return{
			A : this.A,
			B : this.B,
			C : this.C,
			M : this.M,
			isVertical : this.isVertical,
			isHorizontal : this.isHorizontal 
		}
    };
    this.isInside = function (p) {
  		var err = 2;
  		p.x = Math.floor(p.x);
  		p.y = Math.floor(p.y);
        return ((this.start.x -err <= p.x && this.end.x +err >= p.x) || (this.start.x +err >= p.x && this.end.x -err <= p.x  ) ) &&
        		((this.start.y -err <= p.y && this.end.y +err >= p.y) || (this.start.y +err >= p.y && this.end.y -err <= p.y));
    }

}
Wall.prototype = Object.create(AbstractEntity.prototype);
Wall.prototype.constructor = AbstractEntity;

Wall.prototype.update = function(data) {
	this.updateTargets(data);
};

Wall.prototype.onTargetUpdate = function (target, data) {
    //console.info(this.type + ' updated by its target ' + target.type, data);
    if (data.type && data.type==='start'){
    	this.start.x = target.position.x;
    	this.start.y = target.position.y;
    	//this._init();
    	return;
    }
    if (data.type && data.type==='end'){
    	this.end.x = target.position.x;
    	this.end.y = target.position.y;
    	//this._init();
    	return;
    }
}
    

Wall.prototype.serialize = function () {
	return{
		//opts: this.opts,
		type: this.type,
		parent: this.parent,
		id: this.id,
		start: this.start,
		end: this.end
	}
};


module.exports = Wall;