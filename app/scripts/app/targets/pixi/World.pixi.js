var bcook = function (opts) {
	var params = {
	  stage: {
	    width: opts.width,
	    height: opts.height
	  },
	  world: {
	    x: 0,
	    width: opts.width *10,
	    height: opts.height *10
	  }
	}
	return $.extend(opts,params);
};

/*
var world = new pixicam.World(worldSize);
world.setScreenSize(500, 500);
world.setSize(5000,1000);
world.setCenter(0,0);

var camera = world.camera;
//now move and zoom the camera
 */

var PixiWorld = function (source) {	
	if (!(this instanceof PixiWorld)) return new PixiWorld(source);	
	var self = this;	
	this.info = 'Pixi.js implementation';
	this.type = 'PixiWorld';
	this.stage = new PIXI.Container();
	this.opts =  bcook(source.opts);
	this.world = new pixicam.World({
	    screenWidth: this.opts.stage.width,
	    screenHeight: this.opts.stage.height,
	    width: this.opts.world.width,
	    height: this.opts.world.height,
	    x: this.opts.world.x
	});	
  	this.camera = this.world.camera;
  	this.stage.addChild(this.world);
	this.stages = {};
	this.bg = this.initBG(this.opts);
	this.targetDiv = undefined;	
	this.renderer = PIXI.autoDetectRenderer(source.opts.width, source.opts.height, {backgroundColor: source.opts.BACKGROUND});		
    return this;		
}
PixiWorld.prototype.initBG = function(opts) {
	if (opts.bg){
		if (typeof opts.bg === 'string'){ //simple, deprecated
			var bg = new PIXI.Sprite(PIXI.Texture.fromImage(opts.bg));
			bg.position.x = 0;
			bg.position.y = 0;
			this.getStage('background').addChild(bg);
		}else if (typeof opts.bg === typeof []){ //Array
			for (var i = opts.bg.length - 1; i >= 0; i--) {
				var bg = opts.bg[i];
				var layer = bg.layer || 'background';
				var data = bg.data;
				var bgStage = this.getStage(layer);
				if (bg.type === 'repeat'){
					for (var x = 0; x < this.opts.width; x = x+data.size ) {
						for (var y = 0; y < this.opts.height; y = y+data.size) {
							var tmp = new PIXI.Sprite(PIXI.Texture.fromImage(data.src));
							tmp.position.x = x ;
							tmp.position.y = y;
							this.getStage(layer).addChild(tmp);
						};				
					};
				}	
			};			
		}
	}
};

PixiWorld.prototype.display = function(target) {
	if(target!=undefined){
		this.targetDiv = target;		
	}else{
		this.targetDiv = document.body;
	}	
	this.targetDiv.appendChild(this.renderer.view);
	
};

PixiWorld.prototype.getStage = function (type) {
	if (!this.stages[type]){
		this.stages[type] = new PIXI.Container();
		this.world.addChild(this.stages[type]);
	}
	return this.stages[type];
}
PixiWorld.prototype.destroy = function() {
	this.stages = undefined;
	this.targetDiv.removeChild(this.renderer.view);
};
/******************
STAGE:
	(stages)
	Flock -- flocks
	Wall
*********************/
PixiWorld.prototype.addEntity = function(entity) {
	switch(entity.type)	{
		case 'Flock':
			var stage = this.getStage(entity.type);
			stage.addChild(entity.renderTargets);
			var boids = entity.boids;
			for (var i = boids.length - 1; i >= 0; i--) {
				var boid = boids[i];
				stage.addChild(boid.renderTargets);
			};
			break;
		case 'Bouncer':
			var stage = this.getStage(entity.type);
			stage.addChild(entity.renderTargets);
			break;
		case 'Wall':
			var stage = this.getStage(entity.type);
			stage.addChild(entity.renderTargets);
			break;
		case 'Goal':
			var stage = this.getStage(entity.type);
			stage.addChild(entity.renderTargets);
			break;
		default:
			console.warn('Missing implementation');
			break;
	}
}
PixiWorld.prototype.update = function () {
	//this.camera.x = this.camera.x +1;
	this.world.update();
	this.renderer.render(this.stage);
}

PixiWorld.prototype.lookAt = function(x,y) {
	this.camera.x = x;
	this.camera.y = y;
};


module.exports = PixiWorld;