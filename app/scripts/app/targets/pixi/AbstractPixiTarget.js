
var AbstractPixiTarget = function(source, opts){	
	if (!(this instanceof AbstractPixiTarget)) return new AbstractPixiTarget(source, opts);	
	PIXI.Graphics.call(this); //extends pixi.container 
	var self = this;
	this.source = source;	
	this.type = 'AbstractPixiTarget';
    opts = opts || {};
    this.source.opts = this.source.opts || {};
    this.source.opts = $.extend(this.source.opts, opts)
	this.buttonMode = source.opts.draggable || false;
	this.interactive = source.opts.draggable || false;
	this// events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
	return this;
}
AbstractPixiTarget.prototype = Object.create(PIXI.Graphics.prototype);
AbstractPixiTarget.prototype.constructor = PIXI.Graphics;
AbstractPixiTarget.prototype.update = function(data) {
	console.error(this.type + 'update not implemented', data);
};
AbstractPixiTarget.prototype.updateSource = function(data) {
	if (this.source.onTargetUpdate){
		this.source.onTargetUpdate(this, data);
	}
};
module.exports = AbstractPixiTarget;





function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
        this.updateSource({});
    }
}