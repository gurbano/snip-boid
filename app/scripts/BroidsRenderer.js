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
  var width = $(document).width() -10;
  var height = $(document).height() -10;
  this.renderer = PIXI.autoDetectRenderer(width, height, { antialias: true });
  this.setup = function  (boids, attractors) {
  	console.info('Setting up stage');
    document.body.appendChild(this.renderer.view);
    var stage = new PIXI.DisplayObjectContainer();
    stage.scale.x = stage.scale.y = 1;
    stage.interactive = true;
    this.stage = stage;
    this.pointer = setupPointer(this.stage);
  };


  this.movePointer = function (x,y) {
    this.pointer.position.x = x;
    this.pointer.position.y = y;
  }
  this.removeBoid = function (boid) {
     var point = boid.point;
     boid.point = undefined;
     this.stage.removeChild(point);
  }
  this.addBoid = function (boid) {
     this.stage.addChild(boid.point);
  }
  this.addAttractor = function (attractor) {
     this.stage.addChild(attractor.point);
  }
  this.removeAttractor = function (attractor) {
    var point = attractor.point;
    attractor.point = undefined;
    this.stage.removeChild(point);
  }
 	this.render = function (boids, attractors, generators) {   
    /*UPDATE BOIDS*/
    for (var i = boids.length - 1; i >= 0; i--) {
        if (!boids[i].point){
            boids[i].point = getNewBoid(boids[i][0], boids[i][1],this.stage);
            //this.addBoid(boids[i].point);
        }
        moveTo(boids[i].point, boids[i][0], boids[i][1]);
        var sx = boids[i][2]; //speedX
        var sy = boids[i][3]; //speedY
        var rad = Math.atan2(sy,sx);
        boids[i].point.rotation = rad + (Math.PI / 2);
        
    };
    //UPDATE POINTER
    this.movePointer(document.pageX, document.pageY);
    //UPDATE ATTRACTORS
    for (var i = attractors.length - 1; i >= 1; i--) {
        if (!attractors[i].point){
            attractors[i].point = getNewAttractor(attractors[i].type, attractors[i][0],attractors[i][1],attractors[i][2]/10,attractors[i][3], this.stage);
            //this.addAttractor(attractors[i].point);
        }
        moveTo(attractors[i].point, attractors[i][0], attractors[i][1]);
    };
    //UPDATE GENERATORS
    for (var i = generators.length - 1; i >= 1; i--) {
        if (!generators[i].point){
            generators[i].point = true;
            console.log('added generator');
        }
        
    };



    this.renderer.render(this.stage);
 	}


  /*PRIVATE*/
  var moveTo = function(obj,x,y){
      obj.position.x = x;
      obj.position.y = y;
  }
  var setupPointer = function(stage){
    var point = new PIXI.Graphics();
    point.beginFill(WHITE);
    point.drawCircle(0,0,6);
    stage.addChild(point);
    return point;
  }
  var getNewBoid = function (x,y,stage) {
    var point = new PIXI.Graphics();
    point.beginFill(RED);
    //point.drawCircle(0,0,2);
    point.moveTo(0,0);    
    point.lineTo(-5, 15);
    point.lineTo(5, 15);
    point.endFill();
    point.pivot.set(0,0);
    point.position.x = x;
    point.position.y = y;
    stage.addChild(point);
    return point;
  }
  var getNewAttractor = function (type, x, y, distance, force, stage ) {
    var point = new PIXI.Graphics();
    if (type==='radius'){
      point.beginFill(WHITE);
      point.drawCircle(0,0, Math.abs(distance) );
      point.position.x = x;
      point.position.y = y; 
      point.endFill(); 
      stage.addChild(point);
    }
    if (type==='hori'){
      for (var i=0; i < window.innerWidth; i = i + 5 ){
        point.beginFill(WHITE);
        point.drawCircle(i,0, 2 );
        point.endFill(); 
      }
      stage.addChild(point);
    }
    if (type==='vert'){
      for (var i=0; i < window.innerHeight; i = i + 5 ){
        point.beginFill(WHITE);
        point.drawCircle(0,i, 2 );
        point.endFill(); 
      }
      stage.addChild(point);
    }
    return point;
  }


  callback.bind(this)();
}