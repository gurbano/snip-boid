var PAttractor = require('../pixi/PAttractor');
var BoidGenerator = require('../pixi/BoidGenerator');
var FlockFactory = require('../boids/FlockFactory')({});
var conf = require('../configurations/experiment1');


module.exports = {
	'LOADING' : {
		name: 'LOADING',
		description: 'Loading screen',
		next: 'EXP1'
	},
	'EXP1' : {
		name: 'EXP1',
		description: 'Boids and a bunch of obstacles',
		next: 'EXP2',
		populateWorld : function (stage) {
			//Add a new mouse bouncer - left click attract, right click push
			addMouseBouncer.bind(this)(stage, {radius:30, force: 100, distance:300} )
			//add random bouncers
			addBouncers.bind(this)(stage, { force: -100, distance:60}, 100);
			//add the flock
			var flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					SIZE: 400,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: true //generate boids at random position
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

		}
	},
	'EXP2' : {
		name: 'EXP2',
		description: 'Random 100 boids',
		next: 'EXP1',
		populateWorld : function (stage) {
			//add the flock
			var flock = new FlockFactory.generate(
				$.extend(conf.FLOCK,{
					SIZE: 100,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: true //generate boids at random position
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

		}
	},
	'GEN1': {
		name: 'GEN1',
		description: 'Boids and a bunch of obstacles',
		next: '',
		populateWorld : function (stage) {
			var flock = undefined;
			var self = this;
			addBouncers.bind(this)(stage, { force: 500, distance:50}, 10);
			//Add a new mouse bouncer - left click attract, right click push
			addMouseBouncer.bind(this)(stage, 
					{radius:30, 
					force_zero: 100, 
					force: -100, 
					distance: 200} )
			
			//add the flock
			 flock = new FlockFactory.generate(
				{
					sepD: 100, //try to keep this distance
					cohD: 300, //try to stick with ppl inside this radius
					aliD: 300,

					sepW: 550,
					cohW: 50, //0 -> 100
					aliW: 500,

					aLimit: 0.15,
					sLimit: 3,
					sRatio: 1,

					SIZE: 100,
					WIDTH: this.width, //flock max x (coordinates - same as the screen)
					HEIGHT: this.height, //flock max y (coordinates - same as the screen)
					RANDOM: true, //generate boids at random position
					boids :{
						render: function  () {
							this.beginFill(gu.color());
							this.moveTo(0,0);    
							this.lineTo(-10 + gu.random(-5,5), 15 + gu.random(-5,5));
							this.lineTo(10 + gu.random(-5,5), 0+ gu.random(-5,5));
							this.lineTo(-10 + gu.random(-5,5), -15 + gu.random(-5,5));
							this.endFill();
						}
					}
				},
				function(_flock){
					stage.addFlock(_flock);
				}
			);
		
			var generator = new BoidGenerator(
				{	
					x: gu.random(pad, this.width - pad),
					y: gu.random(pad, this.height - pad),
					N: function(){return 0;}, //how many boids are generated per click
					max: function(){return 0;},
					flock: function(){return flock;}, //target flock ,
					delay: function(){return 10 * gu.random(10,100);}
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
	}


}




/*UTILS*/

var pad = 100;
var addBouncers = function(stage, options, number, cb){
	for (var i = 0; i < number; i++) {
		var rx = gu.random(pad, this.width - pad);
		var ry = gu.random(pad, this.height - pad);
			
		stage.addEntity(
			new PAttractor($.extend(options,{radius:gu.random(5,10), x: rx, y:ry}) ), 
			function (obj) {
				obj.update = function () {
					if (cb)cb();
				}
			}
		);					
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
		});	
}


/*
		var walls = [];
		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: pad },end: {x: 5*pad,y: this.height - pad }, force: 200, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
		
		walls.push(stage.addEntity(
					new PWall({start: {x: this.width - pad, y: pad },end: {x: this.width - pad, y: this.height -pad }, force: 100, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));



		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: pad },end: {x: this.width - pad, y: pad }, force: 200, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
		walls.push(stage.addEntity(
					new PWall({start: {x: pad,y: this.height - pad },end: {x: this.width - pad, y: this.height - pad }, force: 100, distance:100}), 
					function (obj) {
						obj.update = function () {

						}
				}));
*/