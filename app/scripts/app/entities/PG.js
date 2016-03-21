var AbstractEntity = require('./AbstractEntity');
var Controllable = require('./behaviour/Controllable');
var CamMover = require('./behaviour/CamMover');
var TimberPlayer = require('../music/TimberPlayer');
var AppEvent = require('../events/AppEvent');

var V = require('victor');
var PG = function(opts){
	var self = this;	
	if (!(this instanceof PG)) return new PG(opts);
	AbstractEntity.call(this, opts); //extends pixi.container   
	this.opts = opts || {};
	this.type = this.TYPES.PG;
	this.radius = opts.radius || 10;
	this.player = new TimberPlayer();
	this.setPosition = function (x,y) {
		this.position.x = x; this.position.y = y;
	};
    this.getPosition = function () {return this.position};
	this.getDistanceFrom = function (x,y) {
    	return Math.sqrt(new V(this.position.x, this.position.y).distanceSq(new V(x,y)));
    }
    this.behaviours.push(new Controllable(this,{}));
    var target = this;
    /*window.app.register (new AppEvent({
            start:0,
            end:-1,
            type: "keypress",
            onTrigger : function (data) {
                if (data){
                    switch(parseInt(data)){
                        case document.K_A:
                        case document.K_LEFT:
                            target.moveBy(-10,0);  
                            break;
                        case document.K_D:
                        case document.K_RIGHT:
                            target.moveBy(10,0);  
                            break;
                        case document.K_W:
                        case document.K_UP:
                            target.moveBy(0,-10);  
                            break;
                        case document.K_S:
                        case document.K_DOWN:
                            target.moveBy(0,10);  
                            break;
                    }
                }
            }
        })
    );*/
    this.behaviours.push(new CamMover(this,{}));
    window.app.register(
    	new AppEvent({
    		start:0,
        	end:-1,
        	type: "play_music",
        	onTrigger: function () {
        		self.player.play();
        	}
    	})
    );
    window.app.register(
    	new AppEvent({
    		start:0,
        	end:-1,
        	type: "pause_music",
        	onTrigger: function () {
        		self.player.stop();
        	}
    	})
    );
    window.app.register(
    	new AppEvent({
    		start:0,
        	end:-1,
        	type: "add_note",
        	onTrigger: function (data) {
        		//console.info(data);
        		self.player.addNote(data);
        	}
    	})
    );
}
PG.prototype = Object.create(AbstractEntity.prototype);
PG.prototype.constructor = AbstractEntity;
PG.prototype.update = function(data) {
	this.updateTargets(data);
	for (var i = this.behaviours.length - 1; i >= 0; i--) {
		this.behaviours[i].update();
	};
};
PG.prototype.serialize = function () {
	return $.extend(
			this._serialize(), // 'parent' serialize
			{
				radius: this.radius
			}
		);
}
module.exports = PG;