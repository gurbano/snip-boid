var PAttractor = require('../pixi/PAttractor');
var PWall = require('../pixi/PWall');
var PGoal = require('../pixi/PGoal');
var BoidGenerator = require('../pixi/BoidGenerator');
var FlockFactory = require('../boids/FlockFactory');
var conf = require('../configurations/experiment1');

var IMPL1 = require('../boids/impl/B1')({});
var IMPL2 = require('../boids/impl/B2')({});
var IMPL3 = require('../boids/impl/B3')({});

var Victor = require('victor'); //http://victorjs.org/
module.exports = {
	'LOADING' : {
		name: 'LOADING',
		description: 'Loading screen',
		next: 'EXP1'
	},
	'EXP2' : {
		name: 'EXP2',
		description: 'two flocks implementations, walls around, 50 bouncers, ',
		populateWorld : function (stage) {			
			//addWalls.bind(this)(stage);
			addMouseBouncer.bind(this)(stage, 
					{radius:30, 
					force_zero: 0, 
					force: -100, 
					distance: 3000} );

			stage.addEntity(
				new PGoal($.extend({},{force:-10, radius:30, x: 40, y: 80}) ), 
				function (obj) {
					
				}
			);	
			addBouncers.bind(this)(stage, { force: 5500, distance:20}, 360);
			//add the flock
			var flock = new FlockFactory({}).generate(
				$.extend(conf.FLOCK,{
					SIZE: 1 ,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false, //generate boids at random position
					IMPL: IMPL3,
					boids :{
						render: function  () {
							this.beginFill(0x123456);
							this.moveTo(0,0);    
							this.lineTo(-10, 15);
					        this.lineTo(10, 0);
					        this.lineTo(-10, -15);
					        this.endFill();
						}
					},
				}),
				function(_flock){
					stage.addFlock(_flock);
				}
			);
			
			//5 dat.gui
			var gui = new dat.GUI();				
			var f1 = gui.addFolder('Distances');
			f1.add(flock, 'sepD',10,1000);
			f1.add(flock, 'cohD',10,1000);
			f1.add(flock, 'aliD',10,1000);
			var f2 = gui.addFolder('Forces');
			f2.add(flock, 'sepW',1,100);
			f2.add(flock, 'cohW',1,100);
			f2.add(flock, 'aliW',1,100);
			var f3 = gui.addFolder('speed');
			f3.add(flock, 'sLimit',0.1,10);
			f3.add(flock, 'aLimit',0.1,10);
			

		}
	},
	'WALL1' : {
		name: 'WALL1',
		description: '',		
		populateWorld : function (stage) {			
			addWalls.bind(this)(stage);
			addRandomWalls.bind(this)(stage,{}, 10);
			//addBouncers.bind(this)(stage, { force: 50, distance:30}, 10);
			addMouseBouncer.bind(this)(stage, 
					{radius:30, 
					force_zero: 0, 
					force: -100, 
					distance: 3000
				});
			//GOAL
			//stage.addEntity(new PGoal($.extend({},{distance: 1000, force:-10, radius:10, x: pad, y: pad}) ), function (obj) {});
			var flock = new FlockFactory({}).generate(
				$.extend(conf.FLOCK,{
					SIZE: 0 ,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false, //generate boids at random position
					IMPL: IMPL3,
					boids :{
						render: function _render () {
							this.beginFill(gu.color());
							this.moveTo(0,0);    
							this.lineTo(-10, 15);
					        this.lineTo(10, 0);
					        this.lineTo(-10, -15);
					        this.endFill();
						}
					}
				}),
				function(_flock){
					stage.addFlock(_flock);
					stage.debug = false;
				}
			);

			var generator = new BoidGenerator(
				{	IMPL: IMPL3,
					x: this.width-pad*5,//gu.random(pad, this.width - pad),
					y: this.height-pad*5,//gu.random(pad, this.height - pad),
					N: function(){return 1;}, //how many boids are generated per click
					max: function(){return 50;},
					flock: function(){return flock;}, //target flock ,
					delay: function(){return 100 * gu.random(1,10);}
				}
			);
			

			var self = this;
			stage.addEntity(generator, function(obj){
				var gen = function() {
					if (self.running){
						obj.generate();
					}
					setTimeout(gen, obj.delay());	
				}
				setTimeout(gen, obj.delay());
			});
			
			//5 dat.gui
			var gui = new dat.GUI();	
			gui.add(stage, 'debug');			
			var f1 = gui.addFolder('Distances');
			f1.add(flock, 'sepD',10,1000);
			f1.add(flock, 'cohD',10,1000);
			f1.add(flock, 'aliD',10,1000);
			var f2 = gui.addFolder('Forces');
			f2.add(flock, 'sepW',1,100);
			f2.add(flock, 'cohW',1,100);
			f2.add(flock, 'aliW',1,100);
			var f3 = gui.addFolder('speed');
			f3.add(flock, 'sLimit',0.1,10);
			f3.add(flock, 'aLimit',0.00,2).step(0.1);
			f3.open();
			var f4 = gui.addFolder('WP');
			f4.add(flock, 'scaWP',0.1,2).step(0.1);
			f4.add(flock, 'attrWP',0.1,2).step(0.1);
			f4.add(flock, 'goalWP',0.1,2).step(0.1);
			f4.open();
			

		}
	},
	'GEN1': {
		name: 'GEN1',
		description: 'Boids and a bunch of obstacles',
		next: '',
		populateWorld : function (stage) {
			var flock = undefined;
			var self = this;
			addBouncers.bind(this)(stage, { force: 5000, distance:40}, 0);
			//Add a new mouse bouncer - left click attract, right click push
			addMouseBouncer.bind(this)(stage, 
					{radius:30, 
					force_zero: 0, 
					force: - 500, 
					distance: 300} )
			
			//add the flock
			flock = new FlockFactory(conf.FLOCK).generate(
				{
					sepD: 100, //try to keep this distance
					cohD: 300, //try to stick with ppl inside this radius
					aliD: 300,

					sepW: 55,
					cohW: 35, //0 -> 100
					aliW: 50,

					aLimit: 0.5,
					sLimit: 5,
					sRatio: 1,
					IMPL: IMPL2,

					SIZE: 0,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: true, //generate boids at random position
					boids :{
						render: function _render () {
							this.beginFill(gu.color());
							this.moveTo(0,0);    
							this.lineTo(-10, 15);
					        this.lineTo(10, 0);
					        this.lineTo(-10, -15);
					        this.endFill();
						}
					}
				},
				function(_flock){
					stage.addFlock(_flock);
				}
			);
		
			var generator = new BoidGenerator(
				{	IMPL: IMPL3,
					x: this.width/2,//gu.random(pad, this.width - pad),
					y: this.height/2,//gu.random(pad, this.height - pad),
					N: function(){return 1;}, //how many boids are generated per click
					max: function(){return 100;},
					flock: function(){return flock;}, //target flock ,
					delay: function(){return 1 * gu.random(10,100);}
				}
			);
			 
			stage.addEntity(generator, function(obj){
				var gen = function() {
					if (self.running){
						obj.generate();
					}
					setTimeout(gen, obj.delay());	
				}
				setTimeout(gen, obj.delay());
			});


			//5 dat.gui
			if (flock){
				var gui = new dat.GUI();				
				var f1 = gui.addFolder('Distances');
				f1.add(flock, 'sepD',0,1000);
				f1.add(flock, 'cohD',0,1000);
				f1.add(flock, 'aliD',0,1000);
				var f2 = gui.addFolder('Forces');
				f2.add(flock, 'sepW',0,1000);
				f2.add(flock, 'cohW',0,1000);
				f2.add(flock, 'aliW',0,1000);
				var f3 = gui.addFolder('Speed');
				f3.add(flock, 'aLimit',0,10);
				f3.add(flock, 'sLimit',0,10);				
				//f1.open();
				//f2.open();
				f3.open();
			}

		}
	},
	'SNA' : {
		name: 'SNA',
		description: 'Boids as ANT',
		next: '',
		populateWorld : function (stage) {	
			addWalls.bind(this)(stage);
			addBouncers.bind(this)(stage, { force: 5000, distance:40}, 0);
			addMouseBouncer.bind(this)(stage, 
					{radius:30, 
					force_zero: -0, 
					force: - 500, 
					distance: 300} );
			var loader = new PIXI.loaders.Loader(); // you can also create your own if you want
			loader.add('snake',"../../images/snake.png");
			loader.once('complete',go.bind(this));
			loader.load();

			function go() {  
				var texture = PIXI.TextureCache["../../images/snake.png"]; 
				var segLen = 10;
				var segs = 4;
				var hei = 1.8;
				var _render= function _render (boid) {
					this.lineStyle(1,0x000000);
					this.moveTo(this.points[0].x,this.points[0].y);
					for (var i = 1; i < this.points.length; i++) {
					    this.lineTo(this.points[i].x,this.points[i].y);
					};	
				    for (var i = 1; i < this.points.length; i++) {
					    var x = this.points[i].x;
					    var y = this.points[i].y;					    
					    //legs
					    var delta =  Math.sin((i * 0.5) + this.count)*10;
					    this.moveTo(x,y);
					    this.lineTo(x + delta, y+10);
					    this.moveTo(x,y);
					    this.lineTo(x - delta, y-10);

					    this.beginFill(0xff0022);
						this.drawCircle(x,y,4);
						this.endFill();
					    
					};	
					this.lineStyle(2,0x000000);
					this.beginFill(0xf05522);
				    this.drawCircle(0,0,6);				    
				    this.endFill();
					

				    if (boid){
    				    this.lineStyle(1,0x0000ff);
    				    this.moveTo(0,0);
    				    var targ = gu.v(boid.getSpeed().x ,boid.getSpeed().y ,0).multiply(5);
    					this.lineTo(targ.e(1), targ.e(2));
    				}
				};
				new FlockFactory(conf.FLOCK).generate(
				{

					SIZE: 15,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: false, //generate boids at random position
					IMPL: IMPL3	,
					//sLimit: 1,
					boids :{
						render: function(){
							this.points = [];
							this.count = 0;
							for (var i = 0; i < segs; i++)
							{
							    this.points.push(new PIXI.Point(- i * segLen, gu.random(-5,5)) );
							}
							_render.bind(this)();
						},
						animate: function (boid) {
							var draw = function(){
								this.clear();
								_render.bind(this)(boid);
							}
							var updatePoints = function () {
								this.count += 0.2;
							    // make the snake
							    for (var i = 0; i < this.points.length; i++) {
							        this.points[i].y = Math.sin((i * 0.5) + this.count) * (i*hei);
							        this.points[i].x = -(i * segLen + Math.cos((i * 0.5) + this.count));
							    }
							}
							updatePoints.bind(this)();
							draw.bind(this)();
						}
					}

					
				},
				function(_flock){
					stage.addFlock(_flock);
				});
			}	
		}
	}//SNA


}




/*UTILS*/

var pad = 50;
var addWalls = function(stage, cb){
	var left = {start: {x: pad,y: pad },end: {x:  pad, y: this.height - pad }, force: 200, distance:100};
	var right = {start: {x: this.width - pad, y: pad },end: {x: this.width - pad, y: this.height -pad }, force: 200, distance:100};
	var up = {start: {x: pad,y: pad },end: {x: this.width - pad, y: pad }, force: 200, distance:100};
	var down ={start: {x: pad,y: this.height - pad },end: {x: this.width - pad, y: this.height - pad }, force: 200, distance:100};
	var _anim = function () {		
		this.clear();
		if (this.intersection){
			this.lineStyle(2,0xf05522);
			this.beginFill(0xf05522);
		    this.drawCircle(this.intersection.x,this.intersection.y,6);				    
		    this.endFill();
		    if (this.norm){
				this.moveTo(this.intersection.x,this.intersection.y);
				this.lineTo(this.intersection.x + this.norm.x, this.intersection.y + this.norm.y);
				this.moveTo(this.intersection.x,this.intersection.y);
			}
		}
		this.render();
	};
	stage.addEntity(
		new PWall(left), 
		function (obj) {	
			obj.animate = _anim;
	});
	stage.addEntity(
		new PWall(right), 
		function (obj) {	
			obj.animate = _anim;
	});
	stage.addEntity(
		new PWall(up), 
		function (obj) {	
			obj.animate = _anim;
	});
	stage.addEntity(
		new PWall(down), 
		function (obj) {	
			obj.animate = _anim;
	});

}

var addBouncers = function(stage, options, number, cb){
	for (var i = 0; i < number; i++) {
		var rx = gu.random(pad, this.width - pad);
		var ry = gu.random(pad, this.height - pad);
			
		stage.addEntity(
			new PAttractor($.extend(options,{radius:gu.random(5,10), x: rx, y:ry}) ), 
			function (obj) {
				if (cb)cb();
			}
		);					
	};	
};

var addRandomWalls = function(stage, options, number, cb){
	var pad = 50;
	for (var i = 0; i < number; i++) {
		var rx = gu.random(pad, this.width - pad);
		var ry = gu.random(pad, this.height - pad);
		var _rx = rx + gu.random(-pad*5 , pad*5 );
		var _ry = ry + gu.random(-pad*5 , pad*5 );
		
		var opts = {start: {x: rx,y: ry },end: {x:  _rx, y: _ry }, force: 200, distance:100}
		stage.addEntity(
			new PWall(opts), 
			function (obj) {
				obj.animate = function () {
					this.clear();
					if (this.intersection){
						this.lineStyle(2,0xf05522);
						this.beginFill(0xf05522);
					    this.drawCircle(this.intersection.x,this.intersection.y,6);				    
					    this.endFill();
					    if (this.norm){
							this.moveTo(this.intersection.x,this.intersection.y);
							this.lineTo(this.intersection.x + this.norm.x, this.intersection.y + this.norm.y);
							this.moveTo(this.intersection.x,this.intersection.y);
						}
					}
					this.render();
				}
		});					
	};	
};



var addMouseBouncer = function (stage, options) {
	stage.addEntity(
		new PAttractor(options), 
			function (obj) {
				obj.update = function () {
					obj.position.x = document.pageX;
					obj.position.y = document.pageY;
					if (!document.mousedown){
							obj.force = options.force_zero || 0;
						}else{
							obj.force = options.force;
						}
					}
					obj.animate();
		});	
}

