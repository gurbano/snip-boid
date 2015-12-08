module.exports = BroidsRenderer;
/**
  setup(boids)
  render
  renderSingle(boid)
  addBoid(boid)
*/
var RED = 0xFF0000;
var WHITE = 0xFFFFFF;

function BroidsRenderer(opts, callback){
	if (!(this instanceof BroidsRenderer)) return new BroidsRenderer(opts, callback);
	var self = this;
	opts = opts || {};
  callback = callback || function(){};
  var width = $(window).width();
  var height = $(window).height();
  this.renderer = PIXI.autoDetectRenderer(width, height, { antialias: true });
  this.setup = function  (boids) {
  	console.info('Setting up stage');
    document.body.appendChild(this.renderer.view);
    var stage = new PIXI.Container();
    stage.interactive = true;
    this.stage = stage;
    this.pointer = setupPointer(this.stage);
  };
  this.movePointer = function (x,y) {
    this.pointer.position.x = x;
    this.pointer.position.y = y;
  }
  this.remove = function (boid) {
     var point = boid.point;
     boid.point = undefined;
     this.stage.removeChild(point);
  }
 	this.render = function (boids) {   
    //update boids 
    for (var i = boids.length - 1; i >= 0; i--) {
        if (!boids[i].point){
            boids[i].point = getNewBoid(boids[i][0],boids[i][1], this.stage);
        }
        moveTo(boids[i].point, boids[i][0], boids[i][1]);
    };
    //update pointer
    this.movePointer(document.pageX, document.pageY);
    this.renderer.render(this.stage);
 	}
  var moveTo = function(obj,x,y){
      obj.position.x = x;
      obj.position.y = y;
  }
  /*PRIVATE*/
  var boidToPoint = function(boid){
    var point = new PIXI.Graphics();
    point.beginFill(RED);
    point.drawCircle(0,0,2);
  }
  var setupPointer = function(stage){
    var point = new PIXI.Graphics();
    point.beginFill(WHITE);
    point.drawCircle(0,0,6);
    stage.addChild(point);
    return point;
  }
  var getNewBoid = function (x, y, stage) {
    var point = new PIXI.Graphics();
    point.beginFill(RED);
    point.drawCircle(0,0,2);
    point.position.x = x;
    point.position.y = y;
    stage.addChild(point);
    return point;
  }
  callback.bind(this)();
}