 

var PixiWorld = function (source) {	
	if (!(this instanceof PixiWorld)) return new PixiWorld(source);	
	var self = this;	
	this.info = 'Pixi.js implementation';
	this.type = 'PixiWorld';
	this.stage = new PIXI.Container();
	this.stages = {};
	this.renderer = PIXI.autoDetectRenderer(source.opts.width, source.opts.height, {backgroundColor: source.opts.BACKGROUND});	
	document.body.appendChild(this.renderer.view);
    return this;		
}
PixiWorld.prototype.getStage = function (type) {
	if (!this.stages[type]){
		this.stages[type] = new PIXI.Container();
		this.stage.addChild(this.stages[type]);
	}
	return this.stages[type];
}
PixiWorld.prototype.destroy = function() {
	document.body.removeChild(this.renderer.view);
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
	this.renderer.render(this.stage);
}


module.exports = PixiWorld;